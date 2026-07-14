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

# Cache config/routes/views for production performance.
# Safe to ignore failures here on first boot before DB/env is fully configured.
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# Optionally auto-run migrations on boot (set AUTO_MIGRATE=true in Render env vars)
if [ "${AUTO_MIGRATE}" = "true" ]; then
    php artisan migrate --force
fi

exec "$@"
