import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

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
    path: '/blog/',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  },
  {
    path: '/blog/:year/:month/:post',
    name: 'BlogPost',
    component: () => import(/* webpackChunkName: "blogpost" */ '../views/BlogPost.vue'),
  },
  {
    path: '/donate/',
    name: 'Donate',
    component: () => import(/* webpackChunkName: "donate" */ '../views/Donate.vue')
  },
  {
    path: '/contact/',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "memo" */ '../views/Contact.vue')
  },
  {
    path: '/service/',
    name: 'Service',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Service.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
