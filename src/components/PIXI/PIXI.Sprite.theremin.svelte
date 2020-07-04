<script>
import { tweened } from 'svelte/motion';
import {constrain} from '../../helpers.js';
import { backOut, sineInOut } from 'svelte/easing';
import { oscillators } from '../../config.js';
import {loaded,active,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,canvasMousePos,mousePos,globalPointerUp, thereminPos,glide, volumeVal,oscillatorType,dragged,hovered,SCALE} from '../../stores.js';
export let sheet = null
export let stage = null;
export let createSprite = null;
export let calcRotation = null;

const backOut0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

const sineInOut0_1 = tweened(0, {
    duration: 600,
    easing: sineInOut
});

const pulse0_1 = tweened(1, {
    duration: 2400,
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

const theremin = new PIXI.Container();

const theremin_null = createSprite(sheet.textures['theremin_null'])
theremin_null.alpha = 0

const theremin_body_top = createSprite(
    sheet.textures['Theremin Body Mobile'],
    sheet.textures['Theremin Body Normal']
)

const theremin_screen = createSprite(sheet.textures['Screen'])
theremin_screen.parentGroup = PIXI.lights.diffuseGroup;
$:{
    theremin_screen.visible = ($WIDTH > 600) ? true : false
}

const knob_left = createSprite(
    sheet.textures['Knob'],
    sheet.textures['Knob-Normal']
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
    sheet.textures['Knob'],
    sheet.textures['Knob-Normal']
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

const switchRight = createSprite(
    sheet.textures['Switch-Off'],
    sheet.textures['Switch-Off-Normal']
)
switchRight.children[0].anchor.set(0.5, 0.5);
switchRight.children[1].anchor.set(0.5, 0.5);
$: switchRight.children[0].tint = ($glide) ? 0xffffff : 0x999999
$: switchRight.children[0].texture = ($glide && $active) ? sheet.textures['Switch-On'] : sheet.textures['Switch-Off']
$: switchRight.children[1].texture = ($glide && $active) ? sheet.textures['Switch-On-Normal'] : sheet.textures['Switch-Off-Normal']

switchRight.on('pointerup',()=>{
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

const right_antenna = createSprite(
    sheet.textures['Right-Antenna'],
    sheet.textures['Right-Antenna-Normal']
)
const right_antenna_light = new PIXI.lights.PointLight(0xff7f00, 1.2);
right_antenna_light.falloff = [0.75, 4, 10]

const left_antenna2 = createSprite(
    sheet.textures['Left-Antenna'],
    sheet.textures['Left-Antenna-Normal']
)
const left_antenna_light = new PIXI.lights.PointLight(0xff7f00, 1.2);
left_antenna_light.falloff = [0.75, 4, 10]

const symbols = createSprite(sheet.textures['Symbols'])
symbols.anchor.set(0.5, 0.5);
symbols.tint = 0xE54646;

var dirLight = new PIXI.lights.DirectionalLight(0xeeccec, .3, theremin_body_top)
dirLight.falloff = [0.75, 13, 20]
dirLight.lightHeight = 1.8

theremin.addChild(
    theremin_null,
    left_antenna2,
    right_antenna,
    theremin_body_top,
    theremin_screen,
    symbols,
    knob_left,
    knob_right,
    switchRight,
    left_antenna_light,
    right_antenna_light,
    )

stage.addChild(
    theremin,
    dirLight)

$: {
    

    theremin_body_top.scale = {x:.5,y:.5}
    theremin_body_top.y = theremin_null.height*.68
    theremin_body_top.x = theremin_null.width*.22
  
    theremin_screen.y = theremin_null.height*.784
    theremin_screen.x = theremin_null.width*.3033

    left_antenna2.scale = new PIXI.Point(.5, .5);
    left_antenna2.x = theremin_null.width*(.005 + .05 - .05*$backOut0_1)
    left_antenna2.y = theremin_null.height*.85-left_antenna2.height

    left_antenna_light.x = left_antenna2.x
    left_antenna_light.y = left_antenna2.y
    left_antenna_light.brightness = constrain(2-$SCALE,{max:2.6,min:1})*(.2+.8*($backOut0_1))

    right_antenna.scale.x = .5;
    right_antenna.scale.y = .4+.1*$backOut0_1;
    right_antenna.x = theremin_body_top.x+theremin_body_top.width*.897
    right_antenna.y = theremin_body_top.y+theremin_body_top.height*.38-right_antenna.height

    right_antenna_light.x = right_antenna.x
    right_antenna_light.y = right_antenna.y
    right_antenna_light.brightness = constrain(2-$SCALE,{max:2.6,min:1})*(.2+.8*($backOut0_1))

    knob_left.scale = {
        x:.5+.2*$tweenKnobLeft,
        y:.5+.2*$tweenKnobLeft
    }
    knob_left.x = theremin_null.width*.33035
    knob_left.y = theremin_null.height*.8476
    knob_left.interactive = ($active) ? true : false
    knob_left.visible = ($WIDTH > 600) ? true : false

    knob_right.scale = {
        x:.5+.2*$tweenKnobRight,
        y:.5+.2*$tweenKnobRight
    }
    knob_right.x = theremin_null.width*.679
    knob_right.y = theremin_null.height*.8476
    knob_right.interactive = ($active) ? true : false
    knob_right.visible = ($WIDTH > 600) ? true : false
    symbols.scale = {
        x:.2+.35*$tweenKnobRight,
        y:.2+.35*$tweenKnobRight
    }
    symbols.alpha = $tweenKnobRight
    symbols.position = {
        x:knob_right.x,
        y:knob_right.y
    }
    symbols.visible = ($WIDTH > 600) ? true : false

    switchRight.scale = {x:.5,y:.5}
    switchRight.x = theremin_null.width*.7415
    switchRight.y = theremin_null.height*.8476
    switchRight.interactive = ($active) ? true : false
    switchRight.visible = ($WIDTH > 600) ? true : false
    
    if(sheet.textures['theremin_null'].width/sheet.textures['theremin_null'].height > $CANVASWIDTH/$CANVASHEIGHT){
        theremin.width = $CANVASWIDTH*.9
        theremin.scale.y = theremin.scale.x
    }else{
        theremin.height = $CANVASHEIGHT*.9
        theremin.scale.x = theremin.scale.y
    }

    theremin.x = ($CANVASWIDTH - theremin.width)*.48 
    theremin.y = ($CANVASHEIGHT - theremin.height)*.65

    if($WIDTH<600){
        theremin.width = $CANVASWIDTH-32
        theremin.x = ($CANVASWIDTH - theremin.width)*.48
        theremin.scale.y = theremin.scale.x
        theremin.y = ($CANVASHEIGHT - theremin.width*.635*(.2+.8*$sineInOut0_1) - theremin.height)*.8
    }

    thereminPos.set({
        x:theremin.x,
        y:theremin.y,
        width:theremin.width,
        height:theremin.height
    })

    dirLight.target = theremin_body_top
    dirLight.brightness = constrain(2-$SCALE,{max:.5,min:.2})
}

// Reset Dragged Value when Pointer is Up
$: {
    if($globalPointerUp){
        dragged.set(null)
    }
}

// Active/Inactive Tweens
$: {
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
}

// Rotation Controls
$:{
    knob_left.rotation = (-0.9 + 1.8*(1-Math.abs($volumeVal/-48)) * $backOut0_1) * Math.PI
    knob_right.rotation = (-0.9 + 1.8*((oscillators.indexOf($oscillatorType))/(oscillators.length-1)) * $backOut0_1) * Math.PI
    
    if($dragged){

        let distance = calcRotation($dragged.element,$canvasMousePos).distance
        let percent = calcRotation($dragged.element,$canvasMousePos).percent
        if($dragged.id === 'vol'){
            if(distance > 40){
                volumeVal.set(-48+48*percent)
            }
            knob_left.children[0].tint = 0xffffff
            if($tweenKnobLeft === 0){
                tweenKnobLeft.set(1)
            }
        }
        if($dragged.id === 'osc'){
            let inc = 1/oscillators.length
            let steppedPercent = constrain(Math.floor(percent/inc),{min:0,max:18})
            if(distance > 40){
                if(oscillators[steppedPercent] !== $oscillatorType){
                    if('vibrate' in navigator){
                        navigator.vibrate(50);
                    }
                    oscillatorType.set(oscillators[steppedPercent])
                }
            }
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

loaded.set(true)

</script>