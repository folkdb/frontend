import { writable } from 'svelte/store';

export const loadedSongs = writable(new Map());
