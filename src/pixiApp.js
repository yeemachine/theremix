import {constrain,getDistance} from './helpers.js';
import * as PIXI from 'pixi.js'
import 'pixi-layers'
import 'pixi-lights'

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
        "https://theremin.app/assets/pixi/roundtable.png"
    )
    .add(
        "table_normal",
        "https://theremin.app/assets/pixi/roundtable_normal.jpg"
    )
    .add(
        "bg_machine",
        "https://theremin.app/assets/pixi/BG-Machine.jpg"
    )
    .add(
        "bg_normal",
        "https://theremin.app/assets/pixi/BG-Normal.jpg"
    )
    .add(
        "theremin_null",
        "https://theremin.app/assets/pixi/theremin_null.png"
    )
    .add(
        "theremin_body_top",
        "https://theremin.app/assets/pixi/Theremin%20Body%20Mobile.png"
    )
    .add(
        "theremin_body_top_normal",
        "https://theremin.app/assets/pixi/Theremin%20Body%20Normal.png"
    )
    .add(
      "screen",
      "https://theremin.app/assets/pixi/Screen.jpg"
    )
    .add(
        "right_antenna",
        "https://theremin.app/assets/pixi/Right-Antenna.png"
    )
    .add(
        "right_antenna_normal",
        "https://theremin.app/assets/pixi/Right-Antenna-Normal.png"
    )
    .add(
        "left_antenna2",
        "https://theremin.app/assets/pixi/Left-Antenna.png"
    )
    .add(
        "left_antenna2_normal",
        "https://theremin.app/assets/pixi/Left-Antenna-Normal.png"
    )
    .add(
        "knob",
        "https://theremin.app/assets/pixi/Knob.png"
    )
    .add(
        "knob_normal",
        "https://theremin.app/assets/pixi/Knob-Normal.png"
    )
    .add(
        "switch_on",
        "https://theremin.app/assets/pixi/Switch-On.png"
    )
    .add(
        "switch_on_normal",
        "https://theremin.app/assets/pixi/Switch-On-Normal.png"
    )
    .add(
        "switch_off",
        "https://theremin.app/assets/pixi/Switch-Off.png"
    )
    .add(
        "switch_off_normal",
        "https://theremin.app/assets/pixi/Switch-Off-Normal.png"
    )
    .add(
        "theremin_mobile",
        "https://theremin.app/assets/pixi/Mobile-Controls.png"
    )
    .add(
        "theremin_mobile_normal",
        "https://theremin.app/assets/pixi/Mobile-Controls-Normal.png"
    )
    .add(
        "video",
        "https://theremin.app/assets/pixi/Video.png"
    )
    .add(
        "video_normal",
        "https://theremin.app/assets/pixi/Video-Normal.png"
    )
    .add(
        "guides",
        "https://theremin.app/assets/pixi/Guides.png"
    )
    .add(
        "wire1",
        "https://theremin.app/assets/pixi/Wire-1.png"
    )
    .add(
        "wire1_normal",
        "https://theremin.app/assets/pixi/Wire-1-Normal.png"
    )
    .add(
        "wire2",
        "https://theremin.app/assets/pixi/Wire-2.png"
    )
    .add(
        "wire2_normal",
        "https://theremin.app/assets/pixi/Wire-2-Normal.png"
    )
    .add(
        "wire3",
        "https://theremin.app/assets/pixi/Wire-3.png"
    )
    .add(
        "wire3_normal",
        "https://theremin.app/assets/pixi/Wire-3-Normal.png"
    )
    .add(
        "symbols",
        "https://theremin.app/assets/pixi/Symbols.png"
    )
    .add(
        "symbols_normal",
        "https://theremin.app/assets/pixi/Symbols-Normal.png"
    )
    .add(
        "bgm_normal",
        "https://theremin.app/assets/pixi/BGM-Normal.jpg"
    )
    .add(
        "DAYBREAK FRONTLINE",
        "https://theremin.app/assets/pixi/BGM3.jpg"
    )
    .add(
        "濫觴生命",
        "https://theremin.app/assets/pixi/BGM4.jpg"
    )
    .add(
        "夜に駆ける",
        "https://theremin.app/assets/pixi/BGM5.jpg"
    )
    .add(
        "快晴",
        "https://theremin.app/assets/pixi/BGM6.jpg"
    )
    .add(
        "青春なんていらないわ",
        "https://theremin.app/assets/pixi/BGM16.jpg"
    )
    .add(
        "Alice in 冷凍庫",
        "https://theremin.app/assets/pixi/BGM2.jpg"
    )
    .add(
        "アスノヨゾラ哨戒班",
        "https://theremin.app/assets/pixi/BGM9.jpg"
    )
    .add(
        "秒針を噛む",
        "https://theremin.app/assets/pixi/BGM12.jpg"
    )
    .add(
        "金木犀",
        "https://theremin.app/assets/pixi/BGM11.jpg"
    )
    .add(
        "だから僕は音楽を辞めた",
        "https://theremin.app/assets/pixi/BGM8.jpg"
    )
    .add(
        "シャルル",
        "https://theremin.app/assets/pixi/BGM1.jpg"
    )
    .add(
        "眩しいDNAだけ",
        "https://theremin.app/assets/pixi/BGM15.jpg"
    )
    .add(
        "脳裏上のクラッカー",
        "https://theremin.app/assets/pixi/BGM14.jpg"
    )
    .add(
        "雨き声残響",
        "https://theremin.app/assets/pixi/BGM10.jpg"
    )
    

export const Resources = new Promise(
    (resolve, reject)=>
        Loader.load(
            (loader, resources) => {
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
        percent:percent, //returns between 0 and 1
        distance:getDistance(normalizedPos,mousePos)
    }

}
