import { createRouter, createWebHashHistory, Router } from 'vue-router';
// import routes from './router';
import Home from '../views/login/Home.vue';
import About from '../views/login/About.vue';
const routes = [  
    {  
      path: '/',  
      name: 'Home',  
      component: Home  
    },  
    {  
      path: '/about',  
      name: 'About',  
      component: About  
    }  
  ]  

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
    console.log('beforeEach',_to,_from,next);
    next();
});
export default router;
