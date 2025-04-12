<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Sale Details (ID: {{ saleId }})</h1>
  
      <div v-if="sale" class="bg-white shadow rounded p-4">
        <p><strong>Sale Date:</strong> {{ sale.date }}</p>
        <p><strong>Client:</strong> {{ sale.client }}</p>
        <p><strong>Type:</strong> {{ sale.type }}</p>
        <p v-if="sale.type === 'livestock'">
          <strong>Total Livestock Sold:</strong> {{ sale.total_pcs }} pcs
        </p>
        <p><strong>Total Amount:</strong> ৳{{ sale.total_amount }}</p>
  
        <!-- Additional detailed data (if available) -->
        <div v-if="sale.items?.length">
          <h2 class="mt-4 font-semibold">Sold Items:</h2>
          <ul class="list-disc list-inside">
            <li v-for="(item, index) in sale.items" :key="index">
              {{ item.name }} - {{ item.quantity }} pcs at ৳{{ item.unit_price }} each
            </li>
          </ul>
        </div>
      </div>
  
      <div v-else class="text-red-500">Sale not found.</div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, computed } from 'vue'
  
  const route = useRoute()
  const saleId = computed(() => route.params.id)
  
  // Dummy data – you can replace this later with an API call
  const allSales = [
    {
      id: '1',
      date: '2025-04-10',
      client: 'Client A',
      type: 'livestock',
      total_pcs: 15,
      total_amount: 7500,
      items: [
        { name: 'Cow', quantity: 10, unit_price: 500 },
        { name: 'Goat', quantity: 5, unit_price: 300 },
      ],
    },
    {
      id: '2',
      date: '2025-04-09',
      client: 'Client B',
      type: 'product',
      total_amount: 4200,
      items: [
        { name: 'Milk', quantity: 20, unit_price: 150 },
        { name: 'Eggs', quantity: 30, unit_price: 60 },
      ],
    },
  ]
  
  const sale = ref(allSales.find(s => s.id === saleId.value))
  </script>
  