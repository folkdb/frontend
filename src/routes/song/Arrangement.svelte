<script>
  import { formatNullable } from '../../helpers.js';
  
  export let entry;
  export let slug;
  export let index;
  
  const link = `<a href="/song/${slug}/arrangement/${index}">[view]<a>`;
  
  const formatted = [
    formatNullable('', entry.tonic, ' '),
    formatNullable('', entry.mode, ' '),
    formatNullable('for ', entry.instruments, ' '),
    link,
  ].join('');
  
</script>


<template lang="pug">
  span= '{@html formatted}'

</template>
