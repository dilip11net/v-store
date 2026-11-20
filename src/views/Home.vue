<script setup>
import { RouterLink } from 'vue-router'
import { products } from '../stores/shop'
const featured = products.value.slice(0, 3)
</script>
<template>
  <div>
    <section class="hero">
      <div class="hero-copy"><p class="eyebrow">OBJECTS FOR EVERYDAY LIVING</p><h1>Make room for<br><em>the good things.</em></h1><p class="hero-text">A thoughtful collection of useful, well-made pieces. Designed to feel at home in your everyday.</p><RouterLink to="/products" class="button button-dark">Explore the collection <span>↗</span></RouterLink></div>
      <div class="hero-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" alt="Warm, minimal living room with natural textures"><div class="image-note">THE EVERYDAY EDIT <span>01 / 06</span></div></div>
    </section>
    <section class="intro-strip"><span>CONSIDERED DESIGN</span><span>MADE FOR DAILY USE</span><span>LESS, BUT BETTER</span></section>
    <section class="section-block"><div class="section-heading"><div><p class="eyebrow">A FEW GOOD THINGS</p><h2>Featured pieces</h2></div><RouterLink to="/products" class="text-link">View all products ↗</RouterLink></div>
      <div class="product-grid compact-grid"><article v-for="(product, index) in featured" :key="product.id" class="product-card"><RouterLink to="/products" class="product-image"><img :src="product.image" :alt="product.name"><span class="product-index">0{{ index + 1 }}</span></RouterLink><div class="product-meta"><div><h3>{{ product.name }}</h3><p>{{ product.category }}</p></div><strong>₹{{ product.price.toLocaleString('en-IN') }}</strong></div></article></div>
    </section>
    <section class="home-banner"><div><p class="eyebrow">A MORE THOUGHTFUL ROUTINE</p><h2>Good design should<br>make life feel easier.</h2><RouterLink to="/about" class="text-link">Get to know us ↗</RouterLink></div><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85" alt="Calm, sunlit home interior"></section>
  </div>
</template>
