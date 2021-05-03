<script>
  import {haptic} from '../../../helpers.js'
  export let icon; //SVG icon
  export let setting; //Pass in a store from prop
  export let hide = false;
  export let styles = "";
  export let classes = "";
  export let name = "";

  const handleClick = () => {
    setting.set(!$setting);
    haptic()
  };
</script>

<label
  name="{name}"
  class="{$setting ? 'toggled' : ''} 
    {hide ? 'hide' : ''} 
    {styles}"
>
  <input
    aria-label="{name}"
    type="checkbox"
    checked="{$setting ? true : false}"
    on:change="{handleClick}"
  />
  <container class="{$setting ? '' : classes}">
    <div class="track">
      <p>On</p>
      <div class="toggleButton">
        {#if icon}
          <div class="icon">
            <svelte:component
              this="{icon}"
              color="var(--svgColor)"
            />
          </div>
        {/if}
      </div>
      <p>Off</p>
    </div>
  </container>
</label>

<style>
  input {
    opacity: 0;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    position: absolute;
  }

  label.hide {
    opacity: 0;
    pointer-events: none;
  }
  .hide container {
    pointer-events: none;
  }
  container {
    --svgColor:var(--offwhite);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
    width: 90px;
    border-radius: 32px;
    overflow: hidden;
    background: rgba(var(--offwhite), 0.05);
    transition: background-color 0.25s, opacity 0.25s;
    pointer-events: all;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .toggled container {
    --svgColor: var(--crimson);
    background: #e54646;
  }
  .track {
    pointer-events: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: translate(-26px, 0px);
    transition: transform 0.25s;
  }
  .toggled container .track {
    transform: translate(15px, 0px);
  }
  .toggleButton {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .toggled .toggleButton {
    background: rgb(var(--offwhite));
  }
  p {
    display: inline-block;
    color: #fff8e4;
    font-size: 10px;
  }
  p:first-child {
    margin-right: 12px;
  }
  p:last-child {
    margin-left: 7px;
    opacity: 1;
  }
  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
  @media (hover: hover) {
    label:hover{
    cursor: url(https://theremin.app/assets/global/cursor4.svg) 21 20, pointer;
    }
    container:hover{
    --svgColor: var(--charcoal);
    }
    .toggled container:hover{
        --svgColor: var(--crimson)
    }
    container:hover .toggleButton{
        background: rgb(var(--offwhite));  
    }
  }

</style>
