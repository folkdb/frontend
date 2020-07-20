<script>
  import { onMount, onDestroy } from 'svelte';
  import navaid from 'navaid';
  import routes from '../routes.js';
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  let Component;
  let Props;
  let Navaid;

  onMount(() => {
    Navaid = navaid('/');
    
    routes.forEach(({ path, redirect, component, ...routeParams }) => {
      Navaid.on(path, (pathParams) => {
        if (redirect) {
          Navaid.route(redirect(params), true);
        } else {
          Component = component;
          Props = { ...pathParams, ...routeParams };
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
        +if('Component')
          svelte:component(this='{Component}' '{...Props}')
      
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
