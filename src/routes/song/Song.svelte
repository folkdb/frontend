<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { loadedSongs } from '../session-history.js';
  import { fetchSong } from './helpers.js';
  import Transcription from './Transcription.svelte';
  import Recording from './Recording.svelte';
  import Arrangement from './Arrangement.svelte';
  
  export let slug;
  
  let data;
  let error;

  onMount(async () => {
    data = get(loadedSongs).get(slug);
  
    if (!data) {
      ({ data, error } = await fetchSong(slug));
    
      if (data) {
        loadedSongs.update((mp) => {
          mp.set(slug, data);
        });
      }
    }
  });
  
</script>

<template lang="pug">
  +if('data')
    .typeset
      .heading
        h1= '{data.canonicalName}'
        p= '{data.description}'
      
      +if('data.transcriptions')
        section
          h3= 'Transcriptions'
        
          ul
            +each('data.transcriptions as entry')
              li
                Transcription('{entry}')
      
      +if('data.recordings')
        section
          h3= 'Recordings'
        
          ul
            +each('data.recordings as entry')
              li
                Recording('{entry}')

      +if('data.arrangements')
        section
          h3= 'Arrangements'
          
          a(href='/arrangement/{slug}/0')= '[view]'
    
    +elseif('error')
      code.error= '{error}'

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
    
