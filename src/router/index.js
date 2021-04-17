import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/donate/',
    name: 'Donate',
    component: () => import(/* webpackChunkName: "donate" */ '../views/Donate.vue')
  },
  {
    path: '/contact/',
    name: 'contact',
    component: () => import(/* webpackChunkName: "memo" */ '../views/Contact.vue')
  },
  {
    path: '/blog/',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
