<script>
  import {
    formatNullable,
    formatPair,
    formatLink,
  } from './formatting.js';
  
  export let entry;
  
  const pub = entry.publication || {};
  
  const formatted = [
    formatNullable('<strong>', pub.primaryAuthor, '</strong>, '),
    formatNullable('<em>', pub.title, '</em>'),
    formatPair(' (', pub.place, ', ', pub.year, ')'),
    formatNullable(', p. ', entry.pageNumber),
    formatNullable(' as "', entry.title, '"'),
    formatLink(' ', '[image]', entry.url),
    formatLink(' ', '[source]', pub.url),
  ].join('');

</script>

<template lang="pug">
  span= '{@html formatted}'

</template>
