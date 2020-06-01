<script>
export let icon
export let setting
export let hide = false
export let styles = ''
export let selected = false
export let tabindex = 0
const handleClick = () => {
    // if(settingState === null){
    //     setting.set(!$setting)
    // }else{
    //     setting.set(settingState)
    // }
     setting.set(!$setting)
}
</script>

<button 
    tabindex={tabindex} 
    class="{hide ? 'hide':''} {selected?'selected':''}" 
    style={styles} 
    on:click={handleClick}>
        {#if icon}
            <svelte:component this={icon} color={(selected)?'var(--svgColorHover)':'var(--svgColor)'} hoverColor={'var(--svgColorHover)'}/>
        {/if}
</button>

<style>
    button{
        --bgColor:var(--offwhite);
        --svgColor:var(--offwhite);
        --svgColorHover:var(--charcoal);
        width:56px;
        height:56px;
        /* border:1px solid rgb(var(--crimson)); */
        border-radius: 50%;
        transition:opacity .25s;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
        background:rgba(var(--bgColor),.2);
    }
    /* button.dark{
        background: rgba(200,200,200,0.2);
    }
    button.light{
        background:rgb(var(--bgColor))
    } */
    button.selected{
        background: rgb(var(--bgColor));
    }
    /* button.selected.light{
        background:rgb(var(--bgColor));
    } */

    button.hide{
        opacity:0;
        pointer-events:none;
    }
    /* button.selected.light:hover{
        background:rgb(var(--crimson));
    } */
    button:hover{
        background: rgb(var(--bgColor));
        /* background: rgba(229,70,70,1); */
       cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
    }
</style>