<script>
  import { fade,fly } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut,sineInOut } from "svelte/easing";
  import { constrain, getDistance, getTween,flyRotate } from "../../helpers.js";
  import posenetGlyph from '../icons/posenet.svelte';
  import handsGlyph from '../icons/hands.svelte';
  
  import {
    CANVASWIDTH,
    CANVASHEIGHT,
    WIDTH,
    HEIGHT,
    SCALE,
    videoReady,
    showGuides,
    modelLoaded,
    poseNetRes,
    handPoseRes,
    mouseOverride,
    hovered,
    dragged,
    globalPointerUp,
    showVideo,
    PoseFTUE,
    isSafari,
    allowHolistic
  } from "../../stores.js";
  export let app = null;
  export let sheet = null;
  export let stage = null;
  export let createSprite = null;
  export let graphicsGroup = null;

  let pos = { x: 0.5, y: 0.5 };
  let locked = true;
  let dragging = false;
  $:{if(!$videoReady) {dragging = false}}
  let firstDrag = false;
  let ratio = 1;
  let feedRatio = 1;
  let feedOffsetX = 0
  let feedOffsetY = 0
  let graphicsColor = 0xffffff
  $: graphicsColor = $showGuides ? 0xe54646 : 0xe54646; 
  //global video sprite setting
  //x and y coordinates are percentage of canvas size
  let videoContainer = {
    x: 0.5,
    y: 0.5,
    w: 250,
    h: 225,
    maxW:250,
    maxH:225,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
  };
  $:{
    videoContainer.maxW =
      $WIDTH > 600
        ? Math.min($CANVASWIDTH, $CANVASHEIGHT) * 0.5
        : Math.min($CANVASWIDTH, $CANVASHEIGHT) * 0.8;
    videoContainer.maxH = videoContainer.maxW * 0.9;
    videoContainer.w = getTween(videoContainer.maxW, $WIDTH > 600 ? 350 : 250, $slide0_1);
    videoContainer.h = getTween(videoContainer.maxH, ($WIDTH > 600 ? 350 : 250) * 0.9, $slide0_1);

    let marginTop = $WIDTH > 600 ? 24 * $SCALE : 16 * $SCALE;
    let marginBottom = $WIDTH > 600 ? 24 * $SCALE : 16 * $SCALE;
    let marginLeft = $WIDTH > 600 ? 24 * $SCALE : 16 * $SCALE;
    videoContainer.minX = (marginLeft + videoContainer.w / 2) / $CANVASWIDTH;
    videoContainer.maxX =
      ($CANVASWIDTH - marginLeft - videoContainer.w / 2) / $CANVASWIDTH;
    videoContainer.minY = (marginTop + videoContainer.h / 2) / $CANVASHEIGHT;
    videoContainer.maxY =
      ($CANVASHEIGHT - marginBottom - videoContainer.h / 2) / $CANVASHEIGHT;

    if (!firstDrag) {
      videoContainer.x = getTween(0.5, videoContainer.minX, $slide0_1);
      videoContainer.y = getTween(0.44, videoContainer.minY, $slide0_1);
    }
  }

  const sineInOut0_1 = tweened(0, {
    duration: 300,
    easing: sineInOut
  });

  const guides1_0 = tweened(1, {
    duration: 300,
    easing: sineInOut
  });

  const slide0_1 = tweened(0, {
    duration: 400,
    easing: sineInOut
  });

  const flash0_1 = tweened(0, {
    delay: 300,
    duraton: 300,
    easing: sineInOut
  });

  let maskGraphic = new PIXI.Graphics();
  maskGraphic.lineStyle(0);
  $: maskGraphic.interactive = $videoReady && !locked ? true : false;
  $: maskGraphic.alpha = $sineInOut0_1;
  maskGraphic.on("pointerdown", () => {
    firstDrag = true;
    dragging = true;
    dragged.set({
      element: maskGraphic,
      id: "video"
    });
    globalPointerUp.set(false);
  });
  maskGraphic.on("pointerup", () => {
    dragging = false;
  });
  maskGraphic.on("pointermove", e => {
    if (dragging) {
      let x = e.data.global.x / $CANVASWIDTH;
      let y = e.data.global.y / $CANVASHEIGHT;
      videoContainer.x =
        x > videoContainer.maxX
          ? videoContainer.maxX
          : x < videoContainer.minX
          ? videoContainer.minX
          : x;
      videoContainer.y =
        y > videoContainer.maxY
          ? videoContainer.maxY
          : y < videoContainer.minY
          ? videoContainer.minY
          : y;
    }
  });
  maskGraphic.on("mouseover", () => {
    hovered.set("video");
    maskGraphic.tint = 0x999999;
  });
  maskGraphic.on("mouseout", () => {
    hovered.set(null);
    maskGraphic.tint = 0xffffff;
  });
  $:{
    let blinkY = (videoContainer.h / 2) * (1 - $sineInOut0_1);

    maskGraphic.clear();
    maskGraphic.beginFill(0xffffff, 1);
    maskGraphic.drawRoundedRect(
      0,
      blinkY,
      videoContainer.w,
      videoContainer.h * $sineInOut0_1,
      videoContainer.w * 0.125 * $sineInOut0_1
    );
    maskGraphic.x = videoContainer.x * $CANVASWIDTH - videoContainer.w / 2;
    maskGraphic.y = videoContainer.y * $CANVASHEIGHT - videoContainer.h / 2;
  }

  let graphicsPose = new PIXI.Graphics();
  graphicsPose.alpha = 1;
  graphicsPose.mask = maskGraphic;

  let graphicsHead = new PIXI.Graphics();
  graphicsHead.alpha = 1;
  graphicsHead.mask = maskGraphic;

  let graphicsScrim = new PIXI.Graphics();
  graphicsScrim.mask = maskGraphic;
  // graphicsScrim.blendMode = PIXI.BLEND_MODES.SCREEN
  graphicsScrim.alpha = .6
  // $:{
  //   graphicsScrim.alpha = .6+.25*($slide0_1)
  // }
  $:{
    graphicsScrim.clear();
    graphicsScrim.beginFill(0x4a4343, 1);
    graphicsScrim.drawRect(
      0,
      0,
      videoContainer.w,
      videoContainer.h
    );
    graphicsScrim.x = videoContainer.x * $CANVASWIDTH - videoContainer.w / 2
    graphicsScrim.y = videoContainer.y * $CANVASHEIGHT - videoContainer.h / 2
  }

  let graphicsDimmer = new PIXI.Graphics();
  $:{
    graphicsDimmer.alpha = .9*$sineInOut0_1 * (1-$slide0_1)
  }
  $:{
    graphicsDimmer.clear();
    graphicsDimmer.beginFill(0x000000, 1);
    graphicsDimmer.drawRect(
      0,
      0,
      $CANVASWIDTH,
      $CANVASHEIGHT
    );
  }

  const guides = createSprite(sheet.textures["Guides"]);
  guides.mask = maskGraphic;
  guides.anchor.set(0.5, 0.5);
  $:{
    guides.height = videoContainer.h;
    guides.scale.x = guides.scale.y;
    guides.x = videoContainer.x * $CANVASWIDTH;
    guides.y = videoContainer.y * $CANVASHEIGHT;
    guides.alpha = $guides1_0 * ($PoseFTUE && !isSafari ? 0 : 1);
  }

  var feedTexture = PIXI.Texture.from(document.querySelector("video"));
  feedTexture.rotate = 12;
  var feedSprite = new PIXI.Sprite(feedTexture);
  let colorMatrix = new PIXI.filters.ColorMatrixFilter();
  colorMatrix.desaturate();
  feedSprite.mask = maskGraphic;
  feedSprite.filters = [colorMatrix];
  feedSprite.anchor.set(0.5, 0.5);
  $:{
    feedSprite.x = videoContainer.x * $CANVASWIDTH;
    feedSprite.y = videoContainer.y * $CANVASHEIGHT;
  }

  let graphicsOutline = new PIXI.Graphics();
  $: graphicsOutline.alpha = dragging ? 1 : 0
  $:{
    graphicsOutline.clear();
    graphicsOutline.lineStyle(2, 0xffffff);
    graphicsOutline.drawRoundedRect(
      0,
      0,
      videoContainer.w,
      videoContainer.h,
      videoContainer.w * 0.125
    );
    graphicsOutline.x = videoContainer.x * $CANVASWIDTH - videoContainer.w / 2
    graphicsOutline.y = videoContainer.y * $CANVASHEIGHT - videoContainer.h / 2
  }


  stage.addChild(
    graphicsDimmer,
    feedSprite, 
    graphicsScrim,
    graphicsPose, 
    graphicsHead, 
    maskGraphic, 
    guides,
    graphicsOutline
    );

  $: {
    if ($videoReady && $showVideo) {
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

  //Handle initial capture and resize video
  $: {
    if (!$showGuides && $guides1_0 === 1) {
      guides.tint = 0x2cf27c;
      dataLayer.push({ event: "Pose-Registered" });
      setTimeout(() => {
        guides1_0.set(0);
      }, 500);
    }
    if ($guides1_0 === 0 && $slide0_1 === 0) {
      slide0_1.set(1);
    }
    if ($slide0_1 === 1) {
      locked = false;
    }
  }

  app.ticker.add(() => {
    if ($videoReady) {
      //Add to ticker since Svelte doesn't detect video orientation change well
      updateFeed();
    }
    drawMotionCapture();
  });

  const updateFeed = () => {
    feedRatio = $videoReady.videoWidth / $videoReady.videoHeight;
    ratio = feedSprite.width / $videoReady.videoWidth;

    if (feedRatio > 1) {
      feedSprite.height = videoContainer.h;
      feedSprite.width = feedSprite.height * feedRatio;
    } else {
      feedSprite.width = videoContainer.w;
      feedSprite.height = feedSprite.width / feedRatio;
    }
  };

  const drawMotionCapture = () => {
    if (!$videoReady) {
      return;
    }
    //recalc feedoffset
    feedOffsetX = feedSprite.position.x - feedSprite.width/2 
    feedOffsetY = feedSprite.position.y - feedSprite.height/2
    //draw guides
    if ($poseNetRes) {
      mouseOverride.set($mouseOverride + 0.01);
      if(!$showVideo){return}
      graphicsPose.clear();
      graphicsHead.clear();
      createPose($poseNetRes, graphicsPose);
      graphicsPose.x = feedSprite.x - feedSprite.width / 2;
      graphicsPose.y = feedSprite.y - feedSprite.height / 2;
    }else if($handPoseRes){
      mouseOverride.set($mouseOverride + 0.01);
      if(!$showVideo){return}
      graphicsPose.clear();
      graphicsHead.clear();
      createHands($handPoseRes,graphicsPose)
      graphicsPose.x = feedSprite.x - feedSprite.width / 2;
      graphicsPose.y = feedSprite.y - feedSprite.height / 2;
    } else {
      graphicsPose.clear();
      graphicsHead.clear();
    }
  };

  let headPos = {
    rotation: 0,
    x: 0,
    y: 0
  };
  
  const drawHandPoints = (lm, graphics,color) => {
    graphics.lineStyle(0,color);
    graphics.beginFill(color, 1);
    let size = .01 * feedSprite.width;
    let pointers = [4,8,12,16,20]
    pointers.forEach(index=>{
      graphics.drawCircle(
         (1-lm[index].x) * feedSprite.width,
         lm[index].y * feedSprite.height,
        size
      ); 
    })
    graphics.endFill();
  }
  
  const drawHandLines = (lm, graphics,color) => {
    graphics.lineStyle(2, color);
    drawPath(lm,[0,1,2,3,4],graphics) //thumb
    drawPath(lm,[5,6,7,8],graphics) //index
    drawPath(lm,[9,10,11,12],graphics) //middle
    drawPath(lm,[13,14,15,16],graphics) //ring
    drawPath(lm,[17,18,19,20],graphics) //little
    drawPath(lm,[0,17,13,9,5,0],graphics) //palm
  }
  
  const drawPath = (lm,indexes=[],graphics) => {
    if(indexes.length>0){
      graphics.moveTo((1-lm[indexes[0]].x) * feedSprite.width, 
                    lm[indexes[0]].y * feedSprite.height);
      indexes.forEach((index,i)=>{
        if(i===0){return}
        graphics.lineTo((1-lm[index].x) * feedSprite.width, 
                    lm[index].y * feedSprite.height);
      })
    }
  }
  
  const createHands = (pose, graphics) => {
    const poselm = pose.poseLandmarks || null;
    const handlm = {
      right: pose.leftHandLandmarks || null,
      left: pose.rightHandLandmarks || null
    };
    
    // if (poselm){
    //   let size = .02 * feedSprite.width;
    //   graphics.beginFill(0xe54646, 1);
    //    graphics.drawCircle(
    //     feedOffsetX + (1-poselm[15].x) * feedSprite.width,
    //     feedOffsetY + poselm[15].y * feedSprite.height,
    //     size
    //   ); 
    //   graphics.drawCircle(
    //     feedOffsetX + (1-poselm[16].x) * feedSprite.width,
    //     feedOffsetY + poselm[16].y * feedSprite.height,
    //     size
    //   ); 
    //   graphics.endFill();
    // }
    if(handlm.right){
      drawHandPoints(handlm.right,graphics,0xe54646)
      drawHandLines(handlm.right,graphics,0xe54646)
    }
    
    if(handlm.left){
      drawHandPoints(handlm.left,graphics,0xe54646)
      drawHandLines(handlm.left,graphics,0xe54646)
    }
    
  }

  const createPose = (pose, graphics) => {
    graphicsPose.lineStyle(2, graphicsColor);

    //Torso
    createLine(pose[5], pose[6], graphicsPose);
    createLine(pose[11], pose[12], graphicsPose);
    createLine(pose[6], pose[12], graphicsPose);
    createLine(pose[5], pose[11], graphicsPose);

    createLine(pose[5], pose[7], graphicsPose);
    createLine(pose[7], pose[9], graphicsPose);
    createLine(pose[6], pose[8], graphicsPose);
    createLine(pose[8], pose[10], graphicsPose);

    // Legs
    createLine(pose[11], pose[13], graphicsPose);
    createLine(pose[13], pose[15], graphicsPose);
    createLine(pose[12], pose[14], graphicsPose);
    createLine(pose[14], pose[16], graphicsPose);

    //Hands
    let size = constrain(
            getDistance(pose[5].position, pose[6].position) * ratio * 0.15,
            { max: 40, min: 16 }
          )
    graphicsPose.beginFill(graphicsColor, 1)
    graphicsPose.lineStyle(0)
    if(pose[9].score>.3){
      graphicsPose.drawCircle(
              pose[9].position.x * ratio,
              pose[9].position.y * ratio,
              size
            );
    }
    if(pose[10].score>.3){
      graphicsPose.drawCircle(
        pose[10].position.x * ratio,
        pose[10].position.y * ratio,
        size
      );
    }

    //Head
    graphicsHead.lineStyle(2, graphicsColor);
    graphicsHead.drawEllipse(
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
    graphicsHead.rotation = headPos.rotation;
    graphicsHead.x = graphicsPose.x + headPos.x;
    graphicsHead.y = graphicsPose.y + headPos.y;

  };

  const createLine = (point1, point2, graphics) => {
    graphics.moveTo(point1.position.x * ratio, point1.position.y * ratio);
    graphics.lineTo(point2.position.x * ratio, point2.position.y * ratio);
  };
  
  let selectedPoseFTUE = null
  const handlePoseFTUE = (e) => {
    if(!selectedPoseFTUE){
      selectedPoseFTUE = e
      allowHolistic.set(e==="holistic" ? true: false)
      setTimeout(()=>{
        PoseFTUE.set(false)
      }, 300)
    }
  }
</script>

{#if $videoReady && $showGuides && $showVideo}
  {#if $PoseFTUE && !isSafari}
    <div class="card holistic {selectedPoseFTUE==="holistic" ? 'selected' : ''}"
        in:flyRotate="{{ duration: 500,delay:800, y: 100,r:5, x:30,easing: cubicOut }}"
        out:fly="{{ delay:selectedPoseFTUE === "holistic" ? 300 : 0,duration: 400,y: 20, easing: sineInOut}}"
         on:click={()=>{handlePoseFTUE('holistic')}}
         style="--posY:{videoContainer.y*$HEIGHT - videoContainer.h/2/$SCALE}px;
                --posX:{videoContainer.x*$WIDTH - videoContainer.w/2/$SCALE}px;
                --width:{videoContainer.w/$SCALE}px;
                --height:{videoContainer.h/$SCALE}px"
    >
     
       <svelte:component 
                         this={handsGlyph} 
                         selected={selectedPoseFTUE==="holistic"} 
                         color={(selectedPoseFTUE==="holistic")?'var(--selectedSVGColor)':'var(--svgColor)'} 
                         hoverColor={selectedPoseFTUE==="holistic" ? 'var(--selectedSVGColor)' : 'var(--svgColorHover)'}/>
       <h5>Use Finger Tracking</h5>
        <p>More accuracy and power.</p>

    </div>
  <div class="card posenet {selectedPoseFTUE==="posenet" ? 'selected' : ''}"
       on:click={()=>{handlePoseFTUE('posenet')}}
       in:flyRotate="{{ duration: 500,delay:800, y: 100,r:-5, x:-30,easing: cubicOut }}"
        out:fly="{{ delay:selectedPoseFTUE === "posenet" ? 300 : 0,duration: 400,y: 20, easing: sineInOut}}"
           style="--posY:{videoContainer.y*$HEIGHT - videoContainer.h/2/$SCALE}px;
                  --posX:{videoContainer.x*$WIDTH - videoContainer.w/2/$SCALE}px;
                  --width:{videoContainer.w/$SCALE}px;
                  --height:{videoContainer.h/$SCALE}px"
      >
        
         <svelte:component 
                           this={posenetGlyph} 
                           selected={selectedPoseFTUE==="posenet"} 
                           color={(selectedPoseFTUE==="posenet")?'var(--selectedSVGColor)':'var(--svgColor)'} 
                           hoverColor={selectedPoseFTUE==="posenet" ? 'var(--selectedSVGColor)' : 'var(--svgColorHover)'}/>
        <h5>Use Wrist Tracking</h5>
        <p>Light, perfect for mobile.</p>

      </div>
  {:else if !$PoseFTUE || isSafari}
    <div
    style="top:{+videoContainer.y*$HEIGHT + videoContainer.h/2/$SCALE}px"
    in:fly="{{ delay:500,duration: 400, y: 20, easing: sineInOut }}"
    out:fade="{{ duration: 300, easing: sineInOut}}"
    >
    <h2>
      Take a step back, and bring <span>your hands</span> into the frame.
    </h2>
     <div class="info">
      <p>
        Left hand = <span>volume </span>
      </p>
        <p>
        Right hand = <span>pitch</span>
      </p>
      </div>
   
    </div>
  {/if}

{/if}



<style>
  .card{
    --posY:0;
    --posX:0;
    --width:0;
    --height:0;
    --svgColor:rgb(var(--crimson));
    --svgColorHover:rgb(var(--crimson));
    --selectedSVGColor:rgb(var(--offwhite));
    background: rgb(var(--offwhite));
    border-radius: calc(var(--width)*0.0625);
/*     top: calc(var(--posY) + var(--height) * .65); */
    bottom:24px;
    width: calc(var(--width)*0.7);
    height: var(--height);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }
  .card.selected{
    background:rgb(var(--crimson));
  }
  .card:before{
    content:"";
    width: calc(var(--height)*1.4);
    height: calc(var(--height)*1.4);
    border-radius:50%;
    background:rgba(var(--crimson),.1);
      position:absolute;
    transform:scale(0);
    transition:.4s;
/*     z-index:-1; */
  }
  .card:hover:before{
    transform:scale(.9);
  }
   .card:hover{
    cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
  }
  h5{
    font-weight:normal;
    color:rgb(var(--crimson));
    font-size:clamp(16px,3vw,21px);
    max-width: calc(100% - 8px);
    margin:0 0 4px 0;
    text-align:center;
    font-variation-settings: "wght" 72, "wdth" 110, "ital" 1;
  }
  .selected h5,.card.selected p{
    color:rgb(var(--offwhite));
  }
  .card p{
    font-family:'Nicholson Beta';
    font-size:16px;
    max-width: calc(100% - 8px);
    text-align:center;
    margin:0px 0 16px 0;
    color:rgb(var(--darkgrey));
    padding-bottom:8px;
  }
  hr{
    color:rgb(var(--lightgrey));
    width:24px;
    margin:4px;
  }
  .card.holistic{
    left: calc(var(--posX) - var(--width)*0.26);
/*     transform: rotate(-5deg); */
/*     -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.125); 
box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.125); */
/*     z-index:1; */
  }
  .card.posenet{
    left: calc(var(--posX) + var(--width)*0.6);
/*     transform: rotate(5deg); */
/*     -webkit-box-shadow: -3px 4px 15px 5px rgba(0,0,0,0.125); 
box-shadow: -3px 4px 15px 5px rgba(0,0,0,0.125); */
  }
  div{
    position:absolute;
    width:100%;
    max-width:450px;
    display:flex;
    flex-direction:column;
    align-items: center;
  }
  .info{
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    flex-direction: revert;
  }
  
  .info p{
    margin:16px 8px 8px 8px;
    position:relative;
  }
  h2{
    color:rgb(var(--offwhite));
    font-variation-settings:"wght" 68, "wdth"90, "ital"0;
    font-size:28px;
    font-weight:normal;
    text-align:center;
    width:max-content;
    max-width:500px;
    max-width:100%;
    margin-top:40px;
    margin-bottom:0;
    word-break: break-word;
    white-space: normal;
  }
  h2 span{
    color:rgb(var(--crimson));
/*     font-variation-settings:"wght" 90, "wdth"90, "ital"0; */
  }
  p{
    font-size:16px;
    font-family: "Nicholson Beta";
    text-align:center;
    width:max-content;
    color:rgb(var(--offwhite));
    word-break: break-word;
    max-width:100%;
    white-space: normal;
  }
  span{
    color:rgb(var(--sun));
  }
  @media screen and (max-width: 600px) {
    h2{
      font-size:18px;
     }
     div{
       width:calc(100% - 32px);
     }
    .card{
         width: calc(var(--width)*0.55);
    height: calc(var(--height)*.8);
    }
    .card p{margin:0px 0 8px 0;}
    .card.holistic{
        left: calc(var(--posX) - var(--width)*0.072)
  }
  .card.posenet{
        left: calc(var(--posX) + var(--width)*0.525);
  }
  }
</style>