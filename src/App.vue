<script setup>
import { ref,computed  } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { cartCount } from './stores/shop'
import authService from './service/authService'

const route = useRoute()
const loginOpen = ref(false)
const email = ref('')
const password = ref('')
const loginError = ref('')
const menuOpen = ref(false)
const loading = ref(false)

const currentUser = ref(authService.getUser())

const submitLogin = async () => {
  loginError.value = '';

  try {
    loading.value = true;

    await authService.login(
      email.value,
      password.value
    );
    currentUser.value = authService.getUser()
    loginOpen.value = false;
    email.value = '';
    password.value = '';
    loginOpen.value = false;
  } catch (error) {
     loginError.value = error.message || 'Login failed. Please try again.'

  } finally {
    loading.value = false;
  }
};
const signOut = async () => { 
  await authService.logout()
  currentUser.value = null;
  loginOpen.value = false 
  email.value = ''
  password.value = ''
  loginError.value = ''
  await router.replace('/')
}
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink to="/" class="brand"><span class="brand-mark">N</span><span>NORTHSTAR</span></RouterLink>
      <button class="mobile-menu" @click="menuOpen = !menuOpen" aria-label="Toggle navigation">☰</button>
      <nav :class="{ 'nav-open': menuOpen }">
        <RouterLink to="/" @click="menuOpen = false">Home</RouterLink>
        <RouterLink to="/about" @click="menuOpen = false">About</RouterLink>
        <RouterLink to="/products" @click="menuOpen = false">Products</RouterLink>
        <RouterLink to="/enquiry" @click="menuOpen = false">Enquiry</RouterLink>
      </nav>
      <div class="header-actions">
        <RouterLink to="/products" class="cart-link" aria-label="Cart">Bag <span>{{ cartCount }}</span></RouterLink>
        <div class="account-wrap">
          <button class="account-button" @click="loginOpen = !loginOpen" aria-label="Account">♙</button>
          <div v-if="loginOpen && !loading" class="login-popover">
            <template v-if="currentUser">
              <p class="eyebrow">SIGNED IN</p><strong>{{ currentUser.name }}</strong><p class="muted small">{{ currentUser.email }}</p>
              <button class="button button-dark full" @click="signOut">Log out</button>
            </template>
            <template v-else>
              <p class="eyebrow">WELCOME BACK</p><h3>Sign in</h3>


              <form @submit.prevent="submitLogin">
                <label>Email<input v-model="email" type="email" required autocomplete="username" placeholder="you@example.com"></label>
                <label>Password<input v-model="password" type="password" required autocomplete="current-password" placeholder="Your password"></label>
                <p v-if="loginError" class="form-error">{{ loginError }}</p>
                <button class="button button-dark full" :disabled="loading"> {{ loading ? 'Logging in...' : 'Log in' }}</button>
                
                 <p v-if="loginError" class="form-error">
      {{ loginError }}
    </p>
              </form>

              <p v-if="loading" class="small muted">Logging in...</p>
              <p class="small muted">New here? <RouterLink to="/register" @click="loginOpen = false">Create an account</RouterLink></p>
            </template>
          </div>
        </div>
      </div>
    </header>

    <main><RouterView :key="route.fullPath" /></main>
    <footer class="site-footer">
      <div><RouterLink to="/" class="brand footer-brand"><span class="brand-mark">N</span><span>NORTHSTAR</span></RouterLink><p>Thoughtful essentials for everyday living.</p></div>
      <div class="footer-links"><RouterLink to="/about">Our story</RouterLink><RouterLink to="/products">Shop all</RouterLink><RouterLink to="/enquiry">Contact</RouterLink></div>
      <span class="copyright">© 2026 Northstar Studio</span>
    </footer>
    <button v-if="loginOpen" class="popover-dismiss" aria-label="Close login pop-up" @click="loginOpen = false"></button>
  </div>
</template>
