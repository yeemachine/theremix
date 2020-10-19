<script>
  import { tweened } from "svelte/motion";
  import { onMount } from "svelte";
  import { backInOut, sineInOut } from "svelte/easing";
  import { constrain,getDistance } from "../../helpers.js";
  import {
    CANVASWIDTH,
    CANVASHEIGHT,
    WIDTH,
    SCALE,
    videoPos,
    videoReady,
    gestures,
    showGuides,
    modelLoaded,
    videoMask,
    poseNetRes,
    mouseOverride
  } from "../../stores.js";
  export let app = null;
  export let sheet = null;
  export let stage = null;
  export let createSprite = null;
  export let graphicsGroup = null;

  let pos = {x:0.5,y:0.5}
  let dragging = false
  let ratio = 1

  const sineInOut0_1 = tweened(0, {
    duration: 300,
    easing: sineInOut,
  });

  const guides1_0 = tweened(1, {
    duration: 700,
    easing: sineInOut,
  });

  const flash0_1 = tweened(0, {
    delay:300,
    duraton: 300,
    easing: sineInOut,
  });

  let graphics2 = new PIXI.Graphics();
  graphics2.parentGroup = graphicsGroup;
  graphics2.alpha = 0.7;

  let graphics2add = new PIXI.Graphics();
  graphics2add.parentGroup = graphicsGroup;
  graphics2add.alpha = 0.7;

  let maskGraphic = new PIXI.Graphics();
  maskGraphic.parentGroup = graphicsGroup;
  maskGraphic.lineStyle(0);
  $: maskGraphic.alpha = $sineInOut0_1;

  graphics2.mask = maskGraphic;
  graphics2add.mask = maskGraphic;


  const video = createSprite(
    sheet.textures["Video"],
    sheet.textures["Video-Normal"]
  );
  // video.children[0].alpha = 0;
  $: video.alpha = $sineInOut0_1;
  
  const guides = createSprite(sheet.textures["Guides"]);
  guides.parentGroup = graphicsGroup;
  guides.mask = maskGraphic

  var feedTexture = PIXI.Texture.from(document.querySelector("video"));
  feedTexture.rotate = 12;
  var feedSprite = new PIXI.Sprite(feedTexture);
  let colorMatrix = new PIXI.filters.ColorMatrixFilter();
  colorMatrix.desaturate();
  feedSprite.parentGroup = graphicsGroup;
  feedSprite.mask = maskGraphic
  feedSprite.filters = [colorMatrix];
  feedSprite.anchor.set(0.5,0.5);
  // feedSprite.alpha = .5;

  app.ticker.add(() => {
    if($videoReady){
      feedRatio = $videoReady.videoWidth/$videoReady.videoHeight
      ratio = feedSprite.width / $videoReady.videoWidth;

      if(feedRatio>1){
        feedSprite.height = video.height; 
        feedSprite.width = feedSprite.height*feedRatio
      }else{
        feedSprite.width = video.width
        feedSprite.height = feedSprite.width/feedRatio
      }
    }
    drawPose();
  });

  // let ratio = 1 / 1;
  // $: {
  //   if ($videoReady) {
  //     ratio = $videoReady.width / $videoReady.height;
  //   }
  // }

  stage.addChild(
    feedSprite,  
    graphics2,
    graphics2add,
    maskGraphic,
    guides
    );
  
  let feedRatio = 1

  $: {
    // video.width = $WIDTH > 600 ? 240 * $SCALE : 200 * $SCALE;
    video.width = $WIDTH > 600 ? Math.min($CANVASWIDTH,$CANVASHEIGHT) * .5 : Math.min($CANVASWIDTH,$CANVASHEIGHT) * .75;

    video.scale.y = video.scale.x;

    let margin = $WIDTH > 600 ? 24 : 16;
    // video.x = margin * $SCALE - video.width * 2 * (1 - $sineInOut0_1);
    // video.y = (margin * 2 + 48) * $SCALE;
    let distance = $WIDTH > 600 ? .4 : .3;
    video.x = $CANVASWIDTH/2 - video.width/2;
    video.y = $CANVASHEIGHT*distance - video.height/2;

    // feedSprite.scale.x = feedSprite.scale.y
    feedSprite.x = video.x + video.width / 2;
    feedSprite.y = video.y + video.height / 2;

    guides.height = video.height;
    guides.scale.x = guides.scale.y;
    guides.x = video.x
    guides.y = video.y
    guides.alpha = $guides1_0 * 1;

    videoPos.set({
      x: video.x,
      y: video.y,
      width: video.width,
      height: video.height,
    });

    maskGraphic.clear();
    maskGraphic.beginFill(0xffffff, 1);

    if ($videoReady) {
      

      let offset = {
        x: video.width * 0.08,
        y: video.height * 0.0335,
      };
      maskGraphic.drawRoundedRect(
        video.x + offset.x,
        video.y + offset.y + (video.height/2 - offset.y) * (1-$sineInOut0_1),
        (video.width - offset.x * 2),
        (video.height - offset.y * 2) * $sineInOut0_1,
        video.width * 0.125 * $sineInOut0_1
      );
      // maskGraphic.scale = {x:0.5,y:0.5}
    }

    if ($videoReady && $modelLoaded) {
      if ($sineInOut0_1 === 0) {
        sineInOut0_1.set(1);
      }
      if ($flash0_1 === 0) {
        flash0_1.set(1);
      }
    } else {
      if ($sineInOut0_1 === 1) {
        sineInOut0_1.set(0);
      }
      if ($flash0_1 === 1) {
        flash0_1.set(0);
      }
    }
  }

  $: {
    if (!$showGuides && $guides1_0 === 1) {
      guides.tint = 0x2cf27c;
      dataLayer.push({ event: "Pose-Registered" });
      setTimeout(() => {
        guides1_0.set(0);
      }, 1000);
    }
  }
  
  
  
  const drawPose = () => {
    if(!$videoReady){
      return
    }
    if ($poseNetRes) {
      mouseOverride.set($mouseOverride + 0.01);
      graphics2.clear();
      graphics2add.clear();
      
      graphics2.beginFill(0x222222, 0.7);
      graphics2.drawRect(0, 0, feedSprite.width, feedSprite.height);

      createPose($poseNetRes, graphics2);
      graphics2.x = feedSprite.x - feedSprite.width/2;
      graphics2.y = feedSprite.y - feedSprite.height/2;
    } else {
      graphics2.clear();
      graphics2add.clear();
    }
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
      if (i > -1) {
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
    graphics2add.x = graphics2.x + headPos.x;
    graphics2add.y = graphics2.y + headPos.y;
  };

  const createLine = (point1, point2, graphics) => {
    graphics.moveTo(point1.position.x * ratio, point1.position.y * ratio);
    graphics.lineTo(point2.position.x * ratio, point2.position.y * ratio);
  };
</script>
