<script>
import {WIDTH,HEIGHT} from './stores.js'
export let stage = null

const ambientLight = new PIXI.lights.AmbientLight(null, .2)
const warmLightContainer = new PIXI.Container();
const warmLightCoords = [
    {
      x: 0.13039276123046876,
      y: 0.4809034459731158,
      color: 0xff0000
    },
    {
      x: 0.40115692138671877,
      y: 0.3336615169749541,
      color: 0xff0000
    },
    {
      x: 0.9425523885091146,
      y: 0.5915714039522059,
      color: 0xff0000
    },
    {
      x: 0.7425523885091146,
      y: 0.1915714039522059,
      color: 0xff0000
    },

    {
      x: 0.8194022623697916,
      y: 0.7614661721622242,
      color: 0xff7f00
    },
    {
      x: 0.8256411743164063,
      y: 0.0489926955279182,
      color: 0xff7f00
    },
    {
      x: 0.11977320353190105,
      y: 0.8508505428538603,
      color: 0xff7f00
    },
    {
      x: 0.33254694620768227,
      y: 0.9263327205882353,
      color: 0xff7f00
    },
    {
      x: 0.7407407633463542,
      y: 0.9326670927159927,
      color: 0xff7f00
    },
    {
      x: 0.6591830444335938,
      y: 0.7735333610983456,
      color: 0xff7f00
    },
    {
      x: 0.39131688435872397,
      y: 0.789508954216,
      color: 0xff7f00
    }
];

warmLightCoords.forEach(e => {
  let warmpointLight = new PIXI.lights.PointLight(e.color, 1.2);
  warmLightContainer.addChild(warmpointLight);
});

$: {
  warmLightContainer.children.forEach((e,i)=>{
    e.position.x = warmLightCoords[i].x * $WIDTH;
    e.position.y = warmLightCoords[i].y * $HEIGHT;
    e.intensity = .8+.4*Math.min(Math.max($WIDTH, 0), 400)
  })
  
}

stage.addChild(ambientLight)

</script>