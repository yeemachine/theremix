<script>
import { onMount } from 'svelte';
import {createSprite, lerpColor, detectCollision, calcRotation, graphicsGroup} from './pixiApp.js';
import { tweened } from 'svelte/motion';
import {constrain} from './helpers.js';
import { backOut, sineInOut } from 'svelte/easing';
import { oscillators } from './config.js';
import {loaded,active,WIDTH,HEIGHT,CANVASWIDTH,CANVASHEIGHT,canvasMousePos,mousePos,globalPointerUp, thereminPos,thereminMobilePos,glide, volumeVal,oscillatorType,dragged,hovered,toneOutput,MIDI_Display_Text,enableMIDI,MIDI_finished,MIDITextSprite} from './stores.js';
export let textures = null;
export let stage = null;

const sineInOut0_1 = tweened(0, {
    duration: 700,
    easing: sineInOut
});

let maskGraphic = new PIXI.Graphics();
maskGraphic.parentGroup = graphicsGroup
maskGraphic.lineStyle(0)

let oscText, freqText, noteText, midiText
document.fonts.load('10pt "Whirly Birdie Narrow"').then(() => {

})

document.fonts.load('10pt "Whirly Birdie Regular"').then(() => {
    oscText = new PIXI.Text($oscillatorType, {
        fontFamily: "Whirly Birdie Regular",
        fontSize: 40,
        fill: 0xE54646,
        align: "left"
    });
    oscText.alpha = 0
    oscText.parentGroup = graphicsGroup;

    freqText = new PIXI.Text('0 Hz', {
        fontFamily: "Whirly Birdie Regular",
        fontSize: 40,
        fill: 0xE54646,
        align: "right"
    });
    freqText.alpha = 0
    freqText.parentGroup = graphicsGroup;

    noteText = new PIXI.Text('G', {
        fontFamily: "Whirly Birdie Regular",
        fontSize: 40,
        fill: 0xE54646,
        align: "right"
    });
    noteText.alpha = 0.15
    noteText.parentGroup = graphicsGroup;

 

    stage.addChild(oscText,freqText,noteText,maskGraphic)


    midiText = new PIXI.Text('', {
        fontFamily: "Whirly Birdie Regular",
        fontSize: 40,
        fill: 0xE54646,
        align: "right"
    });
    midiText.alpha = 0.15
    midiText.parentGroup = graphicsGroup;
    midiText.mask = maskGraphic
    stage.addChild(midiText)

    MIDITextSprite.set(midiText)
    // midiText = new PIXI.Text('', {
    //     fontFamily: "Nicholson Beta",
    //     fontSize: 40,
    //     fill: 0xE54646,
    //     align: "right"
    // });
    // midiText.alpha = 0.15
    // midiText.parentGroup = graphicsGroup;
    // stage.addChild(midiText)
})


$:{
    if(oscText){
        oscText.text = $oscillatorType
        oscText.style.fontSize = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        oscText.style.padding = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        oscText.x = ($WIDTH > 600) ? $thereminPos.x+$thereminPos.width*.387 : $thereminMobilePos.x + $thereminMobilePos.width*.09
        oscText.y = ($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.79 : $thereminMobilePos.y + $thereminMobilePos.height*.52
        oscText.alpha = .15+0.55*$sineInOut0_1
    }
    if(freqText){
        freqText.text =  (!$enableMIDI) ? Math.floor($toneOutput.freq) + ' HZ' : Math.floor($toneOutput.freq) + ' HZ'
        freqText.style.fontSize = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        freqText.style.padding = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        freqText.x = ($WIDTH > 600) ? $thereminPos.x + $thereminPos.width*.582 - freqText.width : $thereminMobilePos.x + $thereminMobilePos.width*.78 - freqText.width
        freqText.y = ($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.79 : $thereminMobilePos.y + $thereminMobilePos.height*.52
        freqText.alpha = ($toneOutput.glide) ? .15+.55*$sineInOut0_1 : .15+.15*$sineInOut0_1
    }
    if(noteText){
        noteText.text = (!$enableMIDI) ? $toneOutput.note : $toneOutput.note
        noteText.style.fontSize = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        noteText.style.padding = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        noteText.x = ($WIDTH > 600) ? $thereminPos.x + $thereminPos.width*.622 - noteText.width : $thereminMobilePos.x + $thereminMobilePos.width*.91 - noteText.width
        noteText.y = ($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.79 : $thereminMobilePos.y + $thereminMobilePos.height*.52
        noteText.alpha = ($toneOutput.glide) ? .15+.15*$sineInOut0_1 : .15+.55*$sineInOut0_1
    }
    if(midiText){
        midiText.text = 
            ($enableMIDI && $MIDI_finished || $enableMIDI && $MIDI_Display_Text === 'Loading...') ? "Loading..."
            : $enableMIDI ? '   '+$MIDI_Display_Text+'      '+$MIDI_Display_Text+'      '+$MIDI_Display_Text+'      '+$MIDI_Display_Text+'   ' 
            : ''
        midiText.style.fontSize = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        midiText.style.padding = ($WIDTH > 600) ? $thereminPos.width*.0100 : $thereminMobilePos.width*.04
        midiText.y = ($WIDTH > 600) ? $thereminPos.y + $thereminPos.height*.888 : $thereminMobilePos.y + $thereminMobilePos.height*.82
        midiText.alpha = .15+0.55*$sineInOut0_1
    }

    if($active && $sineInOut0_1===0){
        sineInOut0_1.set(1)
    }
    if(!$active && $sineInOut0_1===1){
        sineInOut0_1.set(0)
    }

    maskGraphic.clear()
    maskGraphic.beginFill(0xffffff,1)
    if($WIDTH>600){
        maskGraphic.drawRoundedRect(
            $thereminPos.x + $thereminPos.width*.379,
            $thereminPos.y + $thereminPos.height*.783,
            $thereminPos.width*.25,
            $thereminPos.height*.139,
            $thereminPos.width*.014
        )
    }else{
       maskGraphic.drawRoundedRect(
            $thereminMobilePos.x + $thereminMobilePos.width*.06,
            $thereminMobilePos.y + $thereminMobilePos.height*.5,
            $thereminMobilePos.width*.88,
            $thereminMobilePos.height*.41,
            $thereminMobilePos.width*.058
        ) 
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
