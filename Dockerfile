# syntax=docker/dockerfile:1

############################################
# Stage 1: Build frontend assets (Vite/React)
############################################
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json vite.config.js tailwind.config.js postcss.config.js components.json ./
COPY resources ./resources
COPY public ./public

RUN npm run build

############################################
# Stage 2: Install PHP dependencies (Composer)
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
# Stage 3: Runtime image (PHP-FPM + Nginx)
############################################
FROM php:8.2-fpm-alpine AS runtime

# System dependencies + PHP extensions required by this app
# (pdo_mysql/pdo_pgsql for DB, gd for media library/dompdf, zip for maatwebsite/excel,
#  intl, bcmath, exif, pcntl for horizon, redis for cache/queue/broadcasting)
RUN apk add --no-cache \
        nginx \
        supervisor \
        bash \
        curl \
        git \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libzip-dev \
        libxml2-dev \
        icu-dev \
        oniguruma-dev \
        postgresql-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        pdo_pgsql \
        gd \
        zip \
        intl \
        bcmath \
        exif \
        pcntl \
        opcache \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del libpng-dev libjpeg-turbo-dev freetype-dev libzip-dev libxml2-dev icu-dev oniguruma-dev postgresql-dev

WORKDIR /var/www/html

# Copy application code
COPY . .

# Copy vendor (PHP deps) from composer stage
COPY --from=composer_deps /app/vendor ./vendor

# Copy built frontend assets from frontend stage
COPY --from=frontend /app/public/build ./public/build

# Remove any stray Vite dev-server marker so Laravel serves the built assets
RUN rm -f public/hot

# Finish composer scripts now that full app + vendor are in place
RUN composer dump-autoload --optimize --no-dev \
    && php artisan package:discover --ansi || true

# Permissions: web server user needs write access to these
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Config files for nginx / php-fpm / supervisord
# nginx.conf is a template - the entrypoint substitutes $PORT into it at container start,
# since Render assigns the listen port dynamically via the PORT env var.
COPY docker/nginx.conf /etc/nginx/templates/default.conf.template
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
