<script>
  import './styles/index.js';
  import Header from './parts/Header.svelte';
  import Sidebar from './parts/Sidebar.svelte';
  import Main from './parts/Main.svelte';
  import Footer from './parts/Footer.svelte';

</script>


<template lang="pug">
  #app
    Header

    Sidebar
      
    Header

    Main
    
    Footer

</template>


<style lang="postcss">
  @import 'typeface-ibm-plex-sans'

  #app
    @apply bg-near-white
    @apply text-darker font-ibm-plex-sans font-regular text-sm

</style>
