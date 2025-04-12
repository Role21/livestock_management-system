<template>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-red-600">Confirm Deletion</h2>
        </template>
        <div class="text-sm text-gray-700 mb-4">
          Are you sure you want to delete this {{ itemType }}? This action cannot be undone.
        </div>
        <div class="flex justify-end gap-2">
          <UButton @click="confirmDelete" color="red" variant="solid">Delete</UButton>
          <UButton @click="isOpen = false" color="gray">Cancel</UButton>
        </div>
      </UCard>
    </UModal>
  </template>
  
  <script setup>
  const props = defineProps(['isOpen', 'itemType']) // itemType can be 'livestock' or 'variant'
  const emit = defineEmits(['confirm', 'update:isOpen'])
  
  function confirmDelete() {
    emit('confirm')
    emit('update:isOpen', false)
  }
  </script>
  