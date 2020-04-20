//PIXI Global Variables & Helper Functions
export const App = new PIXI.Application(2400/3,1350/3)
export const Stage = (App.stage = new PIXI.display.Stage());
Stage.addChild(new PIXI.display.Layer(PIXI.lights.diffuseGroup));
Stage.addChild(new PIXI.display.Layer(PIXI.lights.normalGroup));
Stage.addChild(new PIXI.display.Layer(PIXI.lights.lightGroup));

export const Loader = PIXI.loader
    .add(
        "static_bg",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FStatic_BG.png?v=1584933516627"
    )
    .add(
        "bg_normal",
        "https://cdn.glitch.com/e352d3ca-2e03-47f1-acfd-675dff041f5f%2FNormalMap.png?v=1573974228592"
    )
    .add(
        "machine_right",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Right.png?v=1584933516896"
    )
    .add(
        "machine_right_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Right_normal.jpg?v=1584933515948"
    )
    .add(
        "machine_left",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Left.png?v=1584933517080"
    )
    .add(
        "machine_left_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FMachine_Left_Normal.jpg?v=1584933516036"
    )
    .add(
        "table",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTable_normal.jpg?v=1584933515769"
    )
    .add(
        "table_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTable_normal.jpg?v=1584933515769"
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
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Bottom_Normal.jpg?v=1585100297564"
    )
    .add(
        "theremin_body_top",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Top.png?v=1585101187057"
    )
    .add(
        "theremin_body_top_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FTheremin_Body_Top_Normal.jpg?v=1585100297463"
    )
    .add(
        "right_antenna",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Right.png?v=1585236174151"
    )
    .add(
        "right_antenna_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Right_Normal.jpg?v=1585236174117"
    )
    .add(
        "left_antenna1",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left1.png?v=1584933516264"
    )
    .add(
        "left_antenna1_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left1_Normal.jpg?v=1584933515645"
    )
    .add(
        "left_antenna2",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left2.png?v=1584933516405"
    )
    .add(
        "left_antenna2_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FAntenna_Left2_normal.jpg?v=1584933515750"
    )
    .add(
        "knob",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob.png?v=1584933515187"
    )
    .add(
        "knob_normal",
        "https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2FKnob_normal.jpg?v=1584933515376"
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
