<script setup>
import { computed, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import {  addProduct, currentUser } from '../stores/shop'
import { getProducts,deleteProduct } from '../service/productService'

const search = ref('')
const addedId = ref('')
const products = ref([])
const filteredProducts = computed(() => products.value.filter(p => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.value.toLowerCase().trim())))
function add(product) { addProduct(product); addedId.value = product.id; setTimeout(() => { if (addedId.value === product.id) addedId.value = '' }, 1400) }
onMounted(async () => {
 try {
        const response = await getProducts()
        products.value = response.data
        console.log(response.data)
    } catch (error) {
        console.error('API Error:', error)
    }
})

const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) {
        return
    }

    try {
        await deleteProduct(id)

        // Remove deleted product from UI
        products.value = products.value.filter(
            product => product.id !== id
        )

        alert('Product deleted successfully!')
    }
    catch (error) {
        console.error('Delete Error:', error)
        alert('Unable to delete product.')
    }
}


</script>
<template>
  <section class="page-wrap products-page">
    <div class="page-title-row"><div><p class="eyebrow">THE NORTHSTAR COLLECTION</p><h1>Objects with <em>purpose.</em></h1><p class="muted">Useful things, thoughtfully chosen.</p></div><RouterLink v-if="currentUser" to="/products/new" class="button button-outline">＋ Add product</RouterLink></div>
    <div class="catalog-toolbar"><span>{{ filteredProducts.length }} PRODUCTS</span><label class="search-box"><span>⌕</span><input v-model="search" type="search" placeholder="Search products..."></label></div>
    <div v-if="filteredProducts.length" class="product-grid"><article v-for="(product, index) in filteredProducts" :key="product.id" class="product-card"><div class="product-image"><img :src="product.imageUrl" :alt="product.name"><span class="product-index">{{ String(index + 1).padStart(2, '0') }}</span><span class="category-tag">{{ product.category }}</span></div><div class="product-meta"><div><h3>{{ product.name }}</h3><p>{{ product.description }}</p></div><strong>₹{{ Number(product.price).toLocaleString('en-IN') }}</strong></div><div class="card-actions"><button class="button button-dark" @click="add(product)">{{ addedId === product.id ? 'Added ✓' : 'Add to bag' }}</button><template v-if="currentUser"><RouterLink :to="`/products/${product.id}/edit`" class="icon-action" title="Edit product">Edit</RouterLink><button class="icon-action danger" title="Delete product" @click="handleDelete(product.id)">Delete</button></template></div></article></div>
    <div v-else class="empty-state"><h2>No products found</h2><p>Try another search term.</p><button class="text-link" @click="search = ''">Clear search ↗</button></div>
  </section>
</template>
