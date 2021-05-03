<script>
   import {
    active,
    WIDTH,
    isSafari,
     showVideo,
    allowHolistic,
     expandSettings
  } from "../../stores.js";
  
  import {capturedDevices,videoDeviceId} from '../Video.webcam.svelte'

  import { fade,fly,slide } from 'svelte/transition';
  import { sineOut } from 'svelte/easing';
 
  import Toggle from "./UIElements/UI.toggleSmall.svelte";
  import Slider from "./UIElements/SteppedSlider.svelte";
  
  import posenetGlyph from '../icons/posenet.svelte';
  import handsGlyph from '../icons/hands.svelte';

</script>

<container>
  <div class="setting">
    <div class="select">
      <h4 style="margin:0;">Hand Tracking Type
        <span
          style="font-size:8px;color:rgb(var(--crimson));margin-left: 6px;line-height: 1;margin-top: -3px;"
        >New</span>
      </h4>
       <div class="tracking">
         <div class="trackingOption" 
              class:selected={$allowHolistic}
              class:disabled={isSafari}
              on:click={()=>{allowHolistic.set(true)}}>
           <label>Hands + finger Tracking</label>
            <svelte:component this={handsGlyph} selected={$allowHolistic} color={($allowHolistic)?'var(--selectedSVGColor)':'var(--svgColor)'} hoverColor={$allowHolistic ? 'var(--selectedSVGColor)' : 'var(--svgColorHover)'}/>
         </div>
         <div class="trackingOption" 
              class:selected={!$allowHolistic}
              on:click={()=>{allowHolistic.set(false)}}>
           <label>Wrist Tracking Only</label>
            <svelte:component this={posenetGlyph} selected={!$allowHolistic} color={(!$allowHolistic)?'var(--selectedSVGColor)':'var(--svgColor)'} hoverColor={!$allowHolistic ? 'var(--selectedSVGColor)' : 'var(--svgColorHover)'}/>
         </div>
      </div>
       {#if isSafari}
          <p class="info warning">Finger tracking is not available on Safari yet. Please use wrist tracking instead.</p>
        {:else if ($WIDTH < 600)}
           <p class="info">Finger tracking runs best on a desktop browser. Wrist tracking recommended for slower devices.</p>
        {:else}
          <p class="info">Finger tracking allows for finer and more accurate controls at the cost of some speed. Wrist tracking recommended for slower devices.</p>
        {/if}
    </div>
  </div>

  <hr />
  
   <div class="setting">
    <div class="toggle">
      <h4 style="margin:0;">Show Webcam Feed</h4>
      <Toggle
        name="{$showVideo ? 'Hide Video Feed' : 'Show Video Feed'}"
        setting="{showVideo}"
        hide="{!$expandSettings ? true : false}"
      />
    </div>
  </div>

  <hr />
   {#if $capturedDevices.videoinput.length>0}
  <div class="setting">
    <h4>Video Source</h4>
    <div class="select">
      <select
        aria-label="Change Video Source"
        name="Video Source"
        bind:value="{$videoDeviceId}"
      >
        {#each $capturedDevices.videoinput as deviceInfo}
        <option value={deviceInfo.deviceId}>{deviceInfo.label}</option>
        {/each}
      </select>
      <div class="select_arrow"></div>
    </div>
  </div>

  <hr />
  
  {/if}


  </container>

<style>
  .tracking{
    margin:24px 0 24px 0;
    display:flex;
    justify-content:center;
  }
  .info{
    font-family: 'Nicholson Beta';
    font-size: 14px;
    text-align: left;
    color: rgb(var(--offwhite));
  }
  .warning{
    color:rgb(var(--crimson));
  }
  .trackingOption:first-child{
    margin-right: 8px; 
  }
  .trackingOption{
     --bgColor:rgb(var(--offwhite));
      --svgColor:rgb(var(--offwhite));
      --svgColorHover:rgb(var(--charcoal));
      --selectedBGColor:rgb(var(--offwhite));
      --selectedSVGColor:rgb(var(--offwhite));
    flex-grow: 1;
    height:120px;
    background:rgba(var(--offwhite),.1);
    border-radius:5px;
    padding-bottom:24px;
    position:relative;
  }
  .trackingOption:hover{
    cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
  }
  .trackingOption label{
   position:absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
    color:rgb(var(--offwhite));
        font-size: 14px;
    text-align: center;
    color: rgb(var(--offwhite));
    font-family: 'Nicholson Beta';
  }
  .trackingOption.selected{
    background:rgb(var(--crimson));
    pointer-events:none;
  }
  .trackingOption.disabled{
    pointer-events:none;
    opacity:0.3
  }
  
  h4 {
    margin: 0 0 12px 0;
    color: rgb(var(--offwhite));
    font-size: 12px;
    letter-spacing: .5px;
    font-variation-settings: "wght" 85, "wdth" 114, "ital" 0;
    line-height: 1;
    font-weight: normal;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
  }
  .keycap {
    padding: 6px 6px 6px 6px;
    /* background: rgba(var(--crimson),0.3); */
    border: 1px solid rgba(var(--offwhite), 0.3);
    font-size: 10px;
    border-radius: 2px;
    margin-left: 8px;
    display:none;
  }
  .toggle {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .setting {
    --padding:24px;
    width: calc(100% - var(--padding)*2);
    padding:0 var(--padding) 0 var(--padding);
    margin: 24px 0 24px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
  .setting > container {
    display: flex;
    width: 100%;
  }
  .setting .key {
    max-width: 100px;
    margin: 0 8px 0 0;
  }
  hr {
    border: 1px solid;
    width: calc(100%);
    opacity: 0.05;
    margin: 8px 0 8px 0;
  }
  :root {
    --type: #ffffff;
    --bg: #000000;
    --accent: rgba(255, 255, 255, 0.2);
  }

  select {
    outline: none;
  }

  div {
    text-align: center;
  }

  select,
  select option {
    text-transform: capitalize;
  }

  .select.hide {
    opacity: 0.2;
    pointer-events: none;
  }

  .select {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .select select {
    width: 100%;
    font-family: "Nicholson Beta";
    font-size: 16px;
    display: inline-block;
    cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
    padding: 7px 10px;
    height: 40px;
    outline: 0;
    border-radius: 0px;
    background: rgb(var(--darkcharcoal));
    color: rgb(var(--offwhite));
    border: none;
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
    top: 16px;
    right: 15px;
    pointer-events: none;
    border-style: solid;
    border-width: 8px 5px 0px 5px;
    border-color: rgb(var(--offwhite)) transparent transparent transparent;
  }
  .select_grad{
    height:100%;
    width:60px;
    position:absolute;
    right:0;
    top:0;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(35,35,35,0) 0%, rgba(35,35,35,1) 60%);
    border-radius: 5px;
    pointer-events:none;
  }

  input[type="range"] {
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 13px 0 8px 0;
    outline: none;
    padding: 0;
    width: 100%;
    height: 6px;
    background-color: rgb(var(--darkcharcoal));
    background-image: -webkit-gradient(
      linear,
      50% 0%,
      50% 100%,
      color-stop(0%, rgb(var(--crimson))),
      color-stop(100%, rgb(var(--crimson)))
    );
    background-size: 50% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: url(https://theremin.app/assets/global/grab.svg) 14 0, grab;
    -webkit-appearance: none;
  }

  input[type="range"]:active,
  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    -webkit-appearance: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    height: 32px;
    width: 18px;
    border: 0;
    background: rgb(var(--offwhite));
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
    -webkit-appearance: none;
    appearance: none;
    cursor: url(https://theremin.app/assets/global/grab.svg) 14 0, grab;
  }

  input[type="range"]::-ms-thumb {
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
    border: none;
    height: 32px;
    width: 18px;
    border-radius: 8px;
    background: rgb(var(--offwhite));
    cursor: url(https://theremin.app/assets/global/grab.svg) 14 0, grab;
  }

  input[type="range"]::-moz-range-thumb {
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
    border: none;
    height: 32px;
    width: 18px;
    border-radius: 8px;
    background: rgb(var(--offwhite));
    cursor: url(https://theremin.app/assets/global/grab.svg) 14 0, grab;
  }


  @media screen and (max-width: 600px) {
 
  }
  
   @media only screen and (hover: hover) and (pointer: fine) {
    .keycap {
          opacity: 0.7;
          display:inline-block;
        }
      .upload:hover > div:after{
    opacity:1;
    }
  }
  
</style>
