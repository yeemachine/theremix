

var cacheName = 'js13kPWA-v1-8';
var appShellFiles = [
  '/index.html',
  '/global.css',
  '/build/bundle.js',
  '/build/bundle.css',
  'https://cdn.jsdelivr.net/npm/pixi.js@4.8.8/dist/pixi.min.js',
  '/libraries/pixi.layers.js',
  '/libraries/pixi.lights.js',
  'https://cdn.jsdelivr.net/npm/pixi-particles-latest@3.2.0/dist/pixi-particles.min.js',
  '/libraries/tone.js',
  '/libraries/teoria.js',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet',
  '/'
];
var images = [
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FStatic_BG.png?v=1584933516627',
    'https://cdn.glitch.com/e352d3ca-2e03-47f1-acfd-675dff041f5f%2FNormalMap.png?v=1573974228592',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Right.png?v=1584933516896',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Right_normal.jpg?v=1584933515948',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Left.png?v=1584933517080',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTable_normal.jpg?v=1584933515769',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Ftheremin_null.jpg?v=1585345680882',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Bottom.png?v=1585100297444',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Bottom_Normal.jpg?v=1585100297564',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Top.png?v=1585101187057',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Top_Normal.jpg?v=1585100297463',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Right.png?v=1585236174151',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Right_Normal.jpg?v=1585236174117',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left1.png?v=1584933516264',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left1_Normal.jpg?v=1584933515645',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left2.png?v=1584933516405',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left2_normal.jpg?v=1584933515750',
    'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSolid2X2.png?v=1585365268924'
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