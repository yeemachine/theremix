const vn = "v1.0.0";
const production = false;

// files to cache
const appShellFiles = [
  '/index.html',
  '/build/bundle.js',
  '/build/bundle.css',
  'https://cdn.jsdelivr.net/npm/pixi.js@4.8.8/dist/pixi.min.js',
  '/libraries/pixi.layers.js',
  '/libraries/pixi-lights.js',
  'https://cdn.jsdelivr.net/npm/pixi-particles-latest@3.2.0/dist/pixi-particles.min.js',
  'https://unpkg.com/tone@13.8.27/build/Tone.js',
  'https://unpkg.com/@tonejs/midi',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet'
];

const images = [
    'https://theremin.app/assets/pixi/roundtable.png'
]

let contentToCache = appShellFiles.concat(images);

// install and save files to cache
self.addEventListener('install', (e) => {
    console.log('THEREMIX '+vn+(production ? '' : ': Dev Build'))
    e.waitUntil(
        caches.open(vn).then((cache) => {
            return cache.addAll(contentToCache);
        })
    );
});

// Listen for messages from client
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    } else if (event.data.action === 'clearOld') {
      // Delete the old caches
        event.waitUntil(
            caches.keys().then((keys) => Promise.all(
                keys.map((k) => {
                    if (!k.includes(vn)) {
                        return caches.delete(k);
                    }
                })
            )).then(() => {
                console.log('Old caches are cleared...');
            })
        )
    }
});

  self.addEventListener('fetch', (e) => {
    if(production){
        e.respondWith(
            caches.match(e.request).then((r) => {
                // console.log('[Service Worker] Fetching resource: '+e.request.url);
                return r || fetch(e.request).then((response) => {
                    return caches.open(vn).then((cache) => {
                        // console.log('[Service Worker] Caching new resource: '+e.request.url);
                        cache.put(e.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }else{
        // console.log('Dev Mode')
    }
  });