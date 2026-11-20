import { computed, ref, watch } from 'vue'

const starterProducts = [
  { id: 'p1', name: 'Arc Desk Lamp', category: 'Home', price: 3499, description: 'A warm, adjustable light for focused work and slower evenings.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85' },
  { id: 'p2', name: 'Everyday Backpack', category: 'Accessories', price: 2799, description: 'A clean, practical carry-all with room for your daily essentials.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' },
  { id: 'p3', name: 'Ceramic Pour-over Set', category: 'Kitchen', price: 1899, description: 'A considered coffee ritual, made simple with a ceramic brewer.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { id: 'p4', name: 'Studio Headphones', category: 'Technology', price: 5999, description: 'Comfortable over-ear listening for deep work and downtime.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85' },
  { id: 'p5', name: 'Minimal Wristwatch', category: 'Accessories', price: 4299, description: 'An understated everyday watch with a timeless silhouette.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85' },
  { id: 'p6', name: 'Linen Lounge Chair', category: 'Home', price: 12499, description: 'A relaxed accent chair that brings texture to any corner.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85' }
]

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export const products = ref(read('northstar_products', starterProducts))
export const cart = ref(read('northstar_cart', []))
export const currentUser = ref(read('northstar_user', null))
export const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))

watch(products, value => localStorage.setItem('northstar_products', JSON.stringify(value)), { deep: true })
watch(cart, value => localStorage.setItem('northstar_cart', JSON.stringify(value)), { deep: true })
watch(currentUser, value => {
  if (value) localStorage.setItem('northstar_user', JSON.stringify(value))
  else localStorage.removeItem('northstar_user')
}, { deep: true })

export function addProduct(product) {
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) existing.quantity++
  else cart.value.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
}

export function saveProduct(product) {
  const index = products.value.findIndex(item => item.id === product.id)
  if (index >= 0) products.value[index] = { ...product }
  else products.value.unshift({ ...product, id: `p${Date.now()}` })
}

export function removeProduct(id) {
  products.value = products.value.filter(item => item.id !== id)
}

// export function login(email, password) {
//   const users = read('northstar_users', [])
//   const user = users.find(item => item.email.toLowerCase() === email.toLowerCase() && item.password === password)
//   if (!user) return false
//   currentUser.value = { name: user.name, email: user.email }
//   return true
// }

// export function registerUser({ name, email, password }) {
//   const users = read('northstar_users', [])
//   if (users.some(item => item.email.toLowerCase() === email.toLowerCase())) return false
//   users.push({ name, email, password })
//   localStorage.setItem('northstar_users', JSON.stringify(users))
//   currentUser.value = { name, email }
//   return true
// }

// export function logout() { currentUser.value = null }
