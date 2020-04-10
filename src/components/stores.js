import { writable, readable } from 'svelte/store';
export const active = writable(false);
export const loaded = writable(false);
export const WIDTH = writable(2400/2)
export const HEIGHT = writable(1350/2)
export const ScaleInc = writable(.00041841)
export const scrollY = writable(0);
export const mousePos = writable({x:0,y:0})
export const canvasPos = writable({x:0,y:0})
export const thereminPos = writable({x:0,y:0,height:0,width:0})


