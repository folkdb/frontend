<script>
  import { onMount } from 'svelte';
  
  export let content;
  export let width = 832;
  export let offset = [0, 0];
  export let options = {};
  
  let src = false;
  
  onMount(() => {
    src = '/vextab.js';
  });
  
  const renderSvg = () => {
    const { VexTab, Artist, Vex } = window.vextab;
    const Renderer = Vex.Flow.Renderer;

    const renderer = new Renderer('target', Renderer.Backends.SVG);
    const artist = new Artist(offset[0], offset[1], width, options);
    const tab = new VexTab(artist);

    tab.parse(content);
    artist.render(renderer);
  };
  
</script>

<template lang="pug">
  #target
  
  +if('src')
    script(src='{src}' on:load='{renderSvg}')

</template>

<style lang="postcss">
  #target
    @apply max-w-full

</style>
