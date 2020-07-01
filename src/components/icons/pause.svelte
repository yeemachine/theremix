<script>
export let color = 'var(--offwhite)'
export let hoverColor = 'var(--charcoal)'
</script>

<svg class="pauseSVG" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 30H21V16H17V30ZM25 16V30H29V16H25Z" style="--color:{color};--hoverColor:{hoverColor}"/>
</svg>

<style>
svg{
    height:auto;
    width:100%;
    pointer-events: none;
}
path{
    --color:var(--offwhite);
    --hoverColor:var(--charcoal);
    fill:rgb(var(--color))
}

:global(button:hover .pauseSVG path){
    fill:rgb(var(--hoverColor))
}
</style>



