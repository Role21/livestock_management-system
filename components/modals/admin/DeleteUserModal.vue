<template>
  <Modal :show="show" @close="onClose">
    <template #header>Delete User</template>
    <template #body>
      Are you sure you want to delete {{ user.name }}? This action cannot be undone.
    </template>
    <template #footer>
      <button :disabled="loading" class="text-red-600 px-4 py-2 rounded" @click="confirmDelete">
        <span v-if="loading">Deleting...</span>
        <span v-else>Delete</span>
      </button>
      <button class="bg-gray-500 text-white px-4 py-2 rounded" @click="onClose">Cancel</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

defineProps(['show', 'user']);
defineEmits(['close', 'deleted', 'error']);

const loading = ref(false)

async function confirmDelete() {
  loading.value = true

  try {
    // Make the API call to delete the user
    const res = await useFetch(`/api/profile/profile/${user.id}/delete`, {
      method: 'DELETE'
    })

    if (res.error) {
      throw new Error(res.error.message)
    }

    // Emit success event and close modal
    emit('deleted', user.id);
    emit('close');
  } catch (error) {
    // Handle error (show an error message to the admin)
    console.error('Error deleting user:', error.message)
    emit('error', 'Failed to delete the user. Please try again later.')
  } finally {
    loading.value = false
  }
}

function onClose() {
  emit('close')
}
</script>
