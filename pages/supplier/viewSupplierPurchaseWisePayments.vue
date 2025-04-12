<template>
    <div class="p-6">
      <h1 class="text-xl font-bold mb-4">Payments for Purchase #{{ route.query.id }}</h1>
      <table class="w-full table-auto border">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">SL. No.</th>
            <th class="p-2 border">Payment Date</th>
            <th class="p-2 border">Amount</th>
            <th class="p-2 border">Paid By</th>
            <th class="p-2 border">Cheque</th>
            <th class="p-2 border">Ref No</th>
            <th class="p-2 border">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, i) in payments" :key="i">
            <td class="p-2 border">{{ i + 1 }}</td>
            <td class="p-2 border">{{ payment.date }}</td>
            <td class="p-2 border">{{ payment.amount }}</td>
            <td class="p-2 border">{{ payment.paidBy }}</td>
            <td class="p-2 border">{{ payment.cheque }}</td>
            <td class="p-2 border">{{ payment.ref }}</td>
            <td class="p-2 border">
              <button @click="deletePayment(payment.id)" class="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const payments = ref([])
  
  const fetchPayments = async () => {
    const purchaseId = route.query.id
    payments.value = await $fetch(`/api/supplier/payments/purchase/${purchaseId}`)
  }
  
  const deletePayment = async (id) => {
    if (confirm('Delete this payment?')) {
      await $fetch(`/api/supplier/payments/${id}`, { method: 'DELETE' })
      fetchPayments()
    }
  }
  
  onMounted(fetchPayments)
  </script>
  