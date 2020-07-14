<script>
	import {mousePos, loaded, toneLoaded,darkMode, pwa, update, version,camera,posenetLoaded } from './stores.js';
	import Canvas from './components/Canvas.svelte'
	import Nav from './components/UI/UI.nav.svelte'
	import Shortcuts from './components/UI/UI.shortcuts.svelte'
	import Tone from './components/Tone.svelte'
	import Webcam from './components/Video.webcam.svelte'
	import PoseNet from './components/Video.posenet.svelte'

	var newSW;

	navigator.serviceWorker.addEventListener('controllerchange', () => {
		update.set(true)
	});
	navigator.serviceWorker.addEventListener('message', event => {
			version.set(event.data)
      console.log('%c%s',
        'color: rgb(229,70,70); background: rgb(25,25,25);padding:4px 8px 4px 8px;border-radius:4px',
        'THEREMIX ~~~ '+event.data)
	});
  
	// Register service worker
	if ('serviceWorker' in navigator) {

		navigator.serviceWorker.register('/sw.js')
			.then((reg) => {
			}).catch((e) => {
				console.log(e);
			});

		navigator.serviceWorker.ready.then( registration => {
			registration.active.postMessage({ action: 'version' });
		});
	}

	if (window.matchMedia('(display-mode: standalone)').matches) {  
		pwa.set(true);
    dataLayer.push({'event':'standalone'});
	}

let tfLoaded = false,toneJSLoaded = false,teoriaLoaded = false,toneMIDILoaded = false
let cameraTriggered = false
$:{
  if($camera){
    cameraTriggered = true
  }
}

</script>

<svelte:head>

	{#if $loaded}
	<script defer src="https://cdn.jsdelivr.net/npm/tone@13.8.34/build/Tone.min.js" on:load={()=>{toneJSLoaded=true}}></script>
	{/if}

	{#if toneJSLoaded}
	<script defer src="/libraries/teoria.min.js" on:load={()=>{teoriaLoaded=true}}></script>
	{/if}

	{#if teoriaLoaded}
		<script defer src="https://cdn.jsdelivr.net/npm/@tonejs/midi@2.0.23/build/Midi.min.js" on:load={()=>{toneMIDILoaded=true}}></script>
	{/if}
    
    {#if cameraTriggered}
		<script defer src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.1/dist/tf.min.js" on:load={()=>{tfLoaded=true}}></script>
    {/if}
  
	{#if tfLoaded}
		<script defer src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet@2.2.1/dist/posenet.min.js" on:load={()=>{posenetLoaded.set(true)}}></script>
	{/if}
</svelte:head>
 
<main>
	<Canvas/>
	<Shortcuts/>
	<Nav/>
	
	{#if toneLoaded && toneMIDILoaded}
		<Tone/>
	{/if}

	<Webcam/>
	{#if $posenetLoaded}
		<PoseNet/>
	{/if}
</main>

<style>
  
  @font-face {
    font-family: "Whirly Birdie";
    src: url("https://theremin.app/assets/fonts/WhirlyBirdieGX.woff2")
      format("woff2");
	font-display: swap;
  }

  @font-face {
      font-family: "Whirly Birdie Regular";
      src: url("https://theremin.app/assets/fonts/WhirlyBirdie-Regular.woff")
          format("woff");
		font-display: swap;
  }

	@font-face {
	font-family: "Nicholson Beta";
	src: url("https://theremin.app/assets/fonts/nicholsonbeta-webfont.woff2")
		format("woff2");
		font-display: swap;
	}

  :root {

    --sun: 252, 216, 54;
    --blue:62, 139, 202;
    --navy:29, 55, 103;

    --offwhite: 250, 236, 197;
    --darkoffwhite: 230 216,177;

    --offwhitetint:255, 221, 176;

    --offwhitegradient: linear-gradient(0deg, rgb(var(--offwhitetint)) 0%, rgba(var(--offwhitetint),0.920045518207283) 70%, rgba(var(--offwhitetint),0) 100%);
    --offwhitegradient2: linear-gradient(0deg, rgb(var(--offwhitetint)) 0%, rgba(var(--offwhitetint),0.920045518207283) 70%, rgba(var(--offwhitetint),0) 100%);

    --crimson:229,70,70;
    --deepCrimson: 139,39,39;

    --charcoal:60,60,60;
    --lightcharcoal:85,85,85;
    --darkcharcoal:35,35,35;

    --wave:url(https://theremin.app/assets/global/h.svg);
    --waveRed:url(https://theremin.app/assets/global/hred.svg);

  }


  :global(*) {  
    -webkit-backface-visibility:  hidden;
    -webkit-tap-highlight-color:  transparent;
   }
		
	main {
		position: fixed;
		/* display:grid;
		grid-template-columns: repeat(12, 1fr); */
		column-gap: 16px;
		margin: 0 0 0 0;
		width:100%;
		height:100%;
		overflow:hidden;
		background:black;
		cursor:url(https://theremin.app/assets/global/cursor1.svg), auto;
	}

	:global(button){
     background: transparent;
    border: none;
		padding:0;
	}
  :global(button:hover){
     cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
  }

	/* a subtle focus style for keyboard-input elements */
	:global(.text-input:focus) {
	  outline: 1px solid #aaa; /* Adjust to suit your tastes */
	}

	/* no outline for non-keyboard-inputs elements */
	:global(button:focus),
	:global(input:focus),
	:global(label:focus),
	:global(select:focus){
	  outline: none;
	}

	:global(body.user-is-tabbing *:focus),
	:global(body.user-is-tabbing input:focus + container) {
	  outline: 2px solid #7AACFE !important; /* for non-webkit browsers */
	  outline: 5px auto -webkit-focus-ring-color !important;
	}

	:global(a:hover){
	cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
	}
</style>

