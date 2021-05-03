<script>
  import { tweened } from "svelte/motion";
  import { sineInOut } from "svelte/easing";
  // import {midiList} from '../../config.js';
  import {
    active,
    WIDTH,
    HEIGHT,
    SCALE,
    CANVASWIDTH,
    CANVASHEIGHT,
    thereminPos,
    bgPos,
    enableMIDI,
    currentMIDI,
    midiList,
  } from "../../stores.js";
  export let textures = null;
  export let sheet = null;
  export let stage = null;
  export let createSprite = null;
  export let createGradientTexture = null;
  
  let videoEl;
  let paused = true;

  const sineInOut0_1 = tweened(0, {
    duration: 1000,
    easing: sineInOut,
  });

  const sineInOut0_1_2 = tweened(0, {
    duration: 600,
    easing: sineInOut,
  });

  const bgContainer = new PIXI.Container();
  const BGMContainer = new PIXI.Container();
  $: {
    BGMContainer.alpha = $sineInOut0_1;
  }
  const bg = createSprite(
    sheet.textures["BG-Machine"],
    sheet.textures["BG Normal"]
  );
  bg.children[0].tint = 0x444444;
  bg.children[1].tint = 0x8056f8;
  bgContainer.addChild(bg);
  const bgRatio =
    sheet.textures["BG-Machine"].width / sheet.textures["BG-Machine"].height;

  let BGM_bg = null
  
  const createBGMSprite = (texture) => {
    // if(videoEl){videoEl.remove()}
    if(BGM_bg){ BGM_bg.destroy(); BGM_bg=null}
    BGM_bg = createSprite(texture);
    BGM_bg.parentGroup = PIXI.lights.diffuseGroup;
    BGM_bg.tint = 0xa1a1a1;
    BGMContainer.addChild(BGM_bg);
  }
  createBGMSprite(PIXI.Texture.from(Object.keys($midiList)[0].img))
  
  let cachedURL;
  const replaceBGMTexture = (value) => {
      //return early if url loaded already
      let url = value.includes('custom') ? $midiList.custom.img : $midiList[value].img
      if(url === cachedURL){
        return
      }
      cachedURL = url
    
      if(value.includes('custom')){
        value = 'custom' + $midiList.custom.imgNow
      }
      let isVideo = value.includes('custom') ? $midiList.custom.type === "video" : $midiList[value].type ==="video"

      if(isVideo){
        if(BGM_bg) {BGM_bg.destroy(); BGM_bg=null}
        createVideo($midiList.custom.img)
        return
      }
    try{
      if (Object.keys(PIXI.loader.resources).includes(value)) {
        createBGMSprite(PIXI.loader.resources[value].texture)
        // BGM_bg = createSprite(PIXI.loader.resources[value].texture);
      } else {
        
        function onDataLoaded(loader, resources) {
          destroyVideo()
          createBGMSprite(resources[value].texture)
        }
        
        if(url.includes('blob')){
            PIXI.loader.add(value, url, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BLOB }).load(onDataLoaded)
        }else{
          PIXI.loader.add(value, url).load(onDataLoaded);
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  
  const onVideoLoaded = () => {
    videoEl.play()
    videoEl.width = videoEl.videoWidth;
    videoEl.height = videoEl.videoHeight;
    createBGMSprite(PIXI.Texture.from(videoEl))
    // if(BGM_bg) BGM_bg.destroy()
    // BGM_bg = PIXI.Sprite.from(videoEl);
    // BGM_bg.parentGroup = PIXI.lights.diffuseGroup;
    // BGM_bg.tint = 0xa1a1a1;
    // BGMContainer.addChild(BGM_bg);
  }
  
  const destroyVideo = () => {
    if(videoEl){
      videoEl.pause()
      videoEl.removeAttribute("src");
      videoEl.load()
      videoEl.remove()
      videoEl = null;
    }
  }
  
   
  const createVideo = (src) => {
  destroyVideo() 
  videoEl = document.createElement("video");
  videoEl.crossOrigin = 'anonymous'
  videoEl.preload = "auto";
  videoEl.muted = true;    
  videoEl.loop = true;           
  videoEl.setAttribute('playsinline', 'playsinline');
  videoEl.onloadeddata = onVideoLoaded;
  videoEl.src = src;
  }

  currentMIDI.subscribe((value) => {
    if(value){
      try{
        replaceBGMTexture(value)
      }catch(err){
        console.log(err)
      }
    }
  });
  
  midiList.subscribe(val=>{
    if($currentMIDI.includes('custom')){
      try{
        replaceBGMTexture('custom')
      }catch(err){
        console.log(err)
      }
    }
  })

  $: {
      if ($CANVASWIDTH / $CANVASHEIGHT > bgRatio) {
        bg.width = $CANVASWIDTH;
        bg.scale.y = bg.scale.x;
      } else {
        bg.height =
          $WIDTH > 600
            ? $CANVASHEIGHT
            : $CANVASHEIGHT - $thereminPos.height * 0.5;
        bg.scale.x = bg.scale.y;
      }

      bg.scale.x = bg.scale.x * (1 + .05*$sineInOut0_1_2)
      bg.scale.y = bg.scale.x 
  }
  
  $:{
    if(BGM_bg){
     BGM_bg.width = bg.width;
      BGM_bg.scale.y = BGM_bg.scale.x;
      BGM_bg.x = $CANVASWIDTH * 0.5;
      BGM_bg.y =
        $WIDTH > 600
          ? $CANVASHEIGHT * 0.5
          : $CANVASHEIGHT * 0.5 - $thereminPos.height * 0.25;
    }
  }
  

  $: {
    if(BGM_bg && bg){
      if ($WIDTH < 600) {
        let offset = $currentMIDI.includes('custom') ? $midiList.custom.offset : $midiList[$currentMIDI].offset
        BGM_bg.anchor.set(offset, 0.5);
        bg.position.set($CANVASWIDTH * 0.5 - bg.width * 0.5, 0);
      } else {
        BGM_bg.anchor.set(.5, 0.5);
        bg.position.set($CANVASWIDTH * 0.5 - bg.width * 0.5, 0);
      }
      bgPos.set({
        x: bg.x,
        y: bg.y,
        width: bg.width,
        height: bg.height,
      });
    }
  }

  $: {
    if ($enableMIDI) {
      if ($sineInOut0_1 === 0) {
        sineInOut0_1.set(1);
      }
    } else {
      if ($sineInOut0_1 === 1) {
        sineInOut0_1.set(0);
      }
    }
  }
  
    $: {
    if ($active) {
      if ($sineInOut0_1_2 === 0) {
        sineInOut0_1_2.set(1);
      }
    } else {
      if ($sineInOut0_1_2 === 1) {
        sineInOut0_1_2.set(0);
      }
    }
  }


  const gradientTexture = createGradientTexture(0, 800, 2);
  const gradSprite = createSprite(gradientTexture);
  gradSprite.height = $CANVASHEIGHT;
  gradSprite.width = 300;
  gradSprite.x = $CANVASWIDTH - 40;
  gradSprite.y = 0
  gradSprite.tint = 0xff0000

  stage.addChild(bgContainer, BGMContainer);
  
  $:{
    if(videoEl){
      if($active){
        videoEl.play()
      }else{
        videoEl.pause()
      }
    }
  }
  
</script>

<!-- {#if $enableMIDI && $currentMIDI.includes('custom') && $midiList.custom.type === 'video'}
<video alt="bg" src="{$midiList.custom.img}" bind:this={videoEl} on:canplay={onVideoLoaded} preload="auto" autoplay muted loop></video>
{/if} -->

<style>
  video{
    position:absolute;
    top:0;
    opacity:0;
    pointer-events:none;
    z-index:-1;
  }
</style>
