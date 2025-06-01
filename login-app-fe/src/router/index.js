// import { createRouter, createWebHistory } from 'vue-router'
// import Login from '../views/LoginView.vue'
// import Register from '../views/RegisterView.vue'

// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', component: Login },
//   { path: '/register', component: Register },
// ]

// export default createRouter({
//   history: createWebHistory(),
//   routes
// })

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
