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
  +if('song.error')
    .error {song.error}

  +elseif('song.data')
    h1 {song.data.canonicalName}

    h2 Transcriptions
    
    h2 Recordings
    
    h2 Arrangements

</template>
