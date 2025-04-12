<template>
    <div class="p-6 max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">
        {{ isNew ? 'Add New Setting' : 'Edit Setting' }}
      </h1>
  
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block font-semibold">Key</label>
          <input
            v-model="form.key"
            class="w-full p-2 border rounded"
            type="text"
            required
          />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold">Value</label>
          <input
            v-model="form.value"
            class="w-full p-2 border rounded"
            type="text"
            required
          />
        </div>
  
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {{ isNew ? 'Create' : 'Update' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  const id = route.params.id
  const isNew = computed(() => id === 'new')
  
  const form = ref({
    key: '',
    value: '',
  })
  
  const loadSetting = async () => {
    if (!isNew.value) {
      const data = await $fetch(`/api/settings/${id}`)
      form.value = {
        key: data.key,
        value: data.value,
      }
    }
  }
  
  const handleSubmit = async () => {
    if (isNew.value) {
      await $fetch('/api/settings', {
        method: 'POST',
        body: form.value,
      })
    } else {
      await $fetch(`/api/settings/${id}`, {
        method: 'PUT',
        body: form.value,
      })
    }
    router.push('/settings')
  }
  
  onMounted(loadSetting)
  </script>
  