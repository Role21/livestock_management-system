<template>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-red-600">Delete Livestock</h2>
        </template>
        <p class="text-sm text-gray-700 mb-4">
          Are you sure you want to delete <strong>{{ livestock?.name }}</strong>? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-3">
          <UButton color="red" @click="handleDelete">Delete</UButton>
          <UButton color="gray" @click="emit('update:isOpen', false)">Cancel</UButton>
        </div>
      </UCard>
    </UModal>
  </template>
  
  <script setup>
  const props = defineProps({
    isOpen: Boolean,
    livestock: Object,
  })
  const emit = defineEmits(['delete', 'update:isOpen'])
  
  const handleDelete = () => {
    emit('delete', props.livestock.id)
    emit('update:isOpen', false)
  }
  </script>
  