<script>
  import {
    videoReady,
    active,
    thereminPos,
    thereminMobilePos,
    poseNetRes,
    videoPos,
    WIDTH,
    toneOutput,
    bgPos,
    analyser,
    mouseOverride,
    gestures,
    enableMIDI,
    MIDITextSprite,
    videoMask,
  } from "../../stores.js";
  import { tweened } from "svelte/motion";
  import { constrain, getDistance } from "../../helpers.js";
  import { sineInOut } from "svelte/easing";

  export let app = null;
  export let stage = null;
  export let graphicsGroup = null;

  let ratio = 0;
  const sineInOut0_1 = tweened(0, {
    duration: 1000,
    easing: sineInOut,
  });
  const hideLights0_1 = tweened(1, {
    duration: 1000,
    easing: sineInOut,
  });

  let graphics = new PIXI.Graphics();
  graphics.parentGroup = graphicsGroup;
  graphics.alpha = 0.7;

  let bgGraphics = new PIXI.Graphics();
  bgGraphics.parentGroup = PIXI.lights.diffuseGroup;
  bgGraphics.alpha = 0.7;

  let graphics2 = new PIXI.Graphics();
  graphics2.parentGroup = graphicsGroup;
  graphics2.alpha = 0.7;

  let graphics2add = new PIXI.Graphics();
  graphics2add.parentGroup = graphicsGroup;
  graphics2add.alpha = 0.7;

  let maskGraphic = new PIXI.Graphics();
  maskGraphic.parentGroup = graphicsGroup;
  maskGraphic.lineStyle(0);
  videoMask.set(maskGraphic);

  graphics2.mask = maskGraphic;
  graphics2add.mask = maskGraphic;

  let graphics3 = new PIXI.Graphics();
  graphics3.parentGroup = PIXI.lights.diffuseGroup;

  stage.addChild(
    graphics,
    bgGraphics,
    graphics2,
    graphics2add,
    maskGraphic,
    graphics3
  );

  const createAudioPoints = (baseValues) => {
    let newArr = [];
    for (let i = 0; i < baseValues.length; i++) {
      const amplitude = baseValues[i];
      const x =
        $WIDTH > 600
          ? (($thereminPos.width * 0.2495) / (baseValues.length - 1)) * i
          : (($thereminMobilePos.width * 0.87) / (baseValues.length - 1)) * i;
      const y =
        $WIDTH > 600
          ? amplitude * $thereminPos.height * 0.04
          : amplitude * $thereminMobilePos.height * 0.15;
      newArr.push({ x: x, y: y });
    }
    return newArr;
  };

  let headPos = {
    rotation: 0,
    x: 0,
    y: 0,
  };
  const createPose = (pose, graphics) => {
    graphics2.lineStyle(2, 0xe54646);

    //Torso
    createLine(pose[5], pose[6], graphics2);
    createLine(pose[11], pose[12], graphics2);
    createLine(pose[6], pose[12], graphics2);
    createLine(pose[5], pose[11], graphics2);

    createLine(pose[5], pose[7], graphics2);
    createLine(pose[7], pose[9], graphics2);
    createLine(pose[6], pose[8], graphics2);
    createLine(pose[8], pose[10], graphics2);

    // Legs
    createLine(pose[11], pose[13], graphics2);
    createLine(pose[13], pose[15], graphics2);
    createLine(pose[12], pose[14], graphics2);
    createLine(pose[14], pose[16], graphics2);

    //Keypoints
    pose.forEach((e, i) => {
      if (i > 4) {
        let color = i === 9 || i === 10 ? 0xe54646 : 0xe54646;
        let opacity = i === 9 || i === 10 ? 0.85 : 0.3;
        let size =
          i === 9 || i === 10
            ? constrain(
                getDistance(pose[5].position, pose[6].position) * ratio * 0.15,
                { max: 40, min: 16 }
              )
            : 8;
        graphics2.beginFill(color, opacity);
        graphics2.lineStyle(0);
        if (e.score > 0.3) {
          graphics2.drawCircle(
            e.position.x * ratio,
            e.position.y * ratio,
            size
          );
        }
      }
    });

    //Head
    graphics2add.beginFill(0xe54646, 0.3);
    graphics2add.drawEllipse(
      0,
      0,
      Math.abs(pose[5].position.x - pose[6].position.x) * ratio * 0.35,
      Math.abs(pose[5].position.x - pose[6].position.x) * ratio * 0.45
    );
    (headPos.x = pose[0].position.x * ratio),
      (headPos.y = ((pose[0].position.y + pose[1].position.y) / 2) * ratio);
    headPos.rotation =
      (pose[1].position.y - pose[2].position.y) /
      (pose[1].position.x - pose[2].position.x);
    graphics2add.rotation = headPos.rotation;
    graphics2add.x = $videoPos.x + headPos.x;
    graphics2add.y = $videoPos.y + headPos.y;
  };

  const createLine = (point1, point2, graphics) => {
    graphics.moveTo(point1.position.x * ratio, point1.position.y * ratio);
    graphics.lineTo(point2.position.x * ratio, point2.position.y * ratio);
  };
  let bgLights = [
    {
      x: 0.398,
      y: 0.205,
      r: 0.0025,
      color: 0xe54646,
      speed: 5,
      step: 0.4,
      pause: true,
    },
    {
      x: 0.359,
      y: 0.205,
      r: 0.0025,
      color: 0xe54646,
      speed: 2,
      step: 0.4,
      pause: false,
    },
    {
      x: 0.24,
      y: 0.577,
      w: 0.00525,
      color: 0xffff33,
      speed: 2,
      step: 0.2,
      pause: false,
    },
    {
      x: 0.14,
      y: 0.377,
      w: 0.0025,
      color: 0xffffff,
      speed: 2,
      step: 0.5,
      pause: true,
    },
    {
      x: 0.759,
      y: 0.3005,
      r: 0.00125,
      color: 0xffffff,
      speed: 1,
      step: 0.4,
      pause: false,
    },
    {
      x: 0.959,
      y: 0.5115,
      r: 0.00125,
      color: 0xffffff,
      speed: 1,
      step: 0.7,
      pause: false,
    },
    {
      x: 0.899,
      y: 0.6215,
      r: 0.00125,
      color: 0xffffff,
      speed: 1,
      step: 0.9,
      pause: false,
    },
    {
      x: 0.545,
      y: 0.541,
      r: 0.00125,
      color: 0xabf3fd,
      speed: 2,
      step: 0.1,
      pause: true,
    },
    {
      x: 0.545,
      y: 0.559,
      r: 0.00125,
      color: 0xabf3fd,
      speed: 2,
      step: 0.4,
      pause: true,
    },
    {
      x: 0.545,
      y: 0.577,
      r: 0.00125,
      color: 0xabf3fd,
      speed: 2,
      step: 0.7,
      pause: true,
    },
  ];

  let audioArr = [0, 0];
  let TIME = 0;
  var before;
  var delay = 1000 / 24;

  const drawAudio = (now = performance.now()) => {
    if (!before) before = now;

    if (now - before > delay) {
      //Draw Audio Analyser 24 FPS
      if ($analyser) {
        audioArr = createAudioPoints($analyser.getValue());
        graphics.clear();
        graphics.lineStyle(2, 0xe54646);
        graphics.lineAlpha =
          !$active && $WIDTH > 600 ? Math.abs(Math.sin(TIME * 5)) : 1;
        if (audioArr) {
          audioArr.forEach((e, i) => {
            if (i === 0) {
              graphics.moveTo(e.x, e.y);
            }
            graphics.lineTo(e.x, e.y);
          });
        }
      }

      before = now;
    }
  };

  const drawPose = () => {
    if ($poseNetRes && $videoReady) {
      mouseOverride.set($mouseOverride + 0.01);
      graphics2.clear();
      graphics2add.clear();
      ratio = ($videoPos.width * 0.99) / $videoReady.videoWidth;
      createPose($poseNetRes, graphics2);
      graphics2.x = $videoPos.x;
      graphics2.y = $videoPos.y;
    } else {
      graphics2.clear();
      graphics2add.clear();
    }
  };

  const drawLights = () => {
    if ($bgPos) {
      bgGraphics.clear();
      bgLights.forEach((e, i) => {
        let opacity = e.pause
          ? constrain(Math.sin(TIME * e.speed), { min: 0, max: 1 })
          : Math.abs(Math.sin(TIME * e.speed));
        let opacityStepped = opacity > e.step ? 0.7 : 0;

        bgGraphics.beginFill(e.color, opacityStepped * $hideLights0_1);

        if (e.r) {
          bgGraphics.drawEllipse(
            $bgPos.x + $bgPos.width * e.x,
            $bgPos.y + $bgPos.height * e.y,
            $bgPos.width * e.r,
            $bgPos.width * e.r
          );
        }
        if (e.w) {
          bgGraphics.drawRoundedRect(
            $bgPos.x + $bgPos.width * e.x,
            $bgPos.y + $bgPos.height * e.y,
            $bgPos.width * e.w,
            $bgPos.width * e.w,
            $bgPos.width * e.w * 0.3
          );
        }
      });
    }
  };

  const drawGuides = () => {
    if (!$toneOutput) {
      return;
    } else {
      graphics3.clear();
      if (!$toneOutput.glide) {
        for (let i = 0; i < $toneOutput.total + 1; i++) {
          graphics3.lineStyle(2, 0xffffff);
          graphics3.moveTo(
            $thereminPos.x + ($thereminPos.width * i) / $toneOutput.total,
            0
          );
          graphics3.lineTo(
            $thereminPos.x + ($thereminPos.width * i) / $toneOutput.total,
            $thereminPos.y + $thereminPos.height
          );
        }
        let currentColor = $gestures ? 0xff5555 : 0xffff33;
        graphics3.lineStyle(2, currentColor);
        graphics3.beginFill(currentColor, 1);

        if ($enableMIDI) {
          graphics3.drawRect(
            $thereminPos.x +
              ($thereminPos.width * $toneOutput.index.x) / $toneOutput.total,
            (($thereminPos.y + $thereminPos.height) * $toneOutput.index.y) /
              $toneOutput.total,
            $thereminPos.width / $toneOutput.total,
            ($thereminPos.y + $thereminPos.height) / $toneOutput.total
          );
        } else {
          graphics3.drawRect(
            $thereminPos.x +
              ($thereminPos.width * $toneOutput.index.x) / $toneOutput.total,
            0,
            $thereminPos.width / $toneOutput.total,
            $thereminPos.y + $thereminPos.height
          );
        }
      }
    }
  };

  app.ticker.add(() => {
    drawAudio();
    drawGuides();
    drawLights();
    drawPose();
    TIME += 0.01;
  });

  $: {
    graphics.x =
      $WIDTH > 600
        ? $thereminPos.x + $thereminPos.width * 0.379
        : $thereminMobilePos.x + $thereminMobilePos.width * 0.065;
    graphics.y =
      $WIDTH > 600
        ? $thereminPos.y + $thereminPos.height * 0.852
        : $thereminMobilePos.y + $thereminMobilePos.height * 0.71 + 0;

    graphics2.x = $videoPos.x;
    graphics2.y = $videoPos.y;

    maskGraphic.clear();
    maskGraphic.beginFill(0xffffff, 1);

    graphics3.x = 0;
    graphics3.y = 0;
    graphics3.alpha = 0.3 * $sineInOut0_1;

    if ($videoReady) {
      let offset = {
        x: $videoPos.width * 0.08,
        y: $videoPos.width * 0.035,
      };
      maskGraphic.drawRoundedRect(
        $videoPos.x + offset.x,
        $videoPos.y + offset.y,
        $videoPos.width - offset.x * 2,
        $videoPos.height - offset.y * 2,
        $videoPos.width * 0.25
      );
    }

    if ($active && $sineInOut0_1 === 0) {
      sineInOut0_1.set(1);
    }
    if (!$active && $sineInOut0_1 === 1) {
      sineInOut0_1.set(0);
    }
  }

  $: {
    if ($enableMIDI) {
      if ($hideLights0_1 === 1) {
        hideLights0_1.set(0);
      }
    } else {
      if ($hideLights0_1 === 0) {
        hideLights0_1.set(1);
      }
    }
  }
</script>
