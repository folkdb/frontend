<script>
  import { onMount, onDestroy } from 'svelte';
  import navaid from 'navaid';
  import routes from '../routes/index.js';
  import { scrollPageTop } from '../routes/helpers.js';
  
  let currentRoute = { params: {}, ...routes[0] };
  let Navaid;

  onMount(() => {
    Navaid = navaid('/');
    
    routes.forEach((route) => {
      Navaid.on(route.path, (params) => { 
        currentRoute = { params, ...route };
      })
    });
    
    Navaid.listen();
  });

  onDestroy(() => {
    if (Navaid) {
      Navaid.unlisten();
    }
  });
  
</script>


<template lang="pug">        
  main
    .container
      #pageContent
        svelte:component(
          this='{currentRoute.component}'
          '{...currentRoute.params}'
        )
  
      button.unstyled(on:click='{scrollPageTop()}')= '▲ Top'
    
</template>


<style lang="postcss">
  main
    @apply w-screen min-h-screen
    @apply py-2b
  
  #pageContent
    @apply px-1b
  
  button
    @apply font-bold text-medium-blue-green
      
  @screen c17
    main
      @apply py-3b

</style>
