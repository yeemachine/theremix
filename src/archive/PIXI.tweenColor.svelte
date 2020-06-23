<script>
import * as PIXI from 'pixi.js'
import { interpolateRgb } from 'd3-interpolate';
import { tweened,spring } from 'svelte/motion';
import { midiList } from './config.js';
import {rgbToHex} from './helpers.js'
import {enableMIDI,currentMIDITitle,currentMIDITint} from './stores.js';

let defaultColor = PIXI.utils.hex2string($currentMIDITint)

const colorTween = tweened(defaultColor, {
		duration: 800,
		interpolate: interpolateRgb
});

let settingTween = false
$:{
    if($enableMIDI){
        if($currentMIDITitle){
            let tintTarget = PIXI.utils.hex2string(midiList[$currentMIDITitle].tint)
            if($colorTween !== tintTarget){
                if(settingTween){
                    let hexString = rgbToHex($colorTween)
                    let hex = parseInt(hexString.replace(/^#/, ''), 16)
                    currentMIDITint.set(hex)
                }else{
                    colorTween.set(tintTarget)
                    settingTween = true
                }
            }else{
                let hex = parseInt(tintTarget.replace(/^#/, ''), 16)
                currentMIDITint.set(hex)
                settingTween = false
            }
        }
    }else{
        if($colorTween !== defaultColor){
            if(settingTween){
                let hexString = rgbToHex($colorTween)
                let hex = parseInt(hexString.replace(/^#/, ''), 16)
                currentMIDITint.set(hex)
            }else{
                colorTween.set(defaultColor)
                settingTween = true
            }
        }else{
            let hex = parseInt(defaultColor.replace(/^#/, ''), 16)
            settingTween = false
            currentMIDITint.set(hex)
        }
    }
    // console.log('colorchanged')
}
</script>