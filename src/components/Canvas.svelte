<script>
import { onMount } from 'svelte';
import { tweened,spring } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {loaded,WIDTH,HEIGHT,mousePos,expandSettings} from './stores.js'
import {App,Stage,Resources} from './pixiApp.js'
import BG from './PIXI.Sprite.bg.svelte'
import Table from './PIXI.Sprite.table.svelte'
import Theremin from './PIXI.Sprite.theremin.svelte'
import AmbientLights from './PIXI.Light.ambient.svelte'
import CursorLight from './PIXI.Light.cursor.svelte'
import PIXIGraphics from './PIXI.graphics.svelte';

let containerWidth,
canvasContainer, containerHeight;
let noiseFilter = new PIXI.filters.NoiseFilter(.2,.19294618)
let blurFilter = new PIXI.filters.BlurFilter()
blurFilter.blur = 0
blurFilter.quality = 1
blurFilter.enabled = false
Stage.filterArea = App.screen;
Stage.filters = [blurFilter,noiseFilter];

const tween0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

$: {
    WIDTH.set(containerWidth)
    HEIGHT.set(containerHeight)
    App.view.width = $WIDTH;
    App.view.height = $HEIGHT;
    App.renderer.resize($WIDTH,$HEIGHT)  
    App.render()
    if($expandSettings && $tween0_1 === 0){
        tween0_1.set(1)
    }
    if(!$expandSettings && $tween0_1 === 1){
        tween0_1.set(0)
    }
    blurFilter.blur = 0 + $tween0_1*5
    blurFilter.enabled = ($tween0_1 > 0) ? true : false
};

let handleClick = e => {
    mousePos.set({
        x:e.clientX,
        y:e.clientY
    })
}

onMount(async () => {
    canvasContainer.appendChild(App.view);
});

</script>

<div 
on:pointerdown={handleClick}
bind:this={canvasContainer} 
bind:clientWidth = {containerWidth} 
bind:clientHeight = {containerHeight} 
class="canvasContainer">
    {#await Resources}

        <!-- Loading -->

    {:then value}

        <!-- Null Obj for global interactions -->
        <!-- <NullObject stage={Stage}/> -->

        <!-- Sprites -->
        <BG stage={Stage} textures={value}/>
        <Table stage={Stage} textures={value}/>
        <Theremin stage={Stage} textures={value}/> 
        <PIXIGraphics stage={Stage}/>
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
    height:100vh;
    grid-column: 1 / 13;
    display:flex;
    align-items:center;
    justify-content:center;
}
:global(canvas){
    width:100%;
}
</style>