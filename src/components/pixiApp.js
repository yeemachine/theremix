import {constrain} from './helpers.js';
import * as PIXI from 'pixi.js'
import 'pixi-layers'
import 'pixi-lights'

//PIXI Global Variables & Helper Functions
export const App = new PIXI.Application()
export const Stage = (App.stage = new PIXI.display.Stage());

export const diffuseLayer = new PIXI.display.Layer(PIXI.lights.diffuseGroup)
export const normalLayer = new PIXI.display.Layer(PIXI.lights.normalGroup)
export const lightLayer = new PIXI.display.Layer(PIXI.lights.lightGroup)
export const graphicsGroup = new PIXI.display.Group(1,true)
export const graphicsLayer = new PIXI.display.Layer(graphicsGroup)
export const cursorGroup = new PIXI.display.Group(2,true)
export const cursorLayer = new PIXI.display.Layer(cursorGroup)


Stage.addChild(
    diffuseLayer,
    normalLayer,
    lightLayer,
    graphicsLayer,
    cursorLayer);

export const Loader = PIXI.loader
    .add(
        "table",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Froundtable.png?v=1591233825418"
    )
    .add(
        "table_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Froundtable_normal.jpg?v=1591152690632"
    )
    .add(
        "static_dark",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBG-Machine.jpg?v=1591150654793"
    )
    .add(
        "bg_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBG-Normal.jpg?v=1591150654713"
    )
    .add(
        "theremin_null",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Ftheremin_null.png?v=1591147974960"
    )
    .add(
        "theremin_body_top",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin%20Body%20Mobile.png?v=1591232761092"
    )
    .add(
        "theremin_body_top_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin%20Body%20Normal.png?v=1591232670559"
    )
    .add(
      "screen",
      "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FScreen.jpg?v=1591230139444"
    )
    .add(
        "right_antenna",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FRight-Antenna.png?v=1591147974877"
    )
    .add(
        "right_antenna_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FRight-Antenna-Normal.png?v=1591147974801"
    )
    .add(
        "left_antenna2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FLeft-Antenna.png?v=1591147974750"
    )
    .add(
        "left_antenna2_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FLeft-Antenna-Normal.png?v=1591147974620"
    )
    .add(
        "knob",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob.png?v=1591147974074"
    )
    .add(
        "knob_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob-Normal.png?v=1591147974043"
    )
    .add(
        "switch_on",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch-On.png?v=1591147973982"
    )
    .add(
        "switch_on_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch-On-Normal.png?v=1591147974013"
    )
    .add(
        "switch_off",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch-Off.png?v=1591147973946"
    )
    .add(
        "switch_off_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch_Off_Normal.png?v=1588538609780"
    )
    .add(
        "theremin_mobile",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMobile-Controls.png?v=1591147974572"
    )
    .add(
        "theremin_mobile_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMobile-Controls-Normal.png?v=1591147974455"
    )
    .add(
        "video",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FVideo.png?v=1591147973610"
    )
    .add(
        "video_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FVideo-Normal.png?v=1591147973819"
    )
    .add(
        "wire1",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire-1.png?v=1591147974281"
    )
    .add(
        "wire1_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire-1-Normal.png?v=1591147974224"
    )
    .add(
        "wire2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire-2.png?v=1591147973696"
    )
    .add(
        "wire2_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire-2-Normal.png?v=1591147973720"
    )
    .add(
        "wire3",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire-3.png?v=1591147973747"
    )
    .add(
        "wire3_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire-3-Normal.png?v=1591147973793"
    )
    .add(
        "symbols",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSymbols.png?v=1591147973853"
    )
    .add(
        "symbols_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSymbols-Normal.png?v=1591147973671"
    )
    .add(
        "bgm_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM-Normal.jpg?v=1591151268082"
    )
    .add(
        "DAYBREAK FRONTLINE",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM3.jpg?v=1591151268823"
    )
    .add(
        "濫觴生命",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM4.jpg?v=1591151268639"
    )
    .add(
        "夜に駆ける",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM5.jpg?v=1591151268580"
    )
    .add(
        "快晴",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM6.jpg?v=1591151268522"
    )
    .add(
        "青春なんていらないわ",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM16.jpg?v=1591336886030"
    )
    .add(
        "Alice in 冷凍庫",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM2.jpg?v=1591151268183"
    )
    .add(
        "アスノヨゾラ哨戒班",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM9.jpg?v=1591151270003"
    )
    .add(
        "秒針を噛む",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM12.jpg?v=1591151269313"
    )
    .add(
        "金木犀",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM11.jpg?v=1591151268246"
    )
    .add(
        "だから僕は音楽を辞めた",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM8.jpg?v=1591151269230"
    )
    .add(
        "シャルル",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM1.jpg?v=1591151269373"
    )
    .add(
        "眩しいDNAだけ",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM15.jpg?v=1591151268999"
    )
    .add(
        "脳裏上のクラッカー",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM14.jpg?v=1591151269091"
    )
    .add(
        "雨き声残響",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FBGM10.jpg?v=1591151269045"
    )
    

export const Resources = new Promise(
    (resolve, reject)=>
        Loader.load(
            (loader, resources) => {
                // console.log(resources)
                resolve(resources)
            }
        )
)

export const createPair = (diffuseTex, normalTex) => {
    var container = new PIXI.Container();
    var diffuseSprite = new PIXI.Sprite(diffuseTex);
    diffuseSprite.parentGroup = PIXI.lights.diffuseGroup;
    var normalSprite = new PIXI.Sprite(normalTex);
    normalSprite.parentGroup = PIXI.lights.normalGroup;
    container.addChild(diffuseSprite);
    container.addChild(normalSprite);
    return container;
}

export const createMultiTextSpriteGroup = (textureArr, spriteGroup) => {
    var container = new PIXI.Container();
    textureArr.forEach(element => {
        var diffuseSprite = new PIXI.Sprite(diffuseTex);
        diffuseSprite.parentGroup = PIXI.lights.diffuseGroup;
    });
    var normalSprite = new PIXI.Sprite(normalTex);
    normalSprite.parentGroup = PIXI.lights.normalGroup;
}

export const createSprite = (diffuseTex, normalTex)=>{
    if(normalTex){
        const spriteGroup = createPair(diffuseTex, normalTex)
        return spriteGroup
    }else{
        const singleSprite = new PIXI.Sprite(diffuseTex)
        return singleSprite
    }
}

export function createGradientTexture(r1, r2, resolution) {
    
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



export const detectCollision = (position,pixiElement) => {
    const element_bounds = pixiElement.getBounds()
    let collide = (position.x > element_bounds.x
            && position.x < element_bounds.x + element_bounds.width
            && position.y > element_bounds.y
            && position.y < element_bounds.y + element_bounds.height
        ) ? true : false
    return collide
}

export const calcRotation = (element,mousePos,min=-.9,max=.9) =>{
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
        percent:percent //returns between 0 and 1
    }

}
