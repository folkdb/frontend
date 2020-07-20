<script>
  import { beforeUpdate } from 'svelte';
  import { get } from 'svelte/store';
  import { vextabReady } from '../../store.js';
  import { fetchSong } from '../../helpers.js';
  import renderSvg from './render-svg.js';
  import Details from './Details.svelte';
  
  export let slug;
  export let index;
  
  let data;
  let error;
  
  $: (async () => {
    ({ data, error } = await fetchSong(slug));
  })();
  
  $: arrangement = (
    data
      ? (data.arrangements || [])[parseInt(index, 10)]
      : false
  );
  
  $: content = arrangement ? arrangement.content : false;
  
  $: if (content) {
    if (get(vextabReady)) {
      renderSvg(content);
    } else {
      vextabReady.subscribe((isReady) => {
        if (isReady) { renderSvg(content); }
      });
    }
  }
  
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
