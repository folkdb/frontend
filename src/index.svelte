<script>
  import { onMount } from 'svelte';
  import Header from './parts/Header.svelte';
  import Sidebar from './parts/Sidebar.svelte';
  import Main from './parts/Main.svelte';
  import Footer from './parts/Footer.svelte';
  import './styles/index.js';

  let contentLoaded = false;
  
  onMount(() => {
    contentLoaded = true;
  })
</script>


<template lang="pug">
  #app
    Sidebar
    
    Header

    Main
    
    Footer
  
    +if('contentLoaded')
      script(src='/vextab.js')= 'void 0'

</template>


<style lang="postcss">
  @import 'typeface-ibm-plex-sans'

  #app
    @apply bg-near-white
    @apply text-darker font-ibm-plex-sans font-regular text-sm

</style>
