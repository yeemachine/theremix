<script>
  import { videoReady, mediapipeHandsLoaded, modelLoaded,handPoseRes,isSafari,allowHolistic,PoseFTUE } from "../stores.js";
  import { smooth, getDistance } from "../helpers.js";
  
  function onResults(results) {
    
    handPoseRes.set(results)

    
     if (!$modelLoaded) {
        modelLoaded.set(true);
    }
}

  const holistic = new Holistic({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
}});
holistic.setOptions({
  upperBodyOnly: true,
  smoothLandmarks: true,
  minDetectionConfidence: 0.75,
  minTrackingConfidence: 0.5
});
holistic.onResults(onResults);
  
  async function estimatePoseOnImage() {
    if ($videoReady && $allowHolistic) {
      
      if($videoReady.width!==$videoReady.videoWidth || $videoReady.height!==$videoReady.videoHeight){
        $videoReady.width = $videoReady.videoWidth
        $videoReady.height = $videoReady.videoHeight
      }
      await holistic.send({image: $videoReady});
     
      requestAnimationFrame(estimatePoseOnImage);
    } else {
      handPoseRes.set(null)
    }
  }

  $: {
    if ($videoReady && holistic && $allowHolistic && !isSafari && !$PoseFTUE) {
      estimatePoseOnImage();
    }
  }
</script>
