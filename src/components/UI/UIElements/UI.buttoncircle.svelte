<script>
export let icon
export let setting
export let hide = false
export let styles = ''
export let classes = ''
export let reverse = false
export let selected = false
export let tabindex = 0
export let name = ''
const handleClick = () => {
     setting.set(!$setting)
}
</script>

<button 
    name={name}
    aria-label={name}
    tabindex={tabindex} 
    class="{hide ? 'hide':''} {selected?'selected':''} 
    {$setting && !reverse ? '' 
    : ($setting && reverse) ? classes
    : !$setting && !reverse ? classes 
    : !$setting && reverse ? ''
    : classes
    }" 
    style={styles} 
    on:click={handleClick}>
        {#if icon}
            <svelte:component this={icon} selected={selected} color={(selected)?'var(--selectedSVGColor)':'var(--svgColor)'} hoverColor={selected ? 'var(--selectedSVGColor)' : 'var(--svgColorHover)'}/>
        {/if}
</button>

<style>
    button{
        --bgColor:var(--offwhite);
        --svgColor:var(--offwhite);
        --svgColorHover:var(--charcoal);
        --selectedBGColor:var(--offwhite);
        --selectedSVGColor:var(--charcoal);
        width:48px;
        height:48px;
        border-radius: 50%;
        transition:opacity .25s;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
        background:rgba(var(--bgColor),.05);
        backdrop-filter: blur(10px);
    }
    button.selected,button.selected:hover{
        background: rgb(var(--selectedBGColor));
    }

    button.hide{
        opacity:0;
        pointer-events:none;
    }

    button:hover{
        background: rgb(var(--bgColor));
       cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
    }
</style>