<script>
import {createSprite} from './pixiApp.js'
import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import {WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,thereminPos,machineLeftPos} from './stores.js'
export let textures = null;
export let stage = null;

const bgContainer = new PIXI.Container();
const bg = createSprite(textures.static_dark.texture,textures.bg_normal.texture)
bg.children[0].tint = 0x555555;
const bgRatio = textures.static_dark.texture.width/textures.static_dark.texture.height

const machineLeft = createSprite(textures.machine_left.texture,textures.machine_left_normal.texture)
const machineRight = createSprite(textures.machine_right.texture,textures.machine_right_normal.texture)
machineLeft.children[0].tint = 0xFF8484
machineRight.children[0].tint = 0xFF8484
machineRight.alpha = .5

$: {
    if($CANVASWIDTH/$CANVASHEIGHT > bgRatio){
        bg.width = $CANVASWIDTH
        bg.scale.y = bg.scale.x
    }else{
        bg.height = $CANVASHEIGHT
        bg.scale.x = bg.scale.y
    }
    
    bg.position.set(
    ($CANVASWIDTH*.5 - bg.width*.5), 
    ($CANVASHEIGHT*.5 - bg.height*.5)
    );
    
    machineLeft.width = ($CANVASWIDTH*.6)<$CANVASHEIGHT ? $CANVASWIDTH*.6 : $CANVASHEIGHT*.9
    machineLeft.scale.y = machineLeft.scale.x
    machineLeft.position.x = $CANVASWIDTH*.6<$CANVASHEIGHT 
        ? $CANVASWIDTH*.1 - machineLeft.width*.15
        : $CANVASWIDTH*.1 - machineLeft.width*.1

    let yBasedOnTheremin = $thereminPos.y + $thereminPos.height*.85 - machineLeft.height
    machineLeft.position.y = (yBasedOnTheremin>20) ? yBasedOnTheremin : 20

    machineRight.width = ($CANVASWIDTH*.6)<$CANVASHEIGHT ? $CANVASWIDTH*.55 : $CANVASHEIGHT*.85
    machineRight.scale.y = machineLeft.scale.x
    machineRight.position.x = (($CANVASWIDTH*.6)<$CANVASHEIGHT)
        ? $CANVASWIDTH*.9 - machineRight.width*.48 
        : $CANVASWIDTH*.9 - machineRight.width*.45
    machineRight.position.y = machineLeft.position.y * 1.3

    if($WIDTH>=900){
        machineRight.visible = true
        machineLeft.alpha = .5
    }
    if($WIDTH >= 600 && $WIDTH < 900){
        machineLeft.width = $CANVASWIDTH - 160
        machineLeft.scale.y = machineLeft.scale.x
        machineLeft.position.x = 80
        machineLeft.alpha = .5
        let yBasedOnTheremin = $thereminPos.y + $thereminPos.height*.95 - machineLeft.height
        machineLeft.position.y = (yBasedOnTheremin>20) ? yBasedOnTheremin : 20
        machineRight.visible = false
    }
    if($WIDTH < 600){
        machineLeft.width = $CANVASWIDTH - 30
        machineLeft.scale.y = machineLeft.scale.x
        machineLeft.position.x = 15
        machineLeft.alpha = .5
        let yBasedOnTheremin = $thereminPos.y + $thereminPos.height*.95 - machineLeft.height
        machineLeft.position.y = (yBasedOnTheremin>20) ? yBasedOnTheremin : 20
        machineRight.visible = false
    }

    machineLeftPos.set({
        x:machineLeft.x,
        y:machineLeft.y,
        width:machineLeft.width,
        height:machineLeft.height
    })

}

bgContainer.addChild(bg)
stage.addChild(bgContainer)

</script>