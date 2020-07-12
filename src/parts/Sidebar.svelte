<template lang="pug">
  nav
    p
  
</template>

<style lang="postcss">
  nav
    @apply w-full
    @apply border-medium-orange
    @apply bg-light-orange

  @screen c11
    nav
      @apply w-4c
      @apply fixed h-screen overflow-y-scroll
      @apply 
      @apply border-r

  @screen c21
    nav
      @apply w-5c
    
</style>