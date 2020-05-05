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

<style>
	@font-face {
	font-family: "Whirly Birdie";
	src: url("https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWhirlyBirdieGX.ttf?v=1588569607311")
		format("truetype");
	}

	@font-face {
	font-family: "Whirly Birdie Narrow";
	src: url("https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWhirlyBirdie-Narrow.woff?v=1587787534986")
		format("woff");
	}

	@font-face {
	font-family: "Whirlybats";
	src: url("https://cdn.glitch.com/1711052e-ea5e-4036-9c61-dd3ef6782855%2FWhirlybatsGX.ttf?v=1583959223787")
		format("truetype");
	}

	@font-face {
	font-family: "Nicholson Beta";
	src: url("https://cdn.glitch.com/1711052e-ea5e-4036-9c61-dd3ef6782855%2Fnicholsonbeta-webfont.woff2?v=1584151257949")
		format("woff2");
	}

	@font-face {
	font-family: "Nicholson Gothic";
	src: url("http://hootalex.github.io/type/nicholson/NicholsonGothic-Regular.otf")
		format("otf");
	}

	/* Master colors */

	:root {
	--black: #000000;
	--white: #ffffff;
	--red: #D53540;
	--blue: #3E8BCA;
	--sun: #FCD836;
	--forest: #464D33;
	--green: #079548;
	--lightgreen: #CCD9D1;
	--wood: #AD6C2F;
	--navy: #1D3767;
	--offwhite: #FFF8E4;
	--crimson: #990000;
	--radius: 45px;
	}

	:global(html), :global(body) {
	font-family: "Whirly Birdie";
	background-color: black;
	font-variation-settings: "wght" 90, "wdth" 120, "ital" 0;
	margin:0;
	padding:0;
	width:100%;
	height:100%;
	overflow:hidden;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
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
</style>