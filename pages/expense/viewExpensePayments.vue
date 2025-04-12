<template>
    <div class="p-4 space-y-4">
      <!-- Add New Payment Button -->
      <div class="flex justify-end">
        <button
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          @click="showAddModal = true"
        >
          Add New Payment
        </button>
      </div>
  
      <!-- Basic Expense Information -->
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Basic Information</h2>
        <div class="grid grid-cols-2 gap-4">
          <div><strong>Expense Name:</strong> {{ expense.name }}</div>
          <div><strong>Category:</strong> {{ expense.category }}</div>
          <div><strong>Expense Date:</strong> {{ expense.date }}</div>
          <div><strong>Expense ID:</strong> {{ expense.id }}</div>
          <div><strong>Note:</strong> {{ expense.note }}</div>
          <div><strong>Total Expense Amount:</strong> {{ expense.totalAmount }}</div>
          <div><strong>Total Paid Amount:</strong> {{ expense.totalPaid }}</div>
          <div><strong>Due Amount:</strong> {{ expense.dueAmount }}</div>
        </div>
      </div>
  
      <!-- Payments Table -->
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Payments</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">SL. No.</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Payment Date</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Paid Amount</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Paid By</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Cheque</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Note</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(payment, index) in payments"
              :key="payment.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ payment.date }}</td>
              <td class="px-4 py-2">{{ payment.amount }}</td>
              <td class="px-4 py-2">{{ payment.paidBy }}</td>
              <td class="px-4 py-2">{{ payment.cheque ?? '-' }}</td>
              <td class="px-4 py-2">{{ payment.note }}</td>
              <td class="px-4 py-2 space-x-2">
                <button
                  class="text-blue-600 hover:underline"
                  @click="editPayment(payment)"
                >Edit</button>
                <button
                  class="text-red-600 hover:underline"
                  @click="deletePayment(payment.id)"
                >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Add/Edit Payment Modal -->
      <Modal v-if="showAddModal || showEditModal" @close="closeModals">
        <template #title>
          {{ showEditModal ? 'Edit Payment' : 'Add New Payment' }}
        </template>
  
        <form class="space-y-4" @submit.prevent="submitPayment">
          <div>
            <label class="block mb-1">Expense Name</label>
            <input v-model="paymentForm.expenseName" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1">Due Amount</label>
            <input v-model="paymentForm.dueAmount" type="number" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1">Paid Amount*</label>
            <input v-model="paymentForm.paidAmount" type="number" required class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1">Paid By*</label>
            <select v-model="paymentForm.paidBy" required class="w-full border rounded px-3 py-2">
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="atm">ATM</option>
              <option value="mpesa">Mpesa</option>
            </select>
          </div>
          <div>
            <label class="block mb-1">Date*</label>
            <input v-model="paymentForm.date" type="date" required class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1">Description</label>
            <textarea v-model="paymentForm.note" class="w-full border rounded px-3 py-2"></textarea>
          </div>
  
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ showEditModal ? 'Update' : 'Add' }} Payment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Modal from '@/components/Modal.vue' // Assuming you have a Modal component
  
  const showAddModal = ref(false)
  const showEditModal = ref(false)
  const expense = ref({
    id: 'EXP123',
    name: 'Fuel Refill',
    category: 'Transportation',
    date: '2025-04-10',
    note: 'Monthly refill',
    totalAmount: 1000,
    totalPaid: 500,
    dueAmount: 500,
  })
  
  const payments = ref([
    { id: 1, date: '2025-04-10', amount: 200, paidBy: 'cash', cheque: '', note: 'Initial payment' },
    { id: 2, date: '2025-04-11', amount: 300, paidBy: 'mpesa', cheque: '', note: 'Follow-up' },
  ])
  
  const paymentForm = ref({
    expenseName: '',
    dueAmount: '',
    paidAmount: '',
    paidBy: '',
    date: '',
    note: '',
  })
  
  function closeModals() {
    showAddModal.value = false
    showEditModal.value = false
    paymentForm.value = { expenseName: '', dueAmount: '', paidAmount: '', paidBy: '', date: '', note: '' }
  }
  
  function editPayment(payment) {
    showEditModal.value = true
    paymentForm.value = { ...payment, paidAmount: payment.amount }
  }
  
  function deletePayment(id) {
    payments.value = payments.value.filter(p => p.id !== id)
  }
  
  function submitPayment() {
    if (showEditModal.value) {
      const index = payments.value.findIndex(p => p.id === paymentForm.value.id)
      if (index !== -1) {
        payments.value[index] = { ...paymentForm.value, amount: paymentForm.value.paidAmount }
      }
    } else {
      payments.value.push({
        id: Date.now(),
        date: paymentForm.value.date,
        amount: paymentForm.value.paidAmount,
        paidBy: paymentForm.value.paidBy,
        cheque: paymentForm.value.cheque || '',
        note: paymentForm.value.note,
      })
    }
    closeModals()
  }
  </script>
  
  <style scoped>
  input, select, textarea {
    background-color: #f9fafb;
  }
  </style>
  