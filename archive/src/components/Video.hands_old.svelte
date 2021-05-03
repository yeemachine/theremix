<script>
  import { videoReady, mediapipeHandsLoaded, modelLoaded,handPoseRes } from "../stores.js";
  import { smooth, getDistance } from "../helpers.js";
  
  function onResults(results) {
    if (results.multiHandLandmarks) {
      // console.log(results)
      handPoseRes.set(results)
      if(!$modelLoaded){
        modelLoaded.set(true);
      }
    }else{
      handPoseRes.set(null)
    }
    
     if (!$modelLoaded) {
        modelLoaded.set(true);
      }
}
  
  const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.25
});
hands.onResults(onResults);
  
  async function estimatePoseOnImage() {
    if ($videoReady) {
      
      if($videoReady.width!==$videoReady.videoWidth || $videoReady.height!==$videoReady.videoHeight){
        $videoReady.width = $videoReady.videoWidth
        $videoReady.height = $videoReady.videoHeight
      }
      await hands.send({image: $videoReady});
     
      requestAnimationFrame(estimatePoseOnImage);
    } else {
      handPoseRes.set(null)
      // poseNetRes.set(null);
    }
  }

  $: {
    if ($videoReady && hands) {
      estimatePoseOnImage();
    }
  }
</script>
