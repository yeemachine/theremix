<script>
import {CANVASWIDTH,CANVASHEIGHT,canvasMousePos,SCALE,active,loaded} from './stores.js'

export let stage = null

//Create Null Object to handle Mouse Pos on Canvas
let nullObj = new PIXI.Sprite();
nullObj.interactive = true;

$: {
  nullObj.width = $CANVASWIDTH;
  nullObj.height = $CANVASHEIGHT;
}

nullObj.on('pointerdown', (e) => {
  if($loaded){
   canvasMousePos.set({
        x:e.data.global.x,
        y:e.data.global.y
    })
  }
});

stage.addChild(nullObj)

</script>