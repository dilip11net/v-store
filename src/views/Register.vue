<script setup>
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import authService from '../service/authService'
//import { registerUser } from '../stores/shop'
const router = useRouter()
const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const registerError = ref('');
const loading = ref(false);

async function submit() {
  if (form.password.length < 6) { registerError.value = 'Use a password with at least 6 characters.'; return }
  if (form.password !== form.confirmPassword) { registerError.value = 'The passwords do not match.'; return }
  loading.value = true;
  try {
    await authService.register(form.name, form.email, form.password, form.confirmPassword);
    router.push('/');
  } catch (error) {
    registerError.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <section class="page-wrap register-page"><div class="register-art"><img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1100&q=85" alt="Thoughtful everyday objects on a shelf"><div><p class="eyebrow">WELCOME TO NORTHSTAR</p><h2>Find your<br>everyday favourites.</h2></div></div><form class="form-card register-form" @submit.prevent="submit"><p class="eyebrow">CREATE AN ACCOUNT</p><h1>Join <em>us.</em></h1><p class="muted">Create an account to manage your collection.</p><label>Full name<input v-model="form.name" required autocomplete="name" placeholder="Your name"></label><label>Email address<input v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com"></label><label>Password<input v-model="form.password" type="password" required minlength="6" autocomplete="new-password" placeholder="At least 6 characters"></label><label>Confirm password<input v-model="form.confirmPassword" type="password" required autocomplete="new-password" placeholder="Repeat password"></label><p v-if="registerError" class="form-error">{{ registerError }}</p><button class="button button-dark full">Create account <span>↗</span></button><p class="small muted">Already have an account? <RouterLink to="/">Use the account icon to log in</RouterLink>.</p><p class="tiny muted">Demo only: credentials are stored in browser localStorage. Do not use a real password.</p></form></section>
</template>
