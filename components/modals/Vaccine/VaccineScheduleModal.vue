<template>
    <BaseModal :show="show" @close="handleClose" title="Schedule Vaccine">
      <form @submit.prevent="submitSchedule" class="space-y-4">
  
        <!-- Select Animal -->
        <div>
          <label class="block text-sm font-medium mb-1">Animal</label>
          <select v-model="form.animal_id" required class="w-full border rounded px-3 py-2">
            <option value="">Select Animal</option>
            <option v-for="animal in animals" :key="animal.id" :value="animal.id">
              {{ animal.name }}
            </option>
          </select>
        </div>
  
        <!-- Select Vaccine -->
        <div>
          <label class="block text-sm font-medium mb-1">Vaccine</label>
          <select v-model="form.vaccine_id" required class="w-full border rounded px-3 py-2">
            <option value="">Select Vaccine</option>
            <option v-for="v in vaccines" :key="v.id" :value="v.id">
              {{ v.name }}
            </option>
          </select>
        </div>
  
        <!-- Scheduled Date -->
        <div>
          <label class="block text-sm font-medium mb-1">Scheduled Date</label>
          <input type="date" v-model="form.date" required class="w-full border rounded px-3 py-2" />
        </div>
  
        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium mb-1">Notes</label>
          <textarea v-model="form.notes" rows="3" class="w-full border rounded px-3 py-2" />
        </div>
  
        <!-- Submit -->
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Schedule Vaccine
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
  const animals = ref([]);
  
  const form = reactive({
    animal_id: '',
    vaccine_id: '',
    date: '',
    notes: ''
  });
  
  const handleClose = () => emit('close');
  
  const fetchVaccines = async () => {
    const { data } = await useFetch('/api/vaccination/list');
    vaccines.value = data.value || [];
  };
  
  const fetchAnimals = async () => {
    const { data } = await useFetch('/api/animal/list');
    animals.value = data.value || [];
  };
  
  const submitSchedule = async () => {
    const { error } = await useFetch('/api/vaccination/schedule', {
      method: 'POST',
      body: form
    });
  
    if (!error.value) {
      alert('Vaccine scheduled successfully!');
      emit('refresh');
      handleClose();
    } else {
      alert('Failed to schedule vaccine');
      console.error(error.value);
    }
  };
  
  onMounted(() => {
    fetchVaccines();
    fetchAnimals();
  });
  </script>
  