import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/*引入页面*/
// import login from './views/login/login.vue'
// import main from './views/main/main.vue'
// import home from './views/home/home.vue'
/*配置路由*/
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/home.vue')
    }
  ]
})
