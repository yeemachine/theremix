<script>
import { onMount } from 'svelte';
import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {constrain,findNext} from '../helpers.js'
import {active,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,SCALE,canvasMousePos,mousePos,globalPointerUp,dragged,mouseOverride,hovered,manual,glide,oscillatorType,scaleType,tonic,keydown_O,keydown_G,keydown_S,keydown_K,keydown_M,keydown_left,keydown_right,keydown_down,keydown_up,enableMIDI,currentMIDI} from '../stores.js'
import {oscillators,scales,tonicOrder,midiList} from '../config.js'
import Title from './UI/UI.title.svelte'
import Manual from './UI/UI.manual.svelte'
import PixiApp from './PIXI.svelte'

let containerWidth,
canvasContainer, containerHeight;
let scale
let maxWidth = 1440

const active0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

$: {
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
}
$: {
    if($active && $active0_1 === 0){
        active0_1.set(1)
    }
    if(!$active && $active0_1 === 1){
        active0_1.set(0)
    }
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
    containerWidth = canvasContainer.clientWidth;
    containerHeight = canvasContainer.clientHeight;
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
            dataLayer.push({'event':'glide-key'});
        }
        if(keyCode===77 && !$keydown_M){
            enableMIDI.set(!$enableMIDI)
            keydown_M.set(true)
            dataLayer.push({'event':'MIDI-key'});
        }
        if(keyCode===79 && !$keydown_O){
            let nextItem = findNext($oscillatorType,oscillators)
            oscillatorType.set(nextItem)
            keydown_O.set(true)
            dataLayer.push({'event':'osc-key'});
        }
        if(keyCode===83 && !$keydown_S){
            let nextItem = findNext($scaleType,scales)
            scaleType.set(nextItem)
            keydown_S.set(true)
            dataLayer.push({'event':'scales-key'});
        }
        if(keyCode===75 && !$keydown_K){
            let nextItem = findNext($tonic,tonicOrder)
            tonic.set(nextItem)
            keydown_K.set(true)
            dataLayer.push({'event':'keys-key'});
        }

        if(keyCode===37 && !$keydown_left){
            keydown_left.set(true)
            if($keydown_O){
                let nextItem = findNext($oscillatorType,oscillators,'reverse')
                oscillatorType.set(nextItem)
                dataLayer.push({'event':'osc-key'});
            }else if($keydown_K){
                let nextItem = findNext($tonic,tonicOrder,'reverse')
                tonic.set(nextItem)
                dataLayer.push({'event':'keys-key'});
            }else if($keydown_S){
                let nextItem = findNext($scaleType,scales,'reverse')
                scaleType.set(nextItem)
                dataLayer.push({'event':'scales-key'});
            }else{
                 if($enableMIDI){
                     let nextItem = findNext($currentMIDI,Object.keys(midiList),'reverse')
                     currentMIDI.set(nextItem)
                     dataLayer.push({'event':'MIDI-key'});
                }
            }
        }
        if(keyCode===39 && !$keydown_right){
            keydown_right.set(true)
            if($keydown_O){
                let nextItem = findNext($oscillatorType,oscillators)
                oscillatorType.set(nextItem)
                dataLayer.push({'event':'osc-key'});
            }else if($keydown_K){
                let nextItem = findNext($tonic,tonicOrder)
                tonic.set(nextItem)
                dataLayer.push({'event':'keys-key'});
            }else if($keydown_S){
                let nextItem = findNext($scaleType,scales)
                scaleType.set(nextItem)
                dataLayer.push({'event':'scales-key'});
            }else{
                 if($enableMIDI){
                     let nextItem = findNext($currentMIDI,Object.keys(midiList))
                     currentMIDI.set(nextItem)
                     dataLayer.push({'event':'MIDI-key'});
                }
            }
        }
    }
    
}

const handleKeyup = e => {
    const key = event.key;
    const keyCode = event.keyCode;
        if(keyCode===71){
            glide.set(true)
            keydown_G.set(false)
        }
        if(keyCode===77){
            keydown_M.set(false)
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

onMount(async () => {
    containerWidth = canvasContainer.clientWidth;
    containerHeight = canvasContainer.clientHeight;
    WIDTH.set(containerWidth)
    HEIGHT.set(containerHeight)
});

let pixiLoaded = false, pixiLayers = false, pixiLights = false
</script>

<svelte:head>
    <script defer src="https://cdn.jsdelivr.net/npm/pixi.js@4.8.8/dist/pixi.min.js" on:load={()=>{pixiLoaded=true}}></script>
    {#if pixiLoaded}
        <script defer src="/libraries/pixi.layers.js" on:load={()=>{pixiLayers=true}}></script>
    {/if}
    {#if pixiLayers}
        <script defer src="/libraries/pixi-lights.js" on:load={()=>{pixiLights=true}}></script>
    {/if}
</svelte:head>


<svelte:window 
on:orientationchange={handleOrientation}
on:keydown={handleKeydown}
on:keyup={handleKeyup}
/> 

<div 
bind:clientWidth = {containerWidth} 
bind:clientHeight = {containerHeight} 
on:touchstart={(e)=>{updateMouse(e)}}
on:touchend={()=>{globalPointerUp.set(true)}}
on:mouseup={(e)=>{globalPointerUp.set(true)}}
on:touchmove={(e)=>{updateMouse(e)}}
on:mousemove={(e)=>{updateMouse(e)}}
bind:this={canvasContainer} 
class="canvasContainer {
    $hovered==='switch'?'hovered'
    : ($hovered==='knob right' || $hovered==='knob left') ? 'grab'
    :''
} {$dragged ? 'grabbing' : ''}"
>
    <Title/>
    <Manual/>

    {#if pixiLoaded && pixiLayers && pixiLights}
        <PixiApp/>
    {/if}

</div>

<style>
.canvasContainer{
    width:100%;
    height:100%;
    grid-column: 1 / 13;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow: hidden;
}
.canvasContainer.hovered{
    cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
}
.canvasContainer.grab{
    cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fgrab.svg?v=1591926626154) 14 0, grab;
}
.canvasContainer.grabbing{
    cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fgrabbed.svg?v=1591926626227) 14 0, grabbing;
}
:global(canvas){
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
}
</style>