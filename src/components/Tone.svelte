<script>
import {active,enableMIDI,volumeVal,thereminPos,canvasMousePos,mousePos,glide,toneOutput,scaleType,scaleNotes,tonic,oscillatorType,dragged,analyser,audioControls,startOctave,endOctave,MIDI_finished,MIDI_Display_Text,currentMIDITitle,currentMIDIOffset,keydown_left,keydown_down,reverseDirection} from './stores.js'
import {constrain, shuffle, jsUcfirst} from './helpers.js'
import {midiList,tonicOrder,scales} from './config.js'

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
$:  {
    let tonicNote = ($tonic.includes('/')) ? $tonic.substring(0, $tonic.lastIndexOf("/")) : $tonic
    let arr = generateScale(
            tonicNote+$startOctave,
            $scaleType.toLowerCase().replace(/\s/g, ''),
            $endOctave - $startOctave
        )
    arr.push(tonicNote+$endOctave)
    scaleNotes.set(arr)
}

const masterVolume = new Tone.Volume($volumeVal);
const masterCompressor = new Tone.Compressor({
    ratio : 12 ,
    threshold : -24 ,
    release : 0.25 ,
    attack : 0.003 ,
    knee : 30
});
const masterAnalyser = new Tone.Analyser('waveform', 64);
analyser.set(masterAnalyser)

const gain1 = new Tone.Gain(0.1);
const gain2 = new Tone.Gain(0.1);
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

var ampEnv = new Tone.AmplitudeEnvelope({
	"attack": 0.1,
	"decay": 0.2,
	"sustain": 1.0,
	"release": 0.8
}).toMaster();

mainOsc.chain(vibrato,gain1,Tone.Master);
gain2.connect(Tone.Master)
Tone.Master.chain(masterCompressor,masterVolume,masterAnalyser);

let midiSynths = []
// let midiQueue = shuffle(midiList)
let midiQueue = midiList
let MIDI_Display_TextIndex = 0
var checkSynthClear

let monoSynth = new Tone.Synth()
const initMidi = (url)=>{
    console.log('loading midi...')
    Midi.fromUrl(url).then(midi => {
        const now = Tone.now() + 0.5
        const nowDelay = Tone.now() + 1

        midi.tracks.forEach((track,i) => {
            //create a synth for each track
            const synth = new Tone.PolySynth(8, Tone.Synth, {
                oscillator:{
                        type:($oscillatorType === 'Fat Sine') ? 'sine' 
                        : ($oscillatorType === 'Fat Triangle') ? 'triangle'
                        : ($oscillatorType === 'Fat Sawtooth') ? 'sawtooth'
                        : ($oscillatorType === 'Fat Square') ? 'square'
                        : ($oscillatorType === 'PWM') ? 'pwm'
                        : ($oscillatorType === 'Pulse') ? 'pulse'
                        : ($oscillatorType === 'Oscillator Off') ? 'triangle'
                        : $oscillatorType.toLowerCase().replace(/\s/g, ''),
                        spread:($oscillatorType.includes('Fat')) ? 20 : 0,
                        count:($oscillatorType.includes('Fat')) ? 3 : 0,
                        modulationFrequency : ($oscillatorType === 'PWM') ? 0.4 : 0,
                        width : ($oscillatorType === 'Pulse') ? 0.2 : 0
                },
                envelope: {
                    attackCurve:'exponential',
                    attack: 0.02,
                    decayCurve:'exponential',
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1
                }
            }).connect(gain2)

            
            midiSynths.push(synth)
            //schedule all of the events
            track.notes.forEach(note => {
                Tone.Transport.schedule((time)=>{
                    synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
                }, note.time + now)

                // synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
            })

        })

        Tone.Transport.scheduleOnce(()=>{MIDI_finished.set('forwards')}, nowDelay+midi.duration)

        midi.header.keySignatures.forEach(signature=>{

            Tone.Transport.schedule(
               ()=>{
                   let scale = scales.find(a =>a.includes(jsUcfirst(signature.scale))) || null
                   if(scale){
                    scaleType.set(scale)
                   }
                   console.log('SCALE: '+scale)
                }, 
               Tone.Time(now).toTicks()+signature.ticks+'i') 

            Tone.Transport.schedule(
                ()=>{
                    let key = (signature.key.length > 1) ? tonicOrder.find(a =>a.includes(signature.key)) 
                        : signature.key
                    if(key){
                        tonic.set(key)
                    }
                    console.log('KEY: '+key)
                }, 
                Tone.Time(now).toTicks()+signature.ticks+'i') 
            })

        console.log('Current Playing: '+midiQueue[MIDI_Display_TextIndex].name)
        MIDI_Display_Text.set('♫ '+midiQueue[MIDI_Display_TextIndex].name+' / '+midiQueue[MIDI_Display_TextIndex].artist)
        currentMIDITitle.set(midiQueue[MIDI_Display_TextIndex].name)
        currentMIDIOffset.set(midiQueue[MIDI_Display_TextIndex].offset)
    })
}

let playNext = (direction = 'forward')=>{
    if(direction==='back'){
         MIDI_Display_TextIndex = MIDI_Display_TextIndex > 0 
            ? MIDI_Display_TextIndex-1 
            : midiQueue.length-1
    }else{
        MIDI_Display_TextIndex = (MIDI_Display_TextIndex < (midiQueue.length-1)) 
            ? MIDI_Display_TextIndex+1 
            : 0
    }
}

const cleanupSynths = () => {
    Tone.Transport.cancel()
    while (midiSynths.length) {
        const synth = midiSynths.shift()
        synth.dispose()
    }
}

const reverse = {reverse:false}
$:{
    if($keydown_left || $keydown_down){
        reverse.reverse = true
    }else{
        reverse.reverse = false
    }

}



$:{

    if ($enableMIDI) {
        if(!$MIDI_finished){
            initMidi(midiQueue[MIDI_Display_TextIndex].url)
        }else{
            cleanupSynths()
               //Delay Midi init for synth cleanup
                
                checkSynthClear = setTimeout(function() {
                    playNext($MIDI_finished)
                    MIDI_finished.set(null)    
                }, 1000); 
                
                MIDI_Display_Text.set('Loading...')
              
                
        }
    } else {
        cleanupSynths()
        MIDI_Display_Text.set('Loading...')
        
    }
}



$:{
    if($active){
        Tone.Transport.start();
    }else{
        Tone.Transport.pause();
    }
}

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
                : $oscillatorType === 'FM Square' ? 0.15
                : $oscillatorType === 'AM Square' ? 0.2
                : $oscillatorType === 'Fat Square' ? 0.1
                : $oscillatorType === 'Triangle' ? 0.6
                : $oscillatorType === 'FM Triangle' ? 0.3
                : $oscillatorType === 'AM Triangle' ? 0.5
                : $oscillatorType === 'Fat Triangle' ? 0.5
                : $oscillatorType === 'Sawtooth' ? 0.17
                : $oscillatorType === 'FM Sawtooth' ? 0.2
                : $oscillatorType === 'AM Sawtooth' ? 0.3
                : $oscillatorType === 'Fat Sawtooth' ? 0.17
                : $oscillatorType === 'PWM' ? .1
                : $oscillatorType === 'Pulse' ? .1
                : 0.1
        gain1.gain.value = $enableMIDI ? 0 : $audioControls.y * gain1Max
        gain2.gain.value = gain1Max
        vibrato.frequency.value = $audioControls.y * 10;

        let steps = {
            x:Math.min(~~($audioControls.x / (1/$scaleNotes.length)),($scaleNotes.length-1)),
            y:Math.min(~~($audioControls.y / (1/$scaleNotes.length)),($scaleNotes.length-1))
        }
        let glideFreq = ($audioControls.x * (maxFreq - minFreq) + minFreq)
        let calcFreq = ($glide) ? glideFreq : Tone.Frequency($scaleNotes[steps.x]);

        mainOsc.frequency.value = (mainOsc.frequency.value !== calcFreq) ? calcFreq : mainOsc.frequency.value

        let envelopeControl = {
            x:($enableMIDI) ? steps.x/$scaleNotes.length : $audioControls.x,
            y:($enableMIDI) ? steps.y/$scaleNotes.length : $audioControls.y
        }
        if(midiSynths.length>0 && $enableMIDI && !$MIDI_finished){
            midiSynths.forEach(synth=>{
                synth.set({
                    oscillator:{
                        type:($oscillatorType === 'Fat Sine') ? 'sine' 
                        : ($oscillatorType === 'Fat Triangle') ? 'triangle'
                        : ($oscillatorType === 'Fat Sawtooth') ? 'sawtooth'
                        : ($oscillatorType === 'Fat Square') ? 'square'
                        : ($oscillatorType === 'PWM') ? 'pwm'
                        : ($oscillatorType === 'Pulse') ? 'pulse'
                        : ($oscillatorType === 'Oscillator Off') ? 'triangle'
                        : $oscillatorType.toLowerCase().replace(/\s/g, ''),
                        spread:($oscillatorType.includes('Fat')) ? 20 : 0,
                        count:($oscillatorType.includes('Fat')) ? 3 : 0,
                        modulationFrequency : ($oscillatorType === 'PWM') ? 0.4 : 0,
                        width : ($oscillatorType === 'Pulse') ? 0.2 : 0
                    },
                    envelope: {
                        attack: 0.005 + .2*(1-envelopeControl.x),
                        sustain: 0.3 - .3*(envelopeControl.y),
                        attackCurve:'exponential',
                        decayCurve:'exponential',
                        decay: 0.1+1.2*((1-envelopeControl.y)),
                        release: 0.1+1.2*((1-envelopeControl.x)),
                    }
                });
            })   
        }

        toneOutput.set({
            glide:$glide,
            total:$scaleNotes.length,
            index:steps,
            note:$scaleNotes[steps.x],
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
