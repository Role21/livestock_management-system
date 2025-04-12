
<!-- viewAssignedShedAndBatchWiseProduction.vue -->
<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Production Details</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Product Name:</strong> {{ product.name }}</p>
          <p><strong>Product Category:</strong> {{ product.category }}</p>
          <p><strong>Shed:</strong> {{ product.shed }}</p>
          <p><strong>Batch:</strong> {{ product.batch }}</p>
          <p><strong>Production Unit:</strong> {{ product.unit }}</p>
          <p><strong>Approx Selling Price Per Quantity:</strong> {{ product.price }}</p>
        </div>
        <div>
          <h3 class="font-semibold">Product Wise Stock Information</h3>
          <p>Total Production: {{ product.totalProduction }}</p>
          <p>Total Sold: {{ product.totalSold }}</p>
          <p>Total Wasted: {{ product.totalWasted }}</p>
          <p>Production in stock: {{ product.inStock }}</p>
  
          <h3 class="font-semibold mt-4">Shed & Batch Wise Stock Info</h3>
          <p>Total Production: {{ batch.totalProduction }}</p>
          <p>Total Sold: {{ batch.totalSold }}</p>
          <p>Total Wasted: {{ batch.totalWasted }}</p>
          <p>In stock: {{ batch.inStock }}</p>
          <p>Batch Status: {{ batch.status }}</p>
        </div>
      </div>
  
      <table class="w-full mt-6 border">
        <thead>
          <tr class="bg-gray-200">
            <th>SL. No.</th>
            <th>Production Date</th>
            <th>Shed</th>
            <th>Batch</th>
            <th>Production Quantity</th>
            <th>Note</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, i) in records" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ entry.date }}</td>
            <td>{{ entry.shed }}</td>
            <td>{{ entry.batch }}</td>
            <td>{{ entry.quantity }}</td>
            <td>{{ entry.note }}</td>
            <td>
              <button @click="edit(entry)">Edit</button>
              <button @click="remove(entry.id)" class="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const product = {
    name: 'Example Product',
    category: 'Category A',
    shed: 'Shed 1',
    batch: 'Batch A',
    unit: 'Kg',
    price: 20,
    totalProduction: 1000,
    totalSold: 500,
    totalWasted: 50,
    inStock: 450
  }
  
  const batch = {
    totalProduction: 400,
    totalSold: 200,
    totalWasted: 20,
    inStock: 180,
    status: 'Active'
  }
  
  const records = [
    { id: 1, date: '2025-04-10', shed: 'Shed 1', batch: 'Batch A', quantity: 100, note: 'Initial production' }
  ]
  
  function edit(entry) {
    // open modal logic
  }
  
  function remove(id) {
    // delete logic
  }
  </script>