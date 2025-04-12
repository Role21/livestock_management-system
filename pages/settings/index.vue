<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Settings</h1>
  
      <div class="mb-4">
        <button
          @click="createNew"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Setting
        </button>
      </div>
  
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="py-2 px-4 border-b">ID</th>
            <th class="py-2 px-4 border-b">Key</th>
            <th class="py-2 px-4 border-b">Value</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="setting in settings" :key="setting.id">
            <td class="py-2 px-4 border-b">{{ setting.id }}</td>
            <td class="py-2 px-4 border-b">{{ setting.key }}</td>
            <td class="py-2 px-4 border-b">{{ setting.value }}</td>
            <td class="py-2 px-4 border-b">
              <NuxtLink
                :to="`/settings/${setting.id}`"
                class="text-blue-600 hover:underline mr-2"
              >
                Edit
              </NuxtLink>
              <button @click="deleteSetting(setting.id)" class="text-red-600 hover:underline">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const settings = ref([])
  
  const fetchSettings = async () => {
    const res = await $fetch('/api/settings')
    settings.value = res
  }
  
  const deleteSetting = async (id) => {
    if (confirm('Are you sure?')) {
      await $fetch(`/api/settings/${id}`, { method: 'DELETE' })
      fetchSettings()
    }
  }
  
  const createNew = () => {
    navigateTo('/settings/new')
  }
  
  onMounted(fetchSettings)
  </script>
  