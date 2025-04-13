<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-xl font-bold mb-4">
        {{ adminMode ? 'Edit User (Admin)' : 'Edit My Profile' }}
      </h2>

      <form @submit.prevent="submitForm">
        <!-- Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Name</label>
          <input v-model="form.name" type="text" class="w-full border px-3 py-2 rounded" required />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full border px-3 py-2 rounded" required />
        </div>

        <!-- Only for admin -->
        <div v-if="adminMode" class="mb-4">
          <label class="block text-sm font-medium mb-1">Role</label>
          <select v-model="form.role" class="w-full border px-3 py-2 rounded">
            <option value="user">User</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <!-- Avatar (optional) -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Avatar URL</label>
          <input v-model="form.avatar" type="text" class="w-full border px-3 py-2 rounded" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 mt-6">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button 
            type="submit" 
            :disabled="loading" 
            class="px-4 py-2 bg-blue-600 text-white rounded"
          >
            <span v-if="loading">Updating...</span>
            <span v-else>{{ adminMode ? 'Update User' : 'Save Changes' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps({
  user: Object,
  adminMode: Boolean
})

defineEmits(['close', 'updated'])

const form = reactive({
  name: props.user?.name || '',
  email: props.user?.email || '',
  role: props.user?.role || 'user',
  avatar: props.user?.avatar || ''
})

const loading = ref(false)

const submitForm = async () => {
  loading.value = true

  try {
    const payload = { ...form, id: props.user.id }

    // Replace with your actual update API logic
    const res = await $fetch('/api/profile/update', {
      method: 'POST',
      body: payload
    })

    if (res.error) {
      throw new Error(res.error.message)
    }

    emit('updated')
    emit('close')
  } catch (err) {
    console.error('Failed to update user:', err)
    alert('An error occurred while updating the profile. Please try again later.')
  } finally {
    loading.value = false
  }
}
</script>
