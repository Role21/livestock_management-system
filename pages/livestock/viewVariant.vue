<template>
    <div class="p-6">
      <!-- Page Heading -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Variants of {{ livestock?.name }}</h2>
        <NuxtLink to="/livestock/addLivestock" class="bg-blue-600 text-white px-4 py-2 rounded">
          Back to Livestock List
        </NuxtLink>
      </div>
  
      <!-- Livestock Info Box -->
      <div class="p-4 bg-gray-100 rounded mb-6 shadow">
        <p><strong>Livestock Name:</strong> {{ livestock?.name }}</p>
        <p><strong>Description:</strong> {{ livestock?.description || 'N/A' }}</p>
      </div>
  
      <!-- Variant List -->
      <table class="w-full table-auto border">
        <thead class="bg-gray-200">
          <tr>
            <th>SL. No.</th>
            <th>Type Title</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(variant, index) in livestock?.variants || []"
            :key="variant.id"
            class="text-center border-b"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ variant.typeTitle }}</td>
            <td>{{ variant.description || '—' }}</td>
            <td>{{ new Date(variant.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- No Variants -->
      <div v-if="(livestock?.variants?.length || 0) === 0" class="text-center mt-6 text-gray-500">
        No variants found for this livestock.
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  const route = useRoute();
  const livestock = ref(null);
  
  const fetchLivestockVariants = async () => {
    const id = route.query.id;
    if (!id) return;
  
    const data = await $fetch(`/api/livestock/${id}`);
    livestock.value = data;
  };
  
  onMounted(fetchLivestockVariants);
  </script>
  