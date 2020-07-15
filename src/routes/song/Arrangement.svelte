<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { loadedSongs } from '../session-history.js';
  import { fetchSong } from './helpers.js';
  
  export let slug;
  export let index = '0';
  export let width = 832;
  export let offset = [0, 0];
  export let options = {};
  
  let data;
  let error;
  
  onMount(async () => {
    data = get(loadedSongs).get(slug);
    
    if (!data) {
      ({ data, error } = await fetchSong(slug));
    
      if (data) {
        loadedSongs.update((mp) => mp.set(slug, data));
      }
    }
    
    let content;
    
    if (data) {
      content = (data.arrangements || [])[parseInt(index)];
    }
    
    if (content && window.vextab) {
      const { VexTab, Artist, Vex } = window.vextab;
      const Renderer = Vex.Flow.Renderer;
      
      const renderer = new Renderer('target', Renderer.Backends.SVG);
      const artist = new Artist(offset[0], offset[1], width, options);
      const tab = new VexTab(artist);
      
      tab.parse(content);
      artist.render(renderer);
    } else {
      error = (
        content 
          ? `No arrangement for "${slug}" found at index ${index}`
          : 'VexTab parser script did not load. Try reloading page.'
      );
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
