<style lang="postcss" global>
  .container
    @apply w-full max-w-10c
    @apply mx-auto
  
  @screen c11
    .container
      @apply max-w-19c
      @apply mx-0
      @apply pr-2b
      padding-left: 18rem

  @screen c21
    .container
      @apply max-w-20c
      padding-left: 22rem
  
  @media print
    .container
      @apply max-w-full
      @apply m-0
      @apply p-0
      
</style>