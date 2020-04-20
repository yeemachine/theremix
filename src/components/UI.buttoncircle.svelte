<script>
export let icon
export let setting
export let hide = true
export let styles = ''
export let selected = false
const handleClick = () => {
    setting.set(!$setting)
}
</script>

<container class="{hide ? 'hide':''} {selected?'selected':''}" style={styles} on:pointerup={handleClick}>
        {#if icon}
            <svelte:component this={icon} />
        {/if}
</container>

<style>
    container{
        width:56px;
        height:56px;
        background:rgba(255,248,228,.3);
        border-radius: 50%;
        transition:opacity .25s;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
    }
    container.selected{
        background:rgba(255,248,228,1);
    }
    container.hide{
        opacity:0;
        pointer-events:none;
    }
    container:hover{
        background:rgba(255,248,228,1);
       cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587345471366) 21 20, pointer;
    }
</style>