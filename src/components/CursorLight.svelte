<script>
import {loaded,active,canvasPos,WIDTH,HEIGHT} from './stores.js'
import { tweened,spring } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {createGradientTexture} from './pixiApp.js'
export let stage = null
export let app = null;

const tween0_1 = tweened(0, {
    duration: 1400,
    easing: backOut
});

const coords = spring({ x: 0, y: 0 }, {
	stiffness: 0.3,
	damping: 0.8
});
const cursorLight = new PIXI.lights.PointLight(0xff7f00,3);
const gradientTexture = createGradientTexture(0, 12, app.renderer.resolution);
const particleContainer = new PIXI.particles.ParticleContainer(5000, {
  scale: true,
  position: true,
  rotation: false,
  uvs: false,
  tint: true
});
const emitter = new PIXI.particles.Emitter(particleContainer, [gradientTexture], {
  autoUpdate: true,
  alpha: {
    start: 0.8,
    end: 0.15
  },
  scale: {
    start: 1,
    end: 0.2,
    minimumScaleMultiplier: 1
  },
  color: {
    start: "#FFFF33",
    end: "#ff7f00"
  },
  speed: {
    start: 0,
    end: 0,
    minimumSpeedMultiplier: 1
  },
  acceleration: {
    x: 0,
    y: 0
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 0
  },
  noRotation: true,
  rotationSpeed: {
    min: 0,
    max: 0
  },
  lifetime: {
    min: 1,
    max: 1
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 5000,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  spawnType: "point"
});

$: {
  coords.set($canvasPos)
  cursorLight.position.set($coords.x,$coords.y)
  particleContainer.alpha = $tween0_1
  emitter.updateOwnerPos($coords.x, $coords.y);
  emitter.emit = true
  cursorLight.brightness = (.5+2*Math.min(Math.max($WIDTH/1200, 0), 1))*$tween0_1
}

stage.addChild(cursorLight,particleContainer)

window.setTimeout(()=>{
    tween0_1.set(1)
    loaded.set(true)
    
},1200)

</script>