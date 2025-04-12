<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <h3 class="text-lg font-bold mb-4">Edit Variant</h3>
  
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block mb-1 font-medium">Livestock Type *</label>
            <input v-model="form.typeTitle" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
  
          <div class="mb-4">
            <label class="block mb-1 font-medium">Description</label>
            <textarea v-model="form.description" class="w-full border rounded px-3 py-2" rows="3" />
          </div>
  
          <div class="flex justify-end space-x-2">
            <button type="button" @click="onClose" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    show: Boolean,
    variantData: Object,
  });
  const emit = defineEmits(['update:show', 'updated']);
  
  const form = ref({
    typeTitle: props.variantData?.typeTitle || '',
    description: props.variantData?.description || '',
  });
  
  watch(() => props.variantData, (newVal) => {
    form.value = {
      typeTitle: newVal?.typeTitle || '',
      description: newVal?.description || '',
    };
  });
  
  const onClose = () => {
    emit('update:show', false);
  };
  
  const submitForm = async () => {
    try {
      await $fetch(`/api/livestock/variant/${props.variantData.id}`, {
        method: 'PUT',
        body: form.value,
      });
      emit('updated');
      onClose();
    } catch (error) {
      alert('Failed to update variant: ' + error.message);
    }
  };
  </script>
  