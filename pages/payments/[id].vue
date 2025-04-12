<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">{{ paymentType }} Payment Details</h1>
  
      <div v-if="paymentData">
        <div class="mb-4">
          <p><strong>{{ paymentType }}:</strong> {{ paymentData.name }}</p>
          <p><strong>Total Amount (৳):</strong> {{ paymentData.totalAmount }}</p>
          <p><strong>Paid (৳):</strong> {{ paymentData.paid }}</p>
          <p><strong>Due (৳):</strong> {{ paymentData.due }}</p>
        </div>
      </div>
  
      <div v-else>
        <p>Loading payment details...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const paymentType = route.params.type  // "supplier", "client", "staff"
  const id = route.params.id
  
  let paymentData = null
  
  if (paymentType === 'supplier') {
    const { data, error } = await useFetch(`/api/payments/supplier/${id}`)
    paymentData = data.value
    if (error.value) console.error('Error loading supplier data:', error.value)
  } else if (paymentType === 'client') {
    const { data, error } = await useFetch(`/api/payments/client/${id}`)
    paymentData = data.value
    if (error.value) console.error('Error loading client data:', error.value)
  } else if (paymentType === 'staff') {
    const { data, error } = await useFetch(`/api/payments/staff/${id}`)
    paymentData = data.value
    if (error.value) console.error('Error loading staff data:', error.value)
  }
  </script>
  