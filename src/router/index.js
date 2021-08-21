import { createRouter, createWebHistory } from 'vue-router'
import FeedList from '../views/FeedList.vue'

const routerHistory = createWebHistory()
const routes = [
  {
    path: '/popup',
    name: 'FeedList',
    component: FeedList
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  }
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
