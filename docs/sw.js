var cacheName = 'js13kPWA-v1.1';
var appShellFiles = [
  './index.html',
  './build/bundle.js',
  './build/bundle.css',
  'https://cdn.jsdelivr.net/npm/pixi.js@4.8.8/dist/pixi.min.js',
  './libraries/pixi.layers.js',
  './libraries/pixi.lights.js',
  'https://cdn.jsdelivr.net/npm/pixi-particles-latest@3.2.0/dist/pixi-particles.min.js',
  'https://unpkg.com/tone@13.8.27/build/Tone.js',
  'https://unpkg.com/@tonejs/midi',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet',
  './'
];
var images = [
    'https://theremin.app/assets/pixi/roundtable.png'
]
var contentToCache = appShellFiles.concat(images);

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
  });

  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });

  self.addEventListener('activate', (e) => {
    e.waitUntil(
      caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
          if(key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
  });

self.addEventListener("fetch", event => {
    console.log("You fetched " + event.url);
});