<template>
    <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md mt-10">
      <h2 class="text-2xl font-semibold mb-4">Reset Password</h2>
      <form @submit.prevent="handleReset">
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div class="mb-4">
          <label for="confirm" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirm"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Reset Password
        </button>
        <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
        <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useFetch } from '#app';
  
  const route = useRoute();
  const router = useRouter();
  
  const token = route.query.token;
  const password = ref('');
  const confirmPassword = ref('');
  const message = ref('');
  const error = ref('');
  
  const handleReset = async () => {
    message.value = '';
    error.value = '';
  
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords don't match.";
      return;
    }
  
    const { data, error: err } = await useFetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token,
        password: password.value,
      },
    });
  
    if (err.value) {
      error.value = err.value.data?.error || 'Something went wrong';
    } else {
      message.value = data.value?.message || 'Password reset successfully!';
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  };
  </script>
  