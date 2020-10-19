<script>
import {onMount} from 'svelte'
import {active,recording,hasMediaRecording} from "../stores.js"
import { getTimeString } from "../helpers.js";

let linkEl;
const actx  = Tone.context;
const dest  = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);
hasMediaRecording.set(true)

const chunks = [];
  
Tone.Destination.connect(dest);
  
onMount(async()=>{
  recorder.addEventListener('dataavailable', e => {
      chunks.push(e.data)
  })

  recorder.addEventListener('stop', e => {
    let blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
    let url = URL.createObjectURL(blob)
    // console.log(url)
    linkEl.href = url;
    linkEl.download = 'Theremix Recording '+getTimeString()+'.wav';        
    linkEl.click();
    setTimeout(()=>{
      window.URL.revokeObjectURL(url);
      chunks.length = 0
    },100)
    
  })
  
})


$:{
  if ($active && $recording){
     recorder.start()
  }else{
    if(recorder.state !== 'inactive'){
      recorder.stop()
      recording.set(false)
    }
  }
}
</script>

<a bind:this={linkEl} style="display:none"></a>