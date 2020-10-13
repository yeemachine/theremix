<script>
  import {
    active,
    enableMIDI,
    expandSettings,
    oscillatorType,
    scaleType,
    tonic,
    volumeVal,
    startOctave,
    endOctave,
    glide,
    currentMIDI,
    midiList,
  } from "../../stores.js";
  import { scales, oscillators, maxOctaves, tonicOrder } from "../../config.js";
  import Toggle from "./UIElements/UI.toggleSmall.svelte";
  import Slider from "./UIElements/SteppedSlider.svelte";

  let selectedScale;
  let selectedOsc;
  let selectedTonic;
  let selectedMIDI;
  let selectedTonicOctave = 4;
  let selectedStartOctave = 4;
  let selectedEndOctave = maxOctaves;
  let octaveDifference = selectedEndOctave - selectedStartOctave;

  const handleSlider = (e) => {
    selectedStartOctave = e.lower;
    selectedEndOctave = e.upper;
    tonic.set(selectedTonic);
    startOctave.set(selectedStartOctave);
    endOctave.set(selectedEndOctave);
  };

  const updateVolume = (e) => {
    volumeVal.set(e.target.valueAsNumber);
  };
</script>

<section class="{$active && $expandSettings ? '' : 'hide'}">
  <h3>Controls</h3>
  <div class="setting">
    <h4>Volume</h4>
    <input
      aria-label="Change Master Volume"
      name="mastervolume"
      class="volumeTag"
      on:input="{(e) => updateVolume(e)}"
      type="range"
      min="{-48}"
      max="{0}"
      value="{$volumeVal}"
      style="background-size:{(($volumeVal - -48) * 100) / (0 - -48)}% 100%"
    />
  </div>

  <hr />

  <div class="setting">
    <h4>Oscillator<span class="keycap">O</span></h4>
    <div class="select">
      <select
        aria-label="Change Oscillator Type"
        name="oscillators"
        bind:value="{selectedOsc}"
        class="oscillators"
        on:change="{() => oscillatorType.set(selectedOsc)}"
      >
        {#each oscillators as oscName}
          <option
            value="{oscName}"
            selected="{oscName === $oscillatorType ? true : false}"
          >
            {oscName.replace(/-/g, ' ')}
          </option>
        {/each}
      </select>
      <div class="select_arrow"></div>
    </div>
  </div>

  <hr />

  <div class="setting">
    <h4>Key/Scale<span class="keycap">K</span><span class="keycap">S</span></h4>
    <container>
      <div class="select key">
        <select
          aria-label="Change Key"
          name="keytype"
          class="keyTag"
          bind:value="{selectedTonic}"
          on:change="{() => {
            if (selectedTonic) {
              tonic.set(selectedTonic);
            }
          }}"
        >
          {#each tonicOrder as tonicNote}
            <option
              value="{tonicNote}"
              selected="{tonicNote === $tonic ? true : false}"
            >
              {tonicNote}
            </option>
          {/each}
        </select>
        <div class="select_arrow"></div>
      </div>
      <div class="select scale">
        <select
          aria-label="Change Scale Type"
          name="scaletype"
          class="scaleTag"
          bind:value="{selectedScale}"
          on:change="{() => scaleType.set(selectedScale)}"
        >
          {#each scales as scaleName}
            <option
              value="{scaleName}"
              selected="{scaleName === $scaleType ? true : false}"
            >
              {scaleName.replace(/-/g, ' ')}
            </option>
          {/each}
        </select>
        <div class="select_arrow"></div>
      </div>
    </container>
  </div>

  <hr />

  <div class="setting">
    <h4>Octaves</h4>
    <Slider
      on:change="{(e) => handleSlider(e.detail)}"
      hide="{!$expandSettings}"
      initVal="{[$startOctave, $endOctave]}"
      min="{1}"
      max="{maxOctaves}"
    />
  </div>

  <hr />
  <div class="setting">
    <div class="toggle">
      <h4 style="margin:0;">Glide<span class="keycap">G</span></h4>
      <Toggle
        name="{$glide ? 'disable-glide' : 'enable-glide'}"
        classes="glide"
        setting="{glide}"
        hide="{!$expandSettings ? true : false}"
      />
    </div>
  </div>

  <hr />

  <div class="setting">
    <div class="toggle" style="margin-bottom: 16px;">
      <h4 style="margin:0;display: flex;align-items: center;">
        MIDI
        <span
          style="font-size:8px;margin-left: 8px;color:rgb(var(--crimson))"
        >Beta</span>
      </h4>
      <Toggle
        name="{$enableMIDI ? 'disable-midi' : 'enable-midi'}"
        classes="MIDITag"
        setting="{enableMIDI}"
        hide="{!$expandSettings ? true : false}"
      />
    </div>
    <div class="select {$enableMIDI ? '' : 'hide'}" style="margin-top: 12px;">
      <select
        aria-label="Change MIDI track"
        bind:value="{selectedMIDI}"
        class="midi"
        on:change="{() => {
          if (selectedMIDI) {
            currentMIDI.set(selectedMIDI);
          }
        }}"
      >
        {#each Object.keys($midiList) as midiTitle}
          <option
            value="{midiTitle}"
            selected="{midiTitle === $currentMIDI ? true : false}"
          >
            {midiTitle}
          </option>
        {/each}
      </select>
      <div class="select_arrow"></div>
    </div>
  </div>
</section>

<style>
  :global(:root) {
    --sliderPrimary: #ff9800;
    --sliderSecondary: rgba(0, 0, 0, 0.05);
  }
  section {
    position: absolute;
    width: 80vw;
    height: max-content;
    max-height: calc(100% - 120px);
    max-width: 320px;
    max-height: calc(100% - 24px);
    padding: 0 24px 0 24px;
    top: 12px;
    right: 12px;
    display: block;
    border-radius: 16px;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    transition: opacity 0.7s cubic-bezier(0.55, 1.32, 0.51, 0.97);
    background: rgba(12, 12, 12, 1);
    overflow-y: scroll;
    overflow-x: hidden;
    color: rgb(var(--offwhite));
    pointer-events: all;
  }
  section.hide {
    opacity: 0;
    pointer-events: none;
    transition: 0s;
  }
  h3 {
    margin: 12px 0 12px 0;
    color: rgb(var(--offwhite));
    font-size: 24px;
    font-variation-settings: "wght" 100, "wdth" 140, "ital" 0;
    height: 48px;
    display: flex;
    align-items: center;
    font-weight: normal;
  }
  h4 {
    margin: 0 0 12px 0;
    color: rgb(var(--offwhite));
    font-size: 12px;
    letter-spacing: .5px;
    font-variation-settings: "wght" 95, "wdth" 114, "ital" 0;
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
    opacity: 0;
  }
  .toggle {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .setting {
    width: 100%;
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
    width: calc(100% + 48px);
    opacity: 0.05;
    margin: 0 0 0 -24px;
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
    section {
      max-width: 568px;
      padding: 0 16px 0 16px;
      top: 0;
      right: 0;
      width: calc(100% - 32px);
      height: 100%;
      max-height: 100%;
      border-radius: 0;
    }
    section.hide {
      transition: 0s;
    }
    h3 {
      margin: 16px 0 16px 0;
    }
    hr {
      width: calc(100% + 32px);
      margin: 0 0 0 -16px;
    }
  }

  @media (hover: hover) {
    .keycap {
      opacity: 0.7;
    }
  }
</style>
