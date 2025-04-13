<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Food Purchase List</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-gray-500">Loading...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- Empty State -->
    <div v-else-if="foodPurchaseList.length === 0" class="text-gray-500">No food purchase records found.</div>

    <!-- Food Purchase List Table -->
    <table v-else class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">SL No</th>
          <th class="px-4 py-2">Purchase Date</th>
          <th class="px-4 py-2">Supplier</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(purchase, index) in foodPurchaseList" :key="purchase.id">
          <td class="px-4 py-2">{{ index + 1 }}</td>
          <td class="px-4 py-2">{{ formatDate(purchase.purchase_date) }}</td>
          <td class="px-4 py-2">{{ purchase.supplier }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const foodPurchaseList = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await $fetch('/api/food-history/foodpurchaselist')
    foodPurchaseList.value = res
  } catch (err) {
    error.value = 'Error fetching food purchase list. Please try again later.'
    console.error('Error fetching food purchase list:', err)
  } finally {
    loading.value = false
  }
})

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US')  // You can change the locale if needed
}
</script>
