<template lang="pug">
  header
    img(src='/folkdb-icon.svg' alt='[logo]')
    
    #logo= 'folkDB'

</template>


<style lang="postcss">
  header
    @apply w-screen
    @apply h-1c
    @apply py-half-b
    @apply flex items-center
    @apply bg-medium-dark-blue-green
  
  img
    @apply width-auto
    @apply height-full
  
  #logo
    @apply font-bold text-3xl leading-none

</style>
    