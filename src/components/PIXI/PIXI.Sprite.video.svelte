<script>
import { tweened } from 'svelte/motion';
import {onMount} from 'svelte';
import { backInOut, sineInOut } from 'svelte/easing';
import {constrain} from '../../helpers.js'
import {CANVASWIDTH,CANVASHEIGHT,WIDTH,SCALE,videoPos,videoReady,gestures,showGuides,modelLoaded,videoMask,poseNetRes} from '../../stores.js';
export let sheet = null;
export let stage = null;
export let createSprite = null;

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

const wire1 = createSprite(sheet.textures['Wire-1'],sheet.textures['Wire-1-Normal'])
wire1.children[0].tint = 0x666666;
const wire2 = createSprite(sheet.textures['Wire-2'],sheet.textures['Wire-2-Normal'])
wire2.children[0].tint = 0x666666;
const wire3 = createSprite(sheet.textures['Wire-3'],sheet.textures['Wire-3-Normal'])
wire3.children[0].tint = 0x666666;

const video = createSprite(sheet.textures['Video'],sheet.textures['Video-Normal'])
const guides = createSprite(sheet.textures['Guides'])
guides.parentGroup = PIXI.lights.diffuseGroup
video.addChild(guides)

const video_light = new PIXI.lights.PointLight(0xff7f00, 0);
  
var feedTexture = PIXI.Texture.from(document.querySelector('video'));
feedTexture.rotate = 12
console.log(feedTexture)
var feedSprite = new PIXI.Sprite(feedTexture);
let colorMatrix = new PIXI.filters.ColorMatrixFilter();
colorMatrix.desaturate()
feedSprite.filters = [colorMatrix]
feedSprite.anchor.set(0.5)
feedSprite.alpha = 0.2;

$:{
  if($videoMask){
    feedSprite.mask = $videoMask
  }
}

let ratio = 1/1
$:{
  if($videoReady){
    ratio = $videoReady.width/$videoReady.height
  }
}
  
stage.addChild(wire1,wire2,wire3,video,feedSprite,video_light)

$:{
    video.width = ($WIDTH>600) ? 240*$SCALE : 200*$SCALE
    video.scale.y = video.scale.x

    let margin = ($WIDTH>600) ? 24 : 16
    video.x = margin*$SCALE - (video.width*2)*(1-$sineInOut0_1)
    video.y = (margin*2+56)*$SCALE
    video_light.x = margin*2*$SCALE + video.width*.5
    video_light.y = video.y
    video_light.brightness = (1+.8*constrain($CANVASWIDTH/1200, {min:0,max:1}))*$sineInOut0_1
  
    feedSprite.height = ($WIDTH>600) ? 240*$SCALE*.99 : 200*$SCALE*.99 //flip horizontal video
    feedSprite.width = feedSprite.height * ratio
    // feedSprite.scale.x = feedSprite.scale.y
    // feedSprite.scale.x = -1 * Math.abs(feedSprite.scale.x) 
    feedSprite.x = video.x + video.width/2
    feedSprite.y = video.y + video.height/2;

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

    if($videoReady && $modelLoaded){
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