<script>
import {createSprite} from './pixiApp.js';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import {CANVASWIDTH,CANVASHEIGHT,thereminPos,tablePos} from './stores.js';
export let textures = null;
export let stage = null;

const table = createSprite(textures.table.texture,textures.table_normal.texture)
const tableRatio = textures.static_dark.texture.width/textures.static_dark.texture.height
table.children[0].tint = 0x666666
stage.addChild(table)


$:{
    if($CANVASWIDTH/$CANVASHEIGHT > tableRatio){
        table.width = $CANVASWIDTH
        table.scale.y = table.scale.x
    }else{
        table.height = $CANVASHEIGHT
        table.scale.x = table.scale.y
    }
    table.x = ($CANVASWIDTH - table.width)*.5
    table.y = $thereminPos.y + $thereminPos.height*.92;

    tablePos.set({
        x:table.x,
        y:table.y,
        height:table.height,
        width:table.width
    })
}


</script>