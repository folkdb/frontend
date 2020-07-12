<template lang="pug">
  nav
    p
      | The FolkDB database is under development. See below for a sample of
      | songs available to view.
  
</template>

<style lang="postcss">
  nav
    @apply z-10
    @apply w-full
    @apply border-medium-dark-orange
    @apply bg-soft-orange
  
  @screen c11
    nav
      @apply w-4c
      @apply fixed h-screen overflow-y-scroll
      @apply border-r
  
  @screen c21
    nav
      @apply w-5c
    
</style>