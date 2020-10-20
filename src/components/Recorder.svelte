<script>
import {onMount} from 'svelte'
import {active,recording,hasMediaRecording,recordingTime} from "../stores.js"
import { getTimeString } from "../helpers.js";

let linkEl;
let startTime
let counter;
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
      startTime = Date.now()
      initCounter()
  }else{
    if(recorder.state !== 'inactive'){
      recorder.stop()
      recording.set(false)
      clearInterval(counter);
      setTimeout(()=>{
        if(recorder.state !== 'active'){
          recordingTime.set(null)
        }
      },1500)
    }
  }
}
  
function initCounter(){
  recordingTime.set('00')
  counter = setInterval(function() {

  // Get today's date and time
  var now = Date.now();

  // Find the distance between now and the count down date
  var distance = now - startTime;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  let d = days===0 ? '' : days+':';
  let h = hours===0 && days===0 ? '' : 
    hours !== 0 && days === 0 ? hours+':'
    : ('0'+hours).slice(-2)+':';
  let m = minutes===0 && hours===0 && days===0 ? '' :
    minutes!==0 && hours === 0 ? minutes+':'
    : ('0'+minutes).slice(-2)+':';
  let s = ('0'+seconds).slice(-2);

  recordingTime.set(d+h+m+s)
}, 1000);
}
</script>

<a bind:this={linkEl} style="display:none"></a>