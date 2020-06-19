<script>
export let setting //Pass in a store from prop
export let hide = false
export let styles = ''

let toggleDom
let circlePathValues

const handleClick = () => {
    setting.set(!$setting)
}

</script>

<label 
bind:this={toggleDom} 
class='{
    ($setting) ? 'toggled' : ''} 
    {hide ?'hide':''} 
    {styles}'>
    <input type="checkbox" checked={$setting ? true : false} on:change={handleClick} 
>
    <container>
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
    display:flex;
    align-items: center;
    justify-content: flex-start;
    height:40px;
    width:64px;
    border-radius: 32px;
    overflow: hidden;
    background: rgba(200,200,200,0.2);
    /* border:1px solid rgb(var(--crimson)); */
    transition:background-color .25s, opacity .25s;
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
    transform: translate(5px,0px);
    transition: transform .25s;
}
.toggled container .track{
    transform: translate(27px,0px)
}
.toggleButton{
    display: inline-block;
    position:relative;
    width:32px;
    height:32px;
    border-radius:50%;
    background: rgba(255,255,255,.4)
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
</style>