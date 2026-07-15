#!/bin/bash

set -e

cd /var/www/html

# Create all Laravel and Media Library writable directories.
mkdir -p \
    storage/logs \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/testing \
    storage/app/public \
    storage/media-library/temp \
    bootstrap/cache

# PHP-FPM workers run as www-data.
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

PORT="${PORT:-8080}"

sed "s/__PORT__/${PORT}/g" \
    /etc/nginx/templates/default.conf.template \
    > /etc/nginx/http.d/default.conf

if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ -z "${APP_KEY}" ] && ! grep -q "^APP_KEY=.\+" .env; then
    php artisan key:generate --force
fi

php artisan optimize:clear || true
php artisan storage:link || true

php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

if [ "${RUN_MIGRATIONS}" = "true" ]; then
    php artisan migrate --force
fi

if [ "${RUN_SEEDERS}" = "true" ]; then
    php artisan db:seed --force
fi

exec "$@"