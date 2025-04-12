<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center">
        <h3 class="text-lg font-bold mb-4">Delete Variant</h3>
        <p class="mb-6">Are you sure you want to delete this variant?</p>
        <div class="flex justify-center space-x-3">
          <button @click="onClose" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          <button @click="confirmDelete" class="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    show: Boolean,
    variantId: Number,
  });
  const emit = defineEmits(['update:show', 'deleted']);
  
  const onClose = () => {
    emit('update:show', false);
  };
  
  const confirmDelete = async () => {
    try {
      await $fetch(`/api/livestock/variant/${props.variantId}`, {
        method: 'DELETE',
      });
      emit('deleted');
      onClose();
    } catch (error) {
      alert('Failed to delete variant: ' + error.message);
    }
  };
  </script>
  