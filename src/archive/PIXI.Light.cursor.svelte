<script>
  import {
    hovered,
    glide,
    thereminPos,
    thereminMobilePos,
    canvasMousePos,
    mousePos,
    poseNetRes,
    CANVASWIDTH,
    WIDTH,
    CANVASHEIGHT,
    videoReady,
    SCALE,
    dragged,
    audioControls,
    mouseOverride,
    gestures,
    manual,
    showGuides,
  } from "../../stores.js";
  import { constrain } from "../../helpers.js";
  import { tweened, spring } from "svelte/motion";
  import { backOut } from "svelte/easing";
  import { posenetOptions } from "../../config.js";
  import { get } from "svelte/store";


  export let stage = null;
  export let app = null;
  export let createGradientTexture = null;

  //Initialize Mouse Pos
  canvasMousePos.set({
    x:
      $WIDTH > 600
        ? $thereminPos.x + $thereminPos.width * 0.12
        : $thereminPos.x + $thereminPos.width * 0.12,
    y:
      $WIDTH > 600
        ? $thereminPos.y + $thereminPos.height * 0.7
        : $thereminPos.y + $thereminPos.height * 0.7,
  });

  let htmlCursor;
  const cursorLight = new PIXI.lights.PointLight(0xff7f00, 2);
  cursorLight.falloff = [0.75, 3, 10];

  const gradientTexture = createGradientTexture(0, 12, $SCALE);
  const gradientTexture2 = createGradientTexture(0, 24, $SCALE);

  const particleContainer = new PIXI.particles.ParticleContainer(2000, {
    scale: true,
    position: true,
    rotation: false,
    uvs: false,
    tint: true,
  });
  const emitter = new PIXI.particles.Emitter(
    particleContainer,
    [gradientTexture],
    {
      autoUpdate: true,
      emit: false,
      alpha: {
        start: 0.8,
        end: 0.1,
      },
      scale: {
        start: 1,
        end: 0.2,
        minimumScaleMultiplier: 1,
      },
      color: {
        start: "#FFFF33",
        end: "#ff7f00",
      },
      speed: {
        start: 0,
        end: 0,
        minimumSpeedMultiplier: 1,
      },
      acceleration: {
        x: 0,
        y: 0,
      },
      maxSpeed: 0,
      startRotation: {
        min: 0,
        max: 0,
      },
      noRotation: true,
      rotationSpeed: {
        min: 0,
        max: 0,
      },
      lifetime: {
        min: 0.3,
        max: 0.3,
      },
      blendMode: "normal",
      frequency: 0.0008,
      emitterLifetime: -1,
      maxParticles: 400,
      pos: { x: 0, y: 0 },
      addAtBack: false,
      spawnType: "point",
    }
  );

  const emitterRight = new PIXI.particles.Emitter(
    particleContainer,
    [gradientTexture2],
    {
      autoUpdate: true,
      emit: false,
      alpha: {
        start: 0.8,
        end: 0.15,
      },
      scale: {
        start: 1,
        end: 0.2,
        minimumScaleMultiplier: 1,
      },
      color: {
        start: "#FFFF33",
        end: "#8D1A6D",
      },
      speed: {
        start: 0,
        end: 0,
        minimumSpeedMultiplier: 1,
      },
      acceleration: {
        x: 0,
        y: 0,
      },
      maxSpeed: 0,
      startRotation: {
        min: 0,
        max: 0,
      },
      noRotation: true,
      rotationSpeed: {
        min: 0,
        max: 0,
      },
      lifetime: {
        min: 0.3,
        max: 0.3,
      },
      blendMode: "normal",
      frequency: 0.0008,
      emitterLifetime: -1,
      maxParticles: 400,
      pos: { x: 0, y: 0 },
      addAtBack: false,
      spawnType: "point",
    }
  );

  const emitterLeft = new PIXI.particles.Emitter(
    particleContainer,
    [gradientTexture2],
    {
      autoUpdate: true,
      emit: false,
      alpha: {
        start: 0.8,
        end: 0.15,
      },
      scale: {
        start: 1,
        end: 0.2,
        minimumScaleMultiplier: 1,
      },
      color: {
        start: "#FFFF33",
        end: "#8D1A6D",
      },
      speed: {
        start: 0,
        end: 0,
        minimumSpeedMultiplier: 1,
      },
      acceleration: {
        x: 0,
        y: 0,
      },
      maxSpeed: 0,
      startRotation: {
        min: 0,
        max: 0,
      },
      noRotation: true,
      rotationSpeed: {
        min: 0,
        max: 0,
      },
      lifetime: {
        min: 0.3,
        max: 0.3,
      },
      blendMode: "normal",
      frequency: 0.0008,
      emitterLifetime: -1,
      maxParticles: 400,
      pos: { x: 0, y: 0 },
      addAtBack: false,
      spawnType: "point",
    }
  );

  let springLeftPos = spring(
    {
      x:
        $WIDTH > 600
          ? $thereminPos.x + $thereminPos.width * 0.12
          : $CANVASWIDTH * 0.7,
      y:
        $WIDTH > 600
          ? $thereminPos.y + $thereminPos.height * 0.7
          : $CANVASHEIGHT * 0.1,
    },
    {
      stiffness: 0.3,
      damping: 0.8,
    }
  );

  let springRightPos = spring(
    {
      x: $thereminPos.x + $thereminPos.width * 0.88,
      y: $thereminPos.y + $thereminPos.height * 0.7,
    },
    {
      stiffness: 0.3,
      damping: 0.8,
    }
  );

  let gesturesCounter = 0;
  
  
  const handlePoseNetTracking = () => {
    
  }
  
//   $: {
//     //Handles toggling of gesture controls vs mouse controls

//     if ($poseNetRes && $videoReady && $mouseOverride > 0.1) {
//       let leftWrist = {
//         pose: $poseNetRes[9],
//         x: 0,
//         y: 0,
//       };
//       let rightWrist = {
//         pose: $poseNetRes[10],
//         x: 0,
//         y: 0,
//       };
//       emitter.emit = false;
//       gestures.set(true);

//       if (rightWrist.pose.score > posenetOptions.minPartConfidence) {
//         if ($WIDTH > 600) {
//           //Don't Interpolate on mobile
//           springRightPos.set(rightWrist.pose.position);
//         }
//         rightWrist.x =
//           $WIDTH > 600
//             ? ($springRightPos.x / $videoReady.videoWidth) * $CANVASWIDTH
//             : (rightWrist.pose.position.x / $videoReady.videoWidth) *
//               $CANVASWIDTH;
//         rightWrist.y =
//           $WIDTH > 600
//             ? ($springRightPos.y / $videoReady.videoHeight) * $CANVASHEIGHT
//             : (rightWrist.pose.position.y / $videoReady.videoHeight) *
//               $thereminMobilePos.y;
//         rightWrist.audioX = constrain(
//           (rightWrist.x - $thereminPos.x) / $thereminPos.width,
//           { min: 0, max: 1 }
//         );
//         rightWrist.audioY = constrain(
//           rightWrist.y / ($thereminPos.y + $thereminPos.height),
//           { min: 0, max: 1 }
//         );
//         emitterRight.updateOwnerPos(rightWrist.x, rightWrist.y);
//       }

//       if (leftWrist.pose.score > posenetOptions.minPartConfidence) {
//         if ($WIDTH > 600) {
//           //Don't Interpolate on mobile
//           springLeftPos.set(leftWrist.pose.position);
//         }
//         leftWrist.x =
//           $WIDTH > 600
//             ? ($springLeftPos.x / $videoReady.videoWidth) * $CANVASWIDTH
//             : (leftWrist.pose.position.x / $videoReady.videoWidth) *
//               $CANVASWIDTH;
//         leftWrist.y =
//           $WIDTH > 600
//             ? ($springLeftPos.y / $videoReady.videoHeight) * $CANVASHEIGHT
//             : (leftWrist.pose.position.y / $videoReady.videoHeight) *
//               $thereminMobilePos.y;
//         leftWrist.audioX = constrain(
//           (leftWrist.x - $thereminPos.x) / $thereminPos.width,
//           { min: 0, max: 1 }
//         );
//         leftWrist.audioY = constrain(
//           leftWrist.y / ($thereminPos.y + $thereminPos.height),
//           { min: 0, max: 1 }
//         );
//         emitterLeft.updateOwnerPos(leftWrist.x, leftWrist.y);
//       }

