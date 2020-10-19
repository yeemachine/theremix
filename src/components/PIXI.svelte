    <script>
    import { onMount } from 'svelte';
    import {constrain,getDistance} from '../helpers.js';
    import BG from './PIXI/PIXI.Sprite.bg.svelte'
    import Table from './PIXI/PIXI.Sprite.table.svelte'
    import Video from './PIXI/PIXI.Sprite.video.svelte';
    import Theremin from './PIXI/PIXI.Sprite.theremin.svelte'
    import ThereminMobile from './PIXI/PIXI.Sprite.theremin.mobile.svelte'
    import AmbientLights from './PIXI/PIXI.Light.ambient.svelte'
    import CursorLight from './PIXI/PIXI.Light.cursor.svelte'
    import PIXIGraphics from './PIXI/PIXI.graphics.svelte';
    import Text from './PIXI/PIXI.text.svelte'
    import {CANVASWIDTH,CANVASHEIGHT,loaded} from '../stores.js'

    const App = new PIXI.Application({antialias:true})
    const Stage = (App.stage = new PIXI.display.Stage());

    const diffuseLayer = new PIXI.display.Layer(PIXI.lights.diffuseGroup)
    const normalLayer = new PIXI.display.Layer(PIXI.lights.normalGroup)
    const lightLayer = new PIXI.display.Layer(PIXI.lights.lightGroup)
    const graphicsGroup = new PIXI.display.Group(1,true)
    const graphicsLayer = new PIXI.display.Layer(graphicsGroup)
    const cursorGroup = new PIXI.display.Group(2,true)
    const cursorLayer = new PIXI.display.Layer(cursorGroup)

    Stage.addChild(
        diffuseLayer,
        normalLayer,
        lightLayer,
        graphicsLayer,
        cursorLayer);

    const Loader = PIXI.loader
    .add(
        "core-sheet",
        "/assets/pixi/core-sheet.json",
        {crossOrigin:true}
    )
    .add(
        "bg-sheet",
        "/assets/pixi/bg-sheet.json",
        {crossOrigin:true}
    ).add(
      "knob",
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob.png?v=1593921823767"
    ).add(
      "knob-normal",
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob-Normal.png?v=1593921823860"
    )

    const Resources = new Promise(
        (resolve, reject)=>
            Loader.load(
                (loader, resources) => {
                    resolve(resources)
                }
            )
    )

    const createPair = (diffuseTex, normalTex) => {
    var container = new PIXI.Container();
    var diffuseSprite = new PIXI.Sprite(diffuseTex);
    diffuseSprite.parentGroup = PIXI.lights.diffuseGroup;
    var normalSprite = new PIXI.Sprite(normalTex);
    normalSprite.parentGroup = PIXI.lights.normalGroup;
    container.addChild(diffuseSprite);
    container.addChild(normalSprite);
    return container;
}

const createMultiTextSpriteGroup = (textureArr, spriteGroup) => {
    var container = new PIXI.Container();
    textureArr.forEach(element => {
        var diffuseSprite = new PIXI.Sprite(diffuseTex);
        diffuseSprite.parentGroup = PIXI.lights.diffuseGroup;
    });
    var normalSprite = new PIXI.Sprite(normalTex);
    normalSprite.parentGroup = PIXI.lights.normalGroup;
}

const createSprite = (diffuseTex, normalTex)=>{
    if(normalTex){
        const spriteGroup = createPair(diffuseTex, normalTex)
        return spriteGroup
    }else{
        const singleSprite = new PIXI.Sprite(diffuseTex)
        return singleSprite
    }
}

const createGradientTexture = (r1, r2, resolution) => {
    
    const c = (r2 + 1) * resolution;
    r1 *= resolution;
    r2 *= resolution;
      
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = c * 2;
     
    const gradient = context.createRadialGradient(c, c, r1, c, c, r2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    return PIXI.Texture.fromCanvas(canvas);
  }


const calcRotation = (element,mousePos,min=-.9,max=.9) =>{
    let normalizedPos = {
        x:element.getBounds().x+element.width/2,
        y:element.getBounds().y+element.height/2
    }
    let minAngle = min*Math.PI
    let maxAngle = max*Math.PI
    //Ugly Angle Correction
    var angleRadians = Math.atan2(normalizedPos.y - mousePos.y, normalizedPos.x - mousePos.x)-0.5*Math.PI;
    angleRadians = (angleRadians <= minAngle && angleRadians >= -5) ? angleRadians+=2*Math.PI : angleRadians
    let value = (angleRadians/maxAngle)/(Math.abs(min)+Math.abs(max))
    let percent = constrain((angleRadians/Math.PI+max)/(Math.abs(min)+Math.abs(max)),{min:0,max:1})

    return {
        radians:angleRadians, //returns rotation
        percent:percent, //returns between 0 and 1
        distance:getDistance(normalizedPos,mousePos)
    }

}

    $:{
        App.view.width = $CANVASWIDTH;
        App.view.height = $CANVASHEIGHT;
        App.renderer.resize($CANVASWIDTH,$CANVASHEIGHT)  
        App.render()
    }

    onMount(async () => {
    document.querySelector('.canvasContainer').appendChild(App.view);
    })

    let pixiParticles = false
    </script>

    <svelte:head>
        {#if $loaded}
            <script src="https://cdn.jsdelivr.net/npm/pixi-particles@3.2.0/dist/pixi-particles.min.js" on:load={()=>{pixiParticles=true}}></script>
        {/if}
    </svelte:head>

    {#await Resources}

        <!-- Loading -->

    {:then value}
        
        <!-- Sprites -->
        <BG sheet={value['bg-sheet']} stage={Stage} textures={value} createSprite={createSprite} createGradientTexture={createGradientTexture}/>
        <PIXIGraphics app={App} stage={Stage} graphicsGroup={graphicsGroup}/>
        <Table sheet={value['bg-sheet']} stage={Stage} textures={value} createSprite={createSprite}/>
        <Theremin stage={Stage} sheet={value['core-sheet']} textures={value} createSprite={createSprite} calcRotation={calcRotation}/> 
        <ThereminMobile sheet={value['core-sheet']} stage={Stage} textures={value} createSprite={createSprite}/> 
        <Text app={App} stage={Stage} graphicsGroup={graphicsGroup}/>
        <Video app={App} stage={Stage} sheet={value['core-sheet']} createSprite={createSprite} diffuseLayer={diffuseLayer} graphicsGroup={graphicsGroup}/>
        <!-- Lights -->
        <AmbientLights stage={Stage}/>
        {#if pixiParticles}
            <CursorLight app={App} stage={Stage} createGradientTexture={createGradientTexture}/>
        {/if}

    {:catch err}

        <!-- Error -->

    {/await}