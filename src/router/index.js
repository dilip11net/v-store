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
    { path: '/', component: Home, meta: { guestOnly: true } },
    { path: '/about', component: About,meta: { guestOnly: true } },
    { path: '/products', component: Products, meta: { requiresAuth: true } },
    { path: '/products/new', component: ProductForm, meta: { requiresAuth: true } },
    { path: '/products/:id/edit', component: ProductForm, props: true, meta: { requiresAuth: true } },
    { path: '/enquiry', component: Enquiry,meta: { guestOnly: true } },
    { path: '/register', component: Register,meta: { guestOnly: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() { return { top: 0 } }
})

// Authentication Guard
router.beforeEach(async (to) => {

  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth
  )

  const guestOnly = to.matched.some(
    record => record.meta.guestOnly
  )

  // Public pages
  if (!requiresAuth && !guestOnly) {
    return true
  }

  // Verify authentication using backend cookie
  const isAuthenticated = await authService.isLoggedIn()

  // Protected route
  if (requiresAuth && !isAuthenticated) {
    return {
      path: '/Home',
      query: { redirect: to.fullPath }
    }
  }

  // Prevent authenticated users from visiting login
  if (guestOnly && isAuthenticated) {
    return '/Home'
  }

  return true
})

export default router
