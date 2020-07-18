const vn = "v1.00.11";
const production = true;

// files to cache
const appShellFiles = ["./","/index.html", "/build/bundle.js", "/build/bundle.css"];

const libraries = [
  "https://cdn.jsdelivr.net/npm/pixi.js@4.8.9/dist/pixi.min.js",
  "/libraries/pixi.layers.min.js",
  "/libraries/teoria.min.js",
  "https://cdn.jsdelivr.net/npm/pixi-lights@2.0.3/lib/pixi-lights.min.js",
  "https://cdn.jsdelivr.net/npm/pixi-particles@3.2.0/dist/pixi-particles.min.js",
  "https://cdn.jsdelivr.net/npm/tone@13.8.34/build/Tone.min.js",
  "https://cdn.jsdelivr.net/npm/@tonejs/midi@2.0.23/build/Midi.min.js",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.1/dist/tf.min.js",
  "https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet@2.2.1/dist/posenet.min.js"
];

const pixiAssets = [
  "/assets/pixi/core-sheet.json",
  "/assets/pixi/bg-sheet.json",
  "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob.png?v=1593921823767",
  "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob-Normal.png?v=1593921823860",
  "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fspritesheet-comp.png?v=1593933737363",
  "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbg-spritesheet-comp.png?v=1593933755616",
  "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM8.jpg?v=1593790573806"
];

const midiAssets = [
  "https://theremin.app/assets/midi/Thats_Why_I_Gave_Up_on_Music.mid",
  "https://theremin.app/assets/midi/Racing_Into_The_Night.mid",
  "https://theremin.app/assets/midi/Byoushinwo_Kamu.mid",
  "https://theremin.app/assets/midi/Charles.mid",
  "https://theremin.app/assets/midi/Kinmokusei.mid",
  "https://theremin.app/assets/midi/Kaisei.mid",
  "https://theremin.app/assets/midi/Alice_in_Leng_Dong_Ku__Alice_in_the_Freezer.mid",
  "https://theremin.app/assets/midi/DAYBREAK_FRONTLINE__cover_piano_score.mid",
  "https://theremin.app/assets/midi/I_Dont_Need_Youth.mid",
  "https://theremin.app/assets/midi/Orangestar_-_Asu_no_yozora_shoukaihan_feat.IA.mid",
  "https://theremin.app/assets/midi/DNA.mid",
  "https://theremin.app/assets/midi/Echo_of_My_Voice_in_the_Rain__-_OrangestarIA_-_Ver._Wolpis_Kater.mid",
  "https://theremin.app/assets/midi/lanshangshengming_Ranshou_Seimei.mid",
  "https://theremin.app/assets/midi/Nouriueno_Cracker.mid"
];

const gifAssets = [
  "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbasic_controls_S.mp4?v=1593936184314",
  "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fmidi_controls_S.mp4?v=1593936184001"
];

const icons = [
  "https://theremin.app/assets/global/cursor1.svg",
  "https://theremin.app/assets/global/cursor4.svg",
  "https://theremin.app/assets/global/grab.svg",
  "https://theremin.app/assets/global/grabbed.svg",
  "https://theremin.app/assets/global/h.svg",
  "https://theremin.app/assets/global/hred.svg"
];

const fonts = [
    "https://theremin.app/assets/fonts/WhirlyBirdieGX.woff2",
    "https://theremin.app/assets/fonts/nicholsonbeta-webfont.woff2",
    "https://theremin.app/assets/fonts/WhirlyBirdie-Regular.woff"
]

let staticContent = libraries
  .concat(midiAssets)
  .concat(icons)
  .concat(pixiAssets);
let contentToCache = appShellFiles.concat(staticContent).concat(fonts);

var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-' + vn
};

self.addEventListener('install', function(event) {
  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
//   console.log('Handling install event. Resources to prefetch:', contentToCache);

  self.skipWaiting();

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(function(cache) {
      return cache.addAll(contentToCache);
    })
  );
});

// Listen for messages from client
self.addEventListener("message", event => {
    if (event.data.action === "version") {
      event.source.postMessage(vn);
    }
});

self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log('Deleting out of date cache.')
            // console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
        );
    })
    );
});

self.addEventListener("fetch", function(event) {
  if (production && !event.request.url.includes('googletagmanager') && !event.request.url.includes('.mp4')){
    let headersLog = [];
    for (var pair of event.request.headers.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
      headersLog.push(pair[0] + ": " + pair[1]);
    }
    // console.log(
    //   "Handling fetch event for",
    //   event.request.url,
    //   JSON.stringify(headersLog)
    // );

    if (event.request.headers.get("range")) {
    //   console.log("Range request for", event.request.url);
      var rangeHeader = event.request.headers.get("range");
      var rangeMatch = rangeHeader.match(/^bytes\=(\d+)\-(\d+)?/);
      var pos = Number(rangeMatch[1]);
      var pos2 = rangeMatch[2];
      if (pos2) {
        pos2 = Number(pos2);
      }

    //   console.log(
    //     "Range request for " + event.request.url,
    //     "Range: " + rangeHeader,
    //     "Parsed as: " + pos + "-" + pos2
    //   );
      event.respondWith(
        caches
          .open(vn)
          .then(function(cache) {
            return cache.match(event.request.url);
          })
          .then(function(res) {
            if (!res) {
            //   console.log("Not found in cache - doing fetch");
              return fetch(event.request).then(res => {
                // console.log("Fetch done - returning response ", res);
                return res.arrayBuffer();
              });
            }
            // console.log("FOUND in cache - doing fetch");
            return res.arrayBuffer();
          })
          .then(function(ab) {
            // console.log("Response procssing");
            let responseHeaders = {
              status: 206,
              statusText: "Partial Content",
              headers: [
                ["Content-Type", "video/mp4"],
                [
                  "Content-Range",
                  "bytes " +
                    pos +
                    "-" +
                    (pos2 || ab.byteLength - 1) +
                    "/" +
                    ab.byteLength
                ]
              ]
            };

            // console.log("Response: ", JSON.stringify(responseHeaders));
            var abSliced = {};
            if (pos2 > 0) {
              abSliced = ab.slice(pos, pos2 + 1);
            } else {
              abSliced = ab.slice(pos);
            }

            // console.log("Response length: ", abSliced.byteLength);
            return new Response(abSliced, responseHeaders);
          })
      );
    } else {
    //   console.log("Non-range request for", event.request.url);
      event.respondWith(
        // caches.match() will look for a cache entry in all of the caches available to the service worker.
        // It's an alternative to first opening a specific named cache and then matching on that.
        caches.match(event.request).then(function(response) {
          if (response) {
            // console.log("Found response in cache:", response);
            return response;
          }
        //   console.log(
        //     "No response found in cache. About to fetch from network..."
        //   );
          // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
          // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
          return fetch(event.request)
            .then(function(response) {
            //   console.log("Response from network is:", response);

              return response;
            })
            .catch(function(error) {
              // This catch() will handle exceptions thrown from the fetch() operation.
              // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
              // It will return a normal response object that has the appropriate error code set.
            //   console.error("Fetching failed:", error);

              throw error;
            });
        })
      );
    }
  }
});
