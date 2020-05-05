<script>
import {loaded,active,WIDTH,HEIGHT,SCALE,thereminPos} from './stores.js';
import { onMount } from 'svelte';
import Logo from './icons/logo.svelte'; 
import Play from './icons/play.svelte'; 

const handleClick = ()=>{
    active.set(true)
}
</script>

<section class="{$active ? 'hide' : ''}">
    <h1 class="{(!$loaded || $active) ? 'hide' : ''}">Celebrating 100 years of the theremin</h1>
    <div class="title">
        <Logo hide={(!$loaded || $active) ? true : false}/>
    </div>
    <div 
    class="play"
    on:touchend={handleClick}
    on:mouseup={handleClick}
    >
        <Play loaded={$loaded} hide={$active}/>
    </div>
</section>


<style>
    @keyframes animateGlyph {
	0%   { font-variation-settings: "anim" 100; }
	100% { font-variation-settings: "anim" 200; }
	}
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
        transition: 1s;
    }
    h1.hide{
        opacity: 0;
        pointer-events: none;
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
    }


</style>