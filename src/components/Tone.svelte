<script>
import {active,volumeVal,thereminPos,mousePos,pizzicato,scaleType,scaleNotes,tonic,octaves,oscillatorType} 
from './stores.js'

const generateScale = (tonic,key,octaves)=>{
    let scale = teoria.scale(tonic,key)
    let newNotes = []
    for(let i=0; i<octaves; i++){
        scale.notes().forEach(e=>{
            let scientificNot = e.scientific()
            let base = scientificNot.slice(0, -1);
            let num = parseInt(scientificNot.match(/(\d+)/)[0])+i
            newNotes.push(base+num)
        })
    }
    return newNotes
}

$:  scaleNotes.set(
        generateScale(
            $tonic,
            $scaleType.toLowerCase().replace(/\s/g, ''),
            $octaves
        )
    )



const masterVolume = new Tone.Volume($volumeVal);
const gain1 = new Tone.Gain(0.1);
const mainOsc = new Tone.OmniOscillator({
  frequency: 440,
  detune: 0,
  phase: 0,
  spread: 20,
  count: 3,
  modulationIndex: 2,
  modulationType: "square",
  harmonicity: 1,
  partialCount: 0
});
$: mainOsc.type = $oscillatorType.toLowerCase().replace(/\s/g, '')
let vibrato = new Tone.Vibrato({
  maxDelay: 0.005,
  frequency: 5,
  depth: 0.1,
  type: "sine"
});
mainOsc.chain(vibrato,gain1, masterVolume, Tone.Master);

$:{
    if($active){
        let maxFreq = Tone.Frequency($scaleNotes[$scaleNotes.length-1])
        let minFreq = Tone.Frequency($scaleNotes[0])
        let yScaled = Math.max(Math.min(($mousePos.y-$thereminPos.y)/($thereminPos.height), 1), 0)
        let xScaled = Math.max(Math.min(($mousePos.x-$thereminPos.x)/($thereminPos.width), 1), 0)
        
        if(mainOsc.state === 'stopped'){
            mainOsc.start()
        }
        if(Tone.context.state !== 'running'){  
            Tone.context.resume();
        }

        let gain1Max = ($oscillatorType === 'sine') ? 0.5 
            : ($oscillatorType === 'sine') ? 0.1
            : 0.5
        gain1.gain.value = yScaled * gain1Max
        vibrato.frequency.value = yScaled * 10;

        if($pizzicato){
            let steps = Math.min(~~(xScaled / (1/$scaleNotes.length)),($scaleNotes.length-1));
            
            mainOsc.frequency.value = (mainOsc.frequency.value !== $scaleNotes[steps]) ? $scaleNotes[steps] : mainOsc.frequency.value
        }else{
            let calcFreq = xScaled * (maxFreq - minFreq) + minFreq;
            mainOsc.frequency.value = (mainOsc.frequency.value !== calcFreq) ? calcFreq : mainOsc.frequency.value
        }
        
        
    }else{
        if(mainOsc.state === 'started'){
            mainOsc.stop()
        }
        if(Tone.context.state === 'running'){
            Tone.context.suspend();
        }
    }
}
</script>
