<script>
 export let color = "var(--offwhite)";
  export let hoverColor = "var(--charcoal)";
  export let selected = false;
</script>

<!-- <svg class={selected ? 'selected' : ''} width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="25" y="19" width="8" height="7">
    <circle cx="29.034" cy="22.5545" r="3.25277" fill="#DF4242"/>
    </mask>
    <g id="wheelL" mask="url(#mask0)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.4502 19.1602H28.7431V21.1401H29.4502V19.1602ZM25.7793 21.6958L26.0211 21.0313L27.8817 21.7085L27.6398 22.3729L25.7793 21.6958ZM32.3803 21.7434L32.1385 21.0789L30.278 21.7561L30.5198 22.4205L32.3803 21.7434ZM27.1469 25.348L26.6052 24.8934L27.8779 23.3767L28.4196 23.8312L27.1469 25.348ZM31.498 24.9261L30.9563 25.3807L29.6836 23.8639L30.2253 23.4094L31.498 24.9261Z" fill="{color}"  style="--color:{color};--hoverColor:{hoverColor}"/>
    </g>
    <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="14" y="19" width="7" height="7">
    <circle cx="17.3231" cy="22.5545" r="3.25277" fill="#DF4242"/>
    </mask>
    <g id="wheelR" mask="url(#mask1)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7412 19.1602H17.0341V21.1401H17.7412V19.1602ZM14.0703 21.6958L14.3122 21.0313L16.1727 21.7085L15.9309 22.3729L14.0703 21.6958ZM20.6714 21.7434L20.4295 21.0789L18.569 21.7561L18.8108 22.4205L20.6714 21.7434ZM15.4379 25.348L14.8963 24.8934L16.1689 23.3767L16.7106 23.8312L15.4379 25.348ZM19.789 24.9261L19.2473 25.3807L17.9746 23.8639L18.5163 23.4094L19.789 24.9261Z" fill="{color}"  style="--color:{color};--hoverColor:{hoverColor}"/>
    </g>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6796 15C11.752 15 11 15.752 11 16.6796V28.4066C11 29.3342 11.752 30.0862 12.6796 30.0862H33.3212C34.2487 30.0862 35.0007 29.3342 35.0007 28.4066V16.6796C35.0007 15.752 34.2487 15 33.3212 15H12.6796ZM19.4331 25.6462H26.9266C25.941 24.9725 25.294 23.8396 25.294 22.5556C25.294 20.4897 26.9688 18.8149 29.0347 18.8149C31.1006 18.8149 32.7754 20.4897 32.7754 22.5556C32.7754 24.6216 31.1006 26.2963 29.0347 26.2963L29.0347 26.2967H17.1621V26.2928C15.1718 26.2075 13.5843 24.567 13.5843 22.5556C13.5843 20.4897 15.2591 18.8149 17.325 18.8149C19.391 18.8149 21.0657 20.4897 21.0657 22.5556C21.0657 23.8396 20.4188 24.9725 19.4331 25.6462Z" fill="{color}"  style="--color:{color};--hoverColor:{hoverColor}"/>
    </svg> -->

    <svg class={selected ? 'selected' : ''} width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="26" y="19" width="9" height="9">
      <circle cx="30.2962" cy="23.4984" r="4.05405" fill="#DF4242"/>
      </mask>
      <g mask="url(#mask0)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M30.818 19.2686H29.9367V21.7362H30.818V19.2686ZM26.2422 22.4281L26.5436 21.5999L28.8625 22.4439L28.5611 23.2721L26.2422 22.4281ZM34.4696 22.4896L34.1681 21.6615L31.8493 22.5055L32.1507 23.3336L34.4696 22.4896ZM27.946 26.9813L27.2709 26.4148L28.8571 24.5244L29.5322 25.0909L27.946 26.9813ZM33.3715 26.455L32.6963 27.0215L31.1102 25.1312L31.7853 24.5647L33.3715 26.455Z" fill="{color}"  style="--color:{color};--hoverColor:{hoverColor}"/>
      </g>
      <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="11" y="19" width="9" height="9">
      <circle cx="15.6986" cy="23.4984" r="4.05405" fill="#DF4242"/>
      </mask>
      <g mask="url(#mask1)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2204 19.2695H15.339V21.7372H16.2204V19.2695ZM11.6445 22.4291L11.946 21.6009L14.2648 22.4449L13.9634 23.2731L11.6445 22.4291ZM19.8719 22.4896L19.5705 21.6615L17.2516 22.5055L17.553 23.3336L19.8719 22.4896ZM13.3483 26.9823L12.6732 26.4158L14.2594 24.5254L14.9345 25.0919L13.3483 26.9823ZM18.7738 26.456L18.0987 27.0225L16.5125 25.1321L17.1876 24.5656L18.7738 26.456Z" fill="{color}"  style="--color:{color};--hoverColor:{hoverColor}"/>
      </g>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3707 13.7695C9.06142 13.7695 8 14.8309 8 16.1403V30.8582C8 32.1676 9.06142 33.229 10.3707 33.229H35.6293C36.9386 33.229 38 32.1676 38 30.8583V16.1403C38 14.8309 36.9386 13.7695 35.6293 13.7695H10.3707ZM30.2954 28.1626L30.2481 28.1623H15.7508C15.735 28.1625 15.7193 28.1626 15.7034 28.1626C15.6876 28.1626 15.6719 28.1625 15.6561 28.1623H15.4995V28.1582C13.0193 28.0514 11.0413 26.0069 11.0413 23.5004C11.0413 20.9256 13.1286 18.8382 15.7034 18.8382C18.2783 18.8382 20.3656 20.9256 20.3656 23.5004C20.3656 25.1002 19.5598 26.5118 18.3319 27.3515H27.667C26.4391 26.5118 25.6333 25.1002 25.6333 23.5004C25.6333 20.9256 27.7206 18.8382 30.2954 18.8382C32.8703 18.8382 34.9576 20.9256 34.9576 23.5004C34.9576 26.0752 32.8703 28.1626 30.2954 28.1626Z" fill="{color}"  style="--color:{color};--hoverColor:{hoverColor}"/>
      </svg>
      


      
<style>
  svg {
    height: auto;
    width: 100%;
  }
  path {
    --color: var(--offwhite);
    --hoverColor: var(--charcoal);
    fill: rgb(var(--color));
  }

  svg:hover path {
    fill: rgb(var(--hoverColor));
  }

  g{
    transform-origin:center;
    transform-box: fill-box;
  }
  svg.selected g{
    animation: rotate 2s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
