<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Supplier Payment List</h1>
  
      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border p-2">SL No</th>
            <th class="border p-2">Supplier</th>
            <th class="border p-2">Total Payable Amount (৳)</th>
            <th class="border p-2">Paid (৳)</th>
            <th class="border p-2">Due (৳)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!suppliers.length">
            <td colspan="5" class="text-center py-4">No supplier data available.</td>
          </tr>
          <tr v-for="(supplier, index) in suppliers" :key="supplier.id" class="text-center">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ supplier.name }}</td>
            <td class="border p-2">{{ supplier.totalPayable }}</td>
            <td class="border p-2">{{ supplier.paid }}</td>
            <td class="border p-2">{{ supplier.due }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const { data: suppliers, error } = await useFetch('/api/payments/suppliers')
  
  if (error.value) {
    console.error('Error loading suppliers:', error.value)
  }
  </script>
  