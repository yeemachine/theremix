<script>
  import { tweened } from "svelte/motion";
  import { sineInOut } from "svelte/easing";
  import { lerpColor } from "../../helpers.js";
  import {
    WIDTH,
    CANVASWIDTH,
    CANVASHEIGHT,
    thereminPos,
    tablePos,
    enableMIDI,
  } from "../../stores.js";
  export let textures = null;
  export let sheet = null;
  export let stage = null;
  export let createSprite = null;

  const sineInOut0_1 = tweened(1, {
    duration: 1000,
    easing: sineInOut,
  });

  const table = createSprite(sheet.textures["Table"], sheet.textures["Table"]);
  const tableRatio =
    sheet.textures["BG-Machine"].width / sheet.textures["BG-Machine"].height;
  table.children[1].tint = 0x8056f8;

  let maskGraphic = new PIXI.Graphics({ antialias: true });
  maskGraphic.lineStyle(0);
  maskGraphic.parentGroup = PIXI.lights.diffuseGroup;
  table.children[0].mask = maskGraphic;

  stage.addChild(table, maskGraphic);

  $: {
    if ($CANVASWIDTH / $CANVASHEIGHT > tableRatio) {
      table.width = $WIDTH > 600 ? $CANVASWIDTH : $CANVASWIDTH;
      table.scale.y = table.scale.x;
    } else {
      table.height = $WIDTH > 600 ? $CANVASHEIGHT : $CANVASHEIGHT;
      table.scale.x = table.scale.y;
    }
    table.x = ($CANVASWIDTH - table.width) * 0.5;
    table.y = $thereminPos.y + $thereminPos.height * 0.91;
    table.children[0].tint = lerpColor(0x443d34, 0x291e21, $sineInOut0_1);

    tablePos.set({
      x: table.x,
      y: table.y,
      height: table.height,
      width: table.width,
    });

    maskGraphic.clear();
    maskGraphic.beginFill(0xffffff, 1);
    maskGraphic.drawEllipse(
      table.x + table.width / 2,
      table.y + table.height / 2 + 1,
      table.width * 1,
      table.height / 2
    );
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
</script>
