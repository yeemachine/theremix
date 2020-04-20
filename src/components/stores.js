import { writable } from 'svelte/store';
export const active = writable(false);
export const loaded = writable(false);
export const camera = writable(false);
export const videoReady = writable(null);
export const WIDTH = writable(2400/2)
export const HEIGHT = writable(1350/2)
export const mousePos = writable({x:0,y:0})
export const thereminPos = writable({x:0,y:0})
export const expandSettings = writable(false)
export const volumeVal = writable(0)
export const gain1Val = writable(0.1)
export const FFT = writable([])
export const mainOscillator = writable(null)
export const pizzicato = writable(true)
export const oscillatorType = writable('Sine')
//sine, square, triangle, sawtooth
//fmsine, fmsquare, fmtriangle, fmsawtooth
//amsine, amsquare, amtriangle, amsawtooth
//fatsine, fatsquare, fattriangle, fatsawtooth
//pwm, pulse
export const tonic = writable('Eb3')
export const scaleType = writable('Blues')
// major
// minor
// ionian
// dorian
// phrygian
// lydian
// mixolydian
// aeolian
// locrian
// majorpentatonic
// minorpentatonic
// chromatic
// harmonicchromatic
// blues
// doubleharmonic
// flamenco
// harmonicminor
// melodicminor
// wholetone
export const scaleNotes = writable([])
export const octaves = writable(2)
export const poseNetRes = writable(null)


