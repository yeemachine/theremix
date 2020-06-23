<script>
	import {mousePos, loaded, darkMode } from './components/stores.js';
	import Canvas from './components/Canvas.svelte'
	import Nav from './components/UI/UI.nav.svelte'
	import Shortcuts from './components/UI/UI.shortcuts.svelte'
	import Tone from './components/Tone.svelte'
	import Webcam from './components/Video.webcam.svelte'
	import PoseNet from './components/Video.posenet.svelte'

	// Reload page on sw change
	navigator.serviceWorker.addEventListener('controllerchange', () => {
		// location.reload()
	});

	var newSW;
	// Register service worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js')
			.then((reg) => {
				// Check if an installed sw is waiting
				if(newSW = reg.waiting) {
					// showBtn();
				}
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

	}

	const upSW = () => {
		console.log('Initiating upgrade');
		// Send message to new service worker
		newSW.postMessage({ action: 'clearOld' });
		newSW.postMessage({ action: 'skipWaiting' });
	}
</script>

<style>

  @font-face {
    font-family: "Whirly Birdie";
    src: url("https://theremin.app/assets/fonts/WhirlyBirdieGX.ttf")
      format("truetype");
  }

  @font-face {
      font-family: "Whirly Birdie Regular";
      src: url("https://theremin.app/assets/fonts/WhirlyBirdie-Regular.woff")
          format("woff");
  }

	@font-face {
	font-family: "Nicholson Beta";
	src: url("https://theremin.app/assets/fonts/nicholsonbeta-webfont.woff2")
		format("woff2");
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



<main>
	<Canvas/>
	<Shortcuts/>
	<Nav/>
	<Tone/>
	<Webcam/>
	<PoseNet/>
</main>

