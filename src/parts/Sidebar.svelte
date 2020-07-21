<script>
  import { onMount } from 'svelte';
  import { fetchSong } from '../helpers.js';
  
  export let slug = '';
  
  let songs = [];
  let error;
  
  onMount(async () => {
    let data = {};

    ({ data, error } = await fetchSong('index'));
  
    songs = Object.keys(data).map((k) => ({
      slug: k,
      url: `/song/${k}`,
      title: data[k],
    }));
  });

</script>


<template lang="pug">
  nav
    section.notification
      p
        | You’re viewing an open-access preview of FolkDB.
        | See below for a sample of songs from our database.

    section.menu
      .heading
        p= 'SONGS'
    
      ul
        +each('songs as entry')
          li
            a.unstyled(
              href='{entry.url}'
              class:active='{entry.slug === slug}'
            )= '{entry.title}'
    
    +if('error')
      p: code.error= '{error}'
  
</template>

<style lang="postcss">
  nav
    @apply z-10
    @apply w-full
    @apply px-one-and-half-b
    @apply border-darker-orange
    background-color: hsl(45,15%,17%)

  section.notification p
    @apply text-bright-orange
    @apply font-medium italic text-sm-narrow

  .heading
    @apply pb-1b

  .heading p
    @apply pl-1b
    @apply rounded
    @apply bg-medium-blue-green
    @apply text-white
    @apply font-bold text-sm-wide tracking-wide

  ul
    @apply pl-half-b

  li
    @apply pb-half-b
    @apply font-medium text-sm-narrow

  li a
    @apply text-medium-light-blue-green
  
  li a.active
    @apply text-medium-light-green
    @apply underline

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
  
  @media print
    nav
      display: none
    
</style>
