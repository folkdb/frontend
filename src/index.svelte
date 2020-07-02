<script>
  import './styles/index.js';
  import Header from './parts/Header.svelte';
  import Nav from './parts/Nav.svelte';
  import Main from './parts/Main.svelte';
  import Footer from './parts/Footer.svelte';

</script>


<template lang="pug">
  #app
    #sidebar
      
    Main
    
    Footer

</template>


<style lang="postcss">
  /* @import 'typeface-barlow' */

  #app
    @apply bg-near-white
    @apply text-darker font-barlow font-regular text-sm
  
  #sidebar
    @apply border-darker-blue
    @apply bg-darker-blue


  @screen c11
    #sidebar
      @apply border-r

    
  @screen c17
    #app
      @apply text-base

</style>