<template lang="pug">
  footer
    .container
      p
        = '©2020 ' 
        a(href='http://danielnarey.com')= 'Daniel C. Narey'

</template>


<style lang="postcss">
  footer
    @apply w-screen min-h-7c
    @apply pt-2b
    @apply bg-dark-blue-green
    @apply text-light
  
  section
    @apply text-center


  @screen c17
    footer
      @apply pt-3b

</style>
