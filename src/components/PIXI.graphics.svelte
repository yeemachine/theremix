<script>
import {camera,videoReady,active,volumeVal,thereminPos,thereminMobilePos,poseNetRes,videoPos,mousePos,FFT,CANVASWIDTH,CANVASHEIGHT,WIDTH,toneOutput,machineLeftPos,analyser,mouseOverride,TIME} from './stores.js'
import {getDistance,getMidpoint} from './helpers.js'
import { tweened } from 'svelte/motion';
import {constrain} from './helpers.js';
import {graphicsGroup} from './pixiApp.js'
import { backOut, sineInOut } from 'svelte/easing';
import {posenetOptions} from './config.js'

export let stage = null

let ratio = 0
const sineInOut0_1 = tweened(0, {
    duration: 600,
    easing: sineInOut
});
const blink0_1 = tweened(0, {
    duration: 600,
    easing: sineInOut
});

let graphics = new PIXI.Graphics();
graphics.parentGroup = graphicsGroup
graphics.alpha = 0.7

let bgGraphics = new PIXI.Graphics();
bgGraphics.parentGroup = PIXI.lights.diffuseGroup
bgGraphics.alpha = 0.7

let graphics2 = new PIXI.Graphics();
graphics2.parentGroup = graphicsGroup
graphics2.alpha = 0.7

let graphics2add = new PIXI.Graphics();
graphics2add.parentGroup = graphicsGroup
graphics2add.alpha = 0.7

let maskGraphic = new PIXI.Graphics();
maskGraphic.parentGroup = graphicsGroup
maskGraphic.lineStyle(0)

graphics2.mask = maskGraphic
graphics2add.mask = maskGraphic


let graphics3 = new PIXI.Graphics();
graphics3.parentGroup = PIXI.lights.diffuseGroup

stage.addChild(graphics,bgGraphics,graphics2,graphics2add,maskGraphic,graphics3)

const createAudioPoints = baseValues => {
    let newArr = [];
    for (let i = 0; i < baseValues.length; i++) {
    const amplitude = baseValues[i];
    const x = ($WIDTH>600) 
        ? $thereminPos.width*.2495/(baseValues.length-1)*i 
        : $thereminMobilePos.width*.87/(baseValues.length-1)*i;
    const y = ($WIDTH>600) 
        ? amplitude * $thereminPos.height*.06
        : amplitude * $thereminMobilePos.height*.2;
    newArr.push({x:x,y:y});
    }
    return (newArr)
}

let headPos = {
    rotation:0,
    x:0,
    y:0
}
const createPose = (pose,graphics) => { 

    graphics2.lineStyle(2,0xE54646);

    //Face T
    // createLine(pose[1],pose[2],graphics2);
    // let nosePoint1 = {
    //     position: {
    //         x:pose[0].position.x,
    //         y:pose[0].position.y
    //     }
    // }
    // let nosePoint2 = {
    //     position: {
    //         x:getMidpoint(pose[1],pose[2],'x'),
    //         y:getMidpoint(pose[1],pose[2],'y')
    //     }
    // }
    // createLine(nosePoint1,nosePoint2,graphics2);

    //Torso
    createLine(pose[5],pose[6],graphics2);
    createLine(pose[11],pose[12],graphics2);
    createLine(pose[6],pose[12],graphics2);
    createLine(pose[5],pose[11],graphics2);

    createLine(pose[5],pose[7],graphics2);
    createLine(pose[7],pose[9],graphics2);
    createLine(pose[6],pose[8],graphics2);
    createLine(pose[8],pose[10],graphics2);

    // Legs
    createLine(pose[11],pose[13],graphics2);
    createLine(pose[13],pose[15],graphics2);
    createLine(pose[12],pose[14],graphics2);
    createLine(pose[14],pose[16],graphics2);

    //Keypoints
    pose.forEach((e,i)=>{
        if(i>4){
            let color = (i===9 || i===10) ? 0xE54646 : 0xE54646
            let opacity = (i===9 || i===10) ? .7 : .3
            let size = (i===9 || i===10) ? 16 : 8
            graphics2.beginFill(color,opacity)
            graphics2.lineStyle(0);
            if(e.score > .3){  
                graphics2.drawCircle(e.position.x*ratio,e.position.y*ratio,size)
            }        
        } 
    }) 

    //Head
    graphics2add.beginFill(0xE54646,.3)
    graphics2add.drawEllipse(
        0,
        0,
        Math.abs(pose[5].position.x-pose[6].position.x)*ratio*.35,
        Math.abs(pose[5].position.x-pose[6].position.x)*ratio*.45
    )
    headPos.x = pose[0].position.x*ratio,
    headPos.y = (pose[0].position.y+pose[1].position.y)/2*ratio
    headPos.rotation = (pose[1].position.y-pose[2].position.y)/(pose[1].position.x-pose[2].position.x)
    graphics2add.rotation = headPos.rotation
    graphics2add.x = $videoPos.x + headPos.x;
    graphics2add.y = $videoPos.y + headPos.y;
}

const createLine = (point1,point2,graphics) => {
    graphics.moveTo(point1.position.x*ratio,point1.position.y*ratio)
    graphics.lineTo(point2.position.x*ratio,point2.position.y*ratio)
}
let bgLights = {
    left:[
     {
        x:.398,
        y:.3205,
        r:.0055,
        color:0xE54646,
        speed:5,
        step:.4,
        pause:true
     },
     {
        x:.359,
        y:.3205,
        r:.0055,
        color:0xE54646,
        speed:2,
        step:.4,
        pause:false
     },
     {
        x:.24,
        y:.577,
        w:.01125,
        color:0xFFFF33,
        speed:2,
        step:.2,
        pause:false
     }      
    ]
}

const fps = 14
let frameCount = 0
let frameInterval = 4 //how much to slow fps

const draw = () => {
    TIME.update(n => n + .01)
    frameCount += 1

        if(analyser && frameCount % frameInterval === 0){
            const audioArr = createAudioPoints($analyser.getValue())
            graphics.clear();
            graphics.lineStyle(2,0xE54646);
            graphics.lineAlpha = (!$active && $WIDTH > 600) ? Math.abs(Math.sin($TIME*5)) : $sineInOut0_1
            audioArr.forEach((e,i)=>{
                if(i===0){
                    graphics.moveTo(e.x,e.y)
                }
                graphics.lineTo(e.x,e.y);
            })
        }

        if($poseNetRes && $videoReady){
            mouseOverride.set($mouseOverride+.01)
            graphics2.clear()
            graphics2add.clear()
            ratio = $videoPos.width*.99/$videoReady.videoWidth
            createPose($poseNetRes,graphics2)
            graphics2.x = $videoPos.x;
            graphics2.y = $videoPos.y
        }else{
            graphics2.clear()
            graphics2add.clear()
        }

        if($toneOutput){
            graphics3.clear()
            if(!$toneOutput.glide){
                for(let i=0; i<$toneOutput.total+1;i++){
                    graphics3.lineStyle(2,0xE54646);
                    graphics3.moveTo(
                        $thereminPos.x + $thereminPos.width*i/$toneOutput.total,
                        0)
                    graphics3.lineTo(
                        $thereminPos.x + $thereminPos.width*i/$toneOutput.total,
                        $thereminPos.y+$thereminPos.height)
                }
                graphics3.lineStyle(0)
                graphics3.beginFill(0xE54646,1)
                graphics3.drawRect(
                    $thereminPos.x + $thereminPos.width*$toneOutput.index/$toneOutput.total,
                    0,
                    $thereminPos.width/$toneOutput.total,
                    $thereminPos.y+$thereminPos.height
                    )
            }
        }

        if($machineLeftPos){
            bgGraphics.clear()
            bgLights.left.forEach((e,i)=>{

                let opacity = (e.pause) ? constrain((Math.sin($TIME*e.speed)),{min:0,max:1})
                    : Math.abs(Math.sin($TIME*e.speed))
                let opacityStepped = (opacity>e.step) ? .7 : 0
                    
                bgGraphics.beginFill(e.color,opacityStepped)

                if(e.r){
                    bgGraphics.drawEllipse(
                        $machineLeftPos.x+$machineLeftPos.width*e.x,
                        $machineLeftPos.y+$machineLeftPos.height*e.y,
                        $machineLeftPos.width*e.r,
                        $machineLeftPos.width*e.r
                    )
                }
                if(e.w){
                    bgGraphics.drawRoundedRect(
                        $machineLeftPos.x+$machineLeftPos.width*e.x,
                        $machineLeftPos.y+$machineLeftPos.height*e.y,
                        $machineLeftPos.width*e.w,
                        $machineLeftPos.width*e.w,
                        $machineLeftPos.width*e.w*.3
                    )
                }


            })  
           
        }
        
    requestAnimationFrame(draw);
}

draw()


$:{
    graphics.x = ($WIDTH > 600) ? $thereminPos.x+$thereminPos.width*.379 : $thereminMobilePos.x+$thereminMobilePos.width*.065;
    graphics.y = ($WIDTH > 600) ? $thereminPos.y+$thereminPos.height*.862+0 : $thereminMobilePos.y+$thereminMobilePos.height*.73+0;
   
    graphics2.x = $videoPos.x;
    graphics2.y = $videoPos.y

    maskGraphic.clear()
    maskGraphic.beginFill(0xffffff,1)

    graphics3.x = 0;
    graphics3.y = 0;
    graphics3.alpha = .3*$sineInOut0_1

    if($videoReady){
        let offset = {
            x:$videoPos.width*.08,
            y:$videoPos.width*.035
        }
        maskGraphic.drawRoundedRect(
            $videoPos.x+offset.x,
            $videoPos.y+offset.y,
            $videoPos.width-offset.x*2,
            $videoPos.height-offset.y*2,
            $videoPos.width*.25
        )
    }

    if($active && $sineInOut0_1===0){
        sineInOut0_1.set(1)
    }
    if(!$active && $sineInOut0_1===1){
        sineInOut0_1.set(0)
    }
     
}


</script>