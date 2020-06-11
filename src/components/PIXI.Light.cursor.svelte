<script>
import * as PIXI from 'pixi.js'
import 'pixi-layers'
import 'pixi-lights'
import {loaded,hovered,glide,thereminPos,thereminMobilePos,active,canvasMousePos,mousePos,poseNetRes,CANVASWIDTH,WIDTH,CANVASHEIGHT,videoReady,SCALE,dragged,audioControls,mouseOverride,gestures,manual,tablePos} from './stores.js'
import {constrain} from './helpers.js'
import { onMount } from 'svelte';
import { tweened,spring } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {createGradientTexture} from './pixiApp.js'
import {posenetOptions} from './config.js'

export let stage = null
export let app = null;

//Initialize Mouse Pos
canvasMousePos.set({
        x:($WIDTH > 600) ? $thereminPos.x + $thereminPos.width*.12 : $thereminPos.x + $thereminPos.width*.12,
        y:($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.7 : $thereminPos.y + $thereminPos.height*.7
})

let htmlCursor
const cursorLight = new PIXI.lights.PointLight(0xff7f00,2);
cursorLight.falloff = [0.75, 3, 10]

const gradientTexture = createGradientTexture(0, 12*$SCALE, app.renderer.resolution);
const gradientTexture2 = createGradientTexture(0, 24*$SCALE, app.renderer.resolution);

const particleContainer = new PIXI.particles.ParticleContainer(5000, {
  scale: true,
  position: true,
  rotation: false,
  uvs: false,
  tint: true
});
const emitter = new PIXI.particles.Emitter(particleContainer, [gradientTexture], {
  autoUpdate: true,
  emit:false,
  alpha: {
    start: 0.8,
    end: 0.1
  },
  scale: {
    start: 1,
    end: 0.2,
    minimumScaleMultiplier: 1
  },
  color: {
    start: "#FFFF33",
    end: "#ff7f00"
  },
  speed: {
    start: 0,
    end: 0,
    minimumSpeedMultiplier: 1
  },
  acceleration: {
    x: 0,
    y: 0
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 0
  },
  noRotation: true,
  rotationSpeed: {
    min: 0,
    max: 0
  },
  lifetime: {
    min: .6,
    max: .6
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 3000,
  pos: {x:0,y:0},
  addAtBack: false,
  spawnType: "point"
});


const emitterRight = new PIXI.particles.Emitter(particleContainer, [gradientTexture2], {
  autoUpdate: true,
  emit:false,
  alpha: {
    start: 0.8,
    end: 0.15
  },
  scale: {
    start: 1,
    end: 0.2,
    minimumScaleMultiplier: 1
  },
  color: {
    start: "#E54646",
    end: "#8D1A6D"
  },
  speed: {
    start: 0,
    end: 0,
    minimumSpeedMultiplier: 1
  },
  acceleration: {
    x: 0,
    y: 0
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 0
  },
  noRotation: true,
  rotationSpeed: {
    min: 0,
    max: 0
  },
  lifetime: {
    min: .6,
    max: .6
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 2500,
  pos: {x:0,y:0},
  addAtBack: false,
  spawnType: "point"
});

const emitterLeft = new PIXI.particles.Emitter(particleContainer, [gradientTexture2], {
  autoUpdate: true,
  emit:false,
  alpha: {
    start: 0.8,
    end: 0.15
  },
  scale: {
    start: 1,
    end: 0.2,
    minimumScaleMultiplier: 1
  },
  color: {
    start: "#E54646",
    end: "#8D1A6D"
  },
  speed: {
    start: 0,
    end: 0,
    minimumSpeedMultiplier: 1
  },
  acceleration: {
    x: 0,
    y: 0
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 0
  },
  noRotation: true,
  rotationSpeed: {
    min: 0,
    max: 0
  },
  lifetime: {
    min: .6,
    max: .6
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 2500,
  pos: {x:0,y:0},
  addAtBack: false,
  spawnType: "point"
});

let springLeftPos = spring(
{
  x:($WIDTH > 600) ? $thereminPos.x + $thereminPos.width*.12 : $CANVASWIDTH*.7,
  y:($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.7 : $CANVASHEIGHT*.1
}, 
{
  stiffness: 0.3,
  damping: 0.8
}); 

let springRightPos = spring(
{
  x:$thereminPos.x + $thereminPos.width*.88,
  y:$thereminPos.y + $thereminPos.height*.7
}, 
{
  stiffness: 0.3,
  damping: 0.8
}); 

$: {
  //Handles toggling of gesture controls vs mouse controls

      if($poseNetRes && $videoReady && $mouseOverride>.1){
        let leftWrist = {
          pose:$poseNetRes[9],
          x:0,
          y:0
        }
        let rightWrist = {
          pose:$poseNetRes[10],
          x:0,
          y:0,
        }
        emitter.emit = false
        gestures.set(true)

        if(rightWrist.pose.score > posenetOptions.minPartConfidence){
          if($WIDTH>600){
              //Don't Interpolate on mobile
              springRightPos.set(rightWrist.pose.position)
          }
          rightWrist.x = ($WIDTH > 600)
            ? $springRightPos.x/$videoReady.videoWidth * $CANVASWIDTH
            : rightWrist.pose.position.x/$videoReady.videoWidth * $CANVASWIDTH
          rightWrist.y = ($WIDTH > 600) 
            ? $springRightPos.y/$videoReady.videoHeight * $CANVASHEIGHT
            : rightWrist.pose.position.y/$videoReady.videoHeight * $thereminMobilePos.y
          rightWrist.audioX = constrain((rightWrist.x-$thereminPos.x)/$thereminPos.width,{min:0,max:1})
          rightWrist.audioY = constrain(rightWrist.y/($thereminPos.y+$thereminPos.height),{min:0,max:1})
          emitterRight.updateOwnerPos(rightWrist.x, rightWrist.y);
        }

        if(leftWrist.pose.score > posenetOptions.minPartConfidence){
          if($WIDTH>600){
            //Don't Interpolate on mobile
            springLeftPos.set(leftWrist.pose.position)
          }
          leftWrist.x = ($WIDTH > 600) 
            ? $springLeftPos.x/$videoReady.videoWidth * $CANVASWIDTH 
            : leftWrist.pose.position.x/$videoReady.videoWidth * $CANVASWIDTH 
          leftWrist.y = ($WIDTH > 600) 
            ? $springLeftPos.y/$videoReady.videoHeight * $CANVASHEIGHT
            : leftWrist.pose.position.y/$videoReady.videoHeight * $thereminMobilePos.y
          leftWrist.audioX = constrain((leftWrist.x-$thereminPos.x)/$thereminPos.width,{min:0,max:1})
          leftWrist.audioY = constrain(leftWrist.y/($thereminPos.y+$thereminPos.height),{min:0,max:1})
          emitterLeft.updateOwnerPos(leftWrist.x, leftWrist.y);
        }

        if(leftWrist.pose.score>posenetOptions.minPartConfidence && rightWrist.pose.score>posenetOptions.minPartConfidence){
          //both hands
          emitterRight.emit = true
          emitterLeft.emit = true
          audioControls.set({
            x:rightWrist.audioX,
            y:leftWrist.audioY
          })
        }else if(leftWrist.pose.score > rightWrist.pose.score){
          //left hand
          emitterRight.emit = false
          if(leftWrist.pose.score > posenetOptions.minPartConfidence){
            emitterLeft.emit = true
            audioControls.set({
              x:leftWrist.audioX,
              y:leftWrist.audioY
            })
          }
        }else if(leftWrist.pose.score < rightWrist.pose.score){
          //right hand
          if(rightWrist.pose.score > posenetOptions.minPartConfidence){
            emitterRight.emit = true
            audioControls.set({
              x:rightWrist.audioX,
              y:rightWrist.audioY
            })
            
          }
          emitterLeft.emit = false
        }else{
          //no hands
          emitterRight.emit = false
          emitterLeft.emit = false
        }
        
      }else{
        emitter.emit = true
        emitterRight.emit = false
        emitterLeft.emit = false
        gestures.set(false)

        cursorLight.brightness = 2*constrain(2-$SCALE,{max:1,min:0.5})
        if($canvasMousePos.y > $thereminMobilePos.y && $WIDTH < 600 || $dragged){
          
        }else{
          emitter.updateOwnerPos($canvasMousePos.x, $canvasMousePos.y);
          cursorLight.position.set($canvasMousePos.x,$canvasMousePos.y)
          audioControls.set({
            x:constrain(($canvasMousePos.x-$thereminPos.x)/$thereminPos.width,{min:0,max:1}),
            y:constrain($canvasMousePos.y/($thereminPos.y+$thereminPos.height),{min:0,max:1})
          })
        }

      }

      if($manual){
        emitter.emit=false;
        emitterRight.emit = false
        emitterLeft.emit = false
      }

     
         
  }

stage.addChild(cursorLight,particleContainer)

</script>

<container 
bind:this={htmlCursor}
class="{$hovered?'hovered':''}"
style='opacity:{mousePos ? 1 : 0};
  transform:translate({$mousePos.x-26}px, {$mousePos.y-26}px)'>
  <div>
    <span>{
      ($hovered === 'switch' && !$glide) ?  'Enable Glide' 
      : ($hovered === 'switch' && $glide) ? 'Disable Glide'
      : ($hovered === 'knob left') ? 'Adjust Volume'
      : ($hovered === 'knob right') ? 'Change Oscillator'
      : ''
      }</span>
  </div>
</container>

<style>
  container{
    top:0;
    left:0;
    position:fixed;
    width:48px;
    height:48px;
    z-index: 2;
    pointer-events: none;
  }
  div{
    width:100%;
    height:100%;
    border-radius: 50%;
    transform-origin: center;
    /* background:rgba(255,255,50,.2); */
    /* background:white; */
    border:2px transparent;
    position:relative; 
    display: flex;
    justify-content: center;
    align-items: center;
    /* animation: pulse 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite */
  }
  span{
    position: absolute;
    top:-32px;
    width: max-content;
    line-break: normal;
    font-size: 12px;
    background: rgb(var(--crimson));
    padding: 6px 12px 6px 12px;
    border-radius: 16px;
    color: rgb(var(--offwhite));
    opacity: 0;
    text-align: center;
    text-shadow: 0 0 20px rgba(0,0,0,0.5);
    transition:0s;
    /* animation: animateGlyph 1s linear infinite;
    animation-play-state: start; */
  }
  .hovered span{
    opacity: 1;
    /* transition: opacity .5s cubic-bezier(0.46, 0.03, 0.52, 0.96); */
  }
  @keyframes pulse {
    0%   { 
      transform: scale3d(1,1,1); 
      opacity: 1
    }
    50%   { 
      transform: scale3d(1.3,1.3,1.3); 
      opacity: .5
    }
    0%   { 
      transform: scale3d(1,1,1); 
      opacity: 1
    }
    }
    @media (hover: none) {
      div{
        opacity:0;
      }
    }
</style>