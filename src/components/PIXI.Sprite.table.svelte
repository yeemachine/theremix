<script>
import {createSprite} from './pixiApp.js';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import {WIDTH,HEIGHT,thereminPos} from './stores.js';
export let textures = null;
export let stage = null;

const table = createSprite(textures.solid2x2.texture,textures.normal2x2.texture)
table.children[0].tint = 0x999999
stage.addChild(table)

$:{
    table.height = $HEIGHT
    table.width = $WIDTH
    table.x = ($WIDTH - table.width)*.5
    table.y = $thereminPos.y + $thereminPos.height*.75;
}


</script>