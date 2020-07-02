<template lang="pug">
  footer
    .container
      :md(tag='section')
        ©2020 [Daniel C. Narey](http://danielnarey.com)

</template>


<style lang="postcss">
  footer
    @apply w-screen min-h-7c
    @apply pt-2b
    @apply bg-darker-blue
    @apply text-white text-sm
  
  section
    @apply text-center


  @screen c17
    footer
      @apply pt-3b

</style>
