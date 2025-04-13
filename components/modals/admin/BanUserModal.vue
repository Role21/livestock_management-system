<template>
  <Modal :show="show" @close="onClose">
    <template #header>Ban User</template>
    <template #body>
      Are you sure you want to ban {{ user.name }}?
    </template>
    <template #footer>
      <button @click="ban" class="bg-yellow-500 text-white px-4 py-2 rounded">Ban</button>
      <button @click="onClose" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

defineProps(['show', 'user']);
defineEmits(['close', 'banned', 'error']);

const loading = ref(false)

async function ban() {
  loading.value = true

  try {
    // Make the API call to ban the user
    const res = await useFetch(`/api/profile/profile/${user.id}/ban`, {
      method: 'POST'
    })

    if (res.error) {
      throw new Error(res.error.message)
    }

    // Emit success event and close modal
    emit('banned', user.id);
    emit('close');
  } catch (error) {
    // Handle error (show an error message to the admin)
    console.error('Error banning user:', error.message)
    emit('error', 'Failed to ban the user. Please try again later.')
  } finally {
    loading.value = false
  }
}

function onClose() {
  emit('close')
}
</script>