//       if (
//         leftWrist.pose.score > posenetOptions.minPartConfidence &&
//         rightWrist.pose.score > posenetOptions.minPartConfidence
//       ) {
//         //both hands
//         emitterRight.emit = true;
//         emitterLeft.emit = true;
//         audioControls.set({
//           x: rightWrist.audioX,
//           y: leftWrist.audioY,
//         });
//         gesturesCounter += gesturesCounter < 1 ? 0.01 : 0;
//       } else if (leftWrist.pose.score > rightWrist.pose.score) {
//         //left hand
//         emitterRight.emit = false;
//         if (leftWrist.pose.score > posenetOptions.minPartConfidence) {
//           emitterLeft.emit = true;
//           audioControls.set({
//             x: leftWrist.audioX,
//             y: leftWrist.audioY,
//           });
//           gesturesCounter += gesturesCounter < 1 ? 0.01 : 0;
//         }
//       } else if (leftWrist.pose.score < rightWrist.pose.score) {
//         //right hand
//         if (rightWrist.pose.score > posenetOptions.minPartConfidence) {
//           emitterRight.emit = true;
//           audioControls.set({
//             x: rightWrist.audioX,
//             y: rightWrist.audioY,
//           });
//           gesturesCounter += gesturesCounter < 1 ? 0.01 : 0;
//         }
//         emitterLeft.emit = false;
//       } else {
//         //no hands
//         emitterRight.emit = false;
//         emitterLeft.emit = false;
//         gesturesCounter -= gesturesCounter >= 0 ? 0.01 : 0;
//       }
//     } else {
//       //cursor 
//       emitter.emit = true;
//       emitterRight.emit = false;
//       emitterLeft.emit = false;
//       gestures.set(false);

//       cursorLight.brightness = 2 * constrain(2 - $SCALE, { max: 1, min: 0.5 });
//       if (
//         ($canvasMousePos.y > $thereminMobilePos.y && $WIDTH < 600) ||
//         $dragged
//       ) {
//       } else {
//         emitter.updateOwnerPos($canvasMousePos.x, $canvasMousePos.y);
//         cursorLight.position.set($canvasMousePos.x, $canvasMousePos.y);
//         audioControls.set({
//           x: constrain(
//             ($canvasMousePos.x - $thereminPos.x) / $thereminPos.width,
//             { min: 0, max: 1 }
//           ),
//           y: constrain(
//             $canvasMousePos.y / ($thereminPos.y + $thereminPos.height),
//             { min: 0, max: 1 }
//           ),
//         });
//       }
//     }
    
    

//     if ($manual) {
//       emitter.emit = false;
//       emitterRight.emit = false;
//       emitterLeft.emit = false;
//     }
//   }

  stage.addChild(cursorLight, particleContainer);
  
  
  app.ticker.add(()=>{
    if (get(poseNetRes) && get(videoReady) && get(mouseOverride) > 0.1) {
      let leftWrist = {
        pose: get(poseNetRes)[9],
        x: 0,
        y: 0,
      };
      let rightWrist = {
        pose: get(poseNetRes)[10],
        x: 0,
        y: 0,
      };
      emitter.emit = false;
      gestures.set(true);

      if (rightWrist.pose.score > posenetOptions.minPartConfidence) {
        if (get(WIDTH) > 600) {
          //Don't Interpolate on mobile
          springRightPos.set(rightWrist.pose.position);
        }
        rightWrist.x =
          get(WIDTH) > 600
            ? (get(springRightPos).x / get(videoReady).videoWidth) * get(CANVASWIDTH)
            : (rightWrist.pose.position.x / get(videoReady).videoWidth) *
              get(CANVASWIDTH);
        rightWrist.y =
          get(WIDTH) > 600
            ? (get(springRightPos).y / get(videoReady).videoHeight) * $CANVASHEIGHT
            : (rightWrist.pose.position.y / get(videoReady).videoHeight) *
              get(thereminMobilePos).y;
        rightWrist.audioX = constrain(
          (rightWrist.x - get(thereminPos).x) / get(thereminPos).width,
          { min: 0, max: 1 }
        );
        rightWrist.audioY = constrain(
          rightWrist.y / (get(thereminPos).y + get(thereminPos).height),
          { min: 0, max: 1 }
        );
        emitterRight.updateOwnerPos(rightWrist.x, rightWrist.y);
      }

      if (leftWrist.pose.score > posenetOptions.minPartConfidence) {
        if (get(WIDTH) > 600) {
          //Don't Interpolate on mobile
          springLeftPos.set(leftWrist.pose.position);
        }
        leftWrist.x =
          get(WIDTH) > 600
            ? (get(springLeftPos).x / get(videoReady).videoWidth) * get(CANVASWIDTH)
            : (leftWrist.pose.position.x / get(videoReady).videoWidth) *
              get(CANVASWIDTH);
        leftWrist.y =
          get(WIDTH) > 600
            ? (get(springLeftPos).y / get(videoReady).videoHeight) * $CANVASHEIGHT
            : (leftWrist.pose.position.y / get(videoReady).videoHeight) *
              get(thereminMobilePos).y;
        leftWrist.audioX = constrain(
          (leftWrist.x - get(thereminPos).x) / get(thereminPos).width,
          { min: 0, max: 1 }
        );
        leftWrist.audioY = constrain(
          leftWrist.y / (get(thereminPos).y + get(thereminPos).height),
          { min: 0, max: 1 }
        );
        emitterLeft.updateOwnerPos(leftWrist.x, leftWrist.y);
      }

      if (
        leftWrist.pose.score > posenetOptions.minPartConfidence &&
        rightWrist.pose.score > posenetOptions.minPartConfidence
      ) {
        //both hands
        emitterRight.emit = true;
        emitterLeft.emit = true;
        audioControls.set({
          x: rightWrist.audioX,
          y: leftWrist.audioY,
        });
        gesturesCounter += gesturesCounter < 1 ? 0.01 : 0;
      } else if (leftWrist.pose.score > rightWrist.pose.score) {
        //left hand
        emitterRight.emit = false;
        if (leftWrist.pose.score > posenetOptions.minPartConfidence) {
          emitterLeft.emit = true;
          audioControls.set({
            x: leftWrist.audioX,
            y: leftWrist.audioY,
          });
          gesturesCounter += gesturesCounter < 1 ? 0.01 : 0;
        }
      } else if (leftWrist.pose.score < rightWrist.pose.score) {
        //right hand
        if (rightWrist.pose.score > posenetOptions.minPartConfidence) {
          emitterRight.emit = true;
          audioControls.set({
            x: rightWrist.audioX,
            y: rightWrist.audioY,
          });
          gesturesCounter += gesturesCounter < 1 ? 0.01 : 0;
        }
        emitterLeft.emit = false;
      } else {
        //no hands
        emitterRight.emit = false;
        emitterLeft.emit = false;
        gesturesCounter -= gesturesCounter >= 0 ? 0.01 : 0;
      }
    } else {
      //cursor 
      emitter.emit = true;
      emitterRight.emit = false;
      emitterLeft.emit = false;
      gestures.set(false);

      cursorLight.brightness = 2 * constrain(2 - get(SCALE), { max: 1, min: 0.5 });
      if (
        (get(canvasMousePos).y > get(thereminMobilePos).y && get(WIDTH) < 600) ||
        get(dragged)
      ) {
      } else {
        emitter.updateOwnerPos(get(canvasMousePos).x, get(canvasMousePos).y);
        cursorLight.position.set(get(canvasMousePos).x, get(canvasMousePos).y);
        audioControls.set({
          x: constrain(
            (get(canvasMousePos).x - get(thereminPos).x) / get(thereminPos).width,
            { min: 0, max: 1 }
          ),
          y: constrain(
            get(canvasMousePos).y / (get(thereminPos).y + get(thereminPos).height),
            { min: 0, max: 1 }
          ),
        });
      }
    } 

    if (get(manual)) {
      emitter.emit = false;
      emitterRight.emit = false;
      emitterLeft.emit = false;
    }
    
  })

  $: {
    if ($showGuides && gesturesCounter > 1) {
      showGuides.set(false);
    }
  }
</script>

<container
  bind:this="{htmlCursor}"
  class="{($hovered==='knob right' || $hovered==='knob left' || $hovered==='switch') ? 'hovered' : ''}"
  style="opacity:{mousePos ? 1 : 0};
  transform:translate({$mousePos.x - 26}px, {$mousePos.y - 26}px)"
>
  <div>
    <span
    >{$hovered === 'switch' && !$glide ? 'Enable Glide (G)' : $hovered === 'switch' && $glide ? 'Disable Glide (G)' : $hovered === 'knob left' ? 'Adjust Volume' : $hovered === 'knob right' ? 'Change Oscillator (O)' : ''}</span>
  </div>
</container>

<style>
  container {
    top: 0;
    left: 0;
    position: fixed;
    width: 48px;
    height: 48px;
    z-index: 2;
    pointer-events: none;
  }
  div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform-origin: center;
    border: 2px transparent;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    position: absolute;
    top: -32px;
    width: max-content;
    line-break: normal;
    font-size: 14px;
    font-family: "Nicholson Beta";
    background: rgb(var(--offwhite));
    padding: 6px 12px 6px 12px;
    border-radius: 16px;
    color: black;
    opacity: 0;
    text-align: center;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transition: 0s;
    display: flex;
    justify-content: center;
  }
  span:before {
    content: "";
    position: absolute;
    bottom: -6px;
    margin: auto;
    pointer-events: none;
    border-style: solid;
    border-width: 6px 4px 0px 4px;
    border-color: rgb(var(--offwhite)) transparent transparent transparent;
  }
  .hovered span {
    opacity: 1;
  }
  @media (hover: none) {
    div {
      opacity: 0;
    }
  }
</style>
