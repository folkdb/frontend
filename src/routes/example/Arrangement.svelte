<script>
  import { onMount } from 'svelte';
  
  export let content;
  
  onMount(async () => {
    const { VexTab, Artist, Vex } = (await import('vextab.js')).default;
    const Renderer = Vex.Flow.Renderer;

    const renderer = new Renderer('target', Renderer.Backends.SVG);
    const artist = new Artist(offset[0], offset[1], width, options);
    const tab = new VexTab(artist);

    tab.parse(content);
    artist.render(renderer);
  })
  
</script>

<template lang="pug">
  #target

</template>
