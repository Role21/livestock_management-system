<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Livestock Sales List</h1>
  
      <div class="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table class="min-w-full text-sm text-left text-gray-700">
          <thead class="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th class="px-4 py-3 border">SL No</th>
              <th class="px-4 py-3 border">Sold Date</th>
              <th class="px-4 py-3 border">Client</th>
              <th class="px-4 py-3 border">Total Livestock Sold (pcs)</th>
              <th class="px-4 py-3 border">Total Sold Amount (৳)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!sales?.length">
              <td colspan="5" class="px-4 py-6 text-center text-gray-500">
                No sales data available.
              </td>
            </tr>
            <tr
              v-for="(sale, index) in sales"
              :key="sale.id"
              class="border-b even:bg-gray-50 hover:bg-gray-100 transition"
            >
              <td class="px-4 py-3 font-medium">{{ index + 1 }}</td>
              <td class="px-4 py-3">{{ sale.date }}</td>
              <td class="px-4 py-3">{{ sale.client }}</td>
              <td class="px-4 py-3">{{ sale.total_pcs }}</td>
              <td class="px-4 py-3">৳ {{ sale.total_amount.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  const { data: sales, error } = await useFetch('/api/sales/list')
  
  if (error.value) {
    console.error('Error loading sales:', error.value)
  }
  </script>
  