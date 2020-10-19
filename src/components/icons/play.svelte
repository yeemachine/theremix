<script>
  export let loaded = false;
  export let hide = false;
  export let color = "rgb(var(--crimson))";
</script>

<svg
  class="playSVG {loaded ? 'loaded' : ''} {hide ? 'hide' : ''}"
  preserveAspectRatio="xMidYMin slice"
  width="400"
  height="406"
  viewBox="0 0 400 406"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M397.4,162.2l-38.8,162.1c-0.7,3-2.8,5.6-5.6,6.9l-150.9,70.7c-2.8,1.3-6.1,1.3-8.9-0.1L43.8,327.9
	c-2.8-1.4-4.8-4-5.5-7L3,157.9c-0.7-3,0.1-6.2,2.1-8.6L110.4,20c2-2.4,4.9-3.8,8.1-3.8L285,18c3.1,0,6.1,1.5,8,3.9l102.5,131.5
	C397.4,156,398.1,159.2,397.4,162.2z"
    fill="{color}"
    fill-opacity="0"
    stroke="{color}"
    stroke-width="2"
    stroke-miterlimit="10"
  ></path>

  <path
    d="M360.5,84.1l36.8,161.2c0.8,3.5,0,7.1-2.3,9.9L292,384.5c-2.2,2.8-5.6,4.4-9.1,4.4H117.6
	c-3.6,0-6.9-1.6-9.1-4.4L5.5,255.2c-2.2-2.8-3-6.4-2.3-9.9L40,84.1c0.8-3.5,3.1-6.4,6.3-7.9L195.1,4.4c3.2-1.5,6.9-1.5,10.2,0
    l148.9,71.7C357.3,77.7,359.7,80.6,360.5,84.1z"
    stroke="{color}"
    stroke-width="2"
    stroke-miterlimit="10"
  ></path>

  <path
    class="triangle"
    d="M278.26 199.979L148.142 139.844C147.592 139.585 146.985 139.47 146.378 139.509C145.771 139.549 145.184 139.741 144.672 140.069C144.159 140.396 143.738 140.848 143.447 141.383C143.156 141.917 143.005 142.517 143.008 143.125V263.451C143.005 264.06 143.156 264.659 143.447 265.194C143.738 265.728 144.159 266.18 144.672 266.508C145.184 266.835 145.771 267.028 146.378 267.067C146.985 267.106 147.592 266.991 148.142 266.733L278.26 206.561C278.894 206.276 279.433 205.814 279.81 205.23C280.188 204.647 280.389 203.966 280.389 203.27C280.389 202.575 280.188 201.894 279.81 201.31C279.433 200.726 278.894 200.264 278.26 199.979Z"
    fill="{color}"
  ></path>
</svg>

<style>
  svg {
    height: 95%;
    width: 95%;
    transition: 0.5s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    overflow: visible;
    pointer-events: none;
  }
  :global(.play:hover .playSVG) {
    cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475)
        21 20,
      pointer;
  }
  svg.hide {
    opacity: 0;
    transform: scale(1.5);
  }
  svg path:nth-child(1),
  svg path:nth-child(2),
  svg path:nth-child(3) {
    transform-origin: center;
  }

  svg path:nth-child(1),
  svg path:nth-child(2) {
    fill-opacity: 0;
    stroke-dasharray: 1300;
    stroke-dashoffset: 1300;
    stroke-width: 4;
    stroke-linecap: round;
  }

  svg.hide path:nth-child(1),
  svg.hide path:nth-child(2) {
    animation-play-state: paused;
  }

  .triangle {
    opacity: 0;
    transition: opacity 0.25s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1s,
      transform 0.25s cubic-bezier(0.46, 0.03, 0.52, 0.96),
      fill 0.4s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    z-index: 2;
  }

  .loaded .triangle {
    opacity: 1;
  }

  :global(.play:hover .playSVG.loaded .triangle,.play .playSVG.loaded.hide .triangle) {
    transform: scale(1.3);
    fill: rgb(var(--offwhite));
  }

  svg.loaded path:nth-child(2) {
    animation: rotate 2s ease-in-out,
      drawforward 2s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    animation-fill-mode: forwards;
    animation-play-state: start;
    /* transition:stroke-dashoffset 2s cubic-bezier(0.46, 0.03, 0.52, 0.96); */
  }
  svg.loaded path:nth-child(1) {
    animation: rotate 2s ease-in-out ,
      drawforward 2s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    animation-fill-mode: forwards;
    animation-play-state: start;
    transition: fill-opacity 0.25s cubic-bezier(0.46, 0.03, 0.52, 0.96);
  }
  :global(.play:hover .playSVG.loaded path:nth-child(1)) {
    fill-opacity: 0.5;
  }

  @keyframes rotate {
    0% {
      transform: rotate(-180deg);
    }
    100% {
      transform: rotate(-140deg);
    }
  }
  @keyframes drawforward {
    to {
      stroke-dashoffset: 1;
    }
  }
  @keyframes drawback {
    to {
      stroke-dashoffset: -1000;
    }
  }
</style>
