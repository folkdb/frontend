<template lang="pug">
  header
    .wrapper
      img(src='/folkdb-icon.svg' alt='[logo]')
    
    .logo= 'folkDB'

</template>


<style lang="postcss">
  header
    @apply relative z-20
    @apply w-screen
    @apply h-4b
    @apply flex items-center
    @apply bg-medium-dark-blue-green
    @apply border-b-1 border-dark-blue-green

  .wrapper
    @apply h-full
    @apply pl-one-and-half-b pr-1b py-half-b
  
  img
    @apply w-auto
    @apply h-full
  
  .logo
    @apply text-near-white
    @apply font-bold text-3xl leading-none

</style>
    
