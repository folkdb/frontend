import Home from './Home.svelte';
import Example from './example/Example.svelte';


const routes = [
  { path: '/', component: Home },
  { path: '/example', component: Example },
];


export default routes;
