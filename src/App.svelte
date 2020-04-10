<script>
	import { scrollY, mousePos } from './components/stores.js';
	import Canvas from './components/Canvas.svelte'
	let onScroll = e => {
		scrollY.set(e.target.documentElement.scrollTop) //Set global scroll value
	}
	let onMouseMove = e => {
		mousePos.set({
			x:e.clientX,
			y:e.clientY
		})  //Set global mouse position value
	}
</script>

<!--Handle Scroll and MousePos Events-->
<svelte:window 
on:scroll={onScroll}
on:mousemove={onMouseMove}
/> 

<!--Handle Scroll and MousePos Events-->
<main>
	<Canvas/>
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
	}

</style>