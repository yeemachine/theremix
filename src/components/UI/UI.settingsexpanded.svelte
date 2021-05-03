
<script>
     import {
    active,
    expandSettings,
    volumeVal,
    WIDTH,
  } from "../../stores.js";
  import { fade,fly,slide } from 'svelte/transition';
  import { sineOut } from 'svelte/easing';
  import thereminSettings,{handleFiles} from './UI.settings.theremin.svelte';
  import cameraSettings from './UI.settings.camera.svelte';
  
  let currentTab = thereminSettings
</script>

{#if $active && $expandSettings}
<section
  in:fly="{{x:$WIDTH > 600 ? 420:0,y:$WIDTH > 600 ? 0:600,duration: 400,opacity:1,easing: sineOut}}" 
  out:fly="{{x:$WIDTH > 600 ? 420:0,y:$WIDTH > 600 ? 0:600,duration: 400,opacity:1,easing: sineOut}}"
>
  <div class="subnav">
    <h3 class:selected={currentTab === thereminSettings} on:click={()=>{currentTab = thereminSettings}}>Theremin</h3>
    <h3 class:selected={currentTab === cameraSettings} on:click={()=>{currentTab = cameraSettings}}>Camera</h3>
  </div>

 <svelte:component this={currentTab}/>
</section>
{/if}

<style>
  :global(:root) {
    --sliderPrimary: #ff9800;
    --sliderSecondary: rgba(0, 0, 0, 0.05);
  }
  section {
    position: absolute;
    width: 80vw;
    height: 100%;
    max-width: 420px;
/*     max-height: calc(100% - 24px); */
/*     padding: 0 16px 0 16px; */
    top: 0;
    right: 0;
    display: block;
    border-radius: 0;
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
  .subnav {
   --padding: 27px;
    width: 100%;
    margin-bottom: 40px;
    padding: 32px 0 32px 0;
    background: rgb(12,12,12);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    position: sticky;
    top: 0;
    z-index: 1;
    overflow: scroll;
    border-bottom: 1px solid rgb(var(--charcoal));
  }

  .subnav h3:first-Child{
    padding-left:20px;
  }
  .subnav h3:last-Child{
    padding-right:24px;
  }

  h3 {
    margin: 0;
    color: rgb(var(--offwhite));
    font-size: 28px;
    padding: 0px 16px 0px 15px;
    border-radius: 188px;
    font-variation-settings: "wght" 72, "wdth" 110, "ital" 1;
    display: flex;
    align-items: center;
    font-weight: normal;
    opacity:.3;
    position:relative;
  }
  h3:hover{
    cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
  }
  h3:before{
    content:'';
    position:absolute;
    pointer-events:none;
    top:0;
    right:2px;
    background:rgb(var(--crimson));
    height:12px;
    width:12px;
    border-radius:50%;
    transform-origin:center;
    transition:transform .3s;
    transform:scale(0)
  }
  h3.selected:before{
    transform:scale(1)
  }
  .subnav h3:last-Child:before{
    right:15px;
  }
  h3.selected{
    opacity:1;
    pointer-events:none;
  }

  @media screen and (max-width: 600px) {
    section {
      max-width: 600px;
      width:100%;
      top: unset;
      bottom:0;
      right: 0;
      height: 100%;
      max-height: 420px;
      border-radius: 0;
/*       border-top-left-radius: 24px;
      border-top-right-radius: 24px; */
    }
  
    .subnav{
      padding:24px 0 24px 0;
    }
    section.hide {
      transition: 0s;
    }
    .spacer,h3 {
      font-size:22px;
    }
  }
  
</style>
