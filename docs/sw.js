const vn = "v1.0.00";
const production = true;

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

const pixiAssets = [
    'https://theremin.app/assets/pixi/roundtable.png',
    "https://theremin.app/assets/pixi/roundtable_normal.jpg",
    "https://theremin.app/assets/pixi/BG-Machine.jpg",
    "https://theremin.app/assets/pixi/BG-Normal.jpg",
    "https://theremin.app/assets/pixi/theremin_null.png",
    "https://theremin.app/assets/pixi/Theremin%20Body%20Mobile.png",
    "https://theremin.app/assets/pixi/Theremin%20Body%20Normal.png",
    "https://theremin.app/assets/pixi/Screen.jpg",
    "https://theremin.app/assets/pixi/Right-Antenna.png",
    "https://theremin.app/assets/pixi/Right-Antenna-Normal.png",
    "https://theremin.app/assets/pixi/Left-Antenna.png",
    "https://theremin.app/assets/pixi/Left-Antenna-Normal.png",
    "https://theremin.app/assets/pixi/Knob.png",
    "https://theremin.app/assets/pixi/Knob-Normal.png",
    "https://theremin.app/assets/pixi/Switch-On.png",
    "https://theremin.app/assets/pixi/Switch-On-Normal.png",
    "https://theremin.app/assets/pixi/Switch-Off.png",
    "https://theremin.app/assets/pixi/Switch-Off-Normal.png",
    "https://theremin.app/assets/pixi/Mobile-Controls.png",
    "https://theremin.app/assets/pixi/Mobile-Controls-Normal.png",
    "https://theremin.app/assets/pixi/Video.png",
    "https://theremin.app/assets/pixi/Video-Normal.png",
    "https://theremin.app/assets/pixi/Wire-1.png",
    "https://theremin.app/assets/pixi/Wire-1-Normal.png",
    "https://theremin.app/assets/pixi/Wire-2.png",
    "https://theremin.app/assets/pixi/Wire-2-Normal.png",
    "https://theremin.app/assets/pixi/Wire-3.png",
    "https://theremin.app/assets/pixi/Symbols-Normal.png",
    "https://theremin.app/assets/pixi/BGM-Normal.jpg",
    "https://theremin.app/assets/pixi/BGM3.jpg",
    "https://theremin.app/assets/pixi/BGM4.jpg",
    "https://theremin.app/assets/pixi/BGM5.jpg",
    "https://theremin.app/assets/pixi/BGM6.jpg",
    "https://theremin.app/assets/pixi/BGM16.jpg",
    "https://theremin.app/assets/pixi/BGM2.jpg",
    "https://theremin.app/assets/pixi/BGM9.jpg",
    "https://theremin.app/assets/pixi/BGM12.jpg",
    "https://theremin.app/assets/pixi/BGM11.jpg",
    "https://theremin.app/assets/pixi/BGM8.jpg",
    "https://theremin.app/assets/pixi/BGM1.jpg",
    "https://theremin.app/assets/pixi/BGM15.jpg",
    "https://theremin.app/assets/pixi/BGM14.jpg",
    "https://theremin.app/assets/pixi/BGM10.jpg"
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

const globalAssets = [
  'https://theremin.app/assets/global/basic_controls.gif',
  'https://theremin.app/assets/global/midi_controls.gif'
]

let contentToCache = appShellFiles.concat(pixiAssets).concat(midiAssets).concat(globalAssets);

// install and save files to cache
self.addEventListener('install', (e) => {
    console.log('%c%s',
        'color: rgb(229,70,70); background: rgb(25,25,25);padding:4px 8px 4px 8px;border-radius:4px',
        'THEREMIX '+vn+(production ? '' : ': Dev Build'))
    e.waitUntil(
        caches.open(vn).then((cache) => {
            return cache.addAll(contentToCache);
        })
    );
});

const channel = new BroadcastChannel('sw-messages');
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
    if(event.data.action === 'version'){
        channel.postMessage({version: vn});
    }
});

  self.addEventListener('fetch', (e) => {

    if(e.request.url.includes('/build/bundle.js')){
        console.log('%c%s',
        'color: rgb(229,70,70); background: rgb(25,25,25);padding:4px 8px 4px 8px;border-radius:4px',
        'THEREMIX '+vn+(production ? '' : ': Dev Build'))
    }

    if(production){
        if(!e.request.url.includes('googletagmanager')){
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
        }
    }else{
        // console.log('Dev Mode')
    }
  });