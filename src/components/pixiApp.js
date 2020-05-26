import {constrain} from './helpers.js';

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
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fstatic_light.png?v=1588712825397"
    )
    .add(
        "static_dark",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbg_flat.png?v=1588451420532"
    )
    .add(
        "bg_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fstatic_light_normal.png?v=1588480563148"
    )
    .add(
        "table_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fstatic_light_normal.png?v=1588486193784"
    )
    .add(
        "machine_right",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Right.png?v=1584933516896"
    )
    .add(
        "machine_right_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FRight%20Machine%20Normal.png?v=1589242815494"
    )
    .add(
        "machine_left",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Left.png?v=1588391938150"
    )
    .add(
        "machine_left_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FLeft%20Machine%20Normal.png?v=1589242816592"
    )
    .add(
        "theremin_null",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Ftheremin_null.jpg?v=1585345680882"
    )
    .add(
        "theremin_body_bottom",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Bottom.png?v=1585100297444"
    )
    .add(
        "theremin_body_bottom_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Bottom_Normal.png?v=1587842945032"
    )
    .add(
        "theremin_body_top",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin%20Body.png?v=1588528060866"
    )
    .add(
        "theremin_body_top_mobile",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin%20Body%20Mobile.png?v=1588526544079"
    )
    .add(
        "theremin_body_top_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin%20Body%20Normal.png?v=1588526540068"
    )
    .add(
        "right_antenna",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FRight%20Antenna.png?v=1588409335861"
    )
    .add(
        "right_antenna_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FRight%20Antenna%20Normal.png?v=1588448733643"
    )
    .add(
        "left_antenna1",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left1.png?v=1588194921081"
    )
    .add(
        "left_antenna1_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left1_Normal.png?v=1588194921158"
    )
    .add(
        "left_antenna2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FLeft%20Antenna.png?v=1588488019728"
    )
    .add(
        "left_antenna2_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FLeft%20Antenna%20Normal.png?v=1588488019570"
    )
    .add(
        "knob",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob.png?v=1588538609478"
    )
    .add(
        "knob_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob_normal.png?v=1588538609649"
    )
    .add(
        "switch_on",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch%20On.png?v=1588538609607"
    )
    .add(
        "switch_off",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch%20Off.png?v=1588538609551"
    )
    .add(
        "switch_off_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch_Off_Normal.png?v=1588538609780"
    )
    .add(
        "switch_on_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSwitch_On_Normal.png?v=1588538609821"
    )
    .add(
        "solid2x2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSolid2X2.png?v=1585365268924"
    )
    .add(
        "gradient2x2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FGradient2X2.png?v=1585365268893"
    )
    .add(
        "normal2x2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2F2X2_Normal.png?v=1585365268937"
    )
    .add(
        "theremin_mobile",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Top_Mobile.png?v=1588539244259"
    )
    .add(
        "theremin_mobile_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Top_Mobile_Normal.png?v=1588538333747"
    )
    .add(
        "video",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMonitor.png?v=1588141330638"
    )
    .add(
        "video_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMonitor%20Normal.png?v=1588141330688"
    )
    .add(
        "wire1",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire1.png?v=1589076997985"
    )
    .add(
        "wire1_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire1%20Normal.png?v=1589077164374"
    )
    .add(
        "wire2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire2.png?v=1589076997946"
    )
    .add(
        "wire2_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire2%20Normal.png?v=1588130380900"
    )
    .add(
        "wire3",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire3.png?v=1589076997881"
    )
    .add(
        "wire3_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FWire3%20Normal.png?v=1588130380839"
    )
    .add(
        "symbols",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSymbols.png?v=1588539581075"
    )
    .add(
        "symbols_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FSymbols%20Normal.png?v=1588539581021"
    )
    .add(
        "logo",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FLogo.png?v=1588975850466"
    )
    .add(
        "logo_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FLogo_normal.png?v=1588978041228"
    )
    .add(
        "bgm_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_normal.png?v=1590448261585"
    )
    .add(
        "bgm",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg.png?v=1590448179543"
    )
    .add(
        "DAYBREAK FRONTLINE",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg2.png?v=1590466648299"
    )
    .add(
        "濫觴生命",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg3.png?v=1590452789559"
    )
    .add(
        "夜に駆ける",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg4.png?v=1590452787697"
    )
    .add(
        "快晴",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg5.png?v=1590452788360"
    )
    .add(
        "太陽になれるかな",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg6.png?v=1590452787751"
    )
    .add(
        "Alice in 冷凍庫",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg1.png?v=1590466647838"
    )
    .add(
        "アスノヨゾラ哨戒班",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm12.png?v=1590466642863"
    )
    .add(
        "雨き声残響",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg9.png?v=1590452787070"
    )
    .add(
        "金木犀",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg10.png?v=1590452791458"
    )
    .add(
        "だから僕は音楽を辞めた",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm_bg11.png?v=1590458994381"
    )
    .add(
        "シャルル",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fbgm13.png?v=1590467299372"
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

export const lerpColor = function(a, b, amount) {
    const ar = a >> 16,
        ag = (a >> 8) & 0xff,
        ab = a & 0xff,
        br = b >> 16,
        bg = (b >> 8) & 0xff,
        bb = b & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return (rr << 16) + (rg << 8) + (rb | 0);
};

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
