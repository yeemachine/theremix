<script>
	import {mousePos, loaded, darkMode, pwa, update,version } from './stores.js';
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

	// Register service worker
	if ('serviceWorker' in navigator) {

		navigator.serviceWorker.register('/sw.js')
			.then((reg) => {
				// Check if an installed sw is waiting
				// if(newSW = reg.waiting) {
				// 	update.set(true)
				// }
				reg.addEventListener('updatefound', () => {
					// Copy reference of new worker being installed
					newSW = reg.installing;
					newSW.addEventListener('statechange', () => {
						// service worker state changed except initial one
						if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
							upSW()
						}
					})
				})
			}).catch((e) => {
				console.log(e);
			});

		navigator.serviceWorker.addEventListener('message', event => {
			version.set(event.data)
		});

		navigator.serviceWorker.ready.then( registration => {
			registration.active.postMessage({ action: 'version' });
		});
	}

	const upSW = () => {
		// Send message to new service worker
		newSW.postMessage({ action: 'clearOld' });
		newSW.postMessage({ action: 'skipWaiting' });
	}

	if (window.matchMedia('(display-mode: standalone)').matches) {  
		pwa.set(true);
	}

let tfLoaded = false,posenetLoaded = false,toneLoaded = false,midiLoaded = false

</script>

<svelte:head>
	<script src="https://unpkg.com/tone@13.8.27/build/Tone.js" on:load={()=>{console.log('toneloaded')
	toneLoaded=true}}></script>
	{#if toneLoaded}
    	<script src="https://unpkg.com/@tonejs/midi" on:load={()=>{console.log('midiloaded')
		midiLoaded=true}}></script>
	{/if}
	<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js" on:load={()=>{console.log('tfloaded')
	tfLoaded=true}}></script>
	{#if tfLoaded}
    	<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet" on:load={()=>{console.log('posenetLoaded')
		posenetLoaded=true}}></script>
	{/if}
</svelte:head>
    
<main>
	<Canvas/>
	<Shortcuts/>
	<Nav/>
	
	{#if toneLoaded && midiLoaded}
		<Tone/>
	{/if}

	{#if tfLoaded && posenetLoaded}
		<Webcam/>
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
		display:grid;
		grid-template-columns: repeat(12, 1fr);
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

