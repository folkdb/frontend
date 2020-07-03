<script>
  import { onMount } from 'svelte';
  
  let song = {};

  const loadData = async () => {
    const res = await fetch('/.netlify/functions/fetch-data');
    return res.json();
  };
  
  onMount(async () => {
    song = await loadData();
  });
  
</script>

<template lang="pug">
  +if('song.data')
    .typeset
      h1 {song.data.canonicalName}

      section
        h2 Transcriptions
    
      section
        h2 Recordings
    
      section
        h2 Arrangements
    
    +elseif('song.error')
      code.error {song.error}

</template>

<style lang='postcss'>
  .error
    @apply text-medium-red

</style>
    