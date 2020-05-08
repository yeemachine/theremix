<script>
import {loaded,active,WIDTH,HEIGHT,SCALE,thereminPos,manual,coverLoaded} from './stores.js';
import { onMount } from 'svelte';
import Logo from './icons/logo.svelte'; 
import Play from './icons/play.svelte'; 
import Antenna from './icons/antenna.svelte'; 

let fontLoaded = false
const playStart = ()=>{
    active.set(true)
}

const manualOpen = ()=>{
    manual.set(true)
}

document.fonts.ready.then(function () {
  fontLoaded = true
});

$:{
    if($loaded){
        window.setTimeout(()=>{
            coverLoaded.set(true)
        },3100)
    }
}
</script>

<section class="{$active ? 'hide' : ''}">
    <h1 class="{(!$coverLoaded || $active) ? 'hide' : ''}">Celebrating 100 years of the theremin</h1>
    <div class="title">
        <Logo hide={(!$coverLoaded || $active) ? true : false}/>
    </div>

    <button 
    class="play"
    on:click={playStart}
    tabindex={!$active?1:-1}
    >
        <Play loaded={$coverLoaded} hide={$active}/>
    </button>

</section>
<button on:click={manualOpen} class="manual {($active || $manual) ? 'hide' : ''}">
		Operation Manual
</button>
<div class="cover {($loaded) ? 'hide' : ''}">
    {#if fontLoaded}
        <div class="icon">
        O
        <span>
            <Antenna/>
        </span>
        </div>
    {/if}
</div>

<style>
    section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: max-content;
        height: max-content;
        margin: auto;
        /* width: 100%; */
        /* height: 100%; */
        overflow: hidden;
        text-align: center;
        white-space: nowrap;
        pointer-events: none;
    }
    section{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
    .title{
        height: auto;
        width:60vw;
        max-height: 10vh;
        max-width: 900px;
        margin-bottom: 16px;
    }
    .play{
        width: 20vh;
        height:20vh;
        max-width:20vh;
        overflow:visible;
        max-height:40vw;
        margin:2.5vh 0 10vh 0;
        pointer-events: all;
    }
    .hide .play{
        pointer-events: none;
    }
    h1{
        font-size: calc(12px + +.1vh + .1vw);
        font-weight: normal;
        color:var(--offwhite);
        width:max-content;
        font-variation-settings: "wght" 70, "wdth" 118, "ital" 0;
        margin: 0 0 8px 0;
        pointer-events: all;
        transform-origin: center;
        transition: 
            transform .6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1.4s
            , opacity 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1s;
    }
    h1.hide{
        opacity: 0;
        pointer-events: none;
        transition: 
            transform .6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1.4s
            , opacity 1s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;
    }
    .manual{
		position:absolute;
		bottom:32px;
		left:32px;
		padding:16px 16px 16px 16px;
		background: rgba(229,70,70,.1);
		border: 1px solid var(--crimson);
		color:var(--offwhite);
		border-radius:4px;
		font-family: 'Whirly Birdie';
		font-variation-settings: "wght" 90, "wdth" 120, "ital" 0;
        transition: opacity 1s cubic-bezier(0.46, 0.03, 0.52, 0.96) .4s;
		font-size:18px;
	}
    .manual.hide{
        opacity: 0;
        pointer-events: none;
        transition: opacity .6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;
    }

    .cover{
        width:150%;
        height:150%;
        position: absolute;
        top:-25%;left: -25%;
        background: var(--crimson);
        transform: rotate(0deg) translate3d(0,0,0);
        transform-origin: center;
        transition:transform 2.5s cubic-bezier(0.46, 0.03, 0.52, 0.96) 2s;
        overflow:hidden
    }
    .cover.hide{
        transform: rotate(-8deg) translate3d(0,-200%,0);
        pointer-events: none;
    }
    .icon{
        font-family:'Whirlybats';
        font-size:calc(100px + 2vw);
        color:var(--offwhite);
        position: absolute;
        margin:auto;
        top:0;left:0;right:0;bottom:0;
        height: max-content;
        width:max-content;
        opacity: 0;
        animation: 
            animateGlyph 1s linear infinite,
            appear 1s linear .4s;
        animation-fill-mode: forwards;
        animation-play-state: start;
    }
    .icon:before{
        content: '';
        width: 75%;
        height: 44%;
        background: var(--charcoal);
        position: absolute;
        top: 30%;
        left: 12%;
        z-index: -1;
    }
    .icon span{
        position: absolute;
        width: 20%;
        height: 30%;
        top: -3%;
        right: 6%;
        display: flex;
    }
     @media screen and (max-width: 600px) {
        h1{
            font-size: 16px;
            font-weight: normal;
            color:var(--offwhite);
            width:max-content;
            font-variation-settings: "wght" 70, "wdth" 90, "ital" 0;
        }
        .title{
            height: auto;
            width:calc(100vw - 32px);
            max-height: 10vh;
            max-width: 600px;
            margin-bottom: 16px;
        }
        .manual{
		  width:calc(100% - 64px)
	  }
    
    }


</style>