<script>
import {constrain} from '../helpers.js'
import {createEventDispatcher} from 'svelte'
export let initVal = [0,1]
export let min = 0
export let max = 1

var lowerSlider,
   upperSlider,
   lowerVal = initVal[0],
   upperVal = initVal[1],
   upper = initVal[1],
   difference = initVal[1] - initVal[0],
   lower = initVal[0]

let dispatch = createEventDispatcher();

const updateUpper = () => {
   lowerVal = parseInt(lowerSlider.value);
   upperVal = parseInt(upperSlider.value);
   
   if (upperVal < lowerVal + 1) {
      lowerSlider.value = upperVal - 1;
      
      if (lowerVal == lowerSlider.min) {
         upperSlider.value = min+1;
      }
   }
    dispatchChange()
};


const updateLower = () => {
   lowerVal = parseInt(lowerSlider.value);
   upperVal = parseInt(upperSlider.value);
   
   if (lowerVal > upperVal - 1) {
      upperSlider.value = lowerVal + 1;
      
      if (upperVal == upperSlider.max) {
         lowerSlider.value = parseInt(upperSlider.max) - 1;
      }

   }
   dispatchChange()
};

const dispatchChange = ()=>{
  upper=parseInt(upperSlider.value),
  difference = parseInt(upperSlider.value)-parseInt(lowerSlider.value)
  lower = parseInt(lowerSlider.value)

  dispatch('change', {
      upper:upper,
      lower:lower,
      difference:difference
    });
}

$:{
  console.log(lowerVal,(lowerVal-1)/(max - min)*100)
}

</script>

<span class="multi-range">
    <input bind:this={lowerSlider} 
    on:input={updateLower}
    type="range" min={min} max={max} value={initVal[0]} 
    id="lower">
    <input bind:this={upperSlider} 
    on:input={updateUpper} 
    
    type="range" min={min} max={max} value={initVal[1]} id="upper">
    <div class="progress"
    style="width:calc((100% - 28px) * {difference/(max-min)});left:calc(14px + (100% - 28px) * {(lower-1)/(max-min)})"></div>
    <div class="tick-track">
    {#each Array(max-min+1) as _, i}
      <div class="tick" style="background:{(lower<=i+1 && upper>=i+1) ? 'rgb(var(--crimson))' : 'rgb(var(--lightcharcoal))'}">
        <!-- {#if i+1 === min || i+1 === max} -->
            <label>{i+1<=9 ? '0'+(i+1) : i+1}</label>
        <!-- {/if} -->
      </div>
    {/each}
    </div>
</span>

<style>
input[type=range] {
  box-sizing: border-box;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  width: 100%;
  margin: 0;
  left: 0;
  padding: 0;
  /* Add some L/R padding to ensure box shadow of handle is shown */
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: transparent;
  /* background: linear-gradient(rgb(var(--offwhite)), rgb(var(--offwhite))) no-repeat center; */
  /* Use a linear gradient to generate only the 2px height background */
  background-size: 100% 2px;
  pointer-events: none;
}
input[type=range]:active,
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-thumb {
  height: 18px;
  width: 28px;
  border-radius: 8px;
  background-color: rgb(var(--offwhite));
  position: relative;
  margin: 5px 0;
  /* Add some margin to ensure box shadow is shown */
  cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
  -webkit-appearance: none;
          appearance: none;
  pointer-events: all;
  box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
}
input[type=range]::-webkit-slider-thumb::before {
  content: ' ';
  display: block;
  position: absolute;
  top: 13px;
  left: 100%;
  width: 2000px;
  height: 2px;
}
.multi-range {
  position: relative;
  height: 50px;
  width:100%;
}
.multi-range input[type=range] {
  position: absolute;
}
.multi-range input[type=range]:nth-child(1)::-webkit-slider-thumb::before {
  background-color: purple;
}
.multi-range input[type=range]:nth-child(2)::-webkit-slider-thumb::before {
  background-color: rgb(var(--offwhite));
}


input[type=range]::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    -webkit-appearance: none;
}

.tick-track{
    width: calc(100% - 28px);
    position: absolute;
    height: 7px;
    display: flex;
    left: 14px;
    top: 13px;
    justify-content: space-between;
    pointer-events: none;
    z-index: -2;
}
.tick-track:before{
  content:'';
  width:calc(100% + 28px);
  top:0;
  background:rgb(var(--lightcharcoal));
  position:absolute;
  left:-14px;
  height:2px;
}
.tick{
  width:2px;
  background: rgb(var(--lightcharcoal));
  position:relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress{
  position:absolute;
  width:100%;
  height:2px;
  top:13px;
  background:rgb(var(--crimson));
  z-index:-1
}
label{
  font-family: 'Nicholson Beta';
  position: absolute;
  top: 14px;
  font-size: 10px;
}
</style>