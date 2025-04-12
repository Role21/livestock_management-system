<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block mb-1">Name</label>
          <input v-model="form.name" type="text" class="w-full border px-3 py-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full border px-3 py-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block mb-1">Password</label>
          <input v-model="form.password" type="password" class="w-full border px-3 py-2 rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
      <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const form = ref({
    name: '',
    email: '',
    password: ''
  });
  const error = ref(null);
  
  async function handleRegister() {
    error.value = null;
    try {
      const { data } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: form.value
      });
  
      if (data.value?.error) {
        error.value = data.value.error;
      } else {
        router.push('/login');
      }
    } catch (err) {
      error.value = 'Something went wrong.';
    }
  }
  </script>
  