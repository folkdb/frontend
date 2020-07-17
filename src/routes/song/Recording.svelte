<script>
  import {
    formatNullable,
    formatPair,
    formatList,
    formatLink,
  } from './helpers.js';
  
  export let entry;
  
  const rel = entry.release || {};
  const comp = entry.compilation || {};
  const strm = entry.streaming || {};
  
  const hasRelInfo = (
    rel.title || rel.isSingle || rel.label || rel.year || rel.discogsId
  );
  
  const hasCompInfo = (
    comp.title || comp.label || comp.year || comp.discogsId
  );
  
  const recordingDetails = [
    formatList('<strong>', entry.artists, '</strong>'),
    entry.date || entry.place ? ' recorded ' : '',
    formatNullable('', entry.date),
    entry.date && entry.place ? ' ' : '',
    formatNullable('in ', entry.place),
    entry.dahrId
      ? formatLink(' ', '[DAHR]', `https://adp.library.ucsb.edu/index.php/matrix/detail/${entry.dahrId}`)
      : '',
    formatLink(' ', '[info]', entry.url),
  ];
  
  const releaseDetails = [
    hasRelInfo && (entry.date || entry.place) ? ', released' : '',
    formatNullable(' on <em>', rel.title, '</em>'),
    rel.isSingle ? ' as single' : '',
    formatPair(' (', rel.label, ', ', rel.year, ')'),
    rel.discogsId
      ? formatLink(' ', '[Discogs]', `https://www.discogs.com/release/${rel.discogsId}`)
      : '',
    formatLink(' ', '[info]', rel.url),
  ];
  
  const compilationDetails = [
    hasRelInfo && hasCompInfo ? ',' : '',
    formatNullable(' reissued on <em>', comp.title, '</em>'),
    formatPair(' (', comp.label, ', ', comp.year, ')'),
    comp.discogsId
      ? formatLink(' ', '[Discogs]', `https://www.discogs.com/release/${comp.discogsId}`)
      : '',
    formatLink(' ', '[info]', comp.url),
  ];
  
  const streamingDetails = [
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
      : '',
  ];
  
  const formatted = [].concat(
    recordingDetails,
    releaseDetails,
    compilationDetails,
    streamingDetails,
  ).join('');
  
</script>

<template lang="pug">
  span= '{@html formatted}'

</template>
