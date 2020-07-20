import Home from './routes/Home.svelte';
import Song from './routes/song/Song.svelte';
import Arrangement from './routes/arrangement/Arrangement.svelte';


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/song/:slug',
    component: Song,
  },
  {
    path: '/song/:slug/arrangement/:index',
    component: Arrangement,
  },
  {
    path: '/song/:slug/arrangement',
    redirect: ({ slug }) => `/song/${slug}/arrangement/0`,
  },
  { path: '*',
    redirect: '/',
  },
];


export default routes;
