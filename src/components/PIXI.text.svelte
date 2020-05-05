<script>
import { onMount } from 'svelte';
import {createSprite, lerpColor, detectCollision, calcRotation, graphicsGroup} from './pixiApp.js';
import { tweened } from 'svelte/motion';
import {constrain} from './helpers.js';
import { backOut, sineInOut } from 'svelte/easing';
import { oscillators } from './config.js';
import {loaded,active,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,canvasMousePos,mousePos,globalPointerUp, thereminPos,thereminMobilePos,glide, volumeVal,oscillatorType,dragged,hovered,toneOutput} from './stores.js';
export let textures = null;
export let stage = null;

const sineInOut0_1 = tweened(0, {
    duration: 700,
    easing: sineInOut
});

let oscText, freqText, noteText
document.fonts.load('10pt "Whirly Birdie Narrow"').then(() => {
     oscText = new PIXI.Text($oscillatorType, {
        fontFamily: "Whirly Birdie Narrow",
        fontSize: 40,
        fill: 0xE54646,
        align: "left"
    });
    oscText.alpha = 0
    oscText.parentGroup = graphicsGroup;

    freqText = new PIXI.Text('0 Hz', {
        fontFamily: "Whirly Birdie Narrow",
        fontSize: 40,
        fill: 0xE54646,
        align: "right"
    });
    freqText.alpha = 0
    freqText.parentGroup = graphicsGroup;

    noteText = new PIXI.Text('G', {
        fontFamily: "Whirly Birdie Narrow",
        fontSize: 40,
        fill: 0xE54646,
        align: "right"
    });
    noteText.alpha = 0.15
    noteText.parentGroup = graphicsGroup;

    stage.addChild(oscText,freqText,noteText)
  
})

$:{
    if(oscText){
        oscText.text = $oscillatorType
        oscText.style.fontSize = ($WIDTH > 600) ? $thereminPos.width*.0150 : $thereminMobilePos.width*.05
        oscText.style.padding = ($WIDTH > 600) ? $thereminPos.width*.0150 : $thereminMobilePos.width*.05
        oscText.x = ($WIDTH > 600) ? $thereminPos.x+$thereminPos.width*.387 : $thereminMobilePos.x + $thereminMobilePos.width*.09
        oscText.y = ($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.797 : $thereminMobilePos.y + $thereminMobilePos.height*.54
        oscText.alpha = .15+0.55*$sineInOut0_1
    }
    if(freqText){
        freqText.text = Math.floor($toneOutput.freq) + ' HZ'
        freqText.style.fontSize = ($WIDTH > 600) ? $thereminPos.width*.0150 : $thereminMobilePos.width*.05
        freqText.style.padding = ($WIDTH > 600) ? $thereminPos.width*.0150 : $thereminMobilePos.width*.05
        freqText.x = ($WIDTH > 600) ? $thereminPos.x + $thereminPos.width*.577 - freqText.width : $thereminMobilePos.x + $thereminMobilePos.width*.76 - freqText.width
        freqText.y = ($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.797 : $thereminMobilePos.y + $thereminMobilePos.height*.54
        freqText.alpha = ($toneOutput.glide) ? .15+.55*$sineInOut0_1 : .15+.15*$sineInOut0_1
    }
    if(noteText){
        noteText.text = $toneOutput.note
        noteText.style.fontSize = ($WIDTH > 600) ? $thereminPos.width*.0150 : $thereminMobilePos.width*.05
        noteText.style.padding = ($WIDTH > 600) ? $thereminPos.width*.0150 : $thereminMobilePos.width*.05
        noteText.x = ($WIDTH > 600) ? $thereminPos.x + $thereminPos.width*.622 - noteText.width : $thereminMobilePos.x + $thereminMobilePos.width*.91 - noteText.width
        noteText.y = ($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.797 : $thereminMobilePos.y + $thereminMobilePos.height*.54
        noteText.alpha = ($toneOutput.glide) ? .15+.15*$sineInOut0_1 : .15+.55*$sineInOut0_1
    }
    if($active && $sineInOut0_1===0){
        sineInOut0_1.set(1)
    }
    if(!$active && $sineInOut0_1===1){
        sineInOut0_1.set(0)
    }
    

}
</script>
<div>
</div>
<style>
    div{
        font-family: 'Whirly Birdie Narrow';
        display:none;
    }
</style>
