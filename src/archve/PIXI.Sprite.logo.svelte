<script>
import * as PIXI from 'pixi.js'
import {createSprite} from './pixiApp.js'
import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {constrain} from './helpers.js'
import {WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,thereminPos,machineLeftPos,SCALE} from './stores.js'
export let textures = null;
export let stage = null;

const logo = createSprite(textures.logo.texture,textures.logo_normal.texture)
// const logo = new PIXI.Sprite(textures.logo.texture)
logo.children[0].tint = 0x666666

const logoLight1 = new PIXI.lights.PointLight(0xffffff, 0);
const logoLight2 = new PIXI.lights.PointLight(0xffffff, 0);
const logoLight3 = new PIXI.lights.PointLight(0xffffff, 0);



$: {
    logo.width = $CANVASWIDTH*.8
    logo.scale.y = logo.scale.x
    logo.x = ($CANVASWIDTH - logo.width)*.5
    logo.y = ($WIDTH>600) ? ($CANVASHEIGHT - logo.height)*.45 : ($CANVASHEIGHT - logo.height)*.35
    // logo.width = 120 * $SCALE
    // logo.scale.y = logo.scale.x
    // logo.x =($CANVASWIDTH - logo.width)*.5
    // logo.y = 32 * $SCALE

    logoLight1.position = {
        x:logo.x,
        y:logo.y
    }
    logoLight1.brightness = constrain(2-$SCALE,{max:1.2,min:.5})
    logoLight2.position = {
        x:logo.x + logo.width*.5,
        y:logo.y
    }
    logoLight2.brightness = constrain(2-$SCALE,{max:1.2,min:.5})
    logoLight3.position = {
        x:logo.x + logo.width,
        y:logo.y
    }
    logoLight3.brightness = constrain(2-$SCALE,{max:1.2,min:.5})

}

stage.addChild(logo)

</script>