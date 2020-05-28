<script>
import { onMount } from 'svelte';
import {createSprite, lerpColor, detectCollision} from './pixiApp.js';
import { tweened } from 'svelte/motion';
import {constrain} from './helpers.js';
import { backOut, sineInOut } from 'svelte/easing';
import { oscillators } from './config.js';
import {loaded,active,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,canvasMousePos,mousePos,globalPointerUp, thereminPos,glide, volumeVal,oscillatorType,thereminMobilePos,hovered,dragged} from './stores.js';
export let textures = null;
export let stage = null;

const backOut0_1 = tweened(0, {
    duration: 1400,
    easing: backOut
});

const sineInOut0_1 = tweened(0, {
    duration: 600,
    easing: sineInOut
});

const tweenKnobLeft = tweened(0, {
    duration: 700,
    easing: backOut
});

const tweenKnobRight = tweened(0, {
    duration: 700,
    easing: backOut
});

const thereminMobile = new PIXI.Container();

const base = createSprite(
    textures.theremin_mobile.texture,
    textures.theremin_mobile_normal.texture
)

const knob_left = createSprite(
    textures.knob.texture,
    textures.knob_normal.texture
)
knob_left.children[0].anchor.set(0.5, 0.5);
knob_left.children[1].anchor.set(0.5, 0.5);
knob_left.children[0].tint = 0x999999;
knob_left.on('mouseover',()=>{
    hovered.set(knob_left)
    knob_left.children[0].tint = 0xffffff
})
knob_left.on('mouseout',()=>{
    hovered.set(null)
    knob_left.children[0].tint = 0x999999
})
knob_left.on('pointerdown',()=>{
    dragged.set({
        element:knob_left,
        id:'vol'
    })
    globalPointerUp.set(false)
})

const knob_right = createSprite(
    textures.knob.texture,
    textures.knob_normal.texture
)
knob_right.children[0].anchor.set(0.5, 0.5);
knob_right.children[1].anchor.set(0.5, 0.5);
knob_right.children[0].tint = 0x999999;
knob_right.on('mouseover',()=>{
    hovered.set(knob_right)
    knob_right.children[0].tint = 0xffffff
})
knob_right.on('mouseout',()=>{
    hovered.set(null)
    knob_right.children[0].tint = 0x999999
})
knob_right.on('pointerdown',()=>{
    hovered.set(null)
    dragged.set({
        element:knob_right,
        id:'osc'
    })
    globalPointerUp.set(false)
})
const symbols = createSprite(
    textures.symbols.texture,
    textures.symbols_normal.texture
)
symbols.children[0].anchor.set(0.5, 0.5);
symbols.children[1].anchor.set(0.5, 0.5);
symbols.children[0].tint = 0xE54646;


const knob_light = new PIXI.lights.PointLight(0xffffff, 0);

const switchRight = createSprite(
    textures.switch_off.texture,
    textures.switch_off_normal.texture
)
switchRight.children[0].anchor.set(0.5, 0.5);
switchRight.children[1].anchor.set(0.5, 0.5);
$: switchRight.children[0].texture = ($glide && $active) ? textures.switch_on.texture : textures.switch_off.texture
$: switchRight.children[1].texture = ($glide && $active) ? textures.switch_on_normal.texture : textures.switch_off_normal.texture
$: switchRight.children[0].tint = ($glide) ? 0xffffff : 0x999999
switchRight.on('pointerup',()=>{
    glide.set(!$glide)
})
switchRight.on('mouseover',()=>{
    hovered.set(switchRight)
    switchRight.children[0].tint = 0xffffff
})
switchRight.on('mouseout',()=>{
    hovered.set(null)
    switchRight.children[0].tint = ($glide) ? 0xffffff : 0x999999
})

thereminMobile.addChild(
    base,
    symbols,
    knob_left,
    knob_right,
    switchRight
    )

var dirLight = new PIXI.lights.DirectionalLight(0xffffff, .3, base)
dirLight.falloff = [0.75, 13, 20]
dirLight.lightHeight = 1.8

stage.addChild(thereminMobile,dirLight)

$:{

    //Knob Left Positioning
    knob_left.scale = {
    x:1+.4*$tweenKnobLeft,
    y:1+.4*$tweenKnobLeft
    }
    knob_left.x = base.width*.2355
    knob_left.y = base.height*.226
    knob_left.interactive = ($active) ? true : false

    knob_light.x = base.x + base.width*.5
    knob_light.y = base.y + base.height*.5
    knob_light.brightness = .4+.4*$backOut0_1

    //Knob Right Positioning
    knob_right.scale = {
        x:1+.4*$tweenKnobRight,
        y:1+.4*$tweenKnobRight
    }
    knob_right.x = base.width*.5095
    knob_right.y = base.height*.226
    knob_right.interactive = ($active) ? true : false
    symbols.scale = {
        x:.5+.6*$tweenKnobRight,
        y:.5+.6*$tweenKnobRight
    }
    symbols.alpha = $tweenKnobRight
    symbols.position = {
        x:knob_right.x,
        y:knob_right.y
    }

    //Switch Right Positioning
    switchRight.x = base.width*.775
    switchRight.y = base.height*.226
    switchRight.interactive = ($active) ? true : false

    //Container Positioning
    thereminMobile.width = $CANVASWIDTH - 48
    thereminMobile.scale.y = thereminMobile.scale.x
    thereminMobile.position.x = 24
    let thereminBottomY = $thereminPos.y+$thereminPos.height
    thereminMobile.position.y = 
        (thereminBottomY + 
        ($CANVASHEIGHT - thereminBottomY - thereminMobile.height)*.4
        + (($CANVASHEIGHT - thereminBottomY - thereminMobile.height)*.25 + thereminMobile.height*.9) * (1-$sineInOut0_1)
        )
    thereminMobile.visible = ($WIDTH < 600) ? true : false
    thereminMobilePos.set({
        x:thereminMobile.x,
        y:thereminMobile.y,
        width:thereminMobile.width,
        height:thereminMobile.height
    })

    dirLight.target = base
    dirLight.brightness = ($WIDTH > 600) ? 0 : 0.3 * $sineInOut0_1
}


$: {

    knob_left.rotation = (-0.9 + 1.8*(1-Math.abs($volumeVal/-48)) * $backOut0_1) * Math.PI
    knob_right.rotation = (-0.9 + 1.8*((oscillators.indexOf($oscillatorType))/(oscillators.length-1)) * $backOut0_1) * Math.PI

    if($active){
        if($backOut0_1 === 0){
             backOut0_1.set(1)
        }
        if($sineInOut0_1 === 0){
             sineInOut0_1.set(1)
        }
    }
    if(!$active){
        if($backOut0_1 === 1){
             backOut0_1.set(0)
        }
        if($sineInOut0_1 === 1){
             sineInOut0_1.set(0)
        }
    } 

    if($dragged){
        if($dragged.id === 'vol'){
            knob_left.children[0].tint = 0xffffff
            if($tweenKnobLeft === 0){
                tweenKnobLeft.set(1)
            }
        }
        if($dragged.id === 'osc'){
            knob_right.children[0].tint = 0xffffff
            if($tweenKnobRight === 0){
                tweenKnobRight.set(1)
            }
        }
    }else if(!$hovered){
        knob_left.children[0].tint = 0x999999
        knob_right.children[0].tint = 0x999999
    }

    if(!$dragged){
        if($tweenKnobLeft === 1){
            tweenKnobLeft.set(0)
        }
        if($tweenKnobRight === 1){
            tweenKnobRight.set(0)
        }
    }

}

</script>
