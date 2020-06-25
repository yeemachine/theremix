# THEREMIX - Virtual Theremin

THEREMIX is a progressive web app that brings the interaction of a physical theremin into the virual space. The virtual theremin can be controlled either with mouse/touch inputs or with gestures through a webcam via human post tracking provided by PoseNet. This app celebrates the 100th anniversary of the theremin, invented by Léon Theremin in 1920. A century after its conception, the theremin continues to be a flexible electronic instrument with an ethereal tone.

[Play Theremin](https://theremin.app)

## Basic Theremin

![THEREMIX Basic Theremin Mode](https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FGif1.mp4.gif?v=1592903208068)

THEREMIX's basic theremin mode has mouse/touch input or gesture control options built in. Adjust the sound further by playin with the oscillator type, scale/key/octave range, and Glide toggles. 

## MIDI Controller (Beta)

![THEREMIX MIDI Controller Mode](https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fgif2.mp4.gif?v=1592903207301)

THEREMIX's MIDI controller mode uses the same input controls and maps them to modify the attack, sustain, delay, and release of the synths. This mode is still in beta and works most smoothly in Chrome at the moment. Features 14 demo track, with user uploaded MIDI/BG image to be a feature in the next release.

## Resources and Links

* #### Glitch

  <a href="https://glitch.com/" target="blank">Glitch.com</a> is a friendly platform for all your web project needs, from something as simple as a webpage to something more complex involving servers. All code written is hosted on Glitch's servers, making it easy to preview your work without needing to install packages or starting a web server. Remixing on Glitch also allows you to use projects from other creators as a starting template and explore their code. Feel free to <a href="https://glitch.com/~theremix" target="blank">Remix this Project</a> on Glitch.

* #### Pixi.js

  <a href="https://www.pixijs.com/" target="blank">Pixi.js</a> is a lightweight open source 2D WebGL renderer. This app is currently running on Pixi V4 with <a href="https://github.com/pixijs/pixi-lights" target="blank">Pixi Lights</a> and <a href="https://github.com/pixijs/pixi-particles" target="blank">Pixi Particles</a> plugins.	

* #### Tone.js

  <a href="https://tonejs.github.io/" target="blank">Tone.js</a> is a framework for creating interactive music in the browser. It provides advanced scheduling capabilities, synths and effects, and intuitive musical abstractions built on top of the Web Audio API.

* #### PoseNet

  <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet" target="blank">PoseNet</a> is a machine learning model which allows for real-time human pose estimation in the browser.