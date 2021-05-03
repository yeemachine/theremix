<script context="module">
import { writable } from 'svelte/store';

export const showCamera = writable(true);

export const capturedDevices = writable({
  videoinput:[],
  audioinput:[],
  audiooutput:[],
  currentVideoIndex:0,
  currentAudioIndex:0
})
export let videoDeviceId = writable(null);
</script>
<script>
  import { active, camera, videoReady } from "../stores.js";
  let videoObj;

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    if (deviceInfo.kind === 'audioinput') {
      $capturedDevices.audioinput.push(deviceInfo)
    } else if (deviceInfo.kind === 'audiooutput') {
      $capturedDevices.audiooutput.push(deviceInfo)
    } else if (deviceInfo.kind === 'videoinput') {
      if(deviceInfo.deviceId!=='' && !$capturedDevices.videoinput.find(o => o.deviceId === deviceInfo.deviceId)){
        $capturedDevices.videoinput.push(deviceInfo)
      }
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  
  $capturedDevices.videoinput.forEach((e,i)=>{
    //move any virtual cams to the end of array
    if(e.label.includes('Virtual') || e.label.includes('virtual')){
      $capturedDevices.videoinput.push($capturedDevices.videoinput.splice(i, 1)[0]);
    }
  })
  
  capturedDevices.set($capturedDevices) 
  if(!$videoDeviceId){
    videoDeviceId.set($capturedDevices.videoinput[0].deviceId)
  }
}
  
  function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}
  
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
  
let Stream;

const getStream = () => {
  const constraints = {
    video: {
      deviceId: $videoDeviceId ? {exact: $videoDeviceId} : undefined,
      facingMode: "user",
      width: { min: 480, ideal: 640, max: 1920 },
      height: { min: 400, ideal: 480 },
    },
    audio: false
  };

  // Get access to the camera!
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    if (!Stream || Stream.active === false) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          Stream = stream;
          handleStream(stream);
          if($capturedDevices.videoinput.length === 0){
            return navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
          }
        })
        .catch(err => {
          alert('Please allow camera for facial tracking.');
          setTimeout(()=>{
            camera.set(false)
            videoReady.set(videoObj)
          }, 1000)
        });
    } else {
      stopStream();
    }
  }
};

let checkStream
const handleStream = (stream) => {
  // console.log(stream)
  videoObj.srcObject = stream;
  checkStream = setInterval(() => {
    if (videoObj.readyState >= 3) {
      videoReady.set(videoObj)
      videoObj.play();
      //stop checking every half second
      clearInterval(checkStream);
    }
  }, 500);
}

const stopStream = () => {
  if (Stream) {
    Stream.getTracks().forEach(track => track.stop());
  }
  videoReady.set(null)
  clearInterval(checkStream)
};
  
$: {
  if ($active && $camera) {
    getStream();
  } else {
    setTimeout(stopStream,50)
  }
}
  
videoDeviceId.subscribe(val=>{
  if($camera && $videoReady){
    stopStream()
    getStream()
  }
})
  
</script>

<video
  bind:this="{videoObj}"
  autoplay
  muted
  playsinline
  width="{640}"
  height="{480}"
></video>

<style>
  video {
    opacity: 0;
    top: 0;
    left: 0;
    pointer-events: none;
    position: fixed;
  }
</style>
