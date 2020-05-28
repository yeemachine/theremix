<script>
import {createSprite} from './pixiApp.js'
import { tweened } from 'svelte/motion';
import { sineInOut } from 'svelte/easing';
import {midiList} from './config.js';
import {lerpColor} from './helpers.js'
import {WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,thereminPos,machineLeftPos,currentMIDITitle,currentMIDIOffset,enableMIDI,tablePos, currentMIDITint} from './stores.js'
export let textures = null;
export let stage = null;

const sineInOut0_1 = tweened(0, {
    duration: 1000,
    easing: sineInOut
});

const sineInOut0_1_1 = tweened(1, {
    duration: 1000,
    easing: sineInOut
});

const sineInOut0_1_2 = tweened(0, {
    duration: 1000,
    easing: sineInOut
});

const tint0_1 = tweened(0, {
    duration: 500,
    easing: sineInOut
});

const bgContainer = new PIXI.Container();
const bg = createSprite(textures.static_dark.texture,textures.bg_normal.texture)
bg.children[0].tint = 0x666666;
const bgRatio = textures.static_dark.texture.width/textures.static_dark.texture.height

const BGM_bg = createSprite(textures[midiList[0].name].texture,textures.bgm_normal.texture)
BGM_bg.children[0].tint = midiList[0].tint;
const BGM_bg2 = createSprite(textures[midiList[3].name].texture,textures.bgm_normal.texture)
BGM_bg2.children[0].tint = midiList[0].tint;

const machineLeft = createSprite(textures.machine_left.texture,textures.machine_left_normal.texture)
const machineRight = createSprite(textures.machine_right.texture,textures.machine_right_normal.texture)

$: {
    if($CANVASWIDTH/$CANVASHEIGHT > bgRatio){
        bg.width = $CANVASWIDTH
        bg.scale.y = bg.scale.x
    }else{
        bg.height = ($WIDTH > 600) ? $CANVASHEIGHT : ($CANVASHEIGHT - $thereminPos.height*.5)
        bg.scale.x = bg.scale.y
    }
    
    bg.position.set(
    ($CANVASWIDTH*.5 - bg.width*.5), 
    0
    );

    BGM_bg.width=bg.width
    BGM_bg.scale.y = BGM_bg.scale.x
    BGM_bg.x = $CANVASWIDTH * .5 
    BGM_bg.y = ($WIDTH > 600) ? $CANVASHEIGHT * .5
        : $CANVASHEIGHT * .5 - $thereminPos.height*.25
    BGM_bg.alpha = $sineInOut0_1_1 - (1-$sineInOut0_1)

    BGM_bg2.width=BGM_bg.width
    BGM_bg2.scale.y = BGM_bg.scale.x
    BGM_bg2.x = BGM_bg.x
    BGM_bg2.y = BGM_bg.y
    BGM_bg2.alpha = $sineInOut0_1_2 - (1-$sineInOut0_1)

    
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

let bgmClone = false

$:{
    if($currentMIDITitle){
        BGM_bg.children[0].texture === testures[$currentMIDITitle.name].texture
        BGM_bg.children[0].tint === testures[$currentMIDITitle.name].tint
        if($WIDTH < 600){
            BGM_bg.children[0].anchor.set($currentMIDITitle.offset, 0.5);
            BGM_bg.children[1].anchor.set($currentMIDITitle.offset, 0.5);
        }else{
            BGM_bg.children[0].anchor.set(0.5, 0.5);
            BGM_bg.children[1].anchor.set(0.5, 0.5);
        }
    }
}

$:{
    if($enableMIDI){
        if($sineInOut0_1 === 0){
            sineInOut0_1.set(1)
        }
    }else{
        if($sineInOut0_1 === 1){
            sineInOut0_1.set(0)
        }
    }
}

// $:{
//     if($currentMIDITitle && $enableMIDI){
//         if(bgmClone === true){
//             if(BGM_bg2.children[0].texture === textures[$currentMIDITitle.name].texture || BGM_bg.children[0].texture === textures[$currentMIDITitle.name].texture){
                
                
//                 if(BGM_bg.children[0].texture === textures[$currentMIDITitle.name].texture){
//                     if($sineInOut0_1_2 === 1){
//                         sineInOut0_1_2.set(0)
//                         bgmClone = false
//                     }
//                 }


//             }else{
//                 if($sineInOut0_1_2 === 1){
//                     sineInOut0_1_2.set(0)
//                 }
//                 BGM_bg.children[0].texture = textures[$currentMIDITitle.name].texture;
//                 BGM_bg.children[0].tint = $currentMIDITitle.tint;
//                 bgmClone = false
//             }
//         }else{
//             if(BGM_bg.children[0].texture === textures[$currentMIDITitle.name].texture || BGM_bg2.children[0].texture === textures[$currentMIDITitle.name].texture){

//                 if(BGM_bg2.children[0].texture === textures[$currentMIDITitle.name].texture){
//                     if($sineInOut0_1_2 === 0){
//                         sineInOut0_1_2.set(1)
//                         bgmClone = true
//                     }
//                 }
                
//             }else{
//                 if($sineInOut0_1_2 === 0){
//                     sineInOut0_1_2.set(1)
//                 }
//                 BGM_bg2.children[0].texture = textures[$currentMIDITitle.name].texture;
//                 BGM_bg2.children[0].tint = $currentMIDITitle.tint;
//                 bgmClone = true
//             }
//         }

//         if($sineInOut0_1 === 0){
//             sineInOut0_1.set(1)
//         }

//         if($WIDTH < 600){
//             BGM_bg.children[0].anchor.set($currentMIDITitle.offset, 0.5);
//             BGM_bg.children[1].anchor.set($currentMIDITitle.offset, 0.5);
//             BGM_bg2.children[0].anchor.set($currentMIDITitle.offset, 0.5);
//             BGM_bg2.children[1].anchor.set($currentMIDITitle.offset, 0.5);
//         }else{
//             BGM_bg.children[0].anchor.set(0.5, 0.5);
//             BGM_bg.children[1].anchor.set(0.5, 0.5);
//             BGM_bg2.children[0].anchor.set(0.5, 0.5);
//             BGM_bg2.children[1].anchor.set(0.5, 0.5);
//         }

//         console.log('bgchanged')
//     }else{
//         if($sineInOut0_1 === 1){
//             sineInOut0_1.set(0)
//         }
//         console.log('bgchanged')
//     }
// }

bgContainer.addChild(bg,BGM_bg,BGM_bg2)
stage.addChild(bgContainer)

</script>