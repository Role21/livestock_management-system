<template>
    <BaseModal :show="show" @close="handleClose" title="Report Wasted Vaccine">
      <form @submit.prevent="submitWastedVaccine" class="space-y-4">
  
        <!-- Select Vaccine -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Vaccine</label>
          <select v-model="form.vaccine_id" required class="w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">Select vaccine</option>
            <option v-for="v in vaccines" :key="v.id" :value="v.id">{{ v.name }}</option>
          </select>
        </div>
  
        <!-- Quantity -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Quantity Wasted</label>
          <input type="number" v-model="form.quantity" required min="1" class="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
  
        <!-- Reason -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Reason</label>
          <select v-model="form.reason" required class="w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">Select reason</option>
            <option value="expired">Expired</option>
            <option value="damaged">Damaged</option>
            <option value="storage_issue">Storage Issue</option>
            <option value="other">Other</option>
          </select>
        </div>
  
        <!-- Notes -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Notes</label>
          <textarea v-model="form.notes" rows="3" class="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
  
        <!-- Submit -->
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Report Wastage
          </button>
        </div>
  
      </form>
    </BaseModal>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import BaseModal from '@/components/BaseModal.vue';
  
  const props = defineProps({
    show: Boolean
  });
  
  const emit = defineEmits(['close', 'refresh']);
  
  const vaccines = ref([]);
  const form = reactive({
    vaccine_id: '',
    quantity: '',
    reason: '',
    notes: ''
  });
  
  const handleClose = () => emit('close');
  
  const fetchVaccines = async () => {
    const { data, error } = await useFetch('/api/vaccination/list');
    if (!error.value) vaccines.value = data.value;
  };
  
  const submitWastedVaccine = async () => {
    const { error } = await useFetch('/api/vaccination/wasted', {
      method: 'POST',
      body: form
    });
  
    if (!error.value) {
      alert('Wasted vaccine reported successfully!');
      emit('refresh');
      handleClose();
    } else {
      alert('Error reporting wasted vaccine.');
      console.error(error.value);
    }
  };
  
  onMounted(fetchVaccines);
  </script>
  