<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, saveProduct } from '../stores/shop'
const route = useRoute()
const router = useRouter()
const existing = computed(() => products.value.find(p => p.id === route.params.id))
const isEdit = computed(() => Boolean(route.params.id))
const form = reactive({ name: existing.value?.name ?? '', category: existing.value?.category ?? '', price: existing.value?.price ?? '', description: existing.value?.description ?? '', image: existing.value?.image ?? '' })
const error = ref('')
function submit() {
  if (!form.name.trim() || !form.category || !form.price || Number(form.price) <= 0 || !form.description.trim() || !form.image.trim()) { error.value = 'Please complete all fields and enter a valid price.'; return }
  saveProduct({ ...form, id: existing.value?.id, price: Number(form.price) })
  router.push('/products')
}
</script>
<template>
  <section class="page-wrap form-page"><p class="eyebrow">PRODUCT MANAGEMENT</p><h1>{{ isEdit ? 'Edit' : 'Add a new' }} <em>product.</em></h1><p class="muted">{{ isEdit ? 'Update the details for this item.' : 'Add an item to your Northstar collection.' }}</p>
    <form class="form-card" @submit.prevent="submit">
      <div class="form-grid"><label>Product name <input v-model="form.name" required placeholder="e.g. Arc Desk Lamp"></label><label>Category <select v-model="form.category" required><option value="" disabled>Select category</option><option>Home</option><option>Accessories</option><option>Kitchen</option><option>Technology</option><option>Wellness</option><option>Other</option></select></label><label>Price (INR) <input v-model.number="form.price" type="number" min="1" step="1" required placeholder="3499"></label><label>Image URL <input v-model="form.image" type="url" required placeholder="https://example.com/product.jpg"></label><label class="span-two">Description <textarea v-model="form.description" rows="4" required placeholder="Describe the product..."></textarea></label></div>
      <p v-if="error" class="form-error">{{ error }}</p><div class="form-actions"><RouterLink to="/products" class="text-link">Cancel</RouterLink><button class="button button-dark">{{ isEdit ? 'Save changes' : 'Create product' }} <span>↗</span></button></div>
    </form>
  </section>
</template>
