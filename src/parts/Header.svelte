<template lang="pug">
  header
    .wrapper
      img(src='/folkdb-icon.svg' alt='[logo]')
    
    .logo= 'folkDB'

  #shadowHeader

</template>


<style lang="postcss">
  header
    @apply fixed z-20
    @apply w-screen
    @apply h-4b
    @apply flex items-center
    @apply bg-medium-dark-blue-green
    @apply border-b border-dark-blue-green

  .wrapper
    @apply h-full
    @apply pl-one-and-half-b pr-1b py-half-b
  
  img
    @apply w-auto
    @apply h-full
    @apply rounded-quarter-b
  
  .logo
    @apply text-white
    @apply font-bold text-3xl leading-none

  #shadowHeader
    @apply w-screen
    @apply h-4b
  
  @media print
    header
      @apply hidden

</style>
    
