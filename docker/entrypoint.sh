#!/bin/bash
set -e

cd /var/www/html

# Render injects PORT dynamically; default to 8080 for local/manual runs
PORT="${PORT:-8080}"
sed "s/__PORT__/${PORT}/g" /etc/nginx/templates/default.conf.template > /etc/nginx/http.d/default.conf

# Ensure .env exists (Render normally injects env vars directly, but Laravel
# still wants a .env file present for some tooling / local fallback values)
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Generate APP_KEY only if one isn't already set via env or .env
if [ -z "${APP_KEY}" ] && ! grep -q "^APP_KEY=.\+" .env; then
    php artisan key:generate --force
fi

# Make sure storage symlink exists
php artisan storage:link || true

# Cache config/views for production performance.
# NOTE: route:cache is intentionally skipped — Filament registers routes
# using closures, which Laravel's route cache cannot serialize. Running
# route:cache in that situation can leave a corrupted/partial cached
# routes file that causes valid routes to fail with 405 errors.
php artisan config:cache || true
php artisan view:cache || true

# Optionally auto-run migrations on boot (set RUN_MIGRATIONS=true in Render env vars)
if [ "${RUN_MIGRATIONS}" = "true" ]; then
    php artisan migrate --force
fi

# Optionally run database seeders on boot (set RUN_SEEDERS=true in Render env vars)
if [ "${RUN_SEEDERS}" = "true" ]; then
    php artisan db:seed --force
fi

exec "$@"