<script>
  import { videoReady, poseNetRes, modelLoaded, isSafari,allowHolistic,PoseFTUE } from "../stores.js";
  import { smooth, getDistance } from "../helpers.js";
  import { posenetOptions } from "../config.js";

  let net;

  posenet.load().then((e) => {
    net = e;
  });

  async function estimatePoseOnImage() {
    if ($videoReady && !$allowHolistic) {
      
      if($videoReady.width!==$videoReady.videoWidth || $videoReady.height!==$videoReady.videoHeight){
        $videoReady.width = $videoReady.videoWidth
        $videoReady.height = $videoReady.videoHeight
      }
      
      const pose = await net.estimateMultiplePoses($videoReady, posenetOptions);
      if (pose.length > 0) {
        if (pose[0].score > posenetOptions.minPoseConfidence) {
          let armspan = getDistance(
            pose[0].keypoints[9].position,
            pose[0].keypoints[10].position
          );
          let smoothPose = smooth(pose[0], armspan);
          poseNetRes.set(smoothPose.keypoints);
        } else {
          poseNetRes.set(null);
        }
      }
      if (!$modelLoaded) {
        modelLoaded.set(true);
      }
      requestAnimationFrame(estimatePoseOnImage);
    } else {
      poseNetRes.set(null);
    }
  }

  $: {
    if ($videoReady && net && !$allowHolistic && (!$PoseFTUE || isSafari)) {
      estimatePoseOnImage();
    }
  }
</script>
