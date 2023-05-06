import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import index from '../views/home/HomeIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/speaker',
      name: 'speaker',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/speaker/speakerTest.vue')
    },
    
  ]
})

export default router
