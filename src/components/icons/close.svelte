<script>
  export let color = "var(--offwhite)";
  export let hoverColor = "var(--charcoal)";
</script>

<svg
  class="closeSVG"
  width="46"
  height="46"
  viewBox="0 0 46 46"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M29.9482 15.4062C29.5577 15.0156 28.9245 15.0157 28.534 15.4062L22.9377 21.0025L17.4661 15.5309C17.0756 15.1404 16.4424 15.1404 16.0519 15.5309L15.4101 16.1727C15.0196 16.5632 15.0196 17.1964 15.4101 17.5869L20.8817 23.0585L15.5562 28.384C15.1657 28.7745 15.1657 29.4077 15.5562 29.7982L16.198 30.44C16.5885 30.8305 17.2217 30.8305 17.6122 30.44L22.9377 25.1145L28.3879 30.5647C28.7784 30.9552 29.4116 30.9552 29.8021 30.5647L30.4439 29.9229C30.8344 29.5324 30.8344 28.8992 30.4439 28.5087L24.9937 23.0585L30.59 17.4622C30.9805 17.0717 30.9805 16.4385 30.59 16.048L29.9482 15.4062Z"
    style="--color:{color}; --hoverColor:{hoverColor}"
  ></path>
</svg>

<style>
  svg {
    height: auto;
    width: 100%;
    --color: var(--offwhite);
    --hoverColor: var(--charcoal);
  }
  path {
    fill: rgb(var(--color));
  }

  :global(button:hover .closeSVG path) {
    fill: rgb(var(--hoverColor));
  }
</style>
