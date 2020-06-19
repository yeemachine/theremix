<script>
import * as PIXI from 'pixi.js'
import 'pixi-layers'
import 'pixi-lights'
import {active,thereminPos,WIDTH,SCALE} from '../stores.js'
import {constrain} from '../helpers.js';
import { tweened } from 'svelte/motion';
import { sineInOut } from 'svelte/easing';
export let stage = null

const sineInOut0_1 = tweened(0, {
    duration: 700,
    easing: sineInOut
});

const ambientLight = new PIXI.lights.AmbientLight(0xFFffff, .1)
const warmLightContainer = new PIXI.Container();
const warmLightCoords = [
    {
      x:.39,
      y: 0.1,
      color: 0xff7f00,
      falloff:[0.75, 3, 8],
      brightness: 1.5,
      start:1
    },
    {
      x:-.29,
      y: .22,
      color: 0xff7f00,
      falloff:[0.75, 3, 8],
      brightness: 1.5,
      start:1
    },
];
let lightHeight = 90

warmLightCoords.forEach(e => {
  let warmpointLight = new PIXI.lights.PointLight(e.color, 0);
  warmLightContainer.addChild(warmpointLight);
});

$: {
  if($active === true){
    if($sineInOut0_1 === 0){
      sineInOut0_1.set(1)
    }
  }else{
    if($sineInOut0_1 === 1){
      sineInOut0_1.set(0)
    }
  }

  warmLightContainer.children.forEach((e,i)=>{
    e.position.x = $thereminPos.x + $thereminPos.width/2 + warmLightCoords[i].x * $thereminPos.width;
    e.position.y = $thereminPos.y + $thereminPos.height/2 + warmLightCoords[i].y * $thereminPos.height;
    e.brightness = 
      warmLightCoords[i].brightness*(warmLightCoords[i].start+(1-warmLightCoords[i].start)*$sineInOut0_1)
      * constrain(2-$SCALE,{max:1,min:0.2})
    e.falloff = warmLightCoords[i].falloff
  })
  ambientLight.brightness = ($WIDTH > 600) ? .05+.3*$sineInOut0_1 : .3 + .05*$sineInOut0_1
  ambientLight.color = 0xeeccec
}

stage.addChild(ambientLight,warmLightContainer)

</script>