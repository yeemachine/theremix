<script>
import * as PIXI from 'pixi.js'
import {createSprite} from '../../pixiApp.js'
import { tweened } from 'svelte/motion';
import { sineInOut } from 'svelte/easing';
import {midiList} from '../../config.js';
import {WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,thereminPos,bgPos,enableMIDI,currentMIDI} from '../../stores.js'
export let textures = null;
export let stage = null;

const sineInOut0_1 = tweened(0, {
    duration: 1000,
    easing: sineInOut
});

const sineInOut0_1_2 = tweened(0, {
    duration: 1000,
    easing: sineInOut
});

const bgContainer = new PIXI.Container();
const BGMContainer = new PIXI.Container();
$:{
    BGMContainer.alpha = $sineInOut0_1
}
const bg = createSprite(textures.bg_machine.texture,textures.bg_normal.texture)
bg.children[0].tint = 0x444444;
const bgRatio = textures.bg_machine.texture.width/textures.bg_machine.texture.height

const BGM_bg = createSprite(textures[Object.keys(midiList)[0]].texture,textures.bgm_normal.texture)
BGM_bg.children[0].tint = 0x80797F
$:{
BGM_bg.children[0].texture = textures[$currentMIDI].texture;
BGM_bg.alpha = 1-$sineInOut0_1_2
}

$: {
    if($CANVASWIDTH/$CANVASHEIGHT > bgRatio){
        bg.width = $CANVASWIDTH
        bg.scale.y = bg.scale.x
    }else{
        bg.height = ($WIDTH > 600) ? $CANVASHEIGHT : ($CANVASHEIGHT - $thereminPos.height*.5)
        bg.scale.x = bg.scale.y
    }

    BGM_bg.width=bg.width
    BGM_bg.scale.y = BGM_bg.scale.x
    BGM_bg.x = $CANVASWIDTH * .5 
    BGM_bg.y = ($WIDTH > 600) ? $CANVASHEIGHT * .5
        : $CANVASHEIGHT * .5 - $thereminPos.height*.25
}

$:{
    if($WIDTH < 600){
        BGM_bg.children[0].anchor.set(midiList[$currentMIDI].offset, 0.5);
        BGM_bg.children[1].anchor.set(midiList[$currentMIDI].offset, 0.5);
         bg.position.set(
            ($CANVASWIDTH*.5 - bg.width*.5), 
            0
        );
    }else{
        
        BGM_bg.children[0].anchor.set(0.5, 0.5);
        BGM_bg.children[1].anchor.set(0.5, 0.5);
         bg.position.set(
            ($CANVASWIDTH*.5 - bg.width*.5), 
            0
        );
    }
     bgPos.set({
        x:bg.x,
        y:bg.y,
        width:bg.width,
        height:bg.height
    })
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

bgContainer.addChild(bg)
BGMContainer.addChild(BGM_bg)
stage.addChild(bgContainer,BGMContainer)

</script>