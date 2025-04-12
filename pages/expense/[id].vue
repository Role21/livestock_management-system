<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Expense Details</h1>
      <div v-if="expense" class="bg-white shadow rounded p-4">
        <p><strong>Expense ID:</strong> {{ expense.id }}</p>
        <p><strong>Name:</strong> {{ expense.name }}</p>
        <p><strong>Category:</strong> {{ expense.category }}</p>
        <p><strong>Total Amount:</strong> ৳{{ expense.amount }}</p>
        <p><strong>Paid:</strong> ৳{{ expense.paid }}</p>
        <p><strong>Due:</strong> ৳{{ expense.amount - expense.paid }}</p>
      </div>
      <p v-else class="text-red-500">Expense not found.</p>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const { data: expense, error } = await useFetch(`/api/expenses/${route.params.id}`)
  
  if (error.value) console.error('Error loading expense details:', error.value)
  </script>
  