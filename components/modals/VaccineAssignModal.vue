<template>
    <BaseModal :show="show" @close="handleClose" title="Assign Vaccine">
      <form @submit.prevent="submitAssignment" class="space-y-4">
  
        <!-- Select Animal -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Animal</label>
          <select v-model="form.animal_id" required class="w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">Select animal</option>
            <option v-for="animal in animals" :key="animal.id" :value="animal.id">
              {{ animal.name }}
            </option>
          </select>
        </div>
  
        <!-- Select Vaccine -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Vaccine</label>
          <select v-model="form.vaccine_id" required class="w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">Select vaccine</option>
            <option v-for="vaccine in vaccines" :key="vaccine.id" :value="vaccine.id">
              {{ vaccine.name }}
            </option>
          </select>
        </div>
  
        <!-- Date -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Date</label>
          <input type="date" v-model="form.date" required class="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
  
        <!-- Notes -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Notes</label>
          <textarea v-model="form.notes" rows="3" class="w-full rounded-md border border-gray-300 px-3 py-2"></textarea>
        </div>
  
        <!-- Submit -->
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Assign Vaccine
          </button>
        </div>
  
      </form>
    </BaseModal>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, watch } from 'vue';
  import BaseModal from '@/components/BaseModal.vue';
  
  const props = defineProps({
    show: Boolean,
    initialData: Object
  });
  
  const emit = defineEmits(['close', 'refresh']);
  
  const handleClose = () => emit('close');
  
  const form = reactive({
    animal_id: '',
    vaccine_id: '',
    date: '',
    notes: ''
  });
  
  const animals = ref([]);
  const vaccines = ref([]);
  
  const fetchAnimals = async () => {
    const { data, error } = await useFetch('/api/animal/list');
    if (!error.value) animals.value = data.value;
  };
  
  const fetchVaccines = async () => {
    const { data, error } = await useFetch('/api/vaccination/list');
    if (!error.value) vaccines.value = data.value;
  };
  
  const submitAssignment = async () => {
    const { data, error } = await useFetch('/api/vaccination/assign', {
      method: 'POST',
      body: form
    });
  
    if (!error.value) {
      alert('Vaccine assigned successfully!');
      emit('refresh');
      handleClose();
    } else {
      alert('Error assigning vaccine.');
      console.error(error.value);
    }
  };
  
  watch(() => props.initialData, (val) => {
    if (val) {
      Object.assign(form, val);
    }
  });
  
  onMounted(() => {
    fetchAnimals();
    fetchVaccines();
  });
  </script>
  