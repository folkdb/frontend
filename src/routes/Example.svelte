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
  
  const formatTranscription = (t) => {
    let str = '';
    
    if (t.publication) {
      const pub = t.publication;
      str += t.pageNumber ? `p. ${pageNumber} in ` : '';
      str += pub.primaryAuthor ? `${pub.primaryAuthor}, ` : '';
      str += pub.url ? `<a href="${pub.url}">` : '';
      str += pub.title ? pub.title : '[source]';
      str += pub.url ? '</a>' : '';
      str += pub.year ? ` (${pub.year})` : '';
    }
    
    str += t.title ? ` as "${t.title}"` : '';
    str += t.url ? ` <a href="${t.url}">[image]</a>` : '';
    
    return str;
  };
  
  const formatRecording = (rec) => {
    const rel = rec.release || {};
    return `${rec.artists} (${rel.year})`;
  };
  
</script>

<template lang="pug">
  +if('song')
    .typeset
      h1= '{song.canonicalName}'

      +if('song.transcriptions')
        section
          h2= 'Transcriptions'
        
          ul
            +each('song.transcriptions as t')
              li= '{@html formatTranscription(t)}'
          
      +if('song.recordings')
        section
          h2= 'Recordings'
        
          ul
            +each('song.recordings as r')
              li= '{formatRecording(r)}'
    
      +if('song.arrangements')
        section
          h2= 'Arrangements'
    
    +elseif('errMsg')
      code.error= '{errMsg}'

</template>

<style lang='postcss'>
  .error
    @apply text-medium-red

</style>
    