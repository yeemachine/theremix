<script>
import Keycap from './UI.keycap.svelte'
import {active,keydown_S,keydown_K,tonic,scaleType,thereminPos,thereminMobilePos,HEIGHT,WIDTH,SCALE} from './stores.js'
import {onMount} from 'svelte'

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


<container 
bind:this={containerDom} 
bind:clientWidth={containerWidth} 
bind:clientHeight={containerHeight} 
class="{scaleTypeState !== $scaleType || tonicState !== $tonic || $keydown_S || $keydown_K ? '': 'hide'}"

>
    <h3>{$tonic}</h3>
    <h4>{$scaleType}</h4>
    <div>
        <Keycap letter={'S'} styles={'margin-right:8px'}/>
        <Keycap letter={'K'}/>
    </div>
</container>
<Keycap letter={'O'} position={'absolute'} top={$WIDTH>600 ? .7676 : 0} left={$WIDTH>600 ? .679 : .5095}/>
<Keycap letter={'G'} position={'absolute'} top={$WIDTH>600 ? .7676 : 0} left={$WIDTH>600 ? .7415 : .778}/>


<style>
    container{
        position: absolute;
        width: max-content;
        height: max-content;
        top:0;left:0;right:0;bottom:0;
        margin: auto;
        padding-bottom: 5vh;
        color: rgb(var(--crimson));
        pointer-events: none;
        text-align: center;
        transition: 0s;
    }
    container.hide{
        opacity:0;
        transition: opacity .5s 1s
    }
    /* container.hide.load{
        opacity: 1;
        transition: opacity .5s 1s
    } */
    h3{
        font-variation-settings: "wght" 100, "wdth" 140, "ital" 0;
    line-height: 1;
    font-size: calc(12px + 4vw + 6vh);
    margin: 0;
    padding: 0 0 16px 0;
    border-bottom: 1px solid rgb(var(--crimson)); 
    }
    h4{
        font-variation-settings: "wght" 70, "wdth" 70, "ital" 0;
    /* opacity: 0.5; */
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

    @media only screen and (max-width: 600px) {
        container{
            padding-bottom: 30vh;
        }
    }

</style>