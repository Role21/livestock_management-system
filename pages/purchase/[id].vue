<template>
    <div class="p-6">
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="!purchase" class="text-red-500">Purchase not found.</div>
      <div v-else class="space-y-4">
        <h1 class="text-2xl font-bold">Purchase Details</h1>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded shadow">
            <p class="font-semibold">Purchase Bill:</p>
            <p>{{ purchase.purchase_bill }}</p>
          </div>
  
          <div class="bg-white p-4 rounded shadow">
            <p class="font-semibold">Purchase Date:</p>
            <p>{{ formatDate(purchase.purchase_date) }}</p>
          </div>
  
          <div class="bg-white p-4 rounded shadow">
            <p class="font-semibold">Supplier:</p>
            <p>{{ purchase.supplier }}</p>
          </div>
  
          <div class="bg-white p-4 rounded shadow">
            <p class="font-semibold">Total Purchased (pcs):</p>
            <p>{{ purchase.total_purchased }}</p>
          </div>
  
          <div class="bg-white p-4 rounded shadow md:col-span-2">
            <p class="font-semibold">Note:</p>
            <p>{{ purchase.note || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const id = route.params.id;
  
  const purchase = ref(null);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const res = await $fetch(`/api/purchase/${id}`);
      purchase.value = res;
    } catch (error) {
      console.error('Error fetching purchase:', error);
    } finally {
      loading.value = false;
    }
  });
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };
  </script>
  