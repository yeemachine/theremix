<script>
import {loaded,active,WIDTH,HEIGHT,SCALE,thereminPos} from './stores.js';
import { onMount } from 'svelte';

let playContainer
let playWidth = 0
let playHeight = 0
let playPos = {top:0,left:0}
$: {
    playPos = {
        top: ($WIDTH > 600) 
        ? $thereminPos.y/$SCALE+$thereminPos.height/$SCALE*.55-playHeight 
        : $HEIGHT*.45-playHeight*.5, 
        left: ($thereminPos.x/$SCALE+$thereminPos.width/$SCALE*.525) - playWidth*.5
    }
}
const handleClick = () => {
      active.set(true)
    // Tone.context.resume()
}



</script>

<div 
class={
    $loaded && $active ? 'active loaded'
    : $active ? 'active'
    : $loaded ? 'loaded' 
    : ''
}
bind:this={playContainer} 
bind:clientWidth={playWidth} 
bind:clientHeight={playHeight} 
style="top:{playPos.top}px;left:{playPos.left}px"
>
    <svg
    on:touchend={handleClick}
    on:mouseup={handleClick}
    width="313" height="266" viewBox="0 0 313 266" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class='inner' d="M38.7005 4.67073L301.955 123.55C313.067 128.568 312.9 144.406 301.684 149.188L38.198 261.538C21.0468 268.851 2 256.267 2 237.622V28.3667C2 9.48487 21.492 -3.10026 38.7005 4.67073Z"/>
        <path class='outer' d="M38.7005 4.67073L301.955 123.55C313.067 128.568 312.9 144.406 301.684 149.188L38.198 261.538C21.0468 268.851 2 256.267 2 237.622V28.3667C2 9.48487 21.492 -3.10026 38.7005 4.67073Z"/>
    </svg>
    <section>
        <p>Celebrating 100 Years <span>O</span></p>
    </section>
    
</div> 

<style>
    p{
        font-size:calc(12px + 1vw);
        color:#FFF5D0;
        margin: 0;
        text-align: center; 
        transform: translateY(20px);
        transition: transform .6s cubic-bezier(0.31, 0.7, 0.26, 1.5), opacity .4s cubic-bezier(0.46, 0.03, 0.52, 0.96);
        white-space: nowrap;
    }
    svg:hover{
        cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
    }
    span{
        font-family:'Whirlybats';
        font-size: calc(18px + 2vw);
        color:transparent;
        /* padding-left: .125em; */
        position:relative;
        overflow: hidden;
        width:calc(18px + 2vw)
    }
    /* div:hover span:before{
        color:rgba(229,70,70,1)
    } */
    span:before{
        position:absolute;
        content: 'O';
        display:block;
        width:inherit;
        color:#FFF5D0;
        top:10%;
        left:0;
    }
    section{
        display:none;
        overflow: hidden;
        margin-top: 5%;
        /* margin-left: 5%; */
        width:max-content;
        transition:opacity .4s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    }
    .loaded.active p{
        opacity:0;
        transform: translateY(20px);
        transition: transform 0s linear .4s, opacity .4s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    }
    .loaded p{
        transform: translateY(0px)
    }
    .loaded span{
        animation: animateGlyph 1s linear infinite;
        animation-play-state: start;
    }
    .loaded.active span{
        animation-play-state: paused;
    }
    div{
        position:absolute;
        display:flex;
        align-items:center;
        justify-content: center;
        flex-direction: column;
        margin:0;
        opacity:0;
        transition:opacity .4s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    }
    div.loaded{
        opacity:1;
        /* opacity:0; */
    }
    div.loaded.active{
        pointer-events: none;
        /* opacity:0; */
    }
    svg{
        width:20vw;
        height:10vw;
        max-width:160px;
        max-height:136px;
        min-width:100px;
        min-height:85px;
        transform-origin: center;
        transform:translate(2%,12%);
        overflow:visible;
        transition:.25s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    }
    .loaded.active svg{
        opacity:0;
        transform:scale3d(1.5,1.5,1.5) translate(2%,12%);
    }
    .outer{
        opacity:0;
        fill:rgba(229,70,70,.4);
        transform-origin: 35% 50%;
        transform: translate(6%, 10%) scale(0.95);
        /* transform: translate(6%, 10%) scale(0.95); */
    }
    .inner{
        /* opacity:0; */
        stroke:rgba(229,70,70,1);
        stroke-width: 4px;
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        stroke-linecap: round;
        transform-origin: 35% 50%;
        transform: translate(-2%, -4%);
    }
    .loaded .inner{
        animation: drawforward 1s cubic-bezier(0.46, 0.03, 0.52, 0.96);
        animation-fill-mode: forwards;
        transition:transform .4s;
    }
    .loaded .outer{
        animation: appear .8s cubic-bezier(0.46, 0.03, 0.52, 0.96);
        animation-fill-mode: forwards;
        transition:fill .2s, transform .4s;
        transition-delay:fill .2s;
    }
    .loaded svg:hover .inner{
        transform: translate(0, 0);
        /* transform: translate(8%, 13%) scale(0.9125); */
    }
    .loaded svg:hover .outer{
        fill:rgba(229,70,70,.2);
        transform: translate(0, 0) scale(1);
        /* transform: translate(8%, 13%) scale(0.9125); */
    }
 
 
    @keyframes drawforward {
        to {
            stroke-dashoffset: 1;
        }
    }
     @keyframes drawback {
        to {
            stroke-dashoffset: -1000;
        }
    }
    @keyframes appear{
        to{
            opacity:1
        }
    }
    @keyframes hide{
        to{
            opacity:0
        }
    }

    @media screen and (max-width: 600px) {
      
    }


</style>