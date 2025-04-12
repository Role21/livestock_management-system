<template>
  <div class="p-5">
    <h1 class="text-2xl font-semibold mb-4">Vaccine List</h1>
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr class="bg-[#2c3e50] text-white">
          <th class="px-4 py-2 text-left">SL No</th>
          <th class="px-4 py-2 text-left">Vaccine ID</th>
          <th class="px-4 py-2 text-left">Vaccine Name</th>
          <th class="px-4 py-2 text-left">Vaccine Unit</th>
          <th class="px-4 py-2 text-left">Total Purchased</th>
          <th class="px-4 py-2 text-left">Total Used</th>
          <th class="px-4 py-2 text-left">Wasted</th>
          <th class="px-4 py-2 text-left">In Stock</th>
          <th class="px-4 py-2 text-left">Assigned Batch Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vaccine, index) in vaccines" :key="vaccine.id">
          <td class="px-4 py-2 text-left">{{ index + 1 }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.vaccineId }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.vaccineName }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.vaccineUnit }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.totalPurchased }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.totalUsed }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.wasted }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.inStock }}</td>
          <td class="px-4 py-2 text-left">{{ vaccine.assignedBatchQuantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const vaccines = ref([])

const fetchVaccines = async () => {
  try {
    const response = await axios.get('/api/vaccinations/list')
    vaccines.value = response.data
  } catch (error) {
    console.error('Error fetching vaccines:', error)
  }
}

onMounted(fetchVaccines)
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #34495e;
  color: white;
}
</style>
