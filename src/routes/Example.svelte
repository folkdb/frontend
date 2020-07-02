<script>
  import { onMount } from 'svelte';
  
  let content = '';

  const loadData = async () => {
    content = '';
    const res = await fetch('/.netlify/functions/fetch-data');
    const text = await res.text();
    
    return text;
  };
  
  onMount(async () => {
    content = await loadData();
  });
  
</script>

<template lang="pug">
  h1 Example
  div= '{content}'

</template>
