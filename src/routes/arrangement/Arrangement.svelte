<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { vextabReady } from '../../store.js';
  import { scrollPageTop, fetchSong, formatNullable } from '../helpers.js';
  
  export let slug;
  export let index;
  export let width = 832;
  export let offset = [0, 0];
  export let options = {};
  
  index = index || '0';
  
  let data;
  let arrangement;
  let loadError;
  let parseError;
  
  const formatEntry = (entry) => [
    '<ul>',
    formatNullable(
      '<li><strong>Instruments:</strong> ',
      entry.instruments,
      '</li>',
    ),
    entry.tonic || entry.mode ? '<li>' : '',
    formatNullable('<strong>Key:</strong> ', entry.tonic, ' '),
    formatNullable('', entry.mode),
    entry.tonic || entry.mode ? '</li>' : '',
    '</ul>',
  ].join('');
  
  const renderSvg = (content) => {
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
      window.setTimeout(renderSvg, 250);
    }
  };
  
  onMount(async () => {
    scrollPageTop();

    let error;

    ({ data, error } = await fetchSong(slug));
  
    arrangement = (
      data
        ? (data.arrangements || [])[parseInt(index, 10)]
        : false
    );
  
    const content = arrangement ? arrangement.content : false;
  
    if (content) {
      if (get(vextabReady)) {
        renderSvg(content);
      } else {
        vextabReady.subscribe((isReady) => {
          if (isReady) { renderSvg(content); }
        });
      }
    }
  
    loadError = (
      data && !arrangement
        ? `You may have arrived here via a broken link or bad URL. There is no arrangement for "${slug}" at index ${index}.`
        : error
    );
  
    parseError = (
      arrangement && !content
        ? 'Oops, something is missing! This arrangement has no notation to parse.'
        : false
    );
  });
  
</script>


<template lang="pug">
  +if('data')
    h1= '{data.canonicalName}'
        
    +if('arrangement')
      section= '{@html formatEntry(arrangement)}'

  +if('loadError')
    p: code.error= 'ERROR: {loadError}'

  +if('parseError')
    p: code.error= 'ERROR: {parseError}'
    
  #target

</template>


<style lang="postcss">
  .error
    @apply text-medium-red

</style>
