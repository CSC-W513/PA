const CACHE_NAME = '3d-annotation-v4';
const urlsToCache = [
  './',
  './index.html',
  './cloud-config.js',
  './icon.svg',
  'https://unpkg.com/three@0.164.1/build/three.module.js',
  'https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js',
  'https://unpkg.com/three@0.164.1/examples/jsm/renderers/CSS2DRenderer.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
