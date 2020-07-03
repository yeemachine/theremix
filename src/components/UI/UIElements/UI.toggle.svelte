<script>
export let icon //SVG icon
export let setting //Pass in a store from prop
export let hide = false
export let styles = ''
export let classes = ''
export let name = ''

let toggleDom
let circlePathValues

const handleClick = () => {
    setting.set(!$setting)
}

</script>

<label 
name={name}
bind:this={toggleDom} 
class='{
    ($setting) ? 'toggled' : ''} 
    {hide ?'hide':''} 
    {styles}'>
    <input aria-label={name} type="checkbox" checked={$setting ? true : false} on:change={handleClick} 
>
    <container class={$setting ? '' : classes}>
    <div class="track">
        <p>On</p>
        <div class="toggleButton">
            {#if icon}
                <div class="icon">
                    <svelte:component this={icon} color={$setting ? 'var(--charcoal)' : 'var(--offwhite)'}/>
                </div>
            {/if}
        </div>
        <p>Off</p>
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
    height:56px;
    width:112px;
    border-radius: 32px;
    overflow: hidden;
    background: rgba(200,200,200,0.2);
    transition:background-color .25s, opacity .25s;
    pointer-events: all;
}
.toggled container{
    background:#E54646;
}
.track{
    pointer-events: none;
    display:flex;
    flex-direction: row;
    align-items: center;
    transform: translate(-33px,0px);
    transition: transform .25s;
}
.toggled container .track{
    transform: translate(21px,0px)
}
.toggleButton{
    display: inline-block;
    position:relative;
    width:46px;
    height:46px;
    border-radius:50%;
    background: rgba(255,255,255,.4)
}
.toggled .toggleButton{
    background: rgb(var(--offwhite))
}
p{
    display:inline-block;
    color:#FFF8E4;
    font-size:12px;
}
p:first-child{
    margin-right: 16px;
}
p:last-child{
    margin-left: 10px;
    opacity:0.5;
}
.icon{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:auto;
}
</style>