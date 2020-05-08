<script>
import {loaded,active,WIDTH,HEIGHT,SCALE,thereminPos} from './stores.js';
import { onMount } from 'svelte';
import Logo from './UI.logo.svelte'; 

</script>

<section>
    <label>Celebrating 100 years of the theremin<span>O</span></label>
    <h1>
        <span>T</span>
        <span>H</span>
        <span>E</span>
        <span>R</span>
        <span>E</span>
        <span>M</span>
        <span>I</span>
        <span>X</span>
    </h1>
    <div>
        <Logo/>
    </div>
</section>


<style>
    section{
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        position:absolute;
        top:20vh;
        left:0;
        right:0;
        /* width:max-content; */
        margin-left:auto;
        margin-right:auto;
        text-align: center;
        white-space: nowrap;
        /* width: 80vw; */
        /* max-width: 600px; */
    }
    div{
        width: 80vw;
        max-width:900px;
        max-height:20vh;
        margin-top:16px;
    }
    label{
        font-size: 18px;
        color:var(--offwhite);
        width:max-content;
        font-variation-settings: "wght" 70, "wdth" 118, "ital" 0;
    }
    label span{
        font-size: 32px;
        position:relative;
        padding-left: .25em;
        color:transparent;
    }
    label span:before{
        content:'O';
        position:absolute;
        top:.15em;
        color:var(--offwhite);
        animation: animateGlyph 1s linear infinite;
        animation-play-state: start;
    }
    h1{
        color:transparent;
        font-size: calc(60px + 3vw);
        font-family: 'Whirly Birdie';
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-variation-settings: "wght" 90, "wdth" 150, "ital" 0;
        font-feature-settings: 'ss01';
        padding:8px 0 0 0;
        margin:8px 0 0 0;
        font-weight: normal;
        overflow: hidden;
        line-height:.85;
        display:none;
    }
    h1 span{
        color:var(--crimson);
        font-family: 'Whirly Birdie';
        width:max-content;
        position: relative;
        overflow: visible;
    }
    
    h1 span:nth-child(1){
        letter-spacing: -.07em;
    }
    h1 span:nth-child(2){
        letter-spacing: -0.12em;
    }
    h1 span:nth-child(3){
        letter-spacing: -.11em;
    }
    h1 span:nth-child(4){
        letter-spacing:-.09em;
    }
    h1 span:nth-child(5){
        letter-spacing: -.12em;
    }
    h1 span:nth-child(5):before{
        content: '';
        position: absolute;
        display: block;
        top: -.02em;
        left: .08em;
        background: var(--crimson);
        width: .92em;
        height: .025em;
    }
    h1 span:nth-child(6){
        letter-spacing: -.125em;
    }
    h1 span:nth-child(7){
        letter-spacing: -0.06em;
    }
    h1 span:nth-child(8){
        letter-spacing: .1em;
    }
    h1 span:nth-child(6),h1 span:nth-child(7),h1 span:nth-child(8){
        font-variation-settings: "wght" 90, "wdth" 150, "ital" 20;
        transition: font-variation-settings .5s;
    }
   
    label span{
        font-family: 'Whirlybats'
    }

</style>