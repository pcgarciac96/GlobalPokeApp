import { RouteRecordRaw, createRouter, createWebHistory} from 'vue-router';

import HomeView from '../views/Home.vue';
import ListPokemon from '../views/ListPokemon.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name:'HomeView',
    component:HomeView
  },
  {
    path: '/ListPokemon',
    name:'ListPokemon',
    component:ListPokemon
  }
]

const router = createRouter({
    history:createWebHistory(),
    routes
  });

  export default router;