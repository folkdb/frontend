import { writable } from 'svelte/store';


export const sessionHistory = writable({
  songs: new Map(),
  artists: new Map(),
});
