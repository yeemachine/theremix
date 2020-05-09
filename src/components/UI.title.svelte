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
        document.querySelector('.cover').classList.add('hide')
        window.setTimeout(()=>{
            coverLoaded.set(true)
        },2000)
    }
}
</script>

<section class="{$active ? 'hide' : ''}">
    <h1 class="{(!$coverLoaded || $active) ? 'hide' : ''}">Celebrating <span>100 years</span> of the theremin</h1>
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
<!-- <div class="cover {($loaded) ? 'hide' : ''}">
    {#if fontLoaded}
        <div class="icon">
        O
        <span>
            <Antenna/>
        </span>
        </div>
    {/if}
</div> -->

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
        width:65vw;
        max-height: 15vh;
        max-width: 1000px;
        margin-bottom: 16px;
        /* display: none; */
    }
    .play{
        width: 25vh;
        height:25vh;
        max-width:25vh;
        overflow:visible;
        max-height:40vw;
        margin:2.5vh 0 2.5vh 0;
        pointer-events: all;
    }
    .hide .play{
        pointer-events: none;
    }
    h1{
        font-size: calc(12px + .2vw);
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
        /* display: none; */
    }
    h1 span{
        color:var(--sun)
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
		padding:16px 24px 16px 24px;
		background: rgba(229,70,70,.15);
        border-left: 2px solid var(--crimson);
        border-right: 2px solid var(--crimson);
		color:var(--offwhite);
		/* border-radius:4px; */
		font-family: 'Whirly Birdie';
		font-variation-settings: "wght" 90, "wdth" 120, "ital" 0;
        transition: opacity 1s cubic-bezier(0.46, 0.03, 0.52, 0.96) .4s;
        font-size:16px;
    }
    .manual:hover{
        background: rgba(229,70,70,.7);
    }
    .manual.hide{
        opacity: 0;
        pointer-events: none;
        transition: opacity .6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;
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
      .play{
        width: 40vw;
        height:40vw;
        max-width:40vw;
        max-height:40vw;
        margin:2.5vw 0 2.5vw 0;
    }
    
    }


</style>