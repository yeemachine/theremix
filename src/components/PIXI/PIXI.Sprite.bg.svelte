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
  const bgRatio =
    sheet.textures["BG-Machine"].width / sheet.textures["BG-Machine"].height;

  const BGM_bg = createSprite(
    PIXI.Texture.from(Object.keys($midiList)[0].img),
    sheet.textures["BG-Normal-BGM"]
  );
  BGM_bg.children[0].tint = 0x80797f;
  BGM_bg.children[1].tint = 0x8056f8;
  // $: {
  //   BGM_bg.alpha = 1 - $sineInOut0_1_2;
  // }

  currentMIDI.subscribe((value) => {
    if (Object.keys(PIXI.loader.resources).includes(value)) {
      BGM_bg.children[0].texture = PIXI.loader.resources[value].texture;
    } else {
      PIXI.loader.add(value, $midiList[value].img).load((loader, resources) => {
        BGM_bg.children[0].texture = resources[value].texture;
      });
    }
  });

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
    
    BGM_bg.width = bg.width;
    BGM_bg.scale.y = BGM_bg.scale.x;
    BGM_bg.x = $CANVASWIDTH * 0.5;
    BGM_bg.y =
      $WIDTH > 600
        ? $CANVASHEIGHT * 0.5
        : $CANVASHEIGHT * 0.5 - $thereminPos.height * 0.25;
  }

  $: {
    if ($WIDTH < 600) {
      BGM_bg.children[0].anchor.set($midiList[$currentMIDI].offset, 0.5);
      BGM_bg.children[1].anchor.set($midiList[$currentMIDI].offset, 0.5);
      bg.position.set($CANVASWIDTH * 0.5 - bg.width * 0.5, 0);
    } else {
      BGM_bg.children[0].anchor.set(0.5, 0.5);
      BGM_bg.children[1].anchor.set(0.5, 0.5);
      bg.position.set($CANVASWIDTH * 0.5 - bg.width * 0.5, 0);
    }
    bgPos.set({
      x: bg.x,
      y: bg.y,
      width: bg.width,
      height: bg.height,
    });
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

  bgContainer.addChild(bg);
  BGMContainer.addChild(BGM_bg);


  const gradientTexture = createGradientTexture(0, 800, 2);
  const gradSprite = createSprite(gradientTexture);
  gradSprite.height = $CANVASHEIGHT;
  gradSprite.width = 300;
  gradSprite.x = $CANVASWIDTH - 40;
  gradSprite.y = 0
  gradSprite.tint = 0xff0000

  stage.addChild(bgContainer, BGMContainer);
</script>
