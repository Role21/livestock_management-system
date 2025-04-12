<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Food Details</h1>
      
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="!food" class="text-red-500">Food not found.</div>
      <div v-else>
        <div class="space-y-4">
          <p><strong>Food Name:</strong> {{ food.name }}</p>
          <p><strong>Purchase Unit:</strong> {{ food.purchase_unit }}</p>
          <p><strong>Assigned Batch:</strong> {{ food.assigned_batch }}</p>
          <p><strong>Description:</strong> {{ food.description || 'No description available' }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const food = ref(null);
  const loading = ref(true);
  
  const id = route.params.id;  // Access the dynamic 'id' from the URL
  
  onMounted(async () => {
    try {
      const res = await $fetch(`/api/food-history/${id}`);  // Fetch food details using the ID
      food.value = res;
    } catch (error) {
      console.error('Error fetching food details:', error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  