<template>
    <div class="flex items-center justify-center h-screen">
      <div class="text-center">
        <p class="text-lg font-semibold">Logging you out...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const auth = useAuth(); // use composable you created: useAuth()
  
  onMounted(async () => {
    await useFetch('/api/auth/logout', { method: 'POST' });
    auth.value = null; // clear global auth state
    router.push('/login'); // redirect to login
  });
  </script>
  