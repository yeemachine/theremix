<script>
import {camera,videoReady,active,volumeVal,thereminPos,poseNetRes,mousePos,FFT,WIDTH,HEIGHT} from './stores.js'
export let stage = null

const analyser = new Tone.Analyser('waveform', 256);
Tone.Master.chain(analyser)

var graphics = new PIXI.Graphics();
graphics.alpha = 0.7
var graphics2 = new PIXI.Graphics();
graphics2.alpha = 0.7
let maskGraphic = new PIXI.Graphics();
maskGraphic.lineStyle(0)
graphics2.mask = maskGraphic
stage.addChild(graphics,graphics2,maskGraphic)

const createAudioPoints = baseValues => {
    let newArr = [];
    for (let i = 0; i < baseValues.length; i++) {
    const amplitude = baseValues[i];
    const x = $thereminPos.width*.215/(baseValues.length-1)*i;
    const y = amplitude * $thereminPos.height*.05;
    newArr.push({x:x,y:y});
    }
    return (newArr)
}

const createPose = (pose,graphics) => { 
    let ratio = $thereminPos.width*.25/$videoReady.videoWidth
    graphics2.lineStyle(2,0xff7f00);
    console.log(pose)
    graphics2.drawEllipse(
        pose[0].position.x*ratio,
        pose[0].position.y*ratio,
        Math.abs(pose[1].position.x-pose[2].position.x)*ratio*1.2,
        Math.abs(pose[1].position.x-pose[2].position.x)*ratio*1.6
        )
    createLine(pose[5],pose[6],graphics2);
    createLine(pose[11],pose[12],graphics2);
    createLine(pose[6],pose[12],graphics2,true);
    createLine(pose[5],pose[7],graphics2);
    createLine(pose[5],pose[11],graphics2,true);
    createLine(pose[7],pose[9],graphics2);

    createLine(pose[6],pose[8],graphics2);
    createLine(pose[8],pose[10],graphics2);

    pose.forEach((e,i)=>{
        let ratio = $thereminPos.width*.25/$videoReady.videoWidth
        if(i>4 && i<13 && e.score > .3){
            let color = (i===9 || i===10) ? 0xff0000 : 0xff7f00
            let size = (i===9 || i===10) ? 8 : 4
            let lineWidth = (i===9 || i===10) ? 2 : 0
            let lineColor = 0xffffff
            graphics2.beginFill(color,1)
            graphics2.lineStyle(lineWidth,lineColor);
            graphics2.drawCircle(e.position.x*ratio,e.position.y*ratio,size)
        }
        
    }) 

    // Legs
    // createLine(pose[11],pose[13],graphics2);
    // createLine(pose[13],pose[15],graphics2);
    // createLine(pose[12],pose[14],graphics2);
    // createLine(pose[14],pose[16],graphics2);

}

const createLine = (point1,point2,graphics,alwaysShow) => {
    let ratio = $thereminPos.width*.25/$videoReady.videoWidth

    if(point1.score >= .3 && point2.score >= .3){
        graphics.moveTo(point1.position.x*ratio,point1.position.y*ratio)
        graphics.lineTo(point2.position.x*ratio,point2.position.y*ratio)
    }else if(point1.score >= .3 && alwaysShow){
        graphics.moveTo(point1.position.x*ratio,point1.position.y*ratio)
        graphics.lineTo(point1.position.x*ratio,$videoReady.videoHeight*ratio)
    }
    
}

const fps = 14
const draw = (timestamp) => {
    setTimeout(function(){

        if(analyser){
            const audioArr = createAudioPoints(analyser.getValue())
            graphics.clear();
            graphics.lineStyle(2,0xE54646);
            audioArr.forEach((e,i)=>{
                if(i===0){
                    graphics.moveTo(e.x,e.y)
                }
                graphics.lineTo(e.x,e.y);
            })
        }

        if($poseNetRes && $videoReady){
            graphics2.clear()
            createPose($poseNetRes,graphics2)

            graphics2.x = $thereminPos.x+($thereminPos.width*.25)/2;
            graphics2.y = $thereminPos.y
        }else{
            graphics2.clear()
        }
        
    requestAnimationFrame(draw);
    }, 1000/fps)
}
draw()

$:{
    graphics.x = $thereminPos.x+$thereminPos.width*.45;
    graphics.y = $thereminPos.y+$thereminPos.height*.78+0;
   
    graphics2.x = $thereminPos.x+($thereminPos.width*.25)/2;
    graphics2.y = $thereminPos.y

    maskGraphic.clear()
    maskGraphic.beginFill(0xffffff,1)

    if($videoReady){
        let ratio = $thereminPos.width*.25/$videoReady.videoWidth
        maskGraphic.drawRect(
            $thereminPos.x+($thereminPos.width*.25)/2,
            $thereminPos.y,
            $videoReady.videoWidth*ratio,
            $videoReady.videoHeight*ratio,
        )
    }
    

    // graphics2.width = $thereminPos.width*.45
    // graphics2.scale.y = graphics2.scale.x
}
</script>