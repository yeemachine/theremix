<script>

import {active,enableMIDI,expandSettings,oscillatorType,scaleType,tonic,volumeVal,startOctave,endOctave,glide,MIDI_finished,currentMIDI} from './stores.js'
import {scales,oscillators,maxOctaves,maxTonicOctave,tonicOrder,midiList} from './config.js'
import Toggle from './UI.toggle.svelte'
import Slider from './UIElements/SteppedSlider.svelte'
// import Slider from 'svelte-slider'

let selectedScale
let selectedOsc
let selectedTonic
let selectedMIDI
let selectedTonicOctave = 4
// let selectedTonic = $tonic.replace(/[0-9]/g, '');
// let selectedTonicOctave = $tonic.replace(/\D/g, "");
let selectedStartOctave = 4
let selectedEndOctave = maxOctaves
let octaveDifference = selectedEndOctave - selectedStartOctave

const handleSlider = (e) => {
    selectedStartOctave = e.lower
    selectedEndOctave = e.upper
    // octaveDifference = selectedEndOctave - selectedStartOctave
    tonic.set(selectedTonic)
    // octaves.set(octaveDifference)
    startOctave.set(selectedStartOctave)
    endOctave.set(selectedEndOctave)
    console.log(e.lower,e.upper)
}

const updateVolume = (e) => {
    volumeVal.set(e.target.valueAsNumber)
}

</script>

<section class={($active && $expandSettings) ? '' : 'hide'}>
<h2>Theremin Controls</h2>
 <input
    on:input={(e)=>updateVolume(e)}
    type="range" min={-48} max={0} value={$volumeVal}>

<div class="select">
<select bind:value={selectedOsc} class="oscillators" 
on:change={()=>oscillatorType.set(selectedOsc)}
>
    {#each oscillators as oscName}
        <option value={oscName} selected={(oscName === $oscillatorType) ? true : false}>
            {oscName.replace(/-/g, ' ')}
        </option>
    {/each}
</select>
</div>

<Toggle 
    setting={glide} 
    hide={(!$expandSettings) ? true :false}/>

<div class="select">
<select bind:value={selectedScale} class="scales" 
on:change={()=>scaleType.set(selectedScale)}
>
    {#each scales as scaleName}
        <option value={scaleName} selected={(scaleName === $scaleType) ? true : false}>
            {scaleName.replace(/-/g, ' ')}
        </option>
    {/each}
</select>
</div>

<div class="select">
    <select bind:value={selectedTonic} class="oscillators" 
    on:change={()=>{
        if(selectedTonic){
            tonic.set(selectedTonic)
        }
        }}
    >
        {#each tonicOrder as tonicNote}
            <option value={tonicNote} selected={(tonicNote === $tonic) ? true : false}>
                {tonicNote}
            </option>
        {/each}
    </select>
</div>

<Slider on:change={(e) => handleSlider(e.detail)} initVal={[$startOctave, $endOctave]} min={1} max={maxOctaves}/>

<Toggle 
    setting={enableMIDI} 
    hide={(!$expandSettings) ? true :false}/>

<div class="select {$enableMIDI ? '' : 'hide'}">
    <select bind:value={selectedMIDI} class="midi" 
    on:change={()=>{
        if(selectedMIDI){
            currentMIDI.set(selectedMIDI)
        }
        }}
    >
        <!-- <option value='Off' selected={("Off" === $currentMIDI) ? true : false}>
                Off
        </option>  -->

        {#each Object.keys(midiList) as midiTitle}
            <option value={midiTitle} selected={(midiTitle === $currentMIDI) ? true : false}>
                {midiTitle}
            </option>
        {/each}
        
    </select>
</div>
<!-- <button style="width:50px;height:50px;background:red;" on:click={()=>{if($enableMIDI){MIDI_finished.set('forward')}}}></button>     -->
</section>

<style>
:global(:root) {
      --sliderPrimary: #FF9800;
      --sliderSecondary: rgba(0, 0, 0, 0.05);
}
/* section{
    --padding:56px;
    position:absolute;
    top:0;left:0;
    padding: calc(2 * var(--padding)) var(--padding) 0 var(--padding);
    width:calc(100% - 2 * var(--padding));
    height:calc(100% - 2 * var(--padding));
    overflow-y:scroll;
    background-color:rgba(0,0,0,0.5);
    transition:opacity .4s;
    display: flex;
    flex-direction: column;
} */
section{
	position: absolute;
    width: 80vw;
    height: max-content;
    max-height: calc(100% - 120px);
    max-width: 400px;
    max-height: 800px;
    /* margin: auto; */
    padding:24px;
    top:96px;
    right: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 16px;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    backdrop-filter: blur(30px);
    transition: opacity .7s cubic-bezier(0.55, 1.32, 0.51, 0.97);
    background: rgba(var(--offwhite), 0.2);
    overflow-y:scroll;
    color:rgb(var(--offwhite))
}
section.hide{
    opacity:0;
    pointer-events: none;
}
h2{
    margin: 0;
}

:root {
  --type: #ffffff;
  --bg: #000000;
  --accent: rgba(255,255,255,0.2)
}

select { outline: none; }

div {
  text-align: center;
}

    select, select option{
        text-transform: capitalize
    }
    


.select.hide{
    opacity:0;
    pointer-events: none;
}

.select {
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
}    

.select select {
        width: 230px;
        font-family: "Nicholson Beta";
        font-size: 16px;
        display: inline-block;
        cursor: pointer;
        padding: 7px 10px;
        outline: 0;
        border-radius: 0px;
        background: transparent;
        color: var(--type);
        border: 1px solid var(--type);
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 5px;
    }
        .select select::-ms-expand {
            display: none;
        }

.select_arrow {
    position: absolute;
    top: 13px;
    right: 15px;
    pointer-events: none;
    border-style: solid;
    border-width: 8px 5px 0px 5px;
    border-color: var(--type) transparent transparent transparent;
}
</style>