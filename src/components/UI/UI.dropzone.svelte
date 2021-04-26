<script context="module">
  import {writable} from "svelte/store";
  export let dropzone = writable(false);
</script>
<script>
  import uploadCircle from "../icons/uploadCircle.svelte";
  import uploadIcon from "../icons/upload.svelte";
  import { fade } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';
  import {handleFiles,handleImgFiles} from './UI.settingsexpanded.svelte'
  import {active} from '../../stores.js'
  import {isImageVideo} from '../../helpers.js'

	function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = sineInOut(t);
				const o = +getComputedStyle(node).opacity;
				return `opacity: ${eased * o}; transform: scale(${1.5 - eased* .5}) rotate(${340 + eased * 20}deg)`;
			}
		};
	}
  
const preventDefaults = (e) => {
  e.preventDefault()
  e.stopPropagation()
}
  
const handleDragEnter = (e) => {
  // if(!$active){
  //   return
  // }
  preventDefaults(e)
  e.dataTransfer.dropEffect = "copy";
  dropzone.set(true)
}

const handleDragLeave = (e) => {
  preventDefaults(e)
  dropzone.set(false)
}

const handleDragDrop = (e) => {
  preventDefaults(e)
  dropzone.set(false)
  let files = e.dataTransfer.files
  if(files[0].type.includes('midi')){
    return handleFiles(files)   
  }
  if(isImageVideo(files[0]) === 'img'){
    console.log('isImage')
    return handleImgFiles(files)
  }
}
</script>

<svelte:window  
      on:dragenter={handleDragEnter} 
      on:dragleave={handleDragLeave}  
      on:drop={handleDragDrop} 
      on:dragover={handleDragEnter}/>


{#if $dropzone}
<div class="dropzone" in:fade out:fade="{{duration: 600, delay:300 }}">
  <div class="icon" in:spin="{{duration: 400}}" out:fade="{{duration: 600, delay:600 }}" > 
  <svelte:component this={uploadCircle} />
  </div>
</div>
{/if}

<style>
  .dropzone{
    --padding:16px;
    width:calc(100% - var(--padding) * 2);
    height:calc(100% - var(--padding) * 2);
    padding:var(--padding);
    position:absolute;
    background:#00000090;
    top:0;left:0;
    z-index:9999;
    display:flex;
    align-items:center;
    justify-content:center;
    pointer-events:none;
  }
  .icon{
    position:absolute;
    --size:100%;
    --size:clamp(100px,100%,780px);
    width:var(--size);
    height:var(--size);
    max-height:85vh;
    max-width:80vw;
    transform-origin:center;
    overflow:hidden;
  }
</style>