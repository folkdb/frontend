import Home from './Home.svelte';
import Song from './song/Song.svelte';
import Arrangement from './arrangement/Arrangement.svelte';


const routes = [
  { path: '/', component: Home },
  { path: '/song/:slug', component: Song },
  { path: '/song/:slug/arrangement/:index', component: Arrangement },
  {
    path: '/song/:slug/arrangement',
    redirect: ({ slug }) => `/song/:${slug}/arrangement/0'`,
  },
];


export default routes;
