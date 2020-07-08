<script>
  import { onMount } from 'svelte';
  import Arrangement from './Arrangement.svelte';
  
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
  
  const formatPair = (before, a, sep, b, after = '') => (
    a || b 
      ? `${before}${[].concat(a || [], b || []).join(sep)}${after}` 
      : ''
  );
  
  const formatList = (before, arr = [], after = '') => (
    arr.length > 1
      ? `${before}${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}${after}`
      : `${before}${arr[0]}${after}` || ''
  );
  
  const formatLink = (before, text, url, after = '') => (
    url
      ? `${before}<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>${after}`
      : ''
  );
  
  const formatRecording = (r) => {
    const rel = r.release || {};
    const comp = r.compilation || {};
    const strm = r.streaming || {};
    const hasRelInfo = rel.title || rel.isSingle || rel.label || rel.year || rel.discogsId;
    const hasCompInfo = comp.title || comp.label || comp.year || comp.discogsId;
    
    return [
      formatList('<strong>', r.artists, '</strong>'),
      r.date || r.place ? ' recorded ' : '',
      formatNullable('', r.date),
      r.date && r.place ? ' ' : '',
      formatNullable('in ', r.place),
      r.dahrId 
        ? formatLink(' ', '[DAHR]', `https://adp.library.ucsb.edu/index.php/matrix/detail/${r.dahrId}`)
        : '',
      formatLink(' ', '[info]', r.url),
      hasRelInfo && (r.date || r.place) ? ', released' : '',
      formatNullable(' on <em>', rel.title, '</em>'),
      rel.isSingle ? ' as single' : '',
      formatPair(' (', rel.label, ', ', rel.year, ')'),
      rel.discogsId
        ? formatLink(' ', '[Discogs]', `https://www.discogs.com/release/${rel.discogsId}`)
        : '',
      formatLink(' ', '[info]', rel.url),
      hasRelInfo && hasCompInfo ? ',' : '',
      formatNullable(' reissued on <em>', comp.title, '</em>'),
      formatPair(' (', comp.label, ', ', comp.year, ')'),
      comp.discogsId
        ? formatLink(' ', '[Discogs]', `https://www.discogs.com/release/${comp.discogsId}`)
        : '',
      formatLink(' ', '[info]', comp.url),
      Object.keys(strm).length > 0 ? ', streaming on' : '',
      strm.archiveId
        ? formatLink(' ', '[archive.org]', `https://archive.org/details/${strm.archiveId}`)
        : '',
      strm.spotifyId
        ? formatLink(' ', '[Spotify]', `https://open.spotify.com/track/${strm.spotifyId}`)
        : '',
      strm.tidalId
        ? formatLink(' ', '[TIDAL]', `https://listen.tidal.com/track/${strm.tidalId}`)
        : '',
      strm.youtubeId
        ? formatLink(' ', '[YouTube]', `https://www.youtube.com/watch?v=${strm.youtubeId}`)
        : ''
    ].join('');
  };
  
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
  
  const renderVextab = (content, {
    width = 640,
    offset = [0, 0],
    ...options
  } = {}) => {
    
    } catch (err) {
      console.error(err); 
    }
  };
  
</script>

<template lang="pug">
  +if('song')
    .typeset
      h1= '{song.canonicalName}'
      
      +if('song.recordings')
        section
          h2= 'Selected Recordings'
        
          ul
            +each('song.recordings as r')
              li= '{@html formatRecording(r)}'

      +if('song.transcriptions')
        section
          h2= 'Text Sources'
        
          ul
            +each('song.transcriptions as t')
              li= '{@html formatTranscription(t)}'
    
      +if('song.arrangements')
        section
          h2= 'Arrangement'
          
          Arrangement(content='{song.arrangements[0].content}')
    
    +elseif('errMsg')
      code.error= '{errMsg}'

</template>

<style lang='postcss'>
  .error
    @apply text-medium-red

</style>
    
