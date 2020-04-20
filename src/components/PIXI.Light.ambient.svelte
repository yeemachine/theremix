<script>
import {active,thereminPos,WIDTH,HEIGHT} from './stores.js'
import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
export let stage = null

const tween0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

const ambientLight = new PIXI.lights.AmbientLight(null, .3)
const warmLightContainer = new PIXI.Container();
const warmLightCoords = [
    {
      x: 0,
      y: 0.2,
      color: 0xff7f00
    }
];


warmLightCoords.forEach(e => {
  let warmpointLight = new PIXI.lights.PointLight(e.color, 0);
  warmLightContainer.addChild(warmpointLight);
});

$: {
  if($active === true){
    if($tween0_1 === 0){
      tween0_1.set(1)
    }
  }else{
    if($tween0_1 === 1){
      tween0_1.set(0)
    }
  }
  warmLightContainer.children.forEach((e,i)=>{
    e.position.x = $thereminPos.x + $thereminPos.width/2 + warmLightCoords[i].x * $thereminPos.width;
    e.position.y = $thereminPos.y + $thereminPos.height/2 + warmLightCoords[i].y * $thereminPos.height;
    e.brightness = (.4+Math.min(Math.max($WIDTH, 0), 400)/400)*$tween0_1
  })
  
}

stage.addChild(ambientLight,warmLightContainer)

</script>