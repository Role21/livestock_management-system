<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="login">
          <input v-model="form.email" type="email" placeholder="Email" class="w-full p-2 mb-4 border rounded" required />
          <input v-model="form.password" type="password" placeholder="Password" class="w-full p-2 mb-4 border rounded" required />
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
          <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuth } from '@/composables/useAuth';
  
  const router = useRouter();
  const form = ref({ email: '', password: '' });
  const error = ref('');
  const auth = useAuth();
  
  const login = async () => {
    error.value = '';
  
    const { data } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: form.value,
    });
  
    if (data.value?.error) {
      error.value = data.value.error;
      return;
    }
  
    const user = data.value?.user;
  
    if (!user || !user.role) {
      error.value = 'Invalid user data returned from server.';
      return;
    }
  
    // Store user globally
    auth.value = user;
  
    // Role-based redirection
    switch (user.role) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'manager':
        router.push('/manager/home');
        break;
      default:
        router.push('/');
    }
  };
  </script>
  