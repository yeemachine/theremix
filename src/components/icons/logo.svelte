<script>
  import { fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  export let hide = false;
  export let color = "rgb(var(--crimson))";
  
</script>

<svg
  width="1763"
  height="214"
  viewBox="0 0 1763 214"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {#if !hide}
  <path
    in:fade="{{duration: 600, delay:0 }}" 
    out:fade="{{duration:600, delay:0 }}"
    d="M0 21.8004V55.5002H92.0844V213.05H129.343V55.5002H220.823V21.8004H0Z"
    fill="{color}"
  ></path>
  <path
    in:fade="{{duration: 600, delay:600 }}" 
    out:fade="{{duration:600, delay:600 }}"
    d="M433.157 21.8004V130.472H273.833V21.8004H236.574V213.05H274.127V162.041H433.468V213.05H470.416V21.8004H433.157Z"
    fill="{color}"
  ></path>
  <path
    in:fade="{{duration: 600, delay:400 }}" 
    out:fade="{{duration:600, delay:400 }}"
    d="M706.679 55.8116V21.8004H486.167V213.05H706.679V178.432L522.51 179.055V125.621H643.675V95.8711H522.821V55.8116H706.679Z"
    fill="{color}"
  ></path>
  <path
    in:fade="{{duration: 600, delay:200 }}" 
    out:fade="{{duration:600, delay:200 }}"
    d="M893.89 143.83C906.333 140.563 917.515 133.639 925.997 123.948C934.72 114.114 939.082 100.81 939.082 84.0362C939.082 67.4486 934.175 54.4943 924.361 45.1733C914.548 35.8523 902.068 29.5801 886.922 26.3565C869.568 22.8914 851.901 21.2435 834.207 21.4392H721.824V213.082H758.184V148.993H825.98L890.259 213.082H938.411L871.498 148.01C879.06 147.207 886.547 145.809 893.89 143.83V143.83ZM758.478 53.0737L837.249 52.7623C849.416 52.5539 861.577 53.4205 873.592 55.3521C882.882 57.0677 890.052 60.406 895.1 65.3669C900.149 70.3279 902.673 77.1575 902.673 85.8556C902.673 93.7342 900.198 100.006 895.247 104.672C890.297 109.338 883.209 112.578 873.985 114.392C861.928 116.445 849.705 117.362 837.478 117.13H758.478V53.0737Z"
    fill="{color}"
  ></path>
  <path
    in:fade="{{duration: 600, delay:800 }}" 
    out:fade="{{duration:600, delay:800 }}"
    d="M1172.87 55.3186V21.3074H952.346V212.557H1172.87V177.939L988.705 178.562V125.128H1109.85V95.3781H989V55.3186H1172.87Z"
    fill="{color}"
  ></path>
  <path
    in:fade="{{duration: 600, delay:600 }}" 
    out:fade="{{duration:600, delay:600 }}"
    d="M1402.51 21.3076L1312.85 95.4929L1222.58 21.3076H1187.45V212.541H1224.1V66.5629L1302.56 133.913H1323.15L1402.81 66.4974V212.541H1438.86V21.3076H1402.51Z"
    fill="{color}"
    fill-opacity="0.15"
    stroke="{color}"
    stroke-width="5"
    stroke-miterlimit="10"
  ></path>
  <path
    in:fade="{{duration: 600, delay:400 }}" 
    out:fade="{{duration:600, delay:400 }}"
    d="M1491.56 21.3076H1454.61V212.541H1491.56V21.3076Z"
    fill="{color}"
    fill-opacity="0.15"
    stroke="{color}"
    stroke-width="5"
    stroke-miterlimit="10"
  ></path>
  <path
    in:fade="{{duration: 600, delay:0 }}" 
    out:fade="{{duration:600, delay:0 }}"
    d="M1657.99 116.916L1657.6 116.555L1664.95 109.638C1680.49 94.8755 1696.1 80.151 1711.76 65.4648L1758.86 21.3076H1706.15C1689.59 37.2942 1672.88 53.2262 1656.02 69.1035C1647.97 76.6925 1639.97 84.3307 1631.94 91.9361C1624.01 84.3307 1616.11 76.6925 1608.16 69.1035L1558.03 21.3076H1506.83C1523.8 37.2942 1540.66 53.2262 1557.42 69.1035C1573.78 84.664 1590.18 100.268 1606.64 115.916L1605.59 116.916C1589.02 132.913 1572.35 148.851 1555.61 164.728C1538.86 180.606 1521.99 196.543 1505.02 212.541H1555.61C1573.78 195.341 1592.01 178.191 1610.28 161.089C1617.69 154.156 1625 147.174 1632.45 140.224L1658.44 164.81C1675.29 180.709 1692 196.647 1708.57 212.623H1757.95C1741.39 196.647 1724.79 180.709 1708.13 164.81C1691.46 148.911 1674.75 132.946 1657.99 116.916Z"
    fill="{color}"
    fill-opacity="0.15"
    stroke="{color}"
    stroke-width="5"
    stroke-miterlimit="10"
  ></path>
  <path 
    in:fade="{{duration: 600, delay:800 }}" 
    out:fade="{{duration:600, delay:800 }}"
        d="M1173.09 0H951.463V9.83456H1173.09V0Z" fill="{color}"></path>
  {/if}
</svg>

<style>
  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  path {
    transition: 0.5s linear;
  }
  svg path:nth-child(1) {
    transition-delay: 0s;
  }
  svg path:nth-child(2) {
    transition-delay: 0.6s;
  }
  svg path:nth-child(3) {
    transition-delay: 0.4s;
  }
  svg path:nth-child(4) {
    transition-delay: 0.2s;
  }
  svg path:nth-child(5) {
    transition-delay: 0.8s;
  }
  svg path:nth-child(6) {
    transition-delay: 0.6s;
  }
  svg path:nth-child(7) {
    transition-delay: 0.4s;
  }
  svg path:nth-child(8) {
    transition-delay: 0s;
  }
  svg path:nth-child(9) {
    transition-delay: 0.8s;
  }
  svg.hide path {
    opacity: 0;
  }
</style>
