import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
declare global {
    interface Window {
        Echo: Echo<any>;
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY;

if (pusherKey) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: pusherKey,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
    });
} else {
    // Realtime (Portal) features are disabled until Pusher credentials are
    // configured as build-time env vars. Without this guard, Echo throws
    // immediately on import and crashes the entire app on every page.
    console.warn(
        'Pusher/Echo not configured (VITE_PUSHER_APP_KEY missing) — realtime features disabled.',
    );
    window.Echo = undefined as unknown as Echo<any>;
}