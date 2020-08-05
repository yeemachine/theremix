<script>
import {active,camera,videoReady} from '../stores.js'

let Stream;
let videoObj;
const getStream = () => {
  const constraints = {
    video: {
      facingMode: "user",
      width: { min: 480, ideal: 480, max: 1920 },
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
        })
        .catch(err => {
          alert('Please allow camera to use gesture controls.');
          setTimeout(()=>{
            camera.set(false)
            videoReady.set(null)
          }, 1000)
        });
    } else {
      stopStream();
    }
  }
};

let checkStream
const handleStream = (stream) => {
  videoObj.srcObject = stream;
  // console.log("Webcam On");
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
    // console.log("Webcam Off");
  }
  videoReady.set(null)
  clearInterval(checkStream)
};

$:{
    if($active && $camera){
        getStream()
    }else{
        stopStream()
    }
}

</script>

<video bind:this={videoObj} autoplay muted playsinline width={$videoReady ? $videoReady.videoWidth : 0} height={$videoReady ? $videoReady.videoHeight : 0}></video>

<style>
video {
        opacity: 0;
        top:0;left:0;
        pointer-events: none;
        position: fixed;
}
</style>