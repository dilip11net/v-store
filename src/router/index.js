import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import ProductForm from '../views/ProductForm.vue'
import Enquiry from '../views/Enquiry.vue'
import Register from '../views/Register.vue'

import authService from '../service/authService.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/products', component: Products, meta: { requiresAuth: true } },
    { path: '/products/new', component: ProductForm, meta: { requiresAuth: true } },
    { path: '/products/:id/edit', component: ProductForm, props: true, meta: { requiresAuth: true } },
    { path: '/enquiry', component: Enquiry },
    { path: '/register', component: Register },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() { return { top: 0 } }
})

let authCheckPromise = null
let authStatus = null

async function checkAuthentication() {
  if (authStatus !== null) {
    return authStatus
  }

  if (!authCheckPromise) {
    authCheckPromise = authService.isLoggedIn()
      .then(result => {
        authStatus = result
        return result
      })
      .finally(() => {
        authCheckPromise = null
      })
  }

  return authCheckPromise
}

// Authentication Guard
router.beforeEach(async (to) => {

  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth
  )

  if (!requiresAuth) {
        return true
  }

  // const guestOnly = to.matched.some(
  //   record => record.meta.guestOnly
  // )

  // if (!requiresAuth && !guestOnly) {
  //   return true
  // }

const isAuthenticated = await authService.isLoggedIn()

if (!isAuthenticated) {
        return {
            path: '/',
            query: { redirect: to.fullPath }
        }
    }

  return true
})

export default router
