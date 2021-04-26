<script context="module">
  import {writable} from "svelte/store";
  
  export const viewedNotifs = writable(null)

  const getLocalStorage = ()=>{
    if (typeof Storage !== "undefined") {
      viewedNotifs.set(parseInt(localStorage.getItem("viewedNotifs"), 10) || null);
    }
  }
  getLocalStorage()
  
  viewedNotifs.subscribe(val=>{
    if (typeof Storage !== "undefined" && val) {
      localStorage.setItem("viewedNotifs", val);
    }
  })
  
</script>
<script>
  import { scale,fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import {handleFiles,handleImgFiles} from './UI.settingsexpanded.svelte'
  import {active,coverLoaded} from '../../stores.js'
  import {isImageVideo} from '../../helpers.js'
  import closeIcon from "../icons/close.svelte";

  const today = new Date();
  const endDate = new Date('5/7/2021')
  const isPast = today > endDate ? true : false
  const diffTime = Math.abs(endDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  let closed = false;
  $:closed = $viewedNotifs === endDate.getTime() ? true : false;
  
</script>

{#if !isPast && !$active && !closed && $coverLoaded}
<container class="news"
  in:scale="{{ delay:600, duration: 500, easing: cubicInOut, baseScale: 0.9 }}"
  out:fade="{{duration: 200}}"
>
  <a 
     on:click={()=>{viewedNotifs.set(endDate.getTime())}}
     target="_blank" href="https://vote.webbyawards.com/PublicVoting#/2021/websites-and-mobile-sites/general-websites-and-mobile-sites/music">
    <img alt="The Webby Awards Logo" src="https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWebby_Logo.png?v=1619324923219"/>
  </a>
  <div>
    <h4>We need your vote!</h4>
    <p>Theremix has been nominated for best music website in the <span>2021 Webby Awards</span>! 
      {#if diffDays > 1}
      There's still
      <span>{diffDays-1} day{diffDays > 2 ? 's' : ''} left</span>
      {:else}
      Today's the <span>last day</span>
      {/if}
      and we'd love your support!</p>
    <a 
       on:click={()=>{viewedNotifs.set(endDate.getTime())}}
       class="text-link" target="_blank" href="https://vote.webbyawards.com/PublicVoting#/2021/websites-and-mobile-sites/general-websites-and-mobile-sites/music">Vote now!</a>
  </div>
  <button on:click={()=>{closed=true}}>
    <svelte:component this={closeIcon} color={'var(--charcoal)'} hoverColor={ 'var(--charcoal)'}/>
  </button>
</container>
{/if}

<style>
  .news{
    width:450px;
    min-height:100px;
    position:absolute;
    bottom:12px;
    right:12px;
    z-index:99999;
    background:rgb(var(--offwhite));
    border-radius:24px;
    border-bottom-right-radius:0px;
    display:flex;
/*     align-items:center; */
    padding:28px;
  }
  h4{
    color:rgb(var(--charcoal));
    margin:0;
    font-weight:normal;
    font-variation-settings: "wght" 120, "wdth" 106, "ital" 0;
  }
  span{
    color:rgb(var(--crimson));
  }
  div{
    margin-bottom:8px;
  }
  p{
    font-family:'Nicholson Beta';
    font-size:16px;
    line-height:1.4;
    margin: 8px 0px 22px 0px;
  }
  .text-link{
    padding: 12px 32px 12px 32px;
    margin: 12px 0px 12px 0px;
    border-radius:24px;
    background: rgb(var(--crimson));
    color: white;
    text-decoration: none;
    font-size: 12px;
    letter-spacing: .5px;
    font-variation-settings: "wght" 95, "wdth" 114, "ital" 0;
    font-weight:normal;
    line-height: 1;
  }
  img{
    width: 124px;
    height: 72px;
    object-fit: contain;
    margin-right: 28px;
  }
  button{
    width:48px;
    height:48px;
    position:absolute;
    top:0;
    right:0;
  }
  @media screen and (max-width: 600px) {
    .news{
      width:calc(100% - 72px);
      padding:24px;
          padding-top: 32px;
    padding-bottom: 40px;
    }
    p{
      margin-top:12px;
    }
    img{
     width: 64px;
    height: 40px;
    position: absolute;
    bottom: 36px;
    right: 0px;
    }
  }
  
   @media all and (display-mode: fullscreen) {
    .news{margin-bottom: calc(env(safe-area-inset-bottom, 0));}
  }
</style>