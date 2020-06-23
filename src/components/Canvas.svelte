<script>
import { onMount } from 'svelte';
import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {constrain,findNext} from './helpers.js'
import {active,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,SCALE,canvasMousePos,mousePos,globalPointerUp,dragged,mouseOverride,hovered,manual,glide,oscillatorType,scaleType,tonic,keydown_O,keydown_G,keydown_S,keydown_K,keydown_M,keydown_left,keydown_right,keydown_down,keydown_up,enableMIDI,currentMIDI} from './stores.js'
import {oscillators,scales,tonicOrder,midiList} from './config.js'
import {App,Stage,Resources} from './pixiApp.js'
import BG from './PIXI/PIXI.Sprite.bg.svelte'
import Table from './PIXI/PIXI.Sprite.table.svelte'
import Video from './PIXI/PIXI.Sprite.video.svelte';
import Theremin from './PIXI/PIXI.Sprite.theremin.svelte'
import ThereminMobile from './PIXI/PIXI.Sprite.theremin.mobile.svelte'
import AmbientLights from './PIXI/PIXI.Light.ambient.svelte'
import CursorLight from './PIXI/PIXI.Light.cursor.svelte'
import PIXIGraphics from './PIXI/PIXI.graphics.svelte';
import Text from './PIXI/PIXI.text.svelte'
import Title from './UI/UI.title.svelte'
import Manual from './UI/UI.manual.svelte'

  
  
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

    App.view.width = $CANVASWIDTH;
    App.view.height = $CANVASHEIGHT;
    App.renderer.resize($CANVASWIDTH,$CANVASHEIGHT)  
    App.render()

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
        if(keyCode===77 && !$keydown_M){
            enableMIDI.set(!$enableMIDI)
            keydown_M.set(true)
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
                 if($enableMIDI){
                     let nextItem = findNext($currentMIDI,Object.keys(midiList),'reverse')
                     currentMIDI.set(nextItem)
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
                 if($enableMIDI){
                     let nextItem = findNext($currentMIDI,Object.keys(midiList))
                     currentMIDI.set(nextItem)
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
    canvasContainer.appendChild(App.view);
    containerWidth = document.documentElement.clientWidth;;
    containerHeight = document.documentElement.clientHeight;
    WIDTH.set(containerWidth)
    HEIGHT.set(containerHeight)
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
style="width:{containerWidth}px;height:{containerHeight}px"
class="canvasContainer {
    $hovered==='switch'?'hovered'
    : ($hovered==='knob right' || $hovered==='knob left') ? 'grab'
    :''
} {$dragged ? 'grabbing' : ''}"
>
    <Title/>
    <Manual/>
    
    {#await Resources}

        <!-- Loading -->

    {:then value}
        
        <!-- Sprites -->
        <BG stage={Stage} textures={value}/>
        <PIXIGraphics stage={Stage}/>
        <Table stage={Stage} textures={value}/>
        <Theremin stage={Stage} textures={value}/> 
        <ThereminMobile stage={Stage} textures={value}/> 
        <Text stage={Stage}/>
        <Video stage={Stage} textures={value}/>
        <!-- Lights -->
        <AmbientLights stage={Stage}/>
        <CursorLight app={App} stage={Stage}/>

    {:catch err}

        <!-- Error -->

    {/await}
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
}
</style>