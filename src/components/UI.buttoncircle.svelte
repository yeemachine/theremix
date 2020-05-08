<script>
export let icon
export let setting
export let hide = false
export let styles = ''
export let selected = false
export let tabindex = 0
const handleClick = () => {
    setting.set(!$setting)
}
</script>

<button tabindex={tabindex} class="{hide ? 'hide':''} {selected?'selected':''}" style={styles} on:click={handleClick}>
        {#if icon}
            <svelte:component this={icon} />
        {/if}
</button>

<style>
    button{
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
    button.selected{
        background:rgba(255,248,228,1);
    }
    button.hide{
        opacity:0;
        pointer-events:none;
    }
    button:hover{
        background:rgba(255,248,228,1);
       cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
    }
</style>