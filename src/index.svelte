<script>
  import './styles/index.js';
  import Header from './parts/Header.svelte';
  import Main from './parts/Main.svelte';
  import Footer from './parts/Footer.svelte';

</script>


<template lang="pug">
  #app
    header

    #sidebar
      
    Main
    
    Footer

</template>


<style lang="postcss">
  @import 'typeface-ibm-plex-sans'

  #app
    @apply bg-near-white
    @apply text-darker font-ibm-plex-sans font-regular text-sm
  
  #sidebar
    @apply w-full
    @apply border-medium-orange
    @apply bg-light-orange

  @screen c11
    #sidebar
      @apply w-4c
      @apply fixed h-screen overflow-y-scroll
      @apply border-r

  @screen c21
    #sidebar
      @apply w-5c

</style>
