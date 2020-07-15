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
  
  let error;
  let content;
  let src;
  
  onMount(async () => {
    let data = get(loadedSongs).get(slug);
    
    if (!data) {
      ({ data, error } = await fetchSong(slug));
    
      if (data) {
        loadedSongs.update((mp) => mp.set(slug, data));
      }
    }
    
    if (data) {
      content = (data.arrangements || [])[parseInt(index)];
        
      if (content) {
        src = '/vextab.js';
      } else {
        error = 'Not found';
      }
    }
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
    +if('error')
      code.error= '{error}'
  
  +if('src')
    script(src='{src}' on:load='{renderSvg}')= 'void 0'

</template>

<style lang="postcss" global>
  #target > svg
    @apply max-w-full
    height: auto !important
  
  /* #target > svg rect[fill="white"]
    fill: #f7f7f7 */

</style>
