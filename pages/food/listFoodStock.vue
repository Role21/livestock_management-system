<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Food Stock List</h1>
  
      <table class="min-w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">SL No</th>
            <th class="px-4 py-2">Food Name</th>
            <th class="px-4 py-2">Assigned Shed & Batch</th>
            <th class="px-4 py-2">Total Purchased</th>
            <th class="px-4 py-2">Total Distributed</th>
            <th class="px-4 py-2">Total Wasted</th>
            <th class="px-4 py-2">In Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in foodStockList" :key="stock.id">
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ stock.food_name }}</td>
            <td class="px-4 py-2">{{ stock.assigned_shed }} & {{ stock.assigned_batch }}</td>
            <td class="px-4 py-2">{{ stock.total_purchased }}</td>
            <td class="px-4 py-2">{{ stock.total_distributed }}</td>
            <td class="px-4 py-2">{{ stock.total_wasted }}</td>
            <td class="px-4 py-2">{{ stock.in_stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const foodStockList = ref([]);
  
  onMounted(async () => {
    try {
      const res = await $fetch('/api/food-history/foodstocklist');
      foodStockList.value = res;
    } catch (error) {
      console.error('Error fetching food stock list:', error);
    }
  });
  </script>
  