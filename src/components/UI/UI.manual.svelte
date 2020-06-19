<script>
import Carousel from '@beyonk/svelte-carousel'
import {loaded,active,WIDTH,HEIGHT,SCALE,manual} from '../stores.js';
import { onMount } from 'svelte';
import Logo from '../icons/logo.svelte'; 
import Play from '../icons/play.svelte'; 
import About from '../icons/about.svelte'; 
import closeIcon from '../icons/close.svelte'; 
import ButtonCircle from './UIElements/UI.buttoncircle.svelte';
import BasicControls from '../icons/basicControls.svelte'
import GestureControls from '../icons/gestureControls.svelte'
import MIDIControls from '../icons/MIDISupport.svelte'
import Arrow from '../icons/arrow.svelte'

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
	handlebuttons()
}

</script>

<section class={$manual ? '' : 'hide'}>
	<ButtonCircle 
    icon={closeIcon} 
    setting={manual}
	settingState={false} 
	selected={true}
    styles={'--bgColor:var(--buttonColor);--svgColor:var(--iconColor);--svgColorHover:var(--iconColor);position:absolute;top:0px;right:0px;border-radius:0;border-top-right-radius: 16px;border-bottom-left-radius: 16px;z-index:2'}
	tabindex={$manual ? 0 : -1}
	/>
	<Carousel loop={false} perPage={1} startIndex={startSlide} duration={400} threshold={$WIDTH>600 ? 200 : 100} on:change={e=>{handleChange(e.detail)}}>

	<span class="control" slot="left-control">
		<Arrow color={'rgb(var(--arrowColor))'}/>
	</span>
		<div class="slide-content {(currentSlide === 0 && $loaded) ? 'current' : ''}" >
			<container>
			<div class="graphic">
				<h2>Theremin<br>Basics</h2>
				<div class="svg">
					<BasicControls color="rgb(var(--textColor1))" bgColor="rgb(var(--cardColor))"/>
				</div>
			</div>
			<div class="description">
				<p>The theremin is an electic musical instrument played by the movement of both hands in the space surrounding it. THEREMIX's default controls translates these 2 movements into 1 fluid cursor movement.</p>
				<hr>
				<ol>
					<li>
						<h3>Volume Antenna</h3>
						Movement towards this antenna <span>(x-axis)</span> increases the <span>volume</span> of the current oscillator. 
					</li>
					<li>
						<h3>Pitch Antenna</h3>
						Movement towards this antenna <span>(y-axis)</span> increases the frequency of the current oscillator, raising the <span>pitch</span>. You can modify the <span>octave</span> and <span>scale</span> of the pitch antenna under the Settings panel.
					</li>
					<li>
						<h3>Master Volume</h3>
						Controls the overall volume <span>(-48db — 0db)</span> of the app.
					</li>
					<li>
						<h3>Oscillator<span class="keycap">O</span></h3>
						Choose from 18 different oscillator waveforms to change the timbre of the theremin. Includes <span>Sine</span>, <span>Triangle</span>, <span>Sawtooth</span>, <span>Square</span>, <span>Pulse</span> oscillators as well as many other alternates. 
						<br>
						<br>
						'O' to cycle between oscillators. 'O' + Arrow Keys to switch back and forth.
					</li>
					<li>
						<h3>Glide <span class="keycap">G</span></h3>
						Glide is how the theremin tone operates traditionally, <span>sliding smoothly</span> between pitches. This is on by default. Turning this off will snap the tone to a <span>perfect note</span>.   
						<br>
						<br>
						Hold 'G' to toggle glide.
					</li>
					<li>
						<h3>Key/Scale<span class="keycap">K</span><span class="keycap">S</span></h3>
						Modifying this setting changes the freqency range of the theremin as well as the tones played when Glide is off. Choose between <span>12 different tonic keys</span> and <span>18 different scales types</span>. Octave range is also adjustable under Settings.
						<br>
						<br>
						'K' or 'S' to cycle between keys and scales. 'K' or 'S' + Arrow Keys to switch back and forth.    
					</li>
				</ol>
			</div>
			</container>
			<div class="gradient"></div>
		</div> 
		<div class="slide-content {(currentSlide === 1 && $loaded) ? 'current' : ''}">
			<container>
			<div class="graphic">
				<h2>Gesture<br>Controls</h2>
				<div class="svg">
					<GestureControls color="rgb(var(--textColor1))" bgColor="rgb(var(--cardColor))"/>
				</div>
			</div>
			<div class="description">
				<p>Webcam motion capture allows you to experience the gestural movements of playing a physical theremin. Powered by the <a href='https://github.com/tensorflow/tfjs-models/tree/master/posenet' target="blank">PoseNet</a> machine learning model for pose detection.</p>
				<hr>
				<ul>
					<li>
						<h3>Both Hands Present</h3>
						Movement towards this antenna <span>(x-axis)</span> increases the <span>volume</span> of the current oscillator. 
					</li>
					<li>
						<h3>One Hand Present</h3>
						Movement towards this antenna <span>(y-axis)</span> increases the frequency of the current oscillator, raising the <span>pitch</span>. You can modify the <span>octave</span> and <span>scale</span> of the pitch antenna under the Settings panel.
					</li>
				</ul>
			</div>
			</container>
			<div class="gradient"></div>
		</div> 
		<div class="slide-content {(currentSlide === 2 && $loaded) ? 'current' : ''}">
			<container>
			<div class="graphic">
				<h2>Midi<br>Controller</h2>
				<div class="svg">
					<MIDIControls color="rgb(var(--textColor1))" bgColor="rgb(var(--cardColor))"/>
				</div>
			</div>
			<div class="description">
				<p>Webcam motion capture allows you to experience the gestural movements of playing a physical theremin. Powered by the <a href='https://github.com/tensorflow/tfjs-models/tree/master/posenet' target="blank">PoseNet</a> machine learning model for pose detection.</p>
				<hr>
				<ul>
					<li>
						<h3>Both Hands Present</h3>
						Movement towards this antenna <span>(x-axis)</span> increases the <span>volume</span> of the current oscillator. 
					</li>
					<li>
						<h3>One Hand Present</h3>
						Movement towards this antenna <span>(y-axis)</span> increases the frequency of the current oscillator, raising the <span>pitch</span>. You can modify the <span>octave</span> and <span>scale</span> of the pitch antenna under the Settings panel.
					</li>
				</ul>
			</div>
			</container>
			<div class="gradient"></div>
		</div> 
		<div class="slide-content {(currentSlide === 3 && $loaded) ? 'current' : ''}">
				<container>
			<div class="graphic">
				<h2>Resources<br>and Links</h2>
				<div class="svg">
					<About color="rgb(var(--textColor1))" bgColor="rgb(var(--cardColor))"/>
				</div>
			</div>
			<div class="description">
				<p>The theremin is an electic musical instrument played by the movement of both hands in the space surrounding it. THEREMIX's default controls translates these 2 movements into 1 fluid cursor movement.</p>
				<hr>
				<ol>
					<li>
						<h3>Volume Antenna</h3>
						Movement towards this antenna <span>(x-axis)</span> increases the <span>volume</span> of the current oscillator. 
					</li>
					<li>
						<h3>Pitch Antenna</h3>
						Movement towards this antenna <span>(y-axis)</span> increases the frequency of the current oscillator, raising the <span>pitch</span>. You can modify the <span>octave</span> and <span>scale</span> of the pitch antenna under the Settings panel.
					</li>
					<li>
						<h3>Master Volume</h3>
						Controls the overall volume <span>(-48db — 0db)</span> of the app.
					</li>
					<li>
						<h3>Oscillator<span class="keycap">O</span></h3>
						Choose from 18 different oscillator waveforms to change the timbre of the theremin. Includes <span>Sine</span>, <span>Triangle</span>, <span>Sawtooth</span>, <span>Square</span>, <span>Pulse</span> oscillators as well as many other alternates. 
						<br>
						<br>
						'O' to cycle between oscillators. 'O' + Arrow Keys to switch back and forth.
					</li>
					<li>
						<h3>Glide <span class="keycap">G</span></h3>
						Glide is how the theremin tone operates traditionally, <span>sliding smoothly</span> between pitches. This is on by default. Turning this off will snap the tone to a <span>perfect note</span>.   
						<br>
						<br>
						Hold 'G' to toggle glide.
					</li>
					<li>
						<h3>Key/Scale<span class="keycap">K</span><span class="keycap">S</span></h3>
						Modifying this setting changes the freqency range of the theremin as well as the tones played when Glide is off. Choose between <span>12 different tonic keys</span> and <span>18 different scales types</span>. Octave range is also adjustable under Settings.
						<br>
						<br>
						'K' or 'S' to cycle between keys and scales. 'K' or 'S' + Arrow Keys to switch back and forth.    
					</li>
				</ol>
			</div>
			</container>
			<div class="gradient"></div>
		</div> 
		
		
		
	<span class="control" slot="right-control">
		<Arrow color={'rgb(var(--arrowColor))'}/>
	</span>
	</Carousel>
</section>

<style>
	/* Colors */
	section{
		--cardColor: var(--offwhite);
		--containerColor:var(--crimson);
		--manualColor: 255, 211, 166;
		--descriptionColor:var(--offwhitetint);
		--cardGradient:linear-gradient(0deg, rgb(var(--descriptionColor)) 0%, rgba(var(--descriptionColor),0.920045518207283) 70%, rgba(var(--descriptionColor),0) 100%);
		--containerGradient:linear-gradient(0deg, rgb(var(--descriptionColor)) 0%, rgb(var(--descriptionColor)) 26%, rgb(var(--cardColor)) 30%, rgb(var(--cardColor)) 32%, rgb(var(--cardColor)) 100%);
		--textColor1:var(--crimson);
		--textColor2:var(--charcoal);
		--spanColor: var(--navy);
		--listColor:var(--charcoal);
		--buttonColor:var(--crimson);
		--iconColor:var(--offwhite);
		--arrowColor:var(--offwhite);
		--hrImage:var(--wave);
	}

	@media (prefers-color-scheme: dark) {
		section{
			--cardColor: 17,17,17;
			--manualColor: 50,42,42;
			--descriptionColor: 30,25,25;
			--arrowColor:var(--crimson);
			--textColor2:var(--offwhite);
			--listColor:var(--crimson);
			--hrImage:var(--waveRed);
			--spanColor: var(--sun);
		}
	}
	/* Colors */

	section{
		position:absolute;
		width:80vw;
		height:80vh;
		color:rgb(var(--textColor1));
		max-height: 100%;
		max-width:1200px;
		max-height:800px;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-origin: bottom;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		transform:translate3d(0, 0, 0);
		transition: transform .7s cubic-bezier(0.55, 1.32, 0.51, 0.97);
		
	}

	section.hide{
		-moz-transform: translate3d(111vw, 8vh, 0) rotate(10deg);
		-webkit-transform: translate3d(111vw, 8vh, 0) rotate(10deg);
		transform: translate3d(111vw, 8vh, 0) rotate(10deg);
		pointer-events: none;
	}
	:global(.slides){
		border-radius:16px;
		background:#FBDDCC;
		background: rgb(var(--manualColor));
		overflow: hidden;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
	}
	:global(.slides:before){
	content: '';
    background-size: auto 10px;
    opacity: 0.05;
    position: absolute;
    border: none;
    height: 200%;
    width: 200%;
    left: -50%;
    top: -50%;
    background-position: 100% 100%;
    background-image:var(--wave);
    transform-origin: center;
    transform: rotate(45deg);
	}

	.slide-content{
		pointer-events:fill;
		width:80vw;
		height:80vh;
		max-width:1200px;
		max-height:800px;
		margin-left:0;
		background:rgb(var(--cardColor));
		opacity:0;
		transition: opacity .75s linear;
		border-radius: 16px;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		-webkit-box-shadow: 0px 0px 53px -11px rgba(0,0,0,0.15);
		-moz-box-shadow: 0px 0px 53px -11px rgba(0,0,0,0.15);
		box-shadow: 0px 0px 53px -11px rgba(0,0,0,0.15);
		position:relative;  
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
	}
	.slide-content.current{
		opacity:1;
		transition: opacity .75s linear .5s;
	}
	container{
		 position:absolute;
		  height:100%;
		  width:100%;
		  display: flex;
		flex-direction: row;
	}
	.fullscreen container{
		overflow-y:scroll;
	}
	.graphic{
		height:calc(100% - 64px);
		flex:100;
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
		min-height: 56px;
		font-size: 40px;
		font-weight: normal;
		font-family:'Whirly Birdie';
		font-variation-settings: "wght" 100, "wdth" 140, "ital" 0;
		line-height: 1.1;
		/* font-feature-settings: 'ss01'; */
	}
	.description{
		width: calc(40% - 80px);
		min-width:320px;
		max-width:400px;
		padding: 40px 40px 40px 40px;
    	min-height: calc(100% - 80px);
		margin: 0;
		background:rgb(var(--descriptionColor));
		overflow-y: scroll;
		font-family: 'Nicholson Beta';
		font-size:18px;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
	}

	.fullscreen .description{
		width:calc(100% - 80px);
		column-count: 2;
		column-fill: auto;
		column-gap:40px;
		padding: 40px;
		max-width:none;
		height:max-content;
		/* overflow-y:scroll; */
	}

	.gradient{
		opacity:0;
		width:100%;
		position:absolute;
		bottom:0;
		left:0;
		height:60px;
		background: rgb(var(--descriptionColor));
		background: var(--cardGradient);
		pointer-events:none;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
	}

	.fullscreen .gradient{
		opacity:1
	}
	.description>p{
		margin:24px 0 24px 0;
		width:100%;
		color:rgba(var(--textColor2),1);
		font-size:18px;
	}

	hr{
		background-size: auto 4px;
		/* opacity:0.6; */
		border: none;
    	height: 8px;
        background-repeat: repeat-x;
        background-position: 100% 100%;
        background-image:var(--hrImage)
	}
	a{
		color:rgb(var(--spanColor));
		display: inline-block;
		position: relative;
		text-decoration: none;
		width: max-content;
	}
	a:before{
		content:'';
		position:absolute;
		height: 2px;
		bottom:0px;
		border-top:1px dotted;
		/* background:rgb(var(--crimson)); */
		width:100%;  
	}
	ol{
		list-style: none;
		margin:24px 0 24px 0;
		width: calc(100% - 72px);
    	padding-inline-start: 72px;
	}
	ul{
		list-style: none;
		margin:24px 0 24px 0;
		width: 100%;
    	padding-inline-start: 0;
	}
	li{
		counter-increment: step-counter;
		position: relative;
		margin:0 0 24px 0;
		color:rgba(var(--textColor2),1);
		font-size:14px;
	}
	li span{
		color:rgb(var(--spanColor))
	}

	ol li::before {
	position: absolute;
    top: 0;
    content: counter(step-counter);
    left: -68px;
    font-size: 48px;
    color: rgb(var(--listColor));
    font-family: 'Whirly Birdie';
    font-weight: normal;
    border-radius: 4px;
    display: flex;
    opacity: .3;
    align-items: center;
    justify-content: center;
    width: 32px;
    font-variation-settings: "wght" 60, "wdth" 80, "ital" 0;
	}

	h3{
	font-family: 'Whirly Birdie';
    font-size: 14px;
    margin: 0 0px 8px 0px;
    padding-top: 12px;
    font-weight: normal;
	font-variation-settings: "wght" 90, "wdth" 110, "ital" 0;
	color:rgb(var(--textColor1));
	display:flex;
	}
	.keycap{
		padding: 4px;
		background: rgba(var(--crimson),0.3);
		color:rgb(var(--offwhite));
		font-size: 8px;
		border-radius: 2px;
		margin-left: 8px;
	}
	
	:global(.carousel>ul>li.active){
		background-color:rgb(var(--textColor1)) !important;
		
	}
	:global(.carousel>ul>li){
		background-color:rgba(var(--textColor1),.2) !important;
	}

	:global(.right){
		width:56px !important;
		height:56px !important;
		right: calc(-56px - 16px) !important;
		transform-origin: center;
		transform: rotate(180deg)
	}
	:global(.left){
		width:56px !important;
		height:56px !important;
    	left: calc(-56px - 16px) !important;
	}
	:global(.left),:global(.right){
		border-radius: 50%;
		/* background:rgba(255,255,255,0.1) !important */
	}
	:global(.left:hover),:global(.right:hover){
		background:rgba(var(--offwhite),0.15) !important
	}
	:global(.left.disabled),:global(.right.disabled){
		display: none;
	}

	@media screen and (max-width:1024px){
		h2{
			font-size: 32px;
		}
		section{
			width:95vw;
		}
		.slide-content{
			width:95vw;
		}
		.description{
			max-width:unset
		}
		:global(.right){
			display: none;
		}
		:global(.left){
			display: none;
		}
	
	}
	@media screen and (max-width: 800px) {
      section{
		  width:95vw;
		  height:calc(80vh);
	  }
	  h2{
		  font-size: 28px;
		  margin-bottom: 24px;
	  }
	  .slide-content{
		  width:95vw;
		  height: calc(80vh); 
			background: var(--containerGradient)
	  }
	  .slide-content.fullscreen{
		  background:rgb(var(--cardColor))
	  }
	  container{
    	flex-direction: column;
		  overflow-y: scroll;
	  }
	  .gradient{
		  opacity:1;
	  }
	  .graphic{
		  height:max-content;
		  min-height: max-content;
		  width:calc(100% - 48px);
		  margin: 24px 24px 0px 24px;
	  }
	  .svg{
		  height:auto;
		  flex-grow: unset;
		  display: block;
	  }
	  .fullscreen .svg{
		  flex:100;
		  display: flex;
		  justify-content: center;
		  align-items: center;
	  }
	  .description{
		  margin: 24px 0px 0px 0px;
		  font-size:16px;
		  min-width:0;
		  min-height: max-content;
		  flex:100;
			-webkit-box-flex: 100;
    		-webkit-flex: 100;
		  padding: 24px 24px 40px 24px;
    		width: calc(100% - 48px);
	  }
	  .fullscreen .description{
		  margin:0;
		  column-count:1;
		  padding:24px 24px 40px 24px;
		  width: calc(100% - 48px);
		  background:rgb(var(--descriptionColor));
	  }
	  .description>p{
		  margin:0px 0px 24px 0px;
	  }
	  ol li::before {
		  left: -64px;
	  }
	 
	  	:global(.right){
			display: none;
		}
		:global(.left){
			display: none;
		}
	  
    }
</style>