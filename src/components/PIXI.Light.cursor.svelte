<script>
import {loaded,thereminPos,active,mousePos,poseNetRes,WIDTH,HEIGHT,videoReady} from './stores.js'
import { onMount } from 'svelte';
import { tweened,spring } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {createGradientTexture} from './pixiApp.js'
export let stage = null
export let app = null;

let htmlCursor
const cursorLight = new PIXI.lights.PointLight(0xff7f00,3);
const gradientTexture = createGradientTexture(0, 12, app.renderer.resolution);
const gradientTexture2 = createGradientTexture(0, 24, app.renderer.resolution);

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
    end: 0.15
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
    min: 2,
    max: 2
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 5000,
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
    min: 1,
    max: 1
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 5000,
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
    min: 1,
    max: 1
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 5000,
  pos: {x:0,y:0},
  addAtBack: false,
  spawnType: "point"
});

let springMousePos=null
let springLeftPos=null
let springRightPos=null

$:{
  //Initilizes spring position relative to where Theremin Sprite is
  if($thereminPos.x>0 && !springMousePos){

        mousePos.set({
          x:$thereminPos.x + $thereminPos.width*.12,
          y:$thereminPos.y + $thereminPos.height*.7
        })

        springMousePos = spring(
        {
          x:$thereminPos.x + $thereminPos.width*.12,
          y:$thereminPos.y + $thereminPos.height*.7
        }, 
        {
          stiffness: 0.3,
          damping: 0.8
        }); 

        springLeftPos = spring(
        {
          x:$thereminPos.x + $thereminPos.width*.12,
          y:$thereminPos.y + $thereminPos.height*.7
        }, 
        {
          stiffness: 0.05,
          damping: 0.65
        }); 

        springRightPos = spring(
        {
          x:$thereminPos.x + $thereminPos.width*.88,
          y:$thereminPos.y + $thereminPos.height*.7
        }, 
        {
          stiffness: 0.05,
          damping: 0.65
        }); 

    } 
}



$: {
  //Handles toggling of gesture controls vs mouse controls
   if(springMousePos && springLeftPos && springRightPos){
      if($poseNetRes && $videoReady){

        emitter.emit = false

        if($poseNetRes[9].score > .3){
          emitterLeft.emit = true
          springLeftPos.set($poseNetRes[9].position)
          let xScaled = $springLeftPos.x/$videoReady.videoWidth * $WIDTH
          let yScaled = $springLeftPos.y/$videoReady.videoHeight * $HEIGHT
          emitterLeft.updateOwnerPos(xScaled, yScaled);
        }else{
          emitterLeft.emit = false
        }

        if($poseNetRes[10].score > .3){
          emitterRight.emit = true
          springRightPos.set($poseNetRes[10].position)
          let xScaled = $springRightPos.x/$videoReady.videoWidth * $WIDTH
          let yScaled = $springRightPos.y/$videoReady.videoHeight * $HEIGHT
          emitterRight.updateOwnerPos(xScaled, yScaled);
        }else{
          emitterRight.emit = false
        }
        
      }else{
        emitter.emit = true
        emitterRight.emit = false
        emitterLeft.emit = false
      }

      springMousePos.set($mousePos)
      emitter.updateOwnerPos($springMousePos.x, $springMousePos.y);
      cursorLight.position.set($springMousePos.x,$springMousePos.y)
      cursorLight.brightness = (.5+2*Math.min(Math.max($WIDTH/1200, 0), 1))
         
  }

}

stage.addChild(cursorLight,particleContainer)

</script>

<container bind:this={htmlCursor} style='opacity:{springMousePos ? 1 : 0};
  transform:translate({$mousePos.x-26}px, {$mousePos.y-26}px)'>
  <div>
    <span>2</span>
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
    border:2px transparent rgba(255,197,47,1);
    
    /* animation: pulse 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite */
  }
  span{
    position:absolute;
    transform:translate(18px,12px);
    font-size:48px;
    font-family: 'Whirlybats';
    color:#FFF5D0;
    opacity:0;
    text-align: center;
    text-shadow: 0 0 20px rgba(0,0,0,0.5);
    /* animation: animateGlyph 1s linear infinite;
    animation-play-state: start; */
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