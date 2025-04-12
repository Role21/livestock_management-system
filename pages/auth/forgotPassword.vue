<template>
    <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md mt-10">
      <h2 class="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
        <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
        <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useFetch } from '#app';
  
  const email = ref('');
  const message = ref('');
  const error = ref('');
  
  const handleSubmit = async () => {
    message.value = '';
    error.value = '';
  
    const { data, error: err } = await useFetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value },
    });
  
    if (err.value) {
      error.value = err.value.data?.error || 'Something went wrong';
    } else {
      message.value = data.value?.message || 'Reset link sent!';
    }
  };
  </script>
  