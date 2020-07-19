<script>
  import { onMount, onDestroy } from 'svelte';
  import navaid from 'navaid';
  import routes from '../routes/index.js';
  
  const scrollToTop = () => { window.scrollTo({ top: 0 }); };

  let currentRoute = { params: {}, ...routes[0] };
  let Navaid;

  onMount(() => {
    Navaid = navaid('/');
    
    routes.forEach((entry) => {
      Navaid.on(entry.path, (params) => {
        if (entry.redirect) {
          Navaid.route(entry.redirect(params), true);
        } else {
          currentRoute = { params, ...entry };
        }
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
      
      p.nav
        button.unstyled(on:click='{scrollToTop}')
          span= '▲ Top'
    
</template>


<style lang="postcss">
  main
    @apply w-screen min-h-screen
    @apply py-2b
  
  #pageContent
    @apply px-1b
  
  p.nav
    @apply w-full
    @apply text-center
  
  button
    @apply text-base font-bold text-medium-orange
      
  @screen c17
    main
      @apply py-3b

  @media print
    p.nav
      display: none

</style>
