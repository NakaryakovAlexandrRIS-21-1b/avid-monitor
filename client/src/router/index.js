// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {store} from '@/store'

const routes = [
  {
    path: '/home',
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuth) next('/')
      else next()
    },
    component: () => import('@/components/Home.vue'),
    children:[
      {
        path:'/home/chart',
        component: () => import('@/components/Chart.vue'),
      },
      {
        path:'/home/main',
        component: () => import('@/components/Main.vue'),
      },
      {
        path:'/home/audience',
        component: () => import('@/components/Audience.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/components/Auth.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
