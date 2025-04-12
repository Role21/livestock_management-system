<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Staff Payment List</h1>
  
      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border p-2">SL No</th>
            <th class="border p-2">Name</th>
            <th class="border p-2">Phone</th>
            <th class="border p-2">Total Payment Amount (৳)</th>
            <th class="border p-2">Last Payment (৳)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!staffMembers.length">
            <td colspan="5" class="text-center py-4">No staff data available.</td>
          </tr>
          <tr v-for="(staff, index) in staffMembers" :key="staff.id" class="text-center">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ staff.name }}</td>
            <td class="border p-2">{{ staff.phone }}</td>
            <td class="border p-2">{{ staff.totalPayment }}</td>
            <td class="border p-2">{{ staff.lastPayment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const { data: staffMembers, error } = await useFetch('/api/payments/staff')
  
  if (error.value) {
    console.error('Error loading staff data:', error.value)
  }
  </script>
  