<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { vextabReady } from '../../store.js';
  import { fetchSong, formatNullable } from './helpers.js';
  
  export let slug;
  export let index = '0';
  export let width = 832;
  export let offset = [0, 0];
  export let options = {};
  
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
    .typeset
      .heading
        h1= '{data.canonicalName}'
        
      +if('arrangement')
        span= '{@html formatEntry(arrangement)}'

    +elseif('loadError')
      code.error= 'ERROR: {loadError}'

  #target
    +if('parseError')
      code.error= 'ERROR: {parseError}'

</template>

<style lang="postcss" global>
  #target > svg
    @apply max-w-full
    height: auto !important
  
  /* #target > svg rect[fill="white"]
    fill: #f7f7f7 */

</style>
