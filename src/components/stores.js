import { writable } from 'svelte/store';
export const darkMode = writable(false);
export const active = writable(false);
export const loaded = writable(false);
export const coverLoaded = writable(false);
export const fontsLoaded = writable(false);
export const manual = writable(false);
export const camera = writable(false);
export const videoReady = writable(null);
export const WIDTH = writable(2400/2);
export const HEIGHT = writable(1350/2);
export const SCALE = writable(1)
export const TIME = writable(0)
export const CANVASWIDTH = writable(2400/2);
export const CANVASHEIGHT = writable(1350/2);
export const globalPointerUp = writable(true);
export const mousePos = writable({x:0,y:0})
export const gestures = writable(false)
export const canvasMousePos = writable({x:0,y:0})
export const keydown_O = writable(false)
export const keydown_K = writable(false)
export const keydown_S = writable(false)
export const keydown_G = writable(false)

export const keydown_left = writable(false)
export const keydown_right = writable(false)
export const keydown_Kop = writable(false)
export const keydown_down = writable(false)
export const reverseDirection = writable(false)

export const mouseOverride = writable(0)
export const audioControls = writable({x:0,y:0})
export const thereminPos = writable({x:0,y:0})
export const machineLeftPos = writable({x:0,y:0})
export const thereminMobilePos = writable({x:0,y:0})
export const tablePos = writable({x:0,y:0})
export const videoPos = writable({x:0,y:0})

export const expandSettings = writable(false)
export const volumeVal = writable(0)
export const gain1Val = writable(0.1)
export const FFT = writable([])
export const glide = writable(true)
export const toneOutput = writable({
    glide:true,
    freq:0,
    note:'G4'
})
export const oscillatorType = writable('Sine')
export const analyser = writable(null)
export const tonic = writable('G')
export const scaleType = writable('Major')
export const scaleNotes = writable([])
export const startOctave = writable(3)
export const endOctave = writable(5)
export const enableMIDI = writable(false);
export const MIDI_Display_Text = writable('Loading...');
export const currentMIDITitle = writable(null);
export const currentMIDIOffset = writable(.5);
export const currentMIDITint = writable(0xffffff);
export const currentMIDI = writable('だから僕は音楽を辞めた');
export const MIDI_tint = writable(null);
export const MIDITextSprite = writable(null);
export const MIDI_finished = writable(null);
export const poseNetRes = writable(null);

export const dragged = writable(null)
export const hovered = writable(null)

