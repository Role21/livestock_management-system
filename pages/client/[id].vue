<template>
  <div class="p-6">
    <div v-if="pending">Loading client information...</div>
    <div v-else-if="error" class="text-red-500">Error: {{ error.message || error }}</div>
    <div v-else-if="client?.error" class="text-red-500">Error: {{ client.error }}</div>
    <div v-else class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center space-x-6 mb-4">
        <img
          :src="client.imageUrl || defaultImage"
          alt="Client Image"
          class="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 class="text-2xl font-semibold">{{ client.name }}</h2>
          <p class="text-gray-500">{{ client.email }}</p>
          <p class="text-gray-500">{{ client.phone }}</p>
        </div>
      </div>
      <div class="space-y-2">
        <p><strong>Address:</strong> {{ client.address }}</p>
        <p><strong>Description:</strong> {{ client.description }}</p>
      </div>
      <div class="mt-6">
        <NuxtLink
          :to="`/payments/viewClientWisePayment?id=${client.id}`"
          class="text-blue-600 hover:underline"
        >
          View Ledger
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const clientId = route.params.id
const defaultImage = '/default-avatar.png' // Place a placeholder image in public/ folder

const { data: client, pending, error } = await useFetch(`/api/clients/${clientId}`, {
  key: `client-${clientId}`,
})
</script>
