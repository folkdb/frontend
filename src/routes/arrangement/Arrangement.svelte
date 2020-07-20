<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { get } from 'svelte/store';
  import { vextabReady } from '../../store.js';
  import { fetchSong } from '../../helpers.js';
  import Details from './Details.svelte';
  
  export let slug;
  export let index;
  
  let data;
  let arrangement;
  let content;
  let error;
  let loadError;
  let parseError;
  
  $: (async () => {
    ({ data, error } = await fetchSong(slug));
  })();
  
  $: arrangement = (
    data
      ? (data.arrangements || [])[parseInt(index, 10)]
      : false
  );
  
  $: content = (
    arrangement
      ? arrangement.content
      : false
  );
  
  $: loadError = (
    data && !arrangement
      ? `You may have arrived here via a broken link or bad URL. There is no arrangement for "${slug}" at index ${index}.`
      : error
  );
  
  $: parseError = (
    arrangement && !content
      ? 'Oops, something is missing! This arrangement has no notation to parse.'
      : false
  );
  
  beforeUpdate(() => {
    window.scrollTo({ top: 0 });
  });
  
  const renderSvg = (content, {
    offset = [0, 0],
    width = 832,
    ...options
  } = {}) => {
    if (window.vextab) {
      const { VexTab, Artist, Vex } = window.vextab;
      const { Renderer } = Vex.Flow;
  
      const renderer = new Renderer('target', Renderer.Backends.SVG);
      const artist = new Artist(offset[0], offset[1], width, options);
      const tab = new VexTab(artist);
      
      try {
        tab.parse(content);
        artist.render(renderer);
      } catch (err) {
        parseError = err.message || err;
      }
    } else {
      window.setTimeout(
        () => renderSvg(content, { offset, width, ...options }),
        250,
      );
    }
  };
  
  afterUpdate(() => {
    if (content) {
      if (get(vextabReady)) {
        renderSvg(content);
      } else {
        vextabReady.subscribe((isReady) => {
          if (isReady) { renderSvg(content); }
        });
      }
    }
  });
  
</script>


<template lang="pug">
  +if('data')
    h1= '{data.canonicalName}'
    
    section
      +if('arrangement')
        Details('{arrangement}')

  +if('loadError')
    p: code.error= 'ERROR: {loadError}'

  +if('parseError')
    p: code.error= 'ERROR: {parseError}'
    
  section
    #target

</template>


<style lang="postcss">
  .error
    @apply text-medium-red

</style>
