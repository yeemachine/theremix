<script>
export let loaded = false
export let hide = false
</script>

<svg 
class="{loaded ? 'loaded' : ''} {hide ? 'hide' : ''}"
width="400" height="406" viewBox="0 0 400 406" fill="none" xmlns="http://www.w3.org/2000/svg">

<path d="M359.2,78.6l39.3,172.2l-110,138.1H112L2,250.8L41.3,78.6L200.2,2L359.2,78.6z" stroke="#E54646" stroke-width="2" stroke-miterlimit="10"/>
<path d="M398.5,157.4l-41.1,171.7L197.6,404L39.4,325.7L2,153.1L113.5,16.2l176.4,1.9L398.5,157.4z" fill="#E54646" fill-opacity="0" stroke="#E54646" stroke-width="2" stroke-miterlimit="10"/>

<path class="triangle" d="M278.26 199.979L148.142 139.844C147.592 139.585 146.985 139.47 146.378 139.509C145.771 139.549 145.184 139.741 144.672 140.069C144.159 140.396 143.738 140.848 143.447 141.383C143.156 141.917 143.005 142.517 143.008 143.125V263.451C143.005 264.06 143.156 264.659 143.447 265.194C143.738 265.728 144.159 266.18 144.672 266.508C145.184 266.835 145.771 267.028 146.378 267.067C146.985 267.106 147.592 266.991 148.142 266.733L278.26 206.561C278.894 206.276 279.433 205.814 279.81 205.23C280.188 204.647 280.389 203.966 280.389 203.27C280.389 202.575 280.188 201.894 279.81 201.31C279.433 200.726 278.894 200.264 278.26 199.979Z" fill="#E54646"/>

</svg>

<style>
svg{
    height:100%;
    width:100%;
    transition: .5s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
svg:hover{
        cursor: url(https://cdn.glitch.com/bbfb2dd7-a8b0-4835-bdc2-c2fdffc99849%2Fcursor4.svg?v=1587485456475) 21 20, pointer;
}
svg.hide{
    opacity:0;
    transform: scale(1.5);
}
svg path:nth-child(1),svg path:nth-child(2),svg path:nth-child(3){
    transform-origin: center;
}

svg path:nth-child(1),svg path:nth-child(2){
    fill-opacity: 0;
    stroke-dasharray: 1300;
    stroke-dashoffset: 1300;
    stroke-width: 4;
    stroke-linecap: round;
}

svg.hide path:nth-child(1),svg.hide path:nth-child(2){
    animation-play-state: paused;
}

.triangle{
    opacity: 0;
    transition: 
        opacity .25s cubic-bezier(0.46, 0.03, 0.52, 0.96) 1s,
        transform .25s cubic-bezier(0.46, 0.03, 0.52, 0.96),
        fill .4s cubic-bezier(0.46, 0.03, 0.52, 0.96)
        ;
    z-index: 2
}
.loaded .triangle{
    opacity: 1;
}
svg.loaded:hover .triangle{
    transform:scale(1.3);
    fill: var(--offwhite);
}
svg.loaded path:nth-child(1){
    animation: 
        rotate 10s linear infinite,
        drawforward 2s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    animation-fill-mode: forwards;
    animation-play-state: start;
    /* transition:stroke-dashoffset 2s cubic-bezier(0.46, 0.03, 0.52, 0.96); */
    
}
svg.loaded path:nth-child(2){
    animation: 
        rotate 20s linear infinite,
        drawforward 2s cubic-bezier(0.46, 0.03, 0.52, 0.96);
    animation-fill-mode: forwards;
    animation-play-state: start;
    transition: 
        fill-opacity .25s cubic-bezier(0.46, 0.03, 0.52, 0.96)
}
svg:hover path:nth-child(2){
    fill-opacity: .5
}

@keyframes rotate {
	0%   { transform:rotate(-180deg) }
	100% { transform:rotate(179deg) }
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
