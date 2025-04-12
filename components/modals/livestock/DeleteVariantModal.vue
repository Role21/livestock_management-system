<template>
    <Dialog :open="show" @close="closeModal">
      <DialogPanel class="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <DialogTitle class="text-lg font-semibold text-gray-800 mb-4">Delete Variant</DialogTitle>
        <p class="text-sm text-gray-600 mb-6">
          Are you sure you want to delete the variant "<strong>{{ variant?.type_title }}</strong>"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button @click="closeModal" class="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button @click="deleteVariant" class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
  
  const props = defineProps({
    show: Boolean,
    variant: Object
  })
  
  const emit = defineEmits(['close', 'deleted'])
  
  const closeModal = () => {
    emit('close')
  }
  
  const deleteVariant = async () => {
    try {
      const res = await $fetch(`/api/livestock/variant/${props.variant.id}`, {
        method: 'DELETE'
      })
      emit('deleted', props.variant.id)
      closeModal()
    } catch (err) {
      console.error('Delete failed', err)
    }
  }
  </script>
  