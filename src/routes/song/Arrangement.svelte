<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { loadedSongs, vextabReady } from '../../store.js';
  import { fetchSong } from './helpers.js';
  
  export let slug;
  export let index = '0';
  export let width = 832;
  export let offset = [0, 0];
  export let options = {};
  
  let data;
  let error;
  let content;
  
  const renderSvg = (isReady) => {
    if (isReady) {
      const { VexTab, Artist, Vex } = window.vextab;
      const Renderer = Vex.Flow.Renderer;

      const renderer = new Renderer('target', Renderer.Backends.SVG);
      const artist = new Artist(offset[0], offset[1], width, options);
      const tab = new VexTab(artist);

      tab.parse(content);
      artist.render(renderer);
    }
  };
  
  onMount(async () => {
    data = get(loadedSongs).get(slug);
    
    if (!data) {
      ({ data, error } = await fetchSong(slug));
    
      if (data) {
        loadedSongs.update((mp) => mp.set(slug, data));
      }
    }
    
    if (data) {
      const arrangement = (data.arrangements || [])[parseInt(index)];
      ({ content } = arrangement || {});
      
      if (content) {
        renderSvg(get(vextabReady));
        vextabReady.subscribe(renderSvg);
      } else {
        error = `No arrangement for "${slug}" found at index ${index}`;
      }
    } else {
      error = 'Something went wrong when attempting to load the requested data. Try reloading this page.'; 
    }
  });
  
</script>

<template lang="pug">
  #target
    +if('error')
      code.error= '{error}'

</template>

<style lang="postcss" global>
  #target > svg
    @apply max-w-full
    height: auto !important
  
  /* #target > svg rect[fill="white"]
    fill: #f7f7f7 */

</style>
