<script>
  import { fade,fly } from "svelte/transition";
  import { cubicInOut } from 'svelte/easing';
  import Keycap from "./UIElements/UI.keycap.svelte";
  import {
    keydown_S,
    keydown_K,
    keydown_O,
    keydown_G,
    keydown_M,
    tonic,
    scaleType,
    thereminPos,
    HEIGHT,
    WIDTH,
    SCALE,
    showGuides,
    videoReady,
    recording,
    recordingTime,
    theatreMode
  } from "../../stores.js";

  let containerDom;
  let containerWidth = 0;
  let containerHeight = 0;
  let containerPos = { top: 0, left: 0 };
  let scaleTypeState = $scaleType;
  let tonicState = $tonic;
  $: {
    containerPos = {
      top:
        $thereminPos.y / $SCALE +
        ($thereminPos.height / $SCALE) * 0.55 -
        containerHeight * 0.5,
      left:
        $thereminPos.x / $SCALE +
        ($thereminPos.width / $SCALE) * 0.525 -
        containerWidth * 0.5,
    };
  }

  let delay;

  $: {
    if (tonicState !== $tonic || scaleTypeState !== $scaleType) {
      clearTimeout(delay);
      delay = setTimeout(() => {
        tonicState = $tonic;
        scaleTypeState = $scaleType;
      }, 100);
    }
  }
</script>


{#if scaleTypeState !== $scaleType || tonicState !== $tonic || $keydown_S || $keydown_K || ($recording && !$theatreMode)}
<section
  out:fade="{{easing: cubicInOut,delay:400,duration: 600 }}" 
  bind:this="{containerDom}"
  bind:clientWidth="{containerWidth}"
  bind:clientHeight="{containerHeight}"
>
  {#if $recordingTime}
    <h3>{$recordingTime}</h3>
    <h4 style="width:max-width">Sound Only</h4>
  {:else}
    <h3>{$tonic}</h3>
    <h4>{$scaleType}</h4>
  {/if}
  <div>
    
    {#if $keydown_S}
    <Keycap hide="{!$keydown_S}" letter="{'S'}" styles="{'margin-right:8px'}" />
    {/if}
    {#if $keydown_K}
    <Keycap hide="{!$keydown_K}" letter="{'K'}" />
    {/if}
  </div>
</section>
{/if}

{#if $keydown_O}
<Keycap
  hide="{!$keydown_O}"
  letter="{'O'}"
  position="{'absolute'}"
  top="{$WIDTH > 600 ? 0.7676 : 0}"
  left="{$WIDTH > 600 ? 0.679 : 0.5095}"
/>
{/if}
{#if $keydown_G}
<Keycap
  hide="{!$keydown_G}"
  letter="{'G'}"
  position="{'absolute'}"
  top="{$WIDTH > 600 ? 0.7676 : 0}"
  left="{$WIDTH > 600 ? 0.7415 : 0.7685}"
/>
{/if}
{#if $keydown_M}
<Keycap
  hide="{!$keydown_M}"
  letter="{'M'}"
  position="{'absolute'}"
  top="{$WIDTH > 600 ? 0.7676 : 0}"
  left="{$WIDTH > 600 ? 0.5005 : 0.5095}"
/>
{/if}

<style>
  section {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 5vh;
    color: rgb(var(--offwhite));
    pointer-events: none;
    text-align: center;
    transition: 0s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
  }
  section.hide {
    opacity: 0;
    transition: opacity 0.5s 1s;
  }
  h3 {
    font-variation-settings: "wght" 100, "wdth" 140, "ital" 0;
    line-height: 1;
    font-size: calc(12px + 4vw + 6vh);
    margin: 0;
    padding: 0 0 24px 0;
    font-weight: normal;
  }
  h4 {
    border-top: 1px solid rgb(var(--offwhite));
    font-variation-settings: "wght" 80, "wdth" 70, "ital" 0;
    font-size: calc(8px + 1vw + 2vh);
    padding: 8px 0 0 0;
    margin: 0;
    letter-spacing: 0.01em;
    color: rgb(var(--offwhite));
    font-weight: normal;
  }
  div {
    margin: 16px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .label.hide {
    opacity: 0;
    transition: opacity 1s;
  }
  .label {
    position: absolute;
    top: 312px;
    left: 34px;
    width: max-content;
    line-break: normal;
    font-size: 14px;
    font-family: "Nicholson Beta";
    background: rgb(var(--offwhite));
    padding: 6px 12px 6px 12px;
    border-radius: 16px;
    color: black;
    text-align: center;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transition: 0s;
    display: flex;
    justify-content: center;
    pointer-events: none;
    transition: opacity 0.5s 1s;
  }
  .label:before {
    content: "";
    position: absolute;
    top: -6px;
    margin: auto;
    pointer-events: none;
    border-style: solid;
    border-width: 0px 4px 6px 4px;
    border-color: transparent transparent rgb(var(--offwhite)) transparent;
  }

  @media only screen and (max-width: 600px) {
    h3 {
      font-size: calc(10px + 3vw + 5vh);
    }
    section {
      padding-bottom: 25vh;
    }
    .label {
      top: 262px;
      left: 8px;
    }
  }
</style>
