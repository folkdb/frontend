<script>
  import { onMount } from 'svelte';
  
  let loaded = '';

  const loadData = async () => {
    const res = await fetch('/.netlify/functions/fetch-data');
    const text = await res.text();
    
    return text;
  };
  
  onMount(async () => {
    loaded = await loadData();
  });
  
</script>

<template lang="pug">
  h1 Example
  div= '{loaded}'

</template>
