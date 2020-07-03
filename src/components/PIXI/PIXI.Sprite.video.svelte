<script>
// import * as PIXI from 'pixi.js'
// import {createSprite, diffuseLayer} from '../../pixiApp.svelte';
import { tweened } from 'svelte/motion';
import { backInOut, sineInOut } from 'svelte/easing';
import {constrain} from '../../helpers.js'
import {CANVASWIDTH,CANVASHEIGHT,WIDTH,SCALE,videoPos,videoReady,gestures,showGuides} from '../../stores.js';
export let textures = null;
export let stage = null;
export let createSprite = null;
export let diffuseLayer = null;

const sineInOut0_1 = tweened(0, {
    duration: 700,
    easing: sineInOut
});

const guides1_0 = tweened(1, {
    duration: 700,
    easing: sineInOut
});

const backOut0_1 = tweened(0, {
    duration: 1200,
    easing: backInOut
});

const wire1 = createSprite(textures.wire1.texture,textures.wire1_normal.texture)
wire1.children[0].tint = 0x666666;
const wire2 = createSprite(textures.wire2.texture,textures.wire2_normal.texture)
wire2.children[0].tint = 0x666666;
const wire3 = createSprite(textures.wire3.texture,textures.wire3_normal.texture)
wire3.children[0].tint = 0x666666;

const video = createSprite(textures.video.texture,textures.video_normal.texture)
const guides = createSprite(textures.guides.texture)
guides.parentGroup = PIXI.lights.diffuseGroup
video.addChild(guides)

const video_light = new PIXI.lights.PointLight(0xff7f00, 0);
stage.addChild(wire1,wire2,wire3,video,video_light)

$:{
    video.width = ($WIDTH>600) ? 240*$SCALE : 200*$SCALE
    video.scale.y = video.scale.x

    let margin = ($WIDTH>600) ? 24 : 16
    video.x = margin*$SCALE - (video.width*2)*(1-$sineInOut0_1)
    video.y = (margin*2+56)*$SCALE
    video_light.x = margin*2*$SCALE + video.width*.5
    video_light.y = video.y
    video_light.brightness = (1+.8*constrain($CANVASWIDTH/1200, {min:0,max:1}))*$sineInOut0_1

    guides.alpha = $guides1_0*1

    videoPos.set({
        x:video.x,
        y:video.y,
        width:video.width,
        height:video.height
    })

    wire1.scale = {x:video.scale.x,y:video.scale.x}
    wire1.x = video.x - margin - margin*2*(1-$backOut0_1)
    wire1.y = 0 - margin

    wire2.scale = {x:video.scale.x,y:video.scale.x}
    wire2.x = video.x - margin*2.2 - margin*2*(1-$backOut0_1)
    wire2.y = video.y + video.height*.95

    wire3.scale = {x:video.scale.x,y:video.scale.x}
    wire3.x = video.x - margin*2.9 - margin*1*(1-$backOut0_1)
    wire3.y = video.y + video.height*.95

    if($videoReady){
        if($sineInOut0_1 === 0){
            sineInOut0_1.set(1)
        } 
        if($backOut0_1 === 0){
            backOut0_1.set(1)
        } 
    }else{
        if($sineInOut0_1 === 1){
            sineInOut0_1.set(0)
        } 
        if($backOut0_1 === 1){
            backOut0_1.set(0)
        } 
    }
}

$:{
    if(!$showGuides && $guides1_0 === 1){
        guides.tint = 0x2CF27C
        dataLayer.push({'event':'Pose-Registered'});
        setTimeout(()=>{
            guides1_0.set(0)
        },1000)
    }
}


</script>