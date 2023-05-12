import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/speaker',
      name: 'speaker',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/speaker/speakerTest.vue')
    },
    {
      path:'/',
      name:'home',
      component: () => import('../views/vision/index.vue')
    },
    {
      path:'/checkConfig',
      name:'checkConfig',
      component: () => import('../views/config/index.vue')
    },
    
  ]
})

export default router
