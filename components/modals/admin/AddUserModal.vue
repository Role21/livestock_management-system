<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="text-xl font-bold mb-4">Add New User</h2>
      
      <!-- Error message display -->
      <div v-if="errorMessage" class="text-red-600 mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Name</label>
          <input type="text" id="name" v-model="form.name" class="input" required />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input type="email" id="email" v-model="form.email" class="input" required />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Password</label>
          <input type="password" id="password" v-model="form.password" class="input" required />
        </div>

        <div class="mb-4">
          <label for="role" class="block text-sm font-medium">Role</label>
          <select id="role" v-model="form.role" class="input" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="flex space-x-4">
          <button type="submit" :disabled="loading" class="bg-blue-500 text-white px-4 py-2 rounded">
            <span v-if="loading">Adding...</span>
            <span v-else>Add User</span>
          </button>
          <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'user'  // default role is 'user'
})

const loading = ref(false)
const errorMessage = ref('')

const submitForm = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await useFetch('/api/profile/profile', {
      method: 'POST',
      body: form.value
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    // Reset the form fields after successful user creation
    form.value = { name: '', email: '', password: '', role: 'user' }
    
    // Close the modal after success
    $emit('close')

  } catch (error) {
    console.error('Error adding user:', error.message)
    errorMessage.value = 'Failed to add user. Please try again later.'
  } finally {
    loading.value = false
  }
}
</script>
