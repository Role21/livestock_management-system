<template>
    <BaseModal :show="show" @close="handleClose" title="Vaccine Wasted Reports">
      <div class="overflow-x-auto max-h-[70vh] space-y-4">
        <div class="flex justify-end">
          <button @click="printReport" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Print Report
          </button>
        </div>
  
        <table class="min-w-full text-sm border border-gray-300">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="px-4 py-2 border">#</th>
              <th class="px-4 py-2 border">Vaccine Name</th>
              <th class="px-4 py-2 border">Wasted Quantity</th>
              <th class="px-4 py-2 border">Reason</th>
              <th class="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in reports" :key="entry.id" class="hover:bg-gray-50">
              <td class="px-4 py-2 border">{{ index + 1 }}</td>
              <td class="px-4 py-2 border">{{ entry.vaccine_name }}</td>
              <td class="px-4 py-2 border">{{ entry.quantity }}</td>
              <td class="px-4 py-2 border">{{ entry.reason }}</td>
              <td class="px-4 py-2 border">{{ formatDate(entry.date) }}</td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="reports.length === 0" class="text-center py-4 text-gray-500">
          No wasted vaccine reports available.
        </div>
      </div>
    </BaseModal>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import BaseModal from '@/components/BaseModal.vue';
  
  const props = defineProps({
    show: Boolean
  });
  
  const emit = defineEmits(['close']);
  const reports = ref([]);
  
  const handleClose = () => emit('close');
  
  const fetchReports = async () => {
    const { data, error } = await useFetch('/api/vaccination/wasted/report');
    if (!error.value) reports.value = data.value || [];
    else console.error('Error fetching vaccine wasted reports:', error.value);
  };
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };
  
  const printReport = () => {
    window.print();
  };
  
  onMounted(fetchReports);
  </script>
  