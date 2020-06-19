<script>
export let letter = 'O'
export let position = 'relative'
export let top = 0
export let left = 0
export let styles=''
export let hide = true;
import {thereminPos,thereminMobilePos,HEIGHT,WIDTH,SCALE} from '../../stores.js'
let containerDom
let containerWidth = 0
let containerHeight = 0
let containerPos = {
    top:0,
    left:0,
    width:'56px',
    height:'56px'
}

$: {
    containerPos = {
        top: ($WIDTH > 600) 
        ? $thereminPos.y/$SCALE+$thereminPos.height/$SCALE*top-containerHeight*.5 
        : $thereminMobilePos.y/$SCALE+$thereminMobilePos.height/$SCALE*top-containerHeight*.5, 
        left: ($WIDTH > 600) 
        ? ($thereminPos.x/$SCALE+$thereminPos.width/$SCALE*left) - containerWidth*.5
        : ($thereminMobilePos.x/$SCALE+$thereminMobilePos.width/$SCALE*left) - containerWidth*.5,
        width:($WIDTH > 600) ? ($thereminPos.width/$SCALE*.035) : ($thereminMobilePos.width/$SCALE*.1),
        height:($WIDTH > 600) ? ($thereminPos.width/$SCALE*.035) : ($thereminMobilePos.width/$SCALE*.1)
    }
}
</script>


<div
bind:this={containerDom} 
bind:clientWidth={containerWidth} 
bind:clientHeight={containerHeight} 
class="{hide ? 'hide' : ''}"
style="position:{position};width:{containerPos.width.toFixed(0)}px;height:{containerPos.height.toFixed(0)}px;top:{position==='absolute'?containerPos.top.toFixed(0):''}px;left:{position==='absolute'?containerPos.left.toFixed(0):''}px;font-size:{(containerPos.width/2).toFixed(0)}px;border-radius:{(containerPos.width/10).toFixed(0)}px;{styles}">
<p>{letter}</p>
</div>

<style>
div{
    pointer-events: none;
    background:rgb(var(--crimson));
    color:rgb(var(--offwhite));
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0s;
}
div.hide{
    opacity:0;
    transition: .5s cubic-bezier(0.46, 0.03, 0.52, 0.96) .2s;
    transform:translate3d(0,4px,0) 
}
 @media only screen and (max-width: 600px) {
     /* div{
         display: none;
     } */
}
</style>