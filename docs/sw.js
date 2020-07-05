const vn = "v1.00.05";
const production = true;

// files to cache
const appShellFiles = [
  '/index.html',
  '/build/bundle.js',
  '/build/bundle.css'
];

const libraries = [
  'https://cdn.jsdelivr.net/npm/pixi.js@4.8.8/dist/pixi.min.js',
  '/libraries/pixi.layers.js',
  '/libraries/pixi-lights.js',
  'https://cdn.jsdelivr.net/npm/pixi-particles-latest@3.2.0/dist/pixi-particles.min.js',
  'https://unpkg.com/tone@13.8.27/build/Tone.js',
  'https://unpkg.com/@tonejs/midi',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet'
]

const pixiAssets = [
    '/assets/pixi/core-sheet.json',
    "/assets/pixi/bg-sheet.json",
    "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob.png?v=1593921823767",
    "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob-Normal.png?v=1593921823860",
    "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcore-sheet.png?v=1593863882839",
    "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fspritesheet-comp.png?v=1593894249490"
]

const midiAssets = [
    'https://theremin.app/assets/midi/Thats_Why_I_Gave_Up_on_Music.mid',
    'https://theremin.app/assets/midi/Racing_Into_The_Night.mid',
    "https://theremin.app/assets/midi/Byoushinwo_Kamu.mid",
    "https://theremin.app/assets/midi/Charles.mid",
    "https://theremin.app/assets/midi/Kinmokusei.mid",
    'https://theremin.app/assets/midi/Kaisei.mid',
    'https://theremin.app/assets/midi/Alice_in_Leng_Dong_Ku__Alice_in_the_Freezer.mid',
    "https://theremin.app/assets/midi/DAYBREAK_FRONTLINE__cover_piano_score.mid",
    'https://theremin.app/assets/midi/I_Dont_Need_Youth.mid',
    "https://theremin.app/assets/midi/Orangestar_-_Asu_no_yozora_shoukaihan_feat.IA.mid",
    "https://theremin.app/assets/midi/DNA.mid",
    "https://theremin.app/assets/midi/Echo_of_My_Voice_in_the_Rain__-_OrangestarIA_-_Ver._Wolpis_Kater.mid",
    "https://theremin.app/assets/midi/lanshangshengming_Ranshou_Seimei.mid",
    "https://theremin.app/assets/midi/Nouriueno_Cracker.mid"
]

const gifAssets = [
  'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbasic_controls_S.mp4?v=1593735583334',
  'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbasic_controls_S.webm?v=1593735584224',
  'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fmidi_controls_S.webm?v=1593735585669',
  'https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fmidi_controls_S.mp4?v=1593735842103'
]

const icons = [
  'https://theremin.app/assets/global/Favicon_Desktop.png',
  'https://theremin.app/assets/global/Favicon.png',
  'https://theremin.app/assets/global/cursor1.svg',
  'https://theremin.app/assets/global/cursor4.svg',
  'https://theremin.app/assets/global/grab.svg',
  'https://theremin.app/assets/global/grabbed.svg',
  'https://theremin.app/assets/global/h.svg',
  'https://theremin.app/assets/global/hred.svg'
]

let staticContent = libraries.concat(pixiAssets).concat(midiAssets).concat(icons).concat(gifAssets)
let contentToCache = appShellFiles.concat(staticContent)

// install and save files to cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(vn).then((cache) => {
            console.log('Installing Service Worker...')
        //     console.log('%c%s',
        // 'color: rgb(229,70,70); background: rgb(25,25,25);padding:4px 8px 4px 8px;border-radius:4px',
        // 'THEREMIX ~~~ '+vn+(production ? '' : ': Dev Build'))
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
                console.log('Cache is reset.');
            })
        )
    }
    if(event.data.action === 'version'){
        event.source.postMessage(vn);
    }
});

  self.addEventListener('fetch', (e) => {
    if(production){
            e.respondWith(
                caches.match(e.request).then((r) => {
                    // console.log('[Service Worker] Caching new resource: '+e.request.url);
                    return r || fetch(e.request).then((response) => {
                      return caches.open(vn).then((cache) => {
                          // console.log('[Service Worker] Caching new resource: '+e.request.url);
                          if(!e.request.url.includes('googletagmanager')){
                          cache.put(e.request, response.clone());
                          }
                          return response;
                        });
                    });
                  } 
                )
            );
    }else{
        // console.log('Dev Mode')
    }
  });