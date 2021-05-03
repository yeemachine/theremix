<script>
import {haptic} from '../../../helpers.js'
export let setting //Pass in a store from prop
export let hide = false
export let styles = ''
export let classes = ''
export let name = ''

let toggleDom
let circlePathValues

const handleClick = () => {
    setting.set(!$setting)
  haptic()
}

</script>

<label 
bind:this={toggleDom} 
name={name}
class='{
    ($setting) ? 'toggled' : ''} 
    {hide ?'hide':''} 
    {styles}'>
    <input type="checkbox" aria-label={name} checked={$setting ? true : false} on:change={handleClick} 
>
    <container class="{$setting ? '' : classes}">
    <div class="track">
        <div class="toggleButton">
        </div>
    </div>
    </container>
</label>

<style>
input{
    opacity: 0;
    width: 0;
    height: 0;
    padding: 0;
    margin:0;
    position: absolute;
}

label.hide{
    opacity:0;
    pointer-events:none;
}
label:hover{
        cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
}
.hide container{
    pointer-events:none;
}    
container{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 11px;
    width: 48px;
    border-radius: 32px;
    overflow: visible;
    background: rgba(200,200,200,0.2);
    transition: background-color .25s, opacity .25s;
    pointer-events: all;
}
.toggled container{
    background:rgb(var(--crimson));
}
.track{
    pointer-events: none;
    display:flex;
    flex-direction: row;
    align-items: center;
    transform: translate(0px,0px);
    transition: transform .25s;
}
.toggled container .track{
    transform: translate(25px,0px)
}
.toggleButton{
    display: inline-block;
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgb(143 143 143);
}
.toggled .toggleButton{
    background: rgb(var(--offwhite))
}

.icon{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:auto;
}

@media (hover:hover){
    container:hover .toggleButton{
        background: rgb(var(--offwhite))
    }
}
</style>