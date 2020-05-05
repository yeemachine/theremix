<script>
export let icon //SVG icon
export let setting //Pass in a store from prop
export let hide = true
export let styles = ''

let toggleDom
let circlePathValues

$: {
    circlePathValues = ($setting) ? "M11 23C11 29.8746 12.8755 34.4024 17.7365 39.2635C22.5976 44.1245 27.1254 46 34 46C40.8746 46 45.4024 44.1245 50.2635 39.2635C55.1245 34.4024 57 29.8746 57 23C57 16.1254 55.1245 11.5976 50.2635 6.73654C45.4024 1.87549 40.8746 2.85048e-07 34 0C27.1254 -2.85048e-07 22.5976 1.87549 17.7365 6.73654C12.8755 11.5976 11 16.1254 11 23Z;  M0 23C0 32 8.5 38.7678 14.5 41.5C20.5 44.2322 27.9 46 34 46C40.1 46 45.9501 43.5768 50.2635 39.2635C54.5768 34.9501 57 29.1 57 23C57 16.9 54.5768 11.0499 50.2635 6.73654C45.9501 2.42321 40.1 0 34 0C27.9 0 20 2.5 14.5 5C9 7.5 0 14 0 23Z; M11 23C11 29.8746 12.8755 34.4024 17.7365 39.2635C22.5976 44.1245 27.1254 46 34 46C40.8746 46 45.4024 44.1245 50.2635 39.2635C55.1245 34.4024 57 29.8746 57 23C57 16.1254 55.1245 11.5976 50.2635 6.73654C45.4024 1.87549 40.8746 2.85048e-07 34 0C27.1254 -2.85048e-07 22.5976 1.87549 17.7365 6.73654C12.8755 11.5976 11 16.1254 11 23Z" 
    : "M11 23C11 29.8746 12.8755 34.4024 17.7365 39.2635C22.5976 44.1245 27.1254 46 34 46C40.8746 46 45.4024 44.1245 50.2635 39.2635C55.1245 34.4024 57 29.8746 57 23C57 16.1254 55.1245 11.5976 50.2635 6.73654C45.4024 1.87549 40.8746 2.85048e-07 34 0C27.1254 -2.85048e-07 22.5976 1.87549 17.7365 6.73654C12.8755 11.5976 11 16.1254 11 23Z; M11 23C11 29.1 13.4232 34.9501 17.7365 39.2635C22.0499 43.5768 27.9 46 34 46C40.1 46 50.5 43 54.5 40.5C58.5 38 68 31.5 68 23C68 14.5 60 9 54.5 6C49 3 40.1 0 34 0C27.9 0 22.0499 2.42321 17.7365 6.73654C13.4232 11.0499 11 16.9 11 23Z; M11 23C11 29.8746 12.8755 34.4024 17.7365 39.2635C22.5976 44.1245 27.1254 46 34 46C40.8746 46 45.4024 44.1245 50.2635 39.2635C55.1245 34.4024 57 29.8746 57 23C57 16.1254 55.1245 11.5976 50.2635 6.73654C45.4024 1.87549 40.8746 2.85048e-07 34 0C27.1254 -2.85048e-07 22.5976 1.87549 17.7365 6.73654C12.8755 11.5976 11 16.1254 11 23Z"
}

const handleClick = () => {
    setting.set(!$setting)
    if(toggleDom){
        // toggleDom.querySelector('animate').beginElement()
    }
}

</script>

<container 
bind:this={toggleDom} 
on:click={handleClick} 
class='{
    ($setting) ? 'toggled' : ''} 
    {hide ?'hide':''} 
    {styles}'>
    <div class="track">
        <label>On</label>
        <div class="toggleButton">
            {#if icon}
                <div class="icon">
                    <svelte:component this={icon} />
                </div>
            {/if}
            <svg class="liquidCircle" width="69" height="46" viewBox="0 0 69 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC52F" d="M11 23C11 29.8746 12.8755 34.4024 17.7365 39.2635C22.5976 44.1245 27.1254 46 34 46C40.8746 46 45.4024 44.1245 50.2635 39.2635C55.1245 34.4024 57 29.8746 57 23C57 16.1254 55.1245 11.5976 50.2635 6.73654C45.4024 1.87549 40.8746 2.85048e-07 34 0C27.1254 -2.85048e-07 22.5976 1.87549 17.7365 6.73654C12.8755 11.5976 11 16.1254 11 23Z">
                <!-- <animate 
                    attributeName="d" 
                    begin="0s"
                    dur="400ms" 
                    fill="freeze"
                    keyTimes="0;0.25;1"
                    values={circlePathValues}/> -->
            </path>
            </svg>
        </div>
        <label>Off</label>
    </div>
</container>

<style>
container.hide{
    opacity:0;
    pointer-events:none;
}
container:hover{
        cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
    }
    
container{
    display:flex;
    align-items: center;
    justify-content: flex-start;
    height:56px;
    width:112px;
    border-radius: 32px;
    overflow: hidden;
    background:rgba(74,70,59,.5);
    transition:background-color .25s, opacity .25s;
    pointer-events: all;
}
container.toggled{
    background:#E54646;
}
.liquidCircle path{
    fill:rgba(255,248,228,1);
    opacity:0.3;
}
container.toggled .liquidCircle path{
    opacity:1;
}
container:hover .liquidCircle path{
    opacity:1
}
.track{
    pointer-events: none;
    display:flex;
    flex-direction: row;
    align-items: center;
    transform: translate(-33px,0px);
    transition: transform .25s;
}
container.toggled .track{
    transform: translate(21px,0px)
}
.toggleButton{
    display: inline-block;
    position:relative;
    width:46px;
    height:46px;
}
label{
    display:inline-block;
    color:#FFF8E4;
    font-size:12px;
}
label:first-child{
    margin-right: 16px;
}
label:last-child{
    margin-left: 10px;
    opacity:0.5;
}
.liquidCircle{
    margin-left:-11px;
}
.icon{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:auto;
}
</style>