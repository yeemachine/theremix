<script>
import {loaded,active,WIDTH,HEIGHT,thereminPos} from './stores.js';

let playContainer
let playWidth = 0
let playHeight = 0
let playPos = {top:0,left:0}
$: {
    playPos = {
        top: ($WIDTH > 600) ? $thereminPos.y+$thereminPos.height*.5-playHeight*.5 : $thereminPos.y+$thereminPos.height*.2 -playHeight*.5,
        left: $thereminPos.x+$thereminPos.width*.525-playWidth*.5
    }
}
const handleClick = () => {
      active.set(true)
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
on:pointerdown={handleClick}
style="top:{playPos.top}px;left:{playPos.left}px"
>
    <svg width="313" height="266" viewBox="0 0 313 266" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class='inner' d="M38.7005 4.67073L301.955 123.55C313.067 128.568 312.9 144.406 301.684 149.188L38.198 261.538C21.0468 268.851 2 256.267 2 237.622V28.3667C2 9.48487 21.492 -3.10026 38.7005 4.67073Z"/>
        <path class='outer' d="M38.7005 4.67073L301.955 123.55C313.067 128.568 312.9 144.406 301.684 149.188L38.198 261.538C21.0468 268.851 2 256.267 2 237.622V28.3667C2 9.48487 21.492 -3.10026 38.7005 4.67073Z"/>
    </svg>
    <section>
        <p>Play Theremin <span>9</span></p>
    </section>
    
</div> 

<style>
    p{
        font-family: 'Nicholson Beta';
        font-size:18px;
        color:white;
        padding-top: 24px;
        margin: 0;
        text-align: center; 
        transform: translateY(20px);
        transition: transform .7s cubic-bezier(0.31, 0.7, 0.26, 1.5);
    }
    span{
        font-family:'Whirlybats';
        font-size:18px;
    }
    section{
        overflow: hidden;
        margin-top: 5%;
    }
    .loaded p{
        transform: translateY(0px)
    }
    .loaded span{
        animation: animateGlyph 1s linear infinite;
        animation-play-state: start;
    }
    .active span{
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
    }
    div.active{
        pointer-events: none;
        opacity:0;
    }
    div:hover{
        cursor:pointer;
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
    }
    .loaded.active svg{
        opacity:0;
        transform:scale3d(1.5,1.5,1.5) translate(2%,12%);
        transition:.4s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    }
    .outer{
        opacity:0;
        fill:rgba(255,197,47,0);
        transform-origin: 35% 50%;
        /* transform: translate(6%, 10%) scale(0.95); */
    }
    .inner{
        /* opacity:0; */
        stroke:rgba(255,197,47,1);
        stroke-width: 4px;
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        stroke-linecap: round;
        transform-origin: 35% 50%;
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
    .loaded:hover .inner{
        transform: translate(-2%, -4%);
        /* transform: translate(8%, 13%) scale(0.9125); */
    }
    .loaded:hover .outer{
        fill:rgba(255,197,47,0.4);
        transform: translate(6%, 10%) scale(0.95);
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

    @keyframes animateGlyph {
    0%   { font-variation-settings: "anim" 100; }
    100% { font-variation-settings: "anim" 200; }
    }
</style>