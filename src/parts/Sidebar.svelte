<template lang="pug">
  nav
    p
      | You’re viewing an open-access preview of FolkDB.
      | See below for a sample of songs from our database.
  
</template>

<style lang="postcss">
  nav
    @apply z-10
    @apply w-full
    @apply px-one-and-half-b
    @apply border-darker-orange
    @apply text-light-orange
    background-color: hsl(45,15%,17%)

  p
    @apply text-bright-orange
    @apply font-medium italic text-sm-narrow
  
  @screen c11
    nav
      @apply fixed overflow-y-scroll
      @apply w-4c min-h-screen
      @apply pt-6b pb-2b
      @apply border-r

  @screen c17
    nav
      @apply pt-7b pb-3b
  
  @screen c21
    nav
      @apply w-5c
  
  @media print {
    nav
      @apply hidden
  }
    
</style>
