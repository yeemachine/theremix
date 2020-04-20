<script>
import {videoReady,poseNetRes,mousePos} from './stores.js'
const options = {
  architecture: "MobileNetV1",
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.8,
  maxPoseDetections: 1,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: "single",
  inputResolution: 513,
  multiplier: 0.5,
  quantBytes: 2
};

let net;
posenet.load().then(e=>{
    net = e
});

async function estimatePoseOnImage() {
    if($videoReady){
        const pose = await net.estimateSinglePose($videoReady, options);
        if(pose.score>0){
            // console.log(pose)
            poseNetRes.set(pose.keypoints)
        }else{
            poseNetRes.set(null)
        }
        requestAnimationFrame(estimatePoseOnImage);
    }else{
        poseNetRes.set(null)
    }
}

$:{
    if($videoReady && net){
        estimatePoseOnImage();
    }
    // console.log($poseNetRes)
}


</script>
<style>
</style>