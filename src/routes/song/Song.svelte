<script>
  import { onMount } from 'svelte';
  import Transcription from './Transcription.svelte';
  import Recording from './Recording.svelte';
  import Arrangement from './Arrangement.svelte';
  
  export let slug;
  
  let song = false;
  let errMsg = false;
  
  onMount(async () => {
    if (!slug) {
      errMsg = 'Error: Song identifier missing from URL.'
    }
    
    const res = await fetch(`/.netlify/functions/fetch-data?category=songs&slug=${slug}`);
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
      .heading
        h1= '{song.canonicalName}'
        p= '{song.description}'
      
      +if('song.transcriptions')
        section
          h3= 'Transcriptions'
        
          ul
            +each('song.transcriptions as entry')
              li
                Transcription('{entry}')
      
      +if('song.recordings')
        section
          h3= 'Recordings'
        
          ul
            +each('song.recordings as entry')
              li
                Recording('{entry}')

      +if('song.arrangements')
        section
          h3= 'Arrangements'
          
          Arrangement(content='{song.arrangements[0].content}')
    
    +elseif('errMsg')
      code.error= '{errMsg}'

</template>

<style lang='postcss'>
  .heading
    @apply pb-2b

  .heading h1
    @apply mb-1b

  .heading p
    @apply m-0
    @apply font-medium
 
  .error
    @apply text-medium-red

  @screen c17
    .heading
      @apply pb-3b

</style>
    
