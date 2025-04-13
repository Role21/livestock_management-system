<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Expense Details</h1>

    <div v-if="expense" class="bg-white shadow rounded p-4 space-y-2">
      <p><strong>Expense ID:</strong> {{ expense.id }}</p>
      <p><strong>Name:</strong> {{ expense.name }}</p>
      <p><strong>Category:</strong> {{ expense.category }}</p>
      <p><strong>Total Amount:</strong> ৳{{ expense.amount }}</p>
      <p><strong>Paid:</strong> ৳{{ expense.paid }}</p>
      <p><strong>Due:</strong> ৳{{ expense.amount - expense.paid }}</p>
      <p><strong>Paid By:</strong> {{ expense.paidBy }}</p>
      <p><strong>Date:</strong> {{ expense.date }}</p>
      <p><strong>Description:</strong> {{ expense.description }}</p>
    </div>

    <p v-else-if="error" class="text-red-500">Failed to load expense: {{ error.statusMessage || 'Unknown error' }}</p>
    <p v-else class="text-gray-500">Loading expense details...</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useFetch } from '#app'
import { ref, onMounted } from 'vue'

const route = useRoute()
const expenseId = route.params.id
const expense = ref(null)
const error = ref(null)

const fetchExpense = async () => {
  try {
    const response = await useFetch(`/api/expense/expense/${expenseId}`)
    expense.value = response.data
  } catch (err) {
    error.value = err
    console.error('Error fetching expense:', err)
  }
}

onMounted(fetchExpense)
</script>
