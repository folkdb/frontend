<script>
  import { onMount } from 'svelte';
  
  let song = false;
  let errMsg = false;
  
  onMount(async () => {
    const res = await fetch('/.netlify/functions/fetch-data');
    const json = await res.json();
    
    if (json.data) {
      song = json.data;
    }
    
    if (json.error) {
      errMsg = json.error;
    }
  });
  
</script>

<template lang="pug">
  +if('song')
    .typeset
      h1 {song.canonicalName}

      section
        h2 Transcriptions
    
      section
        h2 Recordings
    
      section
        h2 Arrangements
    
    +elseif('errMsg')
      code.error {errMsg}

</template>

<style lang='postcss'>
  .error
    @apply text-medium-red

</style>
    