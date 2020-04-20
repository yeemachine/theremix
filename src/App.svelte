<script>
	import {mousePos, loaded } from './components/stores.js';
	import Canvas from './components/Canvas.svelte'
	import UI from './components/UI.svelte'
	import Tone from './components/Tone.svelte'
	import Webcam from './components/Video.webcam.svelte'
	import PoseNet from './components/Video.posenet.svelte'
	import Settings from './components/UI.settingsexpanded.svelte'

let handlePointerMove = e => {
			mousePos.set({
				x:e.clientX,
				y:e.clientY
			})
		  //Set global mouse position value
}

</script>

<!--Handle Scroll and MousePos Events-->
<svelte:window 
on:pointermove={handlePointerMove}
/> 

<!--Handle Scroll and MousePos Events-->
<main>
	<Canvas/>
	<Settings/>
	<UI/>
	<Tone/>
	<Webcam/>
	<PoseNet/>
</main>

<style>
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
	/* main:hover{
		cursor:none;
	} */

</style>