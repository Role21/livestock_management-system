<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Food Purchase List</h1>
  
      <table class="min-w-full table-auto">
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
  import { ref, onMounted } from 'vue';
  
  const foodPurchaseList = ref([]);
  
  onMounted(async () => {
    try {
      const res = await $fetch('/api/food-history/foodpurchaselist');
      foodPurchaseList.value = res;
    } catch (error) {
      console.error('Error fetching food purchase list:', error);
    }
  });
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };
  </script>
  