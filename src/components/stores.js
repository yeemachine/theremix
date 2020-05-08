import { writable } from 'svelte/store';
export const active = writable(false);
export const loaded = writable(false);
export const coverLoaded = writable(false);
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
export const canvasMousePos = writable({x:0,y:0})
export const mouseOverride = writable(0)
export const audioControls = writable({x:0,y:0})
export const thereminPos = writable({x:0,y:0})
export const machineLeftPos = writable({x:0,y:0})
export const thereminMobilePos = writable({x:0,y:0})
export const videoPos = writable({x:0,y:0})

export const expandSettings = writable(false)
export const volumeVal = writable(-16)
export const gain1Val = writable(0.1)
export const FFT = writable([])
export const glide = writable(true)
export const toneOutput = writable({
    glide:true,
    freq:0,
    note:'Eb3'
})
export const oscillatorType = writable('Sine')
export const analyser = writable(null)
export const tonic = writable('Eb3')
export const scaleType = writable('Blues')
export const scaleNotes = writable([])
export const octaves = writable(4)
export const poseNetRes = writable(null)

export const dragged = writable(null)
export const hovered = writable(null)


