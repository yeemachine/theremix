<script>
import { onMount } from 'svelte';
import {createSprite, lerpColor} from './pixiApp.js';
import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {active,WIDTH,HEIGHT,canvasPos,thereminPos} from './stores.js';
export let textures = null;
export let stage = null;

const tween0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

const theremin = new PIXI.Container();

const theremin_null = createSprite(textures.theremin_null.texture)
theremin_null.alpha = 0

const theremin_body_bottom = createSprite(
    textures.theremin_body_bottom.texture,
    textures.theremin_body_bottom_normal.texture
)

const theremin_body_top = createSprite(
    textures.theremin_body_top.texture,
    textures.theremin_body_top_normal.texture
)

const right_antenna = createSprite(
    textures.right_antenna.texture,
    textures.right_antenna_normal.texture
)
right_antenna.children[0].tint = 0x663366
const right_antenna_light = new PIXI.lights.PointLight(0xff7f00, 1.2);

const left_antenna1 = createSprite(
    textures.left_antenna1.texture,
    textures.left_antenna1_normal.texture
)
left_antenna1.children[0].tint = 0x333366

const left_antenna2 = createSprite(
    textures.left_antenna2.texture,
    textures.left_antenna2_normal.texture
)
left_antenna2.children[0].tint = 0x663366
const left_antenna_light = new PIXI.lights.PointLight(0xff7f00, 1.2);

theremin.addChild(
    theremin_null,
    theremin_body_bottom,
    left_antenna1,
    left_antenna2,
    right_antenna,
    theremin_body_top,
    left_antenna_light,
    right_antenna_light
    )

stage.addChild(theremin)

$: {
    theremin_body_bottom.y = theremin_null.height-theremin_body_bottom.height
    theremin_body_bottom.x = theremin_null.width*.17
    theremin_body_top.y = theremin_null.height*.913-theremin_body_top.height
    theremin_body_top.x = theremin_null.width*.17

    left_antenna1.scale = new PIXI.Point(1.5, 1.5);
    left_antenna1.x = theremin_null.width*(.14 + .05 - .05*$tween0_1);
    left_antenna1.y = theremin_null.height*.911-left_antenna1.height;

    left_antenna2.scale = new PIXI.Point(1.8, 1.8);
    left_antenna2.x = theremin_null.width*(.005 + .05 - .05*$tween0_1)
    left_antenna2.y = theremin_null.height*.925-left_antenna2.height

    left_antenna_light.x = theremin_null.width*.1
    left_antenna_light.y = theremin_null.height*.85
    left_antenna_light.brightness = .5+.7*Math.min(Math.max($WIDTH/1200, 0), 1)

    right_antenna.scale.y = .61+.29*$tween0_1;
    right_antenna.x = theremin_null.width*.9145
    right_antenna.y = theremin_null.height*.81-right_antenna.height

    right_antenna_light.x = theremin_null.width*.9145
    right_antenna_light.y = theremin_null.height*.4
    right_antenna_light.brightness = .5+.7*Math.min(Math.max($WIDTH/1200, 0), 1)
    
    if(textures.theremin_null.texture.width/textures.theremin_null.texture.height > $WIDTH/$HEIGHT){
        theremin.width = $WIDTH*.88
        theremin.scale.y = theremin.scale.x
    }else{
        theremin.height = $HEIGHT*.88
        theremin.scale.x = theremin.scale.y
    }

    if($WIDTH<600){
        theremin.width = $WIDTH-30
        theremin.x = ($WIDTH - theremin.width)*.48
        theremin.scale.y = theremin.scale.x
    }

    theremin.x = ($WIDTH - theremin.width)*.48
    theremin.y = ($HEIGHT - theremin.height)*.3

    thereminPos.set({
        x:theremin.x,
        y:theremin.y,
        width:theremin.width,
        height:theremin.height
    })
    
    let blurFilter = stage.filters[0]
    blurFilter.blur = 0 + $tween0_1 * 4
    blurFilter.enabled = (blurFilter.blur > 0) ? true : false
}


const detectCollision = (position,pixiElement) => {
    const element_bounds = pixiElement.getBounds()
    let collide = (position.x > element_bounds.x
            && position.x < element_bounds.x + element_bounds.width
            && position.y > element_bounds.y
            && position.y < element_bounds.y + element_bounds.height
        ) ? true : false
    return collide
}
// Values depending on when the scene is active
$: {
    if($active === true){

        if($tween0_1 === 0){
            tween0_1.set(1)
        }

        if(detectCollision($canvasPos,left_antenna2) && left_antenna2.children[0].tint !== 0xffffff){
            left_antenna2.children[0].tint = 0xffffff
        }
        if(!detectCollision($canvasPos,left_antenna2) && left_antenna2.children[0].tint !== 0x663366){
            left_antenna2.children[0].tint = 0x663366
        }

        if(detectCollision($canvasPos,right_antenna) && right_antenna.children[0].tint !== 0xffffff){
            right_antenna.children[0].tint = 0xffffff
        }
        if(!detectCollision($canvasPos,right_antenna) && right_antenna.children[0].tint !== 0x663366){
            right_antenna.children[0].tint = 0x663366
        }

    }else{

    }
    
}

onMount(async () => {
    canvasPos.set({
        x:($WIDTH>600) ? theremin.x+theremin.width*.2 : theremin.x+theremin.width*.1,
        y:($WIDTH>600) ? theremin.y+theremin.height*.7 : theremin.y+theremin.height*.7
    })
});


</script>