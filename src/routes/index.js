import Home from './Home.svelte';
import Song from './song/Song.svelte';
import Arrangement from './song/Arrangement.svelte';


const routes = [
  { path: '/', component: Home },
  { path: '/song/:slug', component: Song },
  { path: '/arrangement/:slug/:index', component: Arrangement },
];


export default routes;
