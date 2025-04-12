<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Product Sales List</h1>
  
      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border p-2">SL No</th>
            <th class="border p-2">Sale Date</th>
            <th class="border p-2">Client</th>
            <th class="border p-2">Total Sold Amount (৳)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sale, index) in productSales" :key="sale.id" class="text-center">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ sale.date }}</td>
            <td class="border p-2">{{ sale.client }}</td>
            <td class="border p-2">{{ sale.total_amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const productSales = [
    { id: 1, date: '2025-04-10', client: 'Client X', total_amount: 3000 },
    { id: 2, date: '2025-04-09', client: 'Client Y', total_amount: 4200 },
    { id: 3, date: '2025-04-08', client: 'Client Z', total_amount: 2800 },
  ];
  </script>
  