<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { pointerEvents, toPercent } from '../helpers';
  export let position;
  let thumb;
  let bbox;
  let events = pointerEvents();
  const dispatch = createEventDispatcher();
  function getX(event) {
    if (event.touches) {
      return event.touches[0].clientX;
    }
    return event.clientX;
  }
  function handleStart(event) {
    event.preventDefault();
    const x = getX(event);
    const bbox = event.target.getBoundingClientRect();
    dispatch('dragstart', { x, bbox });
    window.addEventListener(events.move, handleMove);
    window.addEventListener(events.end, handleEnd);
  }
  function handleMove(event) {
    event.preventDefault();
    const x = getX(event);
    const bbox = event.target.getBoundingClientRect();
    dispatch('dragging', { x, bbox });
  }
  function handleEnd(event) {
    event.preventDefault();
    dispatch('dragend');
    window.removeEventListener(events.move, handleMove);
    window.removeEventListener(events.end, handleEnd);
  }
  onMount(() => {
    thumb.addEventListener(events.start, handleStart);
  });
</script>

<div
  bind:this={thumb}
  class="thumb"
  style="left: {toPercent(position)}%;"
  on:start={handleStart}
  on:move={handleMove}
  on:end={handleEnd}
>
</div>

<style>
  .thumb {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 50%;
    border-radius: 50%;
    background: var(--sliderPrimary);
    touch-action: none;
    transform: translate(-50%, -50%);
    transition: .2s height, .2s width;
  }
  .thumb:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 32px;
    height: 32px;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .thumb:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    opacity: 0.3;
    background: var(--sliderSecondary);
    transform: translate(-50%, -50%) scale(0);
    transition: .2s all;
  }
</style>