<script>
import {expandSettings,oscillatorType,scaleType} from './stores.js'
import {scales,oscillators} from './config.js'

let selectedScale
let selectedOsc

</script>

<section class={$expandSettings ? '' : 'hide'}>

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
<div class="select_arrow">
    </div>
</div>

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
<div class="select_arrow">
    </div>
</div>

</section>

<style>
section{
    position:absolute;
    top:0;left:0;
    width:100%;
    height:100%;
    overflow-y:scroll;
    background-color:rgba(0,0,0,0.5);
    transition:opacity .4s;
}
section.hide{
    opacity:0;
    pointer-events: none;
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