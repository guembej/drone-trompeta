// Cambia la versión cada vez que publiques cambios para que los móviles se actualicen.
const CACHE = 'drone-trompeta-v5';

const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((claves) =>
      Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Primero la caché (funciona sin conexión); si no está, red, y se guarda para la próxima vez.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cacheada) => {
      if (cacheada) return cacheada;
      return fetch(e.request).then((resp) => {
        if (resp.ok && new URL(e.request.url).origin === location.origin) {
          const copia = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copia));
        }
        return resp;
      });
    })
  );
});
