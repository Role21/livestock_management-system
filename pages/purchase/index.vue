<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">All Purchases</h1>
  
      <div v-if="loading" class="text-gray-500">Loading purchases...</div>
      <div v-else-if="!purchases.length" class="text-red-500">No purchases found.</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white shadow rounded">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border-b">SL No</th>
              <th class="py-2 px-4 border-b">Purchase Bill</th>
              <th class="py-2 px-4 border-b">Purchase Date</th>
              <th class="py-2 px-4 border-b">Supplier</th>
              <th class="py-2 px-4 border-b">Total Purchased (pcs)</th>
              <th class="py-2 px-4 border-b">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(purchase, index) in purchases"
              :key="purchase.id"
              class="hover:bg-gray-50 cursor-pointer"
              @click="navigateTo(`/purchase/${purchase.id}`)"
            >
              <td class="py-2 px-4 border-b text-center">{{ index + 1 }}</td>
              <td class="py-2 px-4 border-b">{{ purchase.purchase_bill }}</td>
              <td class="py-2 px-4 border-b">{{ formatDate(purchase.purchase_date) }}</td>
              <td class="py-2 px-4 border-b">{{ purchase.supplier }}</td>
              <td class="py-2 px-4 border-b text-center">{{ purchase.total_purchased }}</td>
              <td class="py-2 px-4 border-b">{{ purchase.note || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  const purchases = ref([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const res = await $fetch('/api/purchase');
      purchases.value = res;
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      loading.value = false;
    }
  });
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };
  </script>
  