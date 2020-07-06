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
  
  const formatNullable = (before, val, after = '') => (
    val ? `${before}${val}${after}` : ''
  );
  
  const formatPair = (before, a, b, after = '') => (
    a || b 
      ? `${before}${[a, b].join(', ')}${after}` 
      : ''
  );
  
  const formatList = (before, arr = [], after = '') => (
    arr.length > 1
      ? `${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}`
      : arr[0] || ''
  );
  
  const formatLink = (before, text, url, after = '') => (
    url
      ? `${before}<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>${after}`
      : ''
  );
  
  const formatTranscription = (t) => {
    let str = '';
    let pub = false;
    
    if (t.publication) {
      pub = t.publication;
      str += formatNullable('', pub.primaryAuthor, ', ');
      str += formatNullable('', pub.title);
      str += formatPair(' (', pub.place, pub.year, ')');
    }
    
    str += formatNullable(', p. ', t.pageNumber);
    str += formatNullable(' as "', t.title, '"');
    str += formatLink(' ', '[image]', t.url);
    str += pub ? formatLink(' ', '[source]', pub.url) : '';
    
    return str;
  };
  
  const formatRecording = (r) => {
    let str = '';
    let rel = false;
    let comp = false;
    
    str += formatList('', r.artists);
    str += formatPair(' recorded ', r.date, r.place);
    
    if (r.release) {
      rel = r.release;
      str += r.date || r.place ? ', released' : '';
      str += formatNullable(' on ', rel.title);
      str += formatPair(' (', rel.label, rel.year, ')');
    }
    
    if (r.compilation) {
      comp = r.compilation;
      str += rel ? ',' : '';
      str += formatNullable(' reissued on ', comp.title);
      str += formatPair(' (', comp.label, comp.year, ')');
    }
    
    return str;
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
              li= '{@html formatRecording(r)}'
    
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
    
