<style lang="postcss" global>
  @tailwind base
  
  html
    @apply antialiased
    @apply overflow-x-hidden
    @apply overflow-y-scroll
    font-size: 16px
    text-rendering: optimizeLegibility
    
  /* INLINE */
  
  a:not(.unstyled)
    @apply text-medium-dark-blue-green
  
  .text-white a:not(.unstyled),
  .text-lighter a:not(.unstyled)
    @apply text-bright-green
  
  a:visited:not(.unstyled)
    @apply text-medium-dark-blue-purple
  
  .text-white a:visited:not(.unstyled),
  .text-lighter a:visited:not(.unstyled)
    @apply text-medium-light-red
  
  code
    @apply bg-transparent
    @apply font-mono
    
  strong
    @apply font-semibold
    
  /* DISPLAY FIX FOR ICONS AND TAGS */
  
  p img,
  span img
    @apply inline
    height: 1em
  
  /* PRE */
  
  pre
    @apply text-xs

      
  /* HEADINGS */
  
  h1:not(.unstyled)
    @apply mb-1b
    @apply font-semibold text-xl leading-none
  
  h2:not(.unstyled)
    @apply mb-half-b
    @apply font-medium text-lg leading-none
  
  h3:not(.unstyled),
  h4:not(.unstyled),
  h5:not(.unstyled),
  h6:not(.unstyled)
    @apply mb-quarter-b
    @apply text-base leading-none
  
  
  /* BUTTONS */
  
  button
    @apply select-none
    
  button,
  button:hover,
  button:focus,
  button:active
    @apply outline-none
    -webkit-appearance: none
    -moz-appearance: none
  
  
  /* IMAGE SIZING */
  
  div > img,
  figure > img
    @apply w-full
    
  
  /* SPACING FOR CONTENT SECTIONS */
  
  section
    @apply w-full
    @apply pb-2b

  @screen c17
    section
      @apply pb-3b

</style>
