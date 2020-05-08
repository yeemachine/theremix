<script>
import { onMount } from 'svelte';
import { tweened,spring } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {constrain} from './helpers.js'
import {loaded,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,SCALE,canvasMousePos,mousePos,expandSettings,globalPointerUp,dragged,mouseOverride} from './stores.js'
import {App,Stage,Resources} from './pixiApp.js'
import BG from './PIXI.Sprite.bg.svelte'
import Table from './PIXI.Sprite.table.svelte'
import Video from './PIXI.Sprite.video.svelte';
import Theremin from './PIXI.Sprite.theremin.svelte'
import ThereminMobile from './PIXI.Sprite.theremin.mobile.svelte'
import AmbientLights from './PIXI.Light.ambient.svelte'
import CursorLight from './PIXI.Light.cursor.svelte'
import PIXIGraphics from './PIXI.graphics.svelte';
import Play from './UI.play.svelte'
import Text from './PIXI.text.svelte'
import Title from './UI.title.svelte'
import Manual from './UI.manual.svelte'

let containerWidth,
canvasContainer, containerHeight;
let noiseFilter = new PIXI.filters.NoiseFilter(.02,.1186887)
let blurFilter = new PIXI.filters.BlurFilter()
blurFilter.blur = 0
blurFilter.quality = 1
blurFilter.enabled = false
Stage.filterArea = App.screen;
Stage.filters = [blurFilter];
let scale
let maxWidth = 1440
const tween0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

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
}
$: {
   if($expandSettings && $tween0_1 === 0){
        tween0_1.set(1)
    }
    if(!$expandSettings && $tween0_1 === 1){
        tween0_1.set(0)
    }
    blurFilter.blur = 0 + $tween0_1*5
    blurFilter.enabled = ($tween0_1 > 0) ? true : false
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

    mousePos.set({
        x:x,
        y:y
    })
    canvasMousePos.set({
        x:x*$SCALE,
        y:y*$SCALE
    })
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

onMount(async () => {
    canvasContainer.appendChild(App.view);
});

</script>

<svelte:window 
bind:innerWidth = {containerWidth} 
bind:innerHeight = {containerHeight} 
on:orientationchange={handleOrientation}
/> 

<div 
on:touchstart={(e)=>{updateMouse(e)}}
on:touchend={()=>{globalPointerUp.set(true)}}
on:mouseup={(e)=>{globalPointerUp.set(true)}}
on:touchmove={(e)=>{updateMouse(e)}}
on:mousemove={(e)=>{updateMouse(e)}}
bind:this={canvasContainer} 
class="canvasContainer"
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
    width:100vw;
    height:100vh;
    grid-column: 1 / 13;
    display:flex;
    align-items:center;
    justify-content:center;
}
:global(canvas){
    width:100vw;
}
</style>