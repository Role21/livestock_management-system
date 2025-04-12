<template>
    <div class="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
      <h1 class="text-3xl font-bold mb-6 text-blue-700">Vaccination Details Overview</h1>
  
      <div v-if="loading" class="text-gray-500">Loading...</div>
  
      <div v-else>
        <!-- Vaccination List Record -->
        <div v-if="vaccination" class="mb-8">
          <h2 class="text-xl font-semibold text-blue-600 mb-2">Vaccination Record</h2>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>ID:</strong> {{ vaccination.id }}</p>
            <p><strong>Animal ID:</strong> {{ vaccination.animal_id }}</p>
            <p><strong>Type:</strong> {{ vaccination.type }}</p>
            <p><strong>Date:</strong> {{ formatDate(vaccination.date) }}</p>
            <p class="col-span-2"><strong>Notes:</strong> {{ vaccination.notes || 'No notes provided' }}</p>
          </div>
        </div>
  
        <!-- Vaccination Purchase -->
        <div v-if="purchase" class="mb-8">
          <h2 class="text-xl font-semibold text-blue-600 mb-2">Vaccination Purchase</h2>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>ID:</strong> {{ purchase.id }}</p>
            <p><strong>Vaccine Name:</strong> {{ purchase.vaccine_name }}</p>
            <p><strong>Vendor:</strong> {{ purchase.vendor }}</p>
            <p><strong>Cost:</strong> ${{ purchase.cost }}</p>
            <p><strong>Quantity:</strong> {{ purchase.quantity }}</p>
            <p><strong>Purchase Date:</strong> {{ formatDate(purchase.purchase_date) }}</p>
          </div>
        </div>
  
        <!-- Vaccination Schedule -->
        <div v-if="schedule" class="mb-8">
          <h2 class="text-xl font-semibold text-blue-600 mb-2">Vaccination Schedule</h2>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>ID:</strong> {{ schedule.id }}</p>
            <p><strong>Animal ID:</strong> {{ schedule.animal_id }}</p>
            <p><strong>Scheduled Date:</strong> {{ formatDate(schedule.scheduled_date) }}</p>
            <p><strong>Vaccine:</strong> {{ schedule.vaccine_type }}</p>
          </div>
        </div>
  
        <!-- Vaccination Routing -->
        <div v-if="routing" class="mb-4">
          <h2 class="text-xl font-semibold text-blue-600 mb-2">Vaccination Routing</h2>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>ID:</strong> {{ routing.id }}</p>
            <p><strong>Location:</strong> {{ routing.location }}</p>
            <p><strong>Route Date:</strong> {{ formatDate(routing.route_date) }}</p>
            <p><strong>Responsible Staff:</strong> {{ routing.staff_name }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import { useFetch } from '#app'
  
  const route = useRoute()
  const id = route.params.id
  
  const vaccination = ref(null)
  const purchase = ref(null)
  const schedule = ref(null)
  const routing = ref(null)
  const loading = ref(true)
  
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateStr).toLocaleDateString(undefined, options)
  }
  
  onMounted(async () => {
    try {
      const [{ data: vaxData }, { data: purData }, { data: schedData }, { data: routeData }] = await Promise.all([
        useFetch(`/api/vaccination/${id}`),
        useFetch(`/api/vaccination/purchase/${id}`),
        useFetch(`/api/vaccination/schedule/${id}`),
        useFetch(`/api/vaccination/routing/${id}`)
      ])
  
      vaccination.value = vaxData.value
      purchase.value = purData.value
      schedule.value = schedData.value
      routing.value = routeData.value
    } catch (err) {
      console.error('Failed to load one or more vaccination details:', err)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  /* Optional scoped styles */
  </style>
  