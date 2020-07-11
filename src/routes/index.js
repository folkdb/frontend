import Home from './Home.svelte';
import Song from './song/Song.svelte';


const routes = [
  { path: '/', component: Home },
  { path: '/song/:slug', component: Song },
];


export default routes;
