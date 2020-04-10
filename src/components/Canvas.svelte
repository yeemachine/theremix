<script>
import { onMount } from 'svelte';
import {WIDTH,HEIGHT,ScaleInc,canvasPos} from './stores.js'
import {App,Stage,Resources} from './pixiApp.js'
import NullObject from './NullObject.svelte'
import BG from './BG.svelte'
import Table from './Table.svelte'
import Theremin from './Theremin.svelte'
import AmbientLights from './AmbientLights.svelte'
import CursorLight from './CursorLight.svelte'
import Play from './Play.svelte'
import Settings from './Settings.svelte'

let containerWidth,
canvasContainer, containerHeight;
let noiseFilter = new PIXI.filters.NoiseFilter(.15,.19294618)
let blurFilter = new PIXI.filters.BlurFilter()
blurFilter.blur = 0
blurFilter.quality = 1
blurFilter.enabled = false
console.log(blurFilter)
Stage.filterArea = App.screen;
Stage.filters = [blurFilter,noiseFilter];

$: {
    WIDTH.set(containerWidth)
    HEIGHT.set(containerHeight)
    App.view.width = $WIDTH;
    App.view.height = $HEIGHT;
    App.renderer.resize($WIDTH,$HEIGHT)  
};

onMount(async () => {
    canvasContainer.appendChild(App.view);
});

</script>

<div bind:this={canvasContainer} bind:clientWidth = {containerWidth} bind:clientHeight = {containerHeight} class="canvasContainer">
    {#await Resources}

        <!-- Loading -->

    {:then value}

        <!-- Null Obj for global interactions -->
        <NullObject stage={Stage}/>

        <!-- Sprites -->
        <BG stage={Stage} textures={value}/>
        <Table stage={Stage} textures={value}/>
        <Theremin stage={Stage} textures={value}/> 

        <!-- Lights -->
        <AmbientLights stage={Stage}/>
        <CursorLight app={App} stage={Stage}/>

        <Play/>

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