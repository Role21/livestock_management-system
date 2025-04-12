<template>
    <div class="p-6">
      <h1 class="text-2xl font-semibold mb-4">My Profile</h1>
      <div v-if="pending">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error: {{ error.message }}</div>
      <div v-else class="bg-white p-4 rounded shadow w-full max-w-xl">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const { data: user, pending, error } = await useFetch('/api/auth/me')
  </script>
  