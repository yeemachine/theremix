<script>
  import {
    loaded,
    active,
    manual,
    coverLoaded,
    update,
    hasHover
  } from "../../stores.js";
  import Logo from "../icons/logo.svelte";
  import Play from "../icons/play.svelte";
  import webcamIcon from "../icons/webcam.svelte";
  import touchIcon from "../icons/touch.svelte";
  import cursorIcon from "../icons/cursor.svelte";
  // import unmuteAudio from 'unmute-ios-audio';

  let unmute = false;
  
  // let fontLoaded = false;
  const playStart = () => {
    // if(!unmute){
    //   unmute = true
    //   unmuteAudio()
    //   setTimeout(()=>{Tone.start()},100)
    // }
    active.set(true);
  };

  const manualOpen = () => {
    manual.set(true);
  };

  // document.fonts.ready.then(function () {
  //   fontLoaded = true;
  // });

  $: {
    if ($loaded) {
      document.querySelector(".cover").classList.add("hide");
      window.setTimeout(() => {
        coverLoaded.set(true);
      }, 2000);
    }
  }
</script>

  <section class="{$active ? 'hide' : ''}">
    <h1 class="{!$coverLoaded || $active ? 'hide' : ''}">
      Celebrating
      <span>100 years</span>
      of the theremin
    </h1>
    <div class="title {!$coverLoaded || $active ? 'hide' : ''}">
      <Logo hide="{!$coverLoaded || $active ? true : false}" />
    </div>

    <label>
          <button 
          class="play"
          aria-label="Start Theremin"
          name="start-theremin"
          on:click={playStart}
          on:touchend={playStart}
          tabindex={!$active?0:-1}
          >
              <Play loaded={$coverLoaded} hide={$active}/>
          </button>
      </label>
  </section>

