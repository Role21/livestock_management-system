<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Food List</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-gray-500">Loading...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- Empty State -->
    <div v-else-if="foodList.length === 0" class="text-gray-500">No food items found.</div>

    <!-- Food List Table -->
    <table v-else class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">SL No</th>
          <th class="px-4 py-2">Food Name</th>
          <th class="px-4 py-2">Purchase Unit</th>
          <th class="px-4 py-2">Assigned Batch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(food, index) in foodList" :key="food.id">
          <td class="px-4 py-2">{{ index + 1 }}</td>
          <td class="px-4 py-2">{{ food.name }}</td>
          <td class="px-4 py-2">{{ food.purchase_unit }}</td>
          <td class="px-4 py-2">{{ food.assigned_batch }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const foodList = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await $fetch('/api/food-history/foodlist')
    foodList.value = res
  } catch (err) {
    error.value = 'Error fetching food list. Please try again later.'
    console.error('Error fetching food list:', err)
  } finally {
    loading.value = false
  }
})
</script>
