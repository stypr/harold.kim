import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/blog/',
    name: 'Blog',
    component: () => import( /* webpackChunkName: "blog" */ '../views/Blog.vue')
  },
  {
    path: '/blog/:year/:month/:post',
    name: 'BlogPost',
    component: () => import( /* webpackChunkName: "blogpost" */ '../views/BlogPost.vue'),
  },
  {
    path: '/donate/',
    name: 'Donate',
    component: () => import( /* webpackChunkName: "donate" */ '../views/Donate.vue')
  },
  {
    path: '/contact/',
    name: 'Contact',
    component: () => import( /* webpackChunkName: "memo" */ '../views/Contact.vue')
  },
  {
    path: '/project/',
    name: 'Project',
    component: () => import( /* webpackChunkName: "project" */ '../views/Project.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import( /* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router