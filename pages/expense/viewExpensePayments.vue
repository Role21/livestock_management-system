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
    <div v-if="expense" class="bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold mb-4">Basic Information</h2>
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Expense Name:</strong> {{ expense.name }}</div>
        <div><strong>Category:</strong> {{ expense.category }}</div>
        <div><strong>Expense Date:</strong> {{ expense.date }}</div>
        <div><strong>Expense ID:</strong> {{ expense.id }}</div>
        <div><strong>Description:</strong> {{ expense.description }}</div>
        <div><strong>Total Expense Amount:</strong> ৳{{ expense.amount }}</div>
        <div><strong>Total Paid Amount:</strong> ৳{{ expense.paid }}</div>
        <div><strong>Due Amount:</strong> ৳{{ expense.amount - expense.paid }}</div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold mb-4">Payments</h2>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2">SL. No.</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2">Amount</th>
            <th class="px-4 py-2">Paid By</th>
            <th class="px-4 py-2">Cheque</th>
            <th class="px-4 py-2">Note</th>
            <th class="px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in payments" :key="payment.id">
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ payment.date }}</td>
            <td class="px-4 py-2">৳{{ payment.amount }}</td>
            <td class="px-4 py-2">{{ payment.paidBy }}</td>
            <td class="px-4 py-2">{{ payment.cheque || '-' }}</td>
            <td class="px-4 py-2">{{ payment.note }}</td>
            <td class="px-4 py-2 space-x-2">
              <button class="text-blue-600 hover:underline" @click="editPayment(payment)">Edit</button>
              <button class="text-red-600 hover:underline" @click="deletePayment(payment.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Inline Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
        <h2 class="text-xl font-semibold mb-4">
          {{ showEditModal ? 'Edit Payment' : 'Add New Payment' }}
        </h2>

        <button @click="closeModals" class="absolute top-2 right-3 text-gray-400 hover:text-black text-2xl">&times;</button>

        <form class="space-y-4" @submit.prevent="submitPayment">
          <div>
            <label class="block mb-1">Paid Amount*</label>
            <input v-model.number="paymentForm.amount" type="number" required class="w-full border rounded px-3 py-2" />
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
            <label class="block mb-1">Cheque (Optional)</label>
            <input v-model="paymentForm.cheque" type="text" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1">Date*</label>
            <input v-model="paymentForm.date" type="date" required class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1">Note</label>
            <textarea v-model="paymentForm.note" class="w-full border rounded px-3 py-2"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ showEditModal ? 'Update' : 'Add' }} Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const expenseId = route.params.id
const showAddModal = ref(false)
const showEditModal = ref(false)

const expense = ref(null)
const payments = ref([])

const paymentForm = ref({
  amount: '',
  paidBy: '',
  cheque: '',
  date: '',
  note: '',
})

const fetchExpense = async () => {
  const res = await fetch(`/api/expense/${expenseId}`)
  const data = await res.json()
  expense.value = data
}

const fetchPayments = async () => {
  // First fetch the expense data to get the list of payment IDs
  const res = await fetch(`/api/expense/${expenseId}`)
  const expenseData = await res.json()
  expense.value = expenseData

  // Fetch individual payments using the array of payment IDs
  if (Array.isArray(expenseData.payments)) {
    const paymentPromises = expenseData.payments.map(id =>
      fetch(`/api/payment/${id}`).then(res => res.json())
    )
    payments.value = await Promise.all(paymentPromises)
  } else {
    payments.value = []
  }
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  paymentForm.value = { amount: '', paidBy: '', cheque: '', date: '', note: '' }
}

const editPayment = (payment) => {
  showEditModal.value = true
  paymentForm.value = { ...payment }
}

const deletePayment = async (id) => {
  await fetch(`/api/expense/${expenseId}/payments/${id}`, { method: 'DELETE' })
  await fetchExpense()
  await fetchPayments()
}

const submitPayment = async () => {
  const method = showEditModal.value ? 'PUT' : 'POST'
  const url = showEditModal.value
    ? `/api/expense/${expenseId}/payments/${paymentForm.value.id}`
    : `/api/expense/${expenseId}/payments`

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentForm.value),
  })

  closeModals()
  await fetchExpense()
  await fetchPayments()
}

onMounted(async () => {
  await fetchExpense()
  await fetchPayments()
})
</script>


<style scoped>
input, select, textarea {
  background-color: #f9fafb;
}
</style>
