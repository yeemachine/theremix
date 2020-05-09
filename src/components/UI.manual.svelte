<script>
import Carousel from '@beyonk/svelte-carousel'
import {loaded,active,WIDTH,HEIGHT,SCALE,thereminPos,manual,coverLoaded} from './stores.js';
import { onMount } from 'svelte';
import Logo from './icons/logo.svelte'; 
import Play from './icons/play.svelte'; 
import closeIcon from './icons/close.svelte'; 
import ButtonCircle from './UI.buttoncircle.svelte';
import BasicControls from './icons/basicControls.svelte'

let startSlide = 0
let currentSlide = startSlide
let slideCount = 4
const handleChange = (e) => {
	currentSlide = e.currentSlide
	slideCount = e.slideCount
	handlebuttons($manual)
}

const handlebuttons = () => {
	document.querySelectorAll('.carousel button').forEach((e,i)=>{
		e.tabIndex = ($manual) ? 0 : -1
		if(i===0 && currentSlide===0){
			e.classList.add('disabled')
		}else if(i===1 && currentSlide===slideCount-1){
			e.classList.add('disabled')
		}else{
			e.classList.remove('disabled')
		}
		
	})
}

onMount(async()=>{
	handlebuttons()
})
$:{
	handlebuttons($manual)
}

</script>

<section class={$manual ? '' : 'hide'}>
	<ButtonCircle 
    icon={closeIcon} 
    setting={manual} 
    styles={'position:absolute;top:16px;right:16px;z-index:2'}
	tabindex={$manual ? 0 : -1}
	/>
	<Carousel loop={false} perPage={1} startIndex={startSlide} duration={200} threshold={40} on:change={e=>{handleChange(e.detail)}}>

	<span class="control" slot="left-control">
	</span>
		<div class="slide-content {(currentSlide === 0 && $loaded) ? 'current' : ''}" >
			<div class="graphic">
				<h2>Basics</h2>
				<div class="svg">
					<BasicControls/>
				</div>
			</div>
			<div class="description">
			</div>
		</div> 
		<div class="slide-content {(currentSlide === 1 && $loaded) ? 'current' : ''}">
			<div class="graphic">
				<h2>Gesture<br>Control</h2>
				<div class="svg">
				<BasicControls/>
				</div>
			</div>
			<div class="description">
			</div>
		</div> 
		<div class="slide-content {(currentSlide === 2 && $loaded) ? 'current' : ''}">
			<div class="graphic">
				<h2>MIDI<br>Support</h2>
				<div class="svg">
				<BasicControls/>
				</div>
			</div>
			<div class="description">
			</div>
		</div> 
		<div class="slide-content {(currentSlide === 3 && $loaded) ? 'current' : ''}">
		<div class="graphic">
				<h2>Background</h2>
				<div class="svg">
				<BasicControls/>
				</div>
			</div>
			<div class="description">
			</div>
		</div> 
	<span class="control" slot="right-control">
	</span>
	</Carousel>
</section>

<style>
	section{
		position:absolute;
		width:80vw;
		height:80vh;
		color:var(--crimson);
		max-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		transition: transform .7s cubic-bezier(0.55, 1.32, 0.51, 0.97);
	}
	section.hide{
		-moz-transform: translate3d(111vw, 8vh, 0) rotate(10deg);
		-webkit-transform: translate3d(111vw, 8vh, 0) rotate(10deg);
	}
	:global(.slides){
		border-radius:16px;
		background:#FBDDCC;
		background: var(--crimson);
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
	}
	.slide-content{
		pointer-events:fill;
		width:80vw;
		height:80vh;
		margin-left:0;
		background:var(--offwhite);
		opacity:0;
		transition: opacity .75s linear .5s;
		display: flex;
		flex-direction: row;
		border-radius: 16px;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		-webkit-box-shadow: 0px 0px 53px -11px rgba(0,0,0,0.15);
		-moz-box-shadow: 0px 0px 53px -11px rgba(0,0,0,0.15);
		box-shadow: 0px 0px 53px -11px rgba(0,0,0,0.15);
	}
	.slide-content.current{
		opacity:1;
		transition: opacity .75s linear .5s;
	}
	.graphic{
		height:calc(100% - 64px);
		width: calc(60% - 24px);
		margin: 24px 24px 40px 24px;
		display: flex;
		flex-direction: column;
		pointer-events:none;
	}
	.svg{
		width:100%;
		flex-grow: 1;
		height:0;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
	}
	h2{
		margin: 0;
		font-size: 40px;
		font-weight: normal;
		font-variation-settings: "wght" 100, "wdth" 120, "ital" 0;
		line-height: 1.1;
		/* font-feature-settings: 'ss01'; */
	}
	.description{
		width: calc(40%);
		height:100%;
		margin: 0;
		background:rgba(229,70,70,.05);
		overflow-y: scroll;
	}
	:global(.carousel ul>li.active){
		background-color:var(--crimson) !important;
		
	}
	:global(.carousel ul>li){
		background-color:rgba(229,70,70,.3) !important;
	}
	@media screen and (max-width:1024px){
		section{
			width:95vw;
		}
		.slide-content{
			width:95vw;
		}
	}
	@media screen and (max-width: 600px) {
      section{
		  width:95vw;
		  height:calc(80vh);
	  }
	  h2{
		  font-size: 28px;
		  margin-bottom: 16px;
	  }
	  .slide-content{
		  width:95vw;
		  height: calc(80vh);
		  display: block;
		  overflow-y: scroll;
	  }
	  .graphic{
		  height:max-content;
		  width:calc(100% - 48px);
		  margin: 24px 24px 0px 24px;
	  }
	  .svg{
		  height:auto;
		  flex-grow: unset;
		  display: block;
	  }
	  .description{
		  width: 100%;
		  margin: 24px 0px 0px 0px;
		  padding-bottom:40px;
	  }
	  	:global(.right){
			display: none;
		}
		:global(.left){
			display: none;
		}
	  
	  
    }
</style>