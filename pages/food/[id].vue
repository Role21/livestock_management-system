<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Food Details</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-gray-500">Loading...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- Food Data -->
    <div v-else>
      <div class="space-y-4">
        <p><strong>Food Name:</strong> {{ food.name || 'N/A' }}</p>
        <p><strong>Purchase Unit:</strong> {{ food.purchase_unit || 'N/A' }}</p>
        <p><strong>Assigned Batch:</strong> {{ food.assigned_batch || 'N/A' }}</p>
        <p><strong>Description:</strong> {{ food.description || 'No description available' }}</p>
      </div>
    </div>

    <!-- Back Button -->
    <button @click="goBack" class="mt-4 text-blue-600">Back</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const food = ref(null)
const loading = ref(true)
const error = ref(null)

const id = route.params.id

onMounted(async () => {
  try {
    const res = await $fetch(`/api/food-history/${id}`)
    food.value = res
  } catch (err) {
    error.value = 'Failed to fetch food details. Please try again later.'
    console.error('Error fetching food details:', err)
  } finally {
    loading.value = false
  }
})

const goBack = () => {
  router.go(-1)  // Go back to the previous page
}
</script>
