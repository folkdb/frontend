<script>
  import { onMount } from 'svelte';
  import Arrangement from './Arrangement.svelte';
  import Recording from './Recording.svelte';
  
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
  
  
  
  
  
  const formatTranscription = (t) => {
    const pub = t.publication || {};
    
    return [
      formatNullable('<strong>', pub.primaryAuthor, '</strong>, '),
      formatNullable('<em>', pub.title, '</em>'),
      formatPair(' (', pub.place, ', ', pub.year, ')'),
      formatNullable(', p. ', t.pageNumber),
      formatNullable(' as "', t.title, '"'),
      formatLink(' ', '[image]', t.url),
      formatLink(' ', '[source]', pub.url),
    ].join('');
  };
  
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
            +each('song.transcriptions as t')
              li= '{@html formatTranscription(t)}'
      
      +if('song.recordings')
        section
          h3= 'Recordings'
        
          ul
            +each('song.recordings as entry')
              li
                Recording({entry})

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
    
