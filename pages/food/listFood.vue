<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Food List</h1>

    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">SL No</th>
          <th class="px-4 py-2">Food Name</th>
          <th class="px-4 py-2">Purchase Unit</th>
          <th class="px-4 py-2">Assigned Batch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(food, index) in foodList" :key="food.id">
          <td class="px-4 py-2">{{ index + 1 }}</td>
          <td class="px-4 py-2">{{ food.name }}</td>
          <td class="px-4 py-2">{{ food.purchase_unit }}</td>
          <td class="px-4 py-2">{{ food.assigned_batch }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const foodList = ref([]);

onMounted(async () => {
  try {
    const res = await $fetch('/api/food-history/foodlist');
    foodList.value = res;
  } catch (error) {
    console.error('Error fetching food list:', error);
  }
});
</script>
