# syntax=docker/dockerfile:1

############################################
# Stage 1: Install PHP dependencies (Composer)
############################################
FROM composer:2 AS composer_deps

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --no-scripts \
    --optimize-autoloader \
    --ignore-platform-reqs

############################################
# Stage 2: Build frontend assets (Vite/React)
############################################
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json vite.config.js tailwind.config.js postcss.config.js components.json ./
COPY resources ./resources
COPY public ./public

# The Filament admin theme (resources/css/filament/admin/theme.css) imports
# from /vendor/filament/filament/..., so vendor/ must exist before the build.
COPY --from=composer_deps /app/vendor ./vendor

# Render automatically passes dashboard env vars as Docker build args with
# matching names, so declaring these ARGs lets us pull PUSHER_APP_KEY /
# PUSHER_APP_CLUSTER (set once in Render) into Vite's build-time env vars,
# without needing to duplicate them as separate VITE_-prefixed variables.
ARG PUSHER_APP_KEY
ARG PUSHER_APP_CLUSTER
ENV VITE_PUSHER_APP_KEY=$PUSHER_APP_KEY
ENV VITE_PUSHER_APP_CLUSTER=$PUSHER_APP_CLUSTER

RUN npm run build

############################################
# Stage 3: Runtime image (PHP-FPM + Nginx)
############################################
FROM php:8.3-fpm-alpine AS runtime

# System dependencies + PHP extensions required by this app
# (pdo_mysql/pdo_pgsql for DB, gd for media library/dompdf, zip for maatwebsite/excel,
#  intl, bcmath, exif, pcntl for horizon, redis for cache/queue/broadcasting)
 RUN apk add --no-cache \
        nginx \
        supervisor \
        bash \
        curl \
        git \
        ca-certificates

RUN apk add --no-cache \
        libpng \
        libjpeg-turbo \
        freetype \
        libwebp \
        libavif \
        libzip \
        libxml2 \
        icu-libs \
        oniguruma \
        libpq

RUN apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        linux-headers \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libwebp-dev \
        libavif-dev \
        libzip-dev \
        libxml2-dev \
        icu-dev \
        oniguruma-dev \
        postgresql-dev

RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
        --with-avif

RUN docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        pdo_pgsql \
        gd \
        zip \
        intl \
        bcmath \
        exif \
        pcntl \
        opcache

 RUN curl -fsSL https://github.com/phpredis/phpredis/archive/refs/tags/6.1.0.tar.gz -o /tmp/redis.tar.gz \
    && mkdir -p /tmp/redis \
    && tar -xzf /tmp/redis.tar.gz -C /tmp/redis --strip-components=1 \
    && cd /tmp/redis \
    && phpize \
    && ./configure \
    && make -j$(nproc) \
    && make install \
    && docker-php-ext-enable redis \
    && cd / \
    && rm -rf /tmp/redis /tmp/redis.tar.gz

RUN php -r "if (!function_exists('imagewebp')) { fwrite(STDERR, 'WebP support is missing from PHP GD'.PHP_EOL); exit(1); }" \
    && php -r "if (!function_exists('imagecreatefromavif')) { fwrite(STDERR, 'AVIF support is missing from PHP GD'.PHP_EOL); exit(1); }"

RUN apk del .build-deps

WORKDIR /var/www/html

# Copy application code
COPY . .

# Copy vendor (PHP deps) from composer stage
COPY --from=composer_deps /app/vendor ./vendor

# Copy the composer binary itself so we can run composer commands in this stage
COPY --from=composer_deps /usr/bin/composer /usr/bin/composer

# Copy built frontend assets from frontend stage
COPY --from=frontend /app/public/build ./public/build

# Remove any stray Vite dev-server marker so Laravel serves the built assets
RUN rm -f public/hot

# Ensure required cache/storage directories exist (Blade view compiler, config
# cache, route cache, and sessions all need these present, and .dockerignore
# excluding their contents doesn't guarantee the empty dirs survive the build)
RUN mkdir -p \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/framework/testing \
        storage/logs \
        storage/app/public \
        storage/media-library/temp \
        bootstrap/cache

# Finish composer scripts now that full app + vendor are in place
RUN composer dump-autoload --optimize --no-dev \
    && php artisan package:discover --ansi || true

# Permissions: the exact UID the process runs as may not match www-data on
# some hosting platforms (e.g. Render), so use world-writable permissions on
# these cache/log/session directories to guarantee write access regardless
# of which UID actually runs php-fpm at runtime.
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

# Config files for nginx / php-fpm / supervisord
# nginx.conf is a template - the entrypoint substitutes $PORT into it at container start,
# since Render assigns the listen port dynamically via the PORT env var.
COPY docker/nginx.conf /etc/nginx/templates/default.conf.template
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf
COPY docker/php-uploads.ini /usr/local/etc/php/conf.d/zz-uploads.ini
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]