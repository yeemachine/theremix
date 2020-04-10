<script>
import {WIDTH,HEIGHT,canvasPos,active,loaded} from './stores.js'

export let stage = null

//Create Null Object to handle Mouse Pos on Canvas
let nullObj = new PIXI.Sprite();
nullObj.interactive = true;

$: {
  nullObj.width = $WIDTH;
  nullObj.height = $HEIGHT;
}

nullObj.on('pointermove', (e) => {
  if($loaded){
   canvasPos.set({
        x:e.data.global.x,
        y:e.data.global.y
    })
  }
  
});

nullObj.on('pointerdown', (e) => {
  if($loaded){
   canvasPos.set({
        x:e.data.global.x,
        y:e.data.global.y
    })
  }
});

stage.addChild(nullObj)

</script>