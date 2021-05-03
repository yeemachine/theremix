<script>
import {constrain,haptic} from '../../../helpers.js'
import {createEventDispatcher} from 'svelte'
export let initVal = [0,1]
export let min = 0
export let max = 1
export let hide = false

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
  haptic()
}

</script>

<span class="multi-range {hide ? 'hide' : ''}">
    <label>
    <input bind:this={lowerSlider} 
    on:input={updateLower}
    type="range" min={min} max={max} value={initVal[0]} 
    id="lower">
    </label>
    <label>
    <input bind:this={upperSlider} 
    on:input={updateUpper} 
    
    type="range" min={min} max={max} value={initVal[1]} id="upper">
    </label>

    <div class="progress"
    style="width:calc((100% - 18px) * {difference/(max-min)});left:calc(9px + (100% - 18px) * {(lower-1)/(max-min)})"></div>
    <div class="tick-track">
    {#each Array(max-min+1) as _, i}
      <div class="tick" style="background:{(lower<=i+1 && upper>=i+1) ? 'rgb(var(--crimson))' : 'rgb(var(--darkcharcoal))'};
      color:{(lower<=i+1 && upper>=i+1) ? 'rgba(var(--offwhite),1)' : 'rgb(var(--charcoal))'}
      ">
      <label>{i+1<=9 ? '0'+(i+1) : i+1}</label>
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
  height:32px;
  margin: 0;
  left: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: transparent;
  background-size: 100% 2px;
  pointer-events: none;
}
input[type=range]:active,
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-thumb {
  height: 32px;
  width: 18px;
  border-radius: 8px;
  background-color: rgb(var(--offwhite));
  position: relative;
  margin: 5px 0;
  /* Add some margin to ensure box shadow is shown */
  cursor: url(https://theremin.app/assets/global/grab.svg) 14 0, grab;
  -webkit-appearance: none;
          appearance: none;
  pointer-events: all;
  border: 0;
  border: none;
  box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
}
.hide input[type=range]::-webkit-slider-thumb {
  pointer-events: none;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
  border: none;
  height: 32px;
  width: 18px;
  border-radius: 8px;
  background: rgb(var(--offwhite));
  cursor: url(https://theremin.app/assets/global/grab.svg) 14 0, grab;
  pointer-events: all;
}
.hide input[type=range]::-moz-range-thumb {
  pointer-events: none;
}

input[type=range]::-ms-thumb {
  box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
  border: none;
  height: 32px;
  width: 18px;
  border-radius: 8px;
  background: rgb(var(--offwhite));
  pointer-events: all;
  cursor: url(https://theremin.app/assets/global/grab.svg) 14 0, grab;
}
.hide input[type=range]::-ms-thumb {
  pointer-events: none;
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
    width: calc(100% - 18px);
    position: absolute;
    height: 14px;
    display: flex;
    left: 9px;
    top: 13px;
    justify-content: space-between;
    pointer-events: none;
    z-index: -2;
}
.tick-track:before{
  content: '';
    width: calc(100% + 18px);
    top: 0;
    background: rgb(var(--darkcharcoal));
    position: absolute;
    left: -9px;
    height: 6px;
    border-radius: 6px;
}
.tick{
  width:2px;
  background: rgb(var(--darkcharcoal));
  position:relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress{
  position: absolute;
    width: 0%;
    height: 6px;
    top: 13px;
    background: rgb(var(--crimson));
    z-index: -1;
}
.tick label{
  font-family: 'Nicholson Beta';
  position: absolute;
  top: 24px;
  font-size: 10px;
}
</style>