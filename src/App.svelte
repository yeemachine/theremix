<script>
	import {mousePos, loaded } from './components/stores.js';
	import Canvas from './components/Canvas.svelte'
	import UI from './components/UI.svelte'
	import Tone from './components/Tone.svelte'
	import Webcam from './components/Video.webcam.svelte'
	import PoseNet from './components/Video.posenet.svelte'
	import Settings from './components/UI.settingsexpanded.svelte'
	let containerHeight,containerWidth

</script>

<style>

	
	:global(button){
		background: transparent;
    	border: none;
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
		cursor:url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor1.svg?v=1587279853708), auto;
	}

	:global(button){
		padding:0;
	}

	/* a subtle focus style for keyboard-input elements */
	:global(.text-input:focus) {
	outline: 1px solid #aaa; /* Adjust to suit your tastes */
	}

	/* no outline for non-keyboard-inputs elements */
	:global(button:focus),
	:global(label:focus),
	:global(select:focus) {
	outline: none;
	}

	:global(body.user-is-tabbing *:focus) {
	outline: 2px solid #7AACFE !important; /* for non-webkit browsers */
	outline: 5px auto -webkit-focus-ring-color !important;
	}
</style>

<svelte:window 
bind:innerWidth = {containerWidth} 
bind:innerHeight = {containerHeight} 
/> 

<main>
	<Canvas/>
	<Settings/>
	<UI/>
	<Tone/>
	<Webcam/>
	<PoseNet/>
</main>

