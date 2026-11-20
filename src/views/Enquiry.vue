<script setup>
import { reactive, ref } from 'vue'
const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
function submit() {
  const enquiries = JSON.parse(localStorage.getItem('northstar_enquiries') || '[]')
  enquiries.push({ ...form, createdAt: new Date().toISOString() })
  localStorage.setItem('northstar_enquiries', JSON.stringify(enquiries))
  sent.value = true
  form.name = ''; form.email = ''; form.message = ''
}
</script>
<template>
  <section class="page-wrap enquiry-page"><div class="enquiry-aside"><p class="eyebrow">LET'S TALK</p><h1>We'd love to<br><em>hear from you.</em></h1><p class="lead">Questions about a product, an idea, or just want to say hello? Send us a note.</p><div class="contact-note"><span>✳</span><p>We usually respond within two working days.</p></div></div><form class="form-card enquiry-form" @submit.prevent="submit"><p class="eyebrow">SEND AN ENQUIRY</p><div v-if="sent" class="success-message">Thanks for reaching out. Your enquiry has been saved in this demo.</div><label>Your name<input v-model="form.name" required placeholder="Full name"></label><label>Email address<input v-model="form.email" type="email" required placeholder="you@example.com"></label><label>Your message<textarea v-model="form.message" rows="5" required placeholder="How can we help?"></textarea></label><button class="button button-dark full">Send request <span>↗</span></button><p class="small muted">Demo mode: requests are stored in this browser only.</p></form></section>
</template>
