<script>
import {active,volumeVal,thereminPos,canvasMousePos,mousePos,glide,toneOutput,scaleType,scaleNotes,tonic,octaves,oscillatorType,dragged,analyser,audioControls} from './stores.js'
import {constrain} from './helpers.js'

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
const masterCompressor = new Tone.Compressor({
    ratio : 12 ,
    threshold : -24 ,
    release : 0.25 ,
    attack : 0.003 ,
    knee : 30
});
const masterAnalyser = new Tone.Analyser('waveform', 128);
analyser.set(masterAnalyser)

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
$: masterVolume.volume.value = $volumeVal
$: mainOsc.type = ($oscillatorType !== 'Oscillator Off') ? $oscillatorType.toLowerCase().replace(/\s/g, '') : 'sine'

let vibrato = new Tone.Vibrato({
  maxDelay: 0.005,
  frequency: 5,
  depth: 0.05,
  type: "sine"
});
mainOsc.chain(vibrato,gain1,Tone.Master);
Tone.Master.chain(masterCompressor,masterVolume,masterAnalyser);

$:{
    if($active){
        let maxFreq = Tone.Frequency($scaleNotes[$scaleNotes.length-1])
        let minFreq = Tone.Frequency($scaleNotes[0])
        
        if(mainOsc.state === 'stopped'){
            mainOsc.start()
        }
        if(Tone.context.state !== 'running'){  
            Tone.context.resume();
        }

        let gain1Max = 
                $oscillatorType === 'Oscillator Off' ? 0
                : $oscillatorType === 'Sine' ? 0.5
                : $oscillatorType === 'FM Sine' ? 0.2
                : $oscillatorType === 'AM Sine' ? 0.6
                : $oscillatorType === 'Fat Sine' ? 0.6
                : $oscillatorType === 'Square' ? 0.15
                : $oscillatorType === 'FM Square' ? 0.1
                : $oscillatorType === 'AM Square' ? 0.25
                : $oscillatorType === 'Fat Square' ? 0.2
                : $oscillatorType === 'Triangle' ? 0.5
                : $oscillatorType === 'FM Triangle' ? 0.2
                : $oscillatorType === 'AM Triangle' ? 0.5
                : $oscillatorType === 'Fat Triangle' ? 0.5
                : $oscillatorType === 'Sawtooth' ? 0.25
                : $oscillatorType === 'FM Sawtooth' ? 0.2
                : $oscillatorType === 'AM Sawtooth' ? 0.3
                : $oscillatorType === 'Fat Sawtooth' ? 0.25
                : $oscillatorType === 'PWM' ? .1
                : $oscillatorType === 'Pulse' ? .1
                : 0.1
        gain1.gain.value = $audioControls.y * gain1Max
        vibrato.frequency.value = $audioControls.y * 10;

        let steps = Math.min(~~($audioControls.x / (1/$scaleNotes.length)),($scaleNotes.length-1));
        let glideFreq = ($audioControls.x * (maxFreq - minFreq) + minFreq)
        let calcFreq = ($glide) ? glideFreq : Tone.Frequency($scaleNotes[steps]);

        mainOsc.frequency.value = (mainOsc.frequency.value !== calcFreq) ? calcFreq : mainOsc.frequency.value

        toneOutput.set({
            glide:$glide,
            total:$scaleNotes.length,
            index:steps,
            note:$scaleNotes[steps],
            freq:glideFreq
        })     
        
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
