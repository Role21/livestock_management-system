<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Client Payment List</h1>
  
      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border p-2">SL No</th>
            <th class="border p-2">Client</th>
            <th class="border p-2">Total Receivable Amount (৳)</th>
            <th class="border p-2">Received (৳)</th>
            <th class="border p-2">Due (৳)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!clients.length">
            <td colspan="5" class="text-center py-4">No client data available.</td>
          </tr>
          <tr v-for="(client, index) in clients" :key="client.id" class="text-center">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ client.name }}</td>
            <td class="border p-2">{{ client.totalReceivable }}</td>
            <td class="border p-2">{{ client.received }}</td>
            <td class="border p-2">{{ client.due }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const { data: clients, error } = await useFetch('/api/payments/clients')
  
  if (error.value) {
    console.error('Error loading clients:', error.value)
  }
  </script>
  