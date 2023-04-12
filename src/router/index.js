import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/user/User.vue')
  },
  {
    path: '/addUser',
    name: 'AddUser',
    component: () => import('@/views/user/AddUser.vue')
  },
  {
    path: '/editUser',
    name: 'EditUser',
    component: () => import('@/views/user/EditUser.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
