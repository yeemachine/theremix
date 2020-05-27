<script>
import { onMount } from 'svelte';
import { tweened,spring } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {constrain} from './helpers.js'
import {active,loaded,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,SCALE,canvasMousePos,mousePos,expandSettings,globalPointerUp,dragged,mouseOverride,hovered,manual,glide,oscillatorType,scaleType,tonic,keydown_O,keydown_G,keydown_S,keydown_K,keydown_left,keydown_right,keydown_down,keydown_up,enableMIDI,MIDI_finished} from './stores.js'
import {oscillators,scales,tonicOrder} from './config.js'
import {App,Stage,Resources} from './pixiApp.js'
import BG from './PIXI.Sprite.bg.svelte'
import Table from './PIXI.Sprite.table.svelte'
import Video from './PIXI.Sprite.video.svelte';
import Theremin from './PIXI.Sprite.theremin.svelte'
import ThereminMobile from './PIXI.Sprite.theremin.mobile.svelte'
import AmbientLights from './PIXI.Light.ambient.svelte'
import CursorLight from './PIXI.Light.cursor.svelte'
import PIXIGraphics from './PIXI.graphics.svelte';
import TweenColor from './PIXI.tweenColor.svelte';
// import Logo from './PIXI.Sprite.logo.svelte';
import Text from './PIXI.text.svelte'
import Title from './UI.title.svelte'
import Manual from './UI.manual.svelte'

let containerWidth,
canvasContainer, containerHeight;
let noiseFilter = new PIXI.filters.NoiseFilter(.02,.1186887)
let blurFilter = new PIXI.filters.BlurFilter()
// let colorMatrix = new PIXI.filters.ColorMatrixFilter();
// colorMatrix.desaturate()

blurFilter.blur = 0
// blurFilter.quality = 1
blurFilter.enabled = false
Stage.filterArea = App.screen;
Stage.filters = [blurFilter];
let scale
let maxWidth = 1440
const tween0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});
const active0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

let stopApp

$: {
    // alert(containerWidth+','+containerHeight)
    WIDTH.set(containerWidth)
    HEIGHT.set(containerHeight)
    SCALE.set(
        constrain(
            maxWidth/containerWidth,
            {min:1.25,max:2}
        )
    )

    CANVASWIDTH.set(containerWidth*$SCALE)
    CANVASHEIGHT.set(containerHeight*$SCALE)

    App.view.width = $CANVASWIDTH;
    App.view.height = $CANVASHEIGHT;
    App.renderer.resize($CANVASWIDTH,$CANVASHEIGHT)  
    App.render()

    // if($manual){
    //     stopApp = setTimeout(function(){ App.stop() }, 3000);
    // }else{
    //     clearTimeout(stopApp);
    //     App.start()
    // }

}
$: {
   if($expandSettings && $tween0_1 === 0){
        // tween0_1.set(1)
    }
    if(!$expandSettings && $tween0_1 === 1){
        tween0_1.set(0)
    }
    if($active && $active0_1 === 0){
        active0_1.set(1)
    }
    if(!$active && $active0_1 === 1){
        active0_1.set(0)
    }
    blurFilter.blur = 0 + $tween0_1*20
    blurFilter.enabled = ($tween0_1 > 0) ? true : false
    // colorMatrix.alpha = 0.5 - 0.5*($active0_1)
};

let updateMouse = e => {
    let x,y

    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.touches[0] || e.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
       
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        x = e.clientX;
        y = e.clientY;
    }

    if(!$manual){
        mousePos.set({
        x:x,
        y:y
        })
        canvasMousePos.set({
            x:x*$SCALE,
            y:y*$SCALE
        })
    }  

    mouseOverride.set(0)
    globalPointerUp.set(false)
}

let updateMouseTouch = e => {
    alert(e.clientX)
}

const handleOrientation = e => {
    containerWidth = window.innerWidth;
    containerHeight = window.innerHeight;
    WIDTH.set(containerWidth)
    HEIGHT.set(containerHeight)
}

