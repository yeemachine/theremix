<script>
import Keycap from './UIElements/UI.keycap.svelte'
import {keydown_S,keydown_K,keydown_O,keydown_G,keydown_M,tonic,scaleType,thereminPos,HEIGHT,WIDTH,SCALE,showGuides,videoReady} from '../../stores.js'

let containerDom
let containerWidth = 0
let containerHeight = 0
let containerPos = {top:0,left:0}
let scaleTypeState = $scaleType;
let tonicState = $tonic;
$: {
    containerPos = {
        top: $thereminPos.y/$SCALE+$thereminPos.height/$SCALE*.55-containerHeight*.5, 
        left: ($thereminPos.x/$SCALE+$thereminPos.width/$SCALE*.525) - containerWidth*.5
    }
}

let delay

$:{
    if(tonicState !== $tonic || scaleTypeState !== $scaleType){
        clearTimeout(delay)
        delay = setTimeout(() => {
            tonicState = $tonic
            scaleTypeState = $scaleType
        }, 100);
    }
}

</script>

<section 
bind:this={containerDom} 
bind:clientWidth={containerWidth} 
bind:clientHeight={containerHeight} 
class="{scaleTypeState !== $scaleType || tonicState !== $tonic || $keydown_S || $keydown_K ? '': 'hide'}"

>
    <h3>{$tonic}</h3>
    <h4>{$scaleType}</h4>
    <div>
        <Keycap hide={!$keydown_S} letter={'S'} styles={'margin-right:8px'}/>
        <Keycap hide={!$keydown_K} letter={'K'}/>
    </div>
</section>
<Keycap hide={!$keydown_O} letter={'O'} position={'absolute'} top={$WIDTH>600 ? .7676 : 0} left={$WIDTH>600 ? .679 : .5095}/>
<Keycap hide={!$keydown_G} letter={'G'} position={'absolute'} top={$WIDTH>600 ? .7676 : 0} left={$WIDTH>600 ? .7415 : .778}/>
<Keycap hide={!$keydown_M} letter={'M'} position={'absolute'} top={$WIDTH>600 ? .7676 : 0} left={$WIDTH>600 ? .5005 : .5095}/>
<p class="label {(!$showGuides || !$videoReady) ? 'hide' :''}"
style="{!$showGuides ? '' : ''}">Fit your body in frame</p>

<style>
    section{
        position: absolute;
        width: max-content;
        height: max-content;
        top:0;left:0;right:0;bottom:0;
        margin: auto;
        padding-bottom: 5vh;
        color: rgb(var(--offwhite));
        pointer-events: none;
        text-align: center;
        transition: 0s;
    }
    section.hide{
        opacity:0;
        transition: opacity .5s 1s
    }
    h3{
        font-variation-settings: "wght" 100, "wdth" 140, "ital" 0;
    line-height: 1;
    font-size: calc(12px + 4vw + 6vh);
    margin: 0;
    padding: 0 0 16px 0;
    border-bottom: 1px solid rgb(var(--offwhite)); 
    }
    h4{
        font-variation-settings: "wght" 70, "wdth" 70, "ital" 0;
    font-size: calc(8px + 1vw + 2vh);
    margin: 16px 0 0 0;
    letter-spacing: .02em;
    color:rgb(var(--offwhite))
    }
    div{
        margin:16px 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .label.hide{
        opacity: 0;
        transition: opacity 1s;
    }
    .label{
        position: absolute;
        top: 312px;
        left: 62px;
        width: max-content;
        line-break: normal;
        font-size: 14px;
        font-family: 'Nicholson Beta';
        background: rgb(var(--offwhite));
        padding: 6px 12px 6px 12px;
        border-radius: 16px;
        color: rgb(var(--darkcrimson));
        text-align: center;
        text-shadow: 0 0 20px rgba(0,0,0,0.5);
        transition: 0s;
        display: flex;
        justify-content: center;
        pointer-events: none;
        transition: opacity .5s 1s
    }
    .label:before{
        content: '';
        position: absolute;
        top: -6px;
        margin: auto;
        pointer-events: none;
        border-style: solid;
        border-width: 0px 4px 6px 4px;
        border-color:  transparent transparent rgb(var(--offwhite)) transparent;
    }

    @media only screen and (max-width: 600px) {
        h3{
            font-size: calc(10px + 3vw + 5vh);
        }
        section{
            padding-bottom: 30vh;
        }
        .label{
            top: 262px;
            left: 35px;
        }
    }

</style>