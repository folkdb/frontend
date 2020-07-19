<template lang="pug">
  footer
    .container
      section
        p= '©2020 ' 
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

  a
    @apply text-bright-blue-green

  @screen c17
    footer
      @apply pt-3b
  
  @media print
    display: none

</style>
