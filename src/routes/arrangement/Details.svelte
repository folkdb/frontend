<script>
  import { formatNullable } from '../../helpers.js';
  
  export let arrangement;
  
  const format = ({ instruments, tonic, mode }) => [
    formatNullable('<li><strong>Instruments:</strong> ', instruments, '</li>'),
    tonic || mode ? '<li>' : '',
    formatNullable('<strong>Key:</strong> ', tonic, ' '),
    formatNullable('', mode),
    tonic || mode ? '</li>' : '',
  ].join('');
  
</script>


<template lang="pug">
  ul= '{@html format(arrangement)}'

</template>