const handleKeydown = e => {
    const key = event.key;
    const keyCode = event.keyCode;
    if($active){
        if(keyCode===71 && !$keydown_G){
            glide.set(false)
            keydown_G.set(true)
        }
        if(keyCode===79 && !$keydown_O){
            let nextItem = findNext($oscillatorType,oscillators)
            oscillatorType.set(nextItem)
            keydown_O.set(true)
        }
        if(keyCode===83 && !$keydown_S){
            let nextItem = findNext($scaleType,scales)
            scaleType.set(nextItem)
            keydown_S.set(true)
        }
        if(keyCode===75 && !$keydown_K){
            let nextItem = findNext($tonic,tonicOrder)
            tonic.set(nextItem)
            keydown_K.set(true)
        }
        if(keyCode===37 && !$keydown_left){
            keydown_left.set(true)
            if($keydown_O){
                let nextItem = findNext($oscillatorType,oscillators,'reverse')
                oscillatorType.set(nextItem)
            }else if($keydown_K){
                let nextItem = findNext($tonic,tonicOrder,'reverse')
                tonic.set(nextItem)
            }else if($keydown_S){
                let nextItem = findNext($scaleType,scales,'reverse')
                scaleType.set(nextItem)
            }else{
                 if($enableMIDI && $MIDI_finished===null){
                    MIDI_finished.set('back')
                }
            }
        }
        if(keyCode===39 && !$keydown_right){
            keydown_right.set(true)
            if($keydown_O){
                let nextItem = findNext($oscillatorType,oscillators)
                oscillatorType.set(nextItem)
            }else if($keydown_K){
                let nextItem = findNext($tonic,tonicOrder)
                tonic.set(nextItem)
            }else if($keydown_S){
                let nextItem = findNext($scaleType,scales)
                scaleType.set(nextItem)
            }else{
                 if($enableMIDI && $MIDI_finished===null){
                    MIDI_finished.set('forward')
                }
            }
        }
    }
    
}

const handleKeyup = e => {
    const key = event.key;
    const keyCode = event.keyCode;
    // console.log(keyCode)
        if(keyCode===71){
            glide.set(true)
            keydown_G.set(false)
        }
        if(keyCode===79){
            keydown_O.set(false)
        }
        if(keyCode===83){
            keydown_S.set(false)
        }
        if(keyCode===75){
            keydown_K.set(false)
        }
        if(keyCode===37){
            keydown_left.set(false)
        }
        if(keyCode===39){
            keydown_right.set(false)
        }
    
}

const findNext = (item, arr, direction='forward') => {
    const index = arr.indexOf(item)
    let nextItem;
    if(direction==='reverse'){
        nextItem = (index > 0) ? arr[index-1] : arr[arr.length-1]
    }else{
        nextItem = (index < arr.length-1) ? arr[index+1] : arr[0]
    }
    return nextItem
}

onMount(async () => {
    canvasContainer.appendChild(App.view);
});


</script>

<svelte:window 
bind:innerWidth = {containerWidth} 
bind:innerHeight = {containerHeight} 
on:orientationchange={handleOrientation}
on:keydown={handleKeydown}
on:keyup={handleKeyup}
/> 

<div 
on:touchstart={(e)=>{updateMouse(e)}}
on:touchend={()=>{globalPointerUp.set(true)}}
on:mouseup={(e)=>{globalPointerUp.set(true)}}
on:touchmove={(e)=>{updateMouse(e)}}
on:mousemove={(e)=>{updateMouse(e)}}
bind:this={canvasContainer} 
class="canvasContainer {$hovered?'hovered':''}"
style="width:{containerWidth}px;height:{containerHeight}px"
>
    <Title/>
    <Manual/>
    
    {#await Resources}

        <!-- Loading -->

    {:then value}
        <!-- Null Obj for global interactions -->
        
        <!-- Sprites -->
        <BG stage={Stage} textures={value}/>
        <PIXIGraphics stage={Stage}/>
        <!-- <Logo stage={Stage} textures={value}/> -->
        <Table stage={Stage} textures={value}/>
        <Theremin stage={Stage} textures={value}/> 
        <ThereminMobile stage={Stage} textures={value}/> 
        <Text stage={Stage}/>
        <Video stage={Stage} textures={value}/>
        <!-- Lights -->
        <AmbientLights stage={Stage}/>
        <CursorLight app={App} stage={Stage}/>
        <!-- Color Tint -->
        <TweenColor/>


    {:catch err}

        <!-- Error -->

    {/await}
</div>


<style>
.canvasContainer{
    width:100vw;
    height:100vh;
    grid-column: 1 / 13;
    display:flex;
    align-items:center;
    justify-content:center;
}
.canvasContainer.hovered{
    cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
}
:global(canvas){
    width:100vw;
}
</style>