<script>
  import Toggle from "./UIElements/UI.toggle.svelte";
  import ButtonCircle from "./UIElements/UI.buttoncircle.svelte";
  import videoIcon from "../icons/video.svelte";
  import pauseIcon from "../icons/pause.svelte";
  import settingsIcon from "../icons/settings.svelte";
  import recordIcon from "../icons/record.svelte";
  import closeIcon from "../icons/close.svelte";
  import Settings from "./UI.settingsexpanded.svelte";

  import { expandSettings, active, camera,recording,hasMediaRecording } from "../../stores.js";
</script>

<nav class="{$active ? '' : 'hide'}">
  <ButtonCircle
    name="pause-theremin"
    classes="{'pauseTag'}"
    icon="{pauseIcon}"
    setting="{active}"
    reverse="true"
    hide="{!$active ? true : false}"
    styles="{'margin-right:12px'}"
  />
  <div class="gestures" style="margin-right:12px">
    <Toggle
      name="{$camera ? 'disable-camera-gestures' : 'enable-camera-gestures'}"
      icon="{videoIcon}"
      setting="{camera}"
      classes="{'gestureTag'}"
      hide="{!$active ? true : false}"
    />
    <p class="label">
      {!$camera ? 'Enable Hand-Tracking' : 'Disable Camera'}
    </p>
  </div>
  {#if $hasMediaRecording}
  <div class="recording">
    <ButtonCircle
      name="record-audio"
      classes="{'recordTag'}"
      icon="{recordIcon}"
      setting="{recording}"
      reverse="true"
      hide="{!$active ? true : false}"
      selected="{$recording ? true : false}"
      styles="--selectedBGColor:var(--crimson);--selectedSVGColor:var(--offwhite)"
    />
    <p class="label">
      {!$recording ? 'Record Sound' : 'Stop Recording'}
    </p>
  </div>
  {/if}
  <div class="settings">
    <ButtonCircle
      name="{$expandSettings ? 'Close Controls' : 'Open Controls'}"
      classes="{'controlsTag'}"
      icon="{$expandSettings ? closeIcon : settingsIcon}"
      selected="{$expandSettings ? true : false}"
      setting="{expandSettings}"
      hide="{$active ? false : true}"
    />
  </div>
  <Settings />
</nav>

<style>
  nav.hide {
    opacity: 0;
    pointer-events: none;
  }
  nav {
    display: flex;
    position: absolute;
    height: calc(100% - 48px);
    padding: 24px;
    width: calc(100% - 48px);
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.25s;
  }
  .gestures {
    display: flex;
    position: relative;
    width: max-content;
    height: max-content;
    align-items: center;
    flex-direction: column;
  }
  .recording{
    display: flex;
    position: relative;
    width: max-content;
    height: max-content;
    align-items: center;
    flex-direction: column;
  }
  .settings {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 2;
  }

  .label {
    position: absolute;
    top: 44px;
    /* left: 24px; */
    left: unset;
    width: max-content;
    line-break: normal;
    font-size: 14px;
    font-family: "Nicholson Beta";
    background: rgb(var(--offwhite));
    padding: 6px 12px 6px 12px;
    border-radius: 16px;
    color: black;
    opacity: 0;
    text-align: center;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transition: 0s;
    display: flex;
    justify-content: center;
    pointer-events: none;
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
    nav {
      padding: 16px 16px 0 16px;
      width: calc(100% - 32px);
      height: calc(100% - 16px);
    }
    .settings {
      top: 16px;
      right: 16px;
    }
  }

  @media (hover: hover) {
    .gestures:hover .label,.recording:hover .label  {
      opacity: 1;
    }
  }
</style>