<div class="info">
  
  <p class="{(!$coverLoaded || $active || $manual) ? 'hide' : ''}">
    {#if $hasHover}
      Use your mouse   
      <span 
      style="height: 18px;
      display: inline-block;
      transform:translate3d(0,3px,0)">
        <svelte:component this={cursorIcon}/>
    </span>
    {:else}
      Touch and drag
      <span 
      style="height: 18px;
      display: inline-block;
      transform:translate3d(0,3px,0)">
        <svelte:component this={touchIcon}/>
      </span>
    {/if}
    or turn on webcam
    <span 
      style="height: 18px;
      display: inline-block;
      transform:translate3d(0,3px,0)">
      <svelte:component this={webcamIcon}/>
    </span> to play this virtual theremin with hand-tracked gestures!
  </p>

  <button
    name="open-manual"
    aria-label="Open Manual"
    on:click="{manualOpen}"
    class="manual {!$coverLoaded || $active || $manual ? 'hide' : ''}"
  >
    Operation Manual
  </button>
  
</div>



{#if $update}
  <button
    name="refresh-updates"
    aria-label="Refresh to Update"
    on:click="{() => {
      window.location.reload();
    }}"
    class="update {!$update || !$coverLoaded || $active || $manual ? 'hide' : ''}"
  >
    New Version Available
  </button>
{/if}

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 90%;
    text-align: center;
    white-space: nowrap;
    pointer-events: none;
    overflow: hidden;
  }
  section {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .title {
    height: auto;
    width: 65vw;
    max-height: 15vh;
    max-width: 1000px;
    margin: 16px 0 16px 0;
    position: relative;
  }

  .play {
    width: calc(120px + 2vw + 2vh);
    height: calc(120px + 2vw + 2vh);
    margin: 0 0 0 0;
    pointer-events: all;
  }
  .hide .play {
    pointer-events: none;
  }
  h1 {
    font-size: 16px;
    font-weight: normal;
    color: rgb(var(--offwhite));
    width: max-content;
    font-variation-settings: "wght" 70, "wdth" 120, "ital" 0;
    margin: 0 0 0 0;
    pointer-events: all;
    transform-origin: center;
    transition: transform 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1.4s,
      opacity 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1s;
  }
  h1 span {
    color: rgb(var(--sun));
/*     font-variation-settings:"wght" 100, "wdth" 75, "ital" 0 */
  }
  h1.hide {
    opacity: 0;
    pointer-events: none;
    transition: transform 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1.4s,
      opacity 1s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;
  }
  
  
  .info{
    width: calc(100% - 24px);
    pointer-events: none;
    display: flex;
    flex-direction: row;
    height: max-content;
    justify-content: space-between;
    align-items:flex-end;
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0 0px 0px 24px;
    
  }
  .manual {
    position: relative;
    padding: 0 18px 0 18px;
    height:48px;
/*     border-bottom: 2px solid rgba(var(--offwhite), 0); */
    color: rgb(var(--offwhite));
    font-family: "Whirly Birdie";
    font-variation-settings: "wght" 90, "wdth" 120, "ital" 0;
    transition: opacity 1s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0.4s,
    transform 1s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0.4s;
    font-size: 12px;
    z-index: 0;
    overflow: visible;
    pointer-events:all;
    transform:translate3d(0,0,0);
  }
  .manual:before {
    content: "";
    pointer-events:none;
    position: absolute;
    width: 200%;
    height: 330%;
    bottom: -24px;
    left: -50%;
    z-index: -2;
    opacity: 0.4;
    transition: 0.25s;
    background: -webkit-radial-gradient(
      ellipse farthest-side at bottom center,
      rgba(var(--crimson), 1) 0%,
      rgba(var(--crimson), 0) 100%
    );
    background: -o-radial-gradient(
      ellipse farthest-side at bottom center,
      rgba(var(--crimson), 1) 0%,
      rgba(var(--crimson), 0) 100%
    );
    background: -moz-radial-gradient(
      ellipse farthest-side at bottom center,
      rgba(var(--crimson), 1) 0%,
      rgba(var(--crimson), 0) 100%
    );
    background: radial-gradient(
      ellipse farthest-side at bottom center,
      rgba(var(--crimson), 1) 0%,
      rgba(var(--crimson), 0) 100%
    );
  }
  .manual:after {
    content: "";
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(var(--offwhite));
    border-radius: 16px;
    bottom: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    left: 0;
    z-index: -1;
    opacity: 0.05;
    transition: 0.25s;
  }

  .manual:hover,
  .manual:focus {
    color:rgb(var(--charcoal));
  }
  .manual:hover:after,
  .manual:focus:after {
    opacity:1
  }
  .manual:hover:before,
  .manual:focus:before {
    opacity: 1;
  }
  .manual.hide {
    opacity: 0;
    /*         background: rgba(var(--crimson),.2); */
    pointer-events: none;
    transition: opacity 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s,
    transform .6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;
    transform:translate3d(0,80px,0);
  }

  .update {
    position: absolute;
    top: 24px;
    height: 40px;
    padding: 0 24px 0 24px;
    background: rgba(var(--offwhite), 0.2);
    border-radius: 32px;
    color: rgb(var(--offwhite));
    font-family: "Whirly Birdie";
    font-variation-settings: "wght" 80, "wdth" 120, "ital" 0;
    transition: opacity 1s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0.4s;
    font-size: 10px;
    backdrop-filter: blur(10px);
  }
  .update:hover,
  .update:focus {
    background-color: rgb(var(--offwhite));
    color:rgb(var(--charcoal));
  }
  .update.hide {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;
  }
  p {
    color: rgb(var(--offwhite));
    font-size:16px;
    font-family: "Nicholson Beta";
    position: relative;
    word-break: break-word;
    white-space: normal;
    margin: 0;
    text-align: left;
    line-height: 1.6;
    max-width: 400px;
    transition: transform 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1.4s, opacity 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1s;
    padding-top: 16px;
    padding-bottom: 16px;
    -webkit-text-size-adjust: 100%;
  }
  p.hide {
    opacity: 0;
    transition: transform 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1.4s,
      opacity .6s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;
  }
  @media screen and (max-width: 690px) {
    .info{
      flex-direction: column;
      width: 95vw;
      margin: 0 2.5vw 0 2.5vw;
    }
    p{
    height: auto;
    max-width: unset;
    width:100%;
    padding-bottom:0;
    margin-bottom: 24px;
    text-align:center;
/*     padding-top: 16px;
    border-top: 1px solid rgba(var(--offwhite),0.2); */
    }
    h1 {
      font-size: 16px;
      font-weight: normal;
      color: rgb(var(--offwhite));
      width: max-content;
      font-variation-settings: "wght" 70, "wdth" 90, "ital" 0;
    }

    .title {
      height: auto;
      width: calc(100vw - 48px);
      max-height: 10vh;
      max-width: 600px;
      margin: 8px 0 16px 0;
    }
    .manual {
      /* width: calc(100% - 64px); */
      width:100%;
      right: unset;
      padding-bottom: 8px;
      height: 56px;
    }
    .manual:after{
      border-top-right-radius: 16px;
    }
  }
  
</style>
