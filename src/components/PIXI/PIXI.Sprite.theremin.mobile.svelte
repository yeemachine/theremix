<script>
import { tweened } from 'svelte/motion';
import { backOut, sineInOut } from 'svelte/easing';
import { oscillators } from '../../config.js';
import {active,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,globalPointerUp, thereminPos,glide, volumeVal,oscillatorType,thereminMobilePos,hovered,dragged} from '../../stores.js';
export let stage = null;
export let sheet = null;
export let createSprite = null;

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
    sheet.textures['Mobile-Controls.png'],
    sheet.textures['Mobile-Controls-Normal.png']
)

const knob_left = createSprite(
    sheet.textures['Knob.png'],
    sheet.textures['Knob-Normal.png']
)
knob_left.children[0].anchor.set(0.5, 0.5);
knob_left.children[1].anchor.set(0.5, 0.5);
knob_left.children[0].tint = 0x999999;
knob_left.on('mouseover',()=>{
    hovered.set('knob left')
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
    if('vibrate' in navigator){
        navigator.vibrate(50);
    }
    dataLayer.push({'event':'volume-pixi'});
})

const knob_right = createSprite(
    sheet.textures['Knob.png'],
    sheet.textures['Knob-Normal.png']
)
knob_right.children[0].anchor.set(0.5, 0.5);
knob_right.children[1].anchor.set(0.5, 0.5);
knob_right.children[0].tint = 0x999999;
knob_right.on('mouseover',()=>{
    hovered.set('knob right')
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
    dataLayer.push({'event':'osc-pixi'});
})
const symbols = createSprite(
    sheet.textures['Symbols.png']
)
symbols.anchor.set(0.5, 0.5);
symbols.tint = 0xE54646;


const knob_light = new PIXI.lights.PointLight(0xffffff, 0);

const switchRight = createSprite(
    sheet.textures['Switch-Off.png'],
    sheet.textures['Switch-Off-Normal.png']
)
switchRight.children[0].anchor.set(0.5, 0.5);
switchRight.children[1].anchor.set(0.5, 0.5);
$: switchRight.children[0].tint = ($glide) ? 0xffffff : 0x999999
$: switchRight.children[0].texture = ($glide && $active) ? sheet.textures['Switch-On.png'] : sheet.textures['Switch-Off.png']
$: switchRight.children[1].texture = ($glide && $active) ? sheet.textures['Switch-On-Normal.png'] : sheet.textures['Switch-Off-Normal.png']

switchRight.on('pointerdown',()=>{
    glide.set(!$glide)
    if('vibrate' in navigator){
        navigator.vibrate(50);
    }
    dataLayer.push({'event':'glide-pixi'});
})

switchRight.on('mouseover',()=>{
    hovered.set('switch')
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
