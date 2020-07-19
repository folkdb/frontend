import { get } from 'svelte/store';
import { loadedSongs } from '../store.js';


export const fetchSong = async (slug) => {
  const data = get(loadedSongs).get(slug);

  if (data) {
    return ({ data });
  }

  let json;

  try {
    const response = await fetch(`/.netlify/functions/fetch-data?collection=songs&slug=${slug}`);

    json = await response.json();

    if (json.data) {
      loadedSongs.update((mp) => mp.set(slug, json.data));
    }
  } catch (error) {
    return ({ error });
  }

  return json;
};

export const formatNullable = (before, val, after = '') => (
  val ? `${before}${val}${after}` : ''
);

export const formatPair = (before, a, sep, b, after = '') => (
  a || b
    ? `${before}${[].concat(a || [], b || []).join(sep)}${after}`
    : ''
);

export const formatList = (before, arr = [], after = '') => (
  arr.length > 1
    ? `${before}${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}${after}`
    : `${before}${arr[0]}${after}` || ''
);

export const formatLink = (before, text, url, after = '') => (
  url
    ? `${before}<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>${after}`
    : ''
);
