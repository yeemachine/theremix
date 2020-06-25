# THEREMIX - Virtual Theremin

THEREMIX is a progressive web app that brings the interaction of a physical theremin into the virual space. The virtual theremin can be controlled either with mouse/touch inputs or with gestures through a webcam via human post tracking provided by PoseNet. This app celebrates the 100th anniversary of the theremin, invented by Léon Theremin in 1920. A century after its conception, the theremin continues to be a flexible electronic instrument with an ethereal tone.

  <a href="https://theremin.app">
    <img src="https://theremin.app/assets/global/markdownPlay.svg" alt="view source" height="33">
  </a> 

## Basic Theremin

![THEREMIX Basic Theremin Mode](https://theremin.app/assets/global/basic_controls.gif)

THEREMIX's basic theremin mode has mouse/touch input or gesture control options built in. Adjust the sound further by playin with the oscillator type, scale/key/octave range, and Glide toggles. 

## MIDI Controller (Beta)

![THEREMIX MIDI Controller Mode](https://theremin.app/assets/global/midi_controls.gif)

THEREMIX's MIDI controller mode uses the same input controls and maps them to modify the attack, sustain, delay, and release of the synths. This mode is still in beta and works most smoothly in Chrome at the moment. Features 14 demo track, with user uploaded MIDI/BG image to be a feature in the next release.

## Resources and Links

* **Glitch**  
  <a href="https://glitch.com/" target="blank">Glitch.com</a> is a friendly platform for all your web project needs, from something as simple as a webpage to something more complex involving servers. All code written is hosted on Glitch's servers, making it easy to preview your work without needing to install packages or starting a web server. Remixing on Glitch also allows you to use projects from other creators as a starting template and explore their code.
     <a href="https://glitch.com/edit/?utm_content=project_theremix&utm_source=view_source&utm_medium=button&utm_campaign=glitchButton#!/theremix">
    <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fview-source%402x.png?1513093958802" alt="view source" height="33">
  </a> <a href="https://glitch.com/edit/?utm_content=project_theremix&utm_source=remix_this&utm_medium=button&utm_campaign=glitchButton#!/remix/theremix">
    <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix this" height="33">
  </a>

* **Pixi.js**  
  <a href="https://www.pixijs.com/" target="blank">Pixi.js</a> is a lightweight open source 2D WebGL renderer. This app is currently running on Pixi V4 with <a href="https://github.com/pixijs/pixi-lights" target="blank">Pixi Lights</a> and <a href="https://github.com/pixijs/pixi-particles" target="blank">Pixi Particles</a> plugins.	

* **Tone.js**  
  <a href="https://tonejs.github.io/" target="blank">Tone.js</a> is a framework for creating interactive music in the browser. It provides advanced scheduling capabilities, synths and effects, and intuitive musical abstractions built on top of the Web Audio API.

* **PoseNet**  
  <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet" target="blank">PoseNet</a> is a machine learning model which allows for real-time human pose estimation in the browser.