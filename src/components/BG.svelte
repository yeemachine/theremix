<script>
import {createSprite} from './pixiApp.js'
import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {WIDTH,HEIGHT} from './stores.js'
export let textures = null;
export let stage = null;

const tween0_1 = tweened(0, {
    duration: 700,
    easing: backOut
});

const bgContainer = new PIXI.Container();
const bg = createSprite(textures.static_bg.texture,textures.bg_normal.texture)
bg.children[0].tint = 0x401874;
const bgRatio = textures.static_bg.texture.width/textures.static_bg.texture.height
const directionalLight = new PIXI.lights.DirectionalLight(null, 1,bg)
const machineLeft = createSprite(textures.machine_left.texture,textures.machine_left_normal.texture)
const machineRight = createSprite(textures.machine_right.texture,textures.machine_right_normal.texture)

$: {
    if($WIDTH/$HEIGHT > bgRatio){
        bg.width = $WIDTH
        bg.scale.y = bg.scale.x
    }else{
        bg.height = $HEIGHT
        bg.scale.x = bg.scale.y
    }
    
    bg.position.set(
    ($WIDTH*.5 - bg.width*.5), 
    ($HEIGHT*.5 - bg.height*.5)
    );

    
    machineLeft.width = ($WIDTH*.6)<$HEIGHT ? $WIDTH*.6 : $HEIGHT*.9
    machineLeft.scale.y = machineLeft.scale.x
    machineLeft.position.x = $WIDTH*.6<$HEIGHT 
        ? $WIDTH*.1 - machineLeft.width*.15
        : $WIDTH*.1 - machineLeft.width*.1

    machineLeft.position.y = ($HEIGHT*.1)

    machineRight.width = ($WIDTH*.6)<$HEIGHT ? $WIDTH*.55 : $HEIGHT*.85
    machineRight.scale.y = machineLeft.scale.x
    machineRight.position.x = (($WIDTH*.6)<$HEIGHT)
        ? $WIDTH*.9 - machineRight.width*.48 
        : $WIDTH*.9 - machineRight.width*.45
    machineRight.position.y = machineLeft.position.y * 1.3

    if($WIDTH>=600){
        machineRight.visible = true
    }
    if($WIDTH < 600){ //Media Query
        machineLeft.width = $WIDTH - 30
        machineLeft.scale.y = machineLeft.scale.x
        machineLeft.position.x = 15
        machineRight.visible = false
    }

}

bgContainer.addChild(bg,machineRight,machineLeft)
stage.addChild(bgContainer)



tween0_1.set(1)
</script>