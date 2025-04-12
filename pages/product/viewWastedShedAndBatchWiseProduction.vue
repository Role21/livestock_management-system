<!-- viewWastedShedAndBatchWiseProduction.vue -->
<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Wasted Production Details</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- same product & batch info as viewAssignedShedAndBatchWiseProduction.vue -->
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
          <tr v-for="(entry, i) in wastedRecords" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ entry.date }}</td>
            <td>{{ entry.shed }}</td>
            <td>{{ entry.batch }}</td>
            <td>{{ entry.quantity }}</td>
            <td>{{ entry.note }}</td>
            <td>
              <button @click="editWasted(entry)">Edit</button>
              <button @click="removeWasted(entry.id)" class="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const wastedRecords = [
    { id: 1, date: '2025-04-11', shed: 'Shed 1', batch: 'Batch A', quantity: 10, note: 'Expired stock' }
  ]
  
  function editWasted(entry) {
    // open edit modal
  }
  
  function removeWasted(id) {
    // delete logic
  }
  </script>