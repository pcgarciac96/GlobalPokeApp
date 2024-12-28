import { RouteRecordRaw, createRouter, createWebHistory} from 'vue-router';

import HomeView from '../views/Home.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name:'HomeView',
    component:HomeView
  },
//   {
//     path: '/Teams',
//     name:'TeamsView',
//     component:TeamsView
//   }
]

const router = createRouter({
    history:createWebHistory(),
    routes
  });

  export default router;