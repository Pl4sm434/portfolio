const CACHE_NAME = 'health-platformer-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './levels.js',
  './game.js',
  './app.js',
  './manifest.json',
  './assets/Dash-min.png',
  './assets/E.png',
  './assets/Fencepost.png',
  './assets/Gravity.png',
  './assets/WallJump.png',
  './assets/HealthKit.png',
  './assets/Checkpoint.png',
  './assets/CheckpointY.png',
  './assets/bg1.jpg',
  './assets/bg2.jpg',
  './assets/bg3.png',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
