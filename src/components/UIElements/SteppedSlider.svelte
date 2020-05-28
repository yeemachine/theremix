<script>
import {createEventDispatcher} from 'svelte'
export let initVal = [0,1]
export let min = 0
export let max = 1

var lowerSlider,
   upperSlider,
   lowerVal = initVal[0],
   upperVal = initVal[1];

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
  dispatch('change', {
      upper:parseInt(upperSlider.value),
      lower:parseInt(lowerSlider.value),
      difference:parseInt(upperSlider.value)-parseInt(lowerSlider.value)
    });
}

</script>

<span class="multi-range">
    <input bind:this={lowerSlider} 
    on:input={updateLower}
    type="range" min={min} max={max} value={initVal[0]} id="lower">
    <input bind:this={upperSlider} 
    on:input={updateUpper} type="range" min={min} max={max} value={initVal[1]} id="upper">
</span>

<style>
input[type=range] {
  box-sizing: border-box;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  width: 400px;
  margin: 0;
  padding: 0 2px;
  /* Add some L/R padding to ensure box shadow of handle is shown */
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: -webkit-gradient(linear, left top, left bottom, from(grey), to(grey)) no-repeat center;
  background: linear-gradient(grey, grey) no-repeat center;
  /* Use a linear gradient to generate only the 2px height background */
  background-size: 100% 2px;
  pointer-events: none;
}
input[type=range]:active,
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-thumb {
  height: 28px;
  width: 28px;
  border-radius: 28px;
  background-color: #fff;
  position: relative;
  margin: 5px 0;
  /* Add some margin to ensure box shadow is shown */
  cursor: pointer;
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
.multi-range input[type=range]:nth-child(2) {
  background: none;
}
.multi-range input[type=range]:nth-child(2)::-webkit-slider-thumb::before {
  background-color: grey;
}

</style>