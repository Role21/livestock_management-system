<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Expense List</h1>

    <!-- Summary Section -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="font-semibold">Total Expense Amount</label>
        <div class="p-2 border rounded bg-gray-50">{{ totalExpenseAmount }}</div>
      </div>
      <div>
        <label class="font-semibold">Total Paid Amount</label>
        <div class="p-2 border rounded bg-gray-50">{{ totalPaidAmount }}</div>
      </div>
      <div>
        <label class="font-semibold">Due Amount</label>
        <div class="p-2 border rounded bg-gray-50">{{ totalExpenseAmount - totalPaidAmount }}</div>
      </div>
      <div class="flex items-end justify-end">
        <button
          @click="isAddOpen = true"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Expense
        </button>
      </div>
    </div>

    <!-- Expense Table -->
    <table class="w-full table-auto border mt-4">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">SL. No.</th>
          <th class="p-2 border">Expense Name</th>
          <th class="p-2 border">Category</th>
          <th class="p-2 border">Amount</th>
          <th class="p-2 border">Paid</th>
          <th class="p-2 border">Date</th>
          <th class="p-2 border">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="expense.id">
          <td class="p-2 border">{{ index + 1 }}</td>
          <td class="p-2 border">{{ expense.name }}</td>
          <td class="p-2 border">{{ expense.category }}</td>
          <td class="p-2 border">{{ expense.amount }}</td>
          <td class="p-2 border">{{ expense.paid }}</td>
          <td class="p-2 border">{{ expense.date }}</td>
          <td class="p-2 border space-x-2">
            <button class="text-blue-600" @click="openEditModal(expense)">Edit</button>
            <button class="text-red-600" @click="deleteExpense(expense.id)">Delete</button>
            <button class="text-green-600" @click="navigateToPayments(expense.id)">Payments</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add New Expense Modal -->
    <BaseModal v-if="isAddOpen" @close="isAddOpen = false">
      <template #header>Add New Expense</template>
      <template #body>
        <form @submit.prevent="addExpense">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="font-semibold">Expense Id*</label>
              <input v-model="newForm.id" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Expense Name*</label>
              <input v-model="newForm.name" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Category*</label>
              <select v-model="newForm.category" class="w-full p-2 border rounded" required>
                <option disabled value="">Please Select Category</option>
                <option>AdminExpense</option>
                <option>Transport</option>
                <option>Daily Labour</option>
                <option>Vet Services</option>
                <option>Repairs</option>
              </select>
            </div>
            <div>
              <label class="font-semibold">Expense Amount*</label>
              <input v-model="newForm.amount" type="number" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Paid Amount</label>
              <input v-model="newForm.paid" type="number" class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="font-semibold">Paid By*</label>
              <select v-model="newForm.paidBy" class="w-full p-2 border rounded" required>
                <option disabled value="">Select Payment Method</option>
                <option>Cash</option>
                <option>Cheque</option>
                <option>ATM</option>
                <option>MPESA</option>
              </select>
            </div>
            <div>
              <label class="font-semibold">Expense Date*</label>
              <input v-model="newForm.date" type="date" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="newForm.description" class="w-full p-2 border rounded" />
            </div>
            <button type="submit" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Expense
            </button>
          </div>
        </form>
      </template>
    </BaseModal>

    <!-- Edit Expense Modal -->
    <BaseModal v-if="isEditOpen" @close="isEditOpen = false">
      <template #header>Edit Expense</template>
      <template #body>
        <form @submit.prevent="saveChanges">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="font-semibold">Expense Name*</label>
              <input v-model="editForm.name" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Category*</label>
              <input v-model="editForm.category" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Expense Amount*</label>
              <input v-model="editForm.amount" type="number" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Paid Amount</label>
              <input v-model="editForm.paid" type="number" class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="font-semibold">Paid By*</label>
              <input v-model="editForm.paidBy" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Expense Date*</label>
              <input v-model="editForm.date" type="date" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="editForm.description" class="w-full p-2 border rounded" />
            </div>
            <button type="submit" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '@/components/BaseModal.vue'

const router = useRouter()

const expenses = ref([])
const isLoading = ref(false)

const isAddOpen = ref(false)
const isEditOpen = ref(false)

const newForm = ref({
  id: '',
  name: '',
  category: '',
  amount: 0,
  paid: 0,
  paidBy: '',
  date: '',
  description: '',
})

const editForm = ref({})

// Fetch expenses from backend
const fetchExpenses = async () => {
  isLoading.value = true
  try {
    const data = await $fetch('/api/expense') // Adjust route if needed
    expenses.value = data
  } catch (error) {
    console.error('Error fetching expenses:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchExpenses)

const addExpense = async () => {
  try {
    await $fetch('/api/expense', {
      method: 'POST',
      body: newForm.value,
    })
    await fetchExpenses()
    isAddOpen.value = false
    resetNewForm()
  } catch (error) {
    console.error('Error adding expense:', error)
  }
}

const resetNewForm = () => {
  newForm.value = {
    id: '',
    name: '',
    category: '',
    amount: 0,
    paid: 0,
    paidBy: '',
    date: '',
    description: '',
  }
}

const openEditModal = (expense) => {
  editForm.value = { ...expense }
  isEditOpen.value = true
}

const saveChanges = async () => {
  try {
    await $fetch(`/api/expense/${editForm.value.id}`, {
      method: 'PUT',
      body: editForm.value,
    })
    await fetchExpenses()
    isEditOpen.value = false
  } catch (error) {
    console.error('Error updating expense:', error)
  }
}

const deleteExpense = async (id) => {
  if (confirm('Are you sure you want to delete this expense?')) {
    try {
      await $fetch(`/api/expense/expense/${id}`, {
        method: 'DELETE',
      })
      await fetchExpenses()
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }
}

const navigateToPayments = (expenseId) => {
  router.push(`/expense/expense/viewExpensePayments?id=${expenseId}`)
}

const totalExpenseAmount = computed(() =>
  expenses.value.reduce((sum, e) => sum + Number(e.amount), 0)
)

const totalPaidAmount = computed(() =>
  expenses.value.reduce((sum, e) => sum + Number(e.paid), 0)
)
</script><template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Expense List</h1>

    <!-- Summary Section -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="font-semibold">Total Expense Amount</label>
        <div class="p-2 border rounded bg-gray-50">{{ totalExpenseAmount }}</div>
      </div>
      <div>
        <label class="font-semibold">Total Paid Amount</label>
        <div class="p-2 border rounded bg-gray-50">{{ totalPaidAmount }}</div>
      </div>
      <div>
        <label class="font-semibold">Due Amount</label>
        <div class="p-2 border rounded bg-gray-50">{{ totalExpenseAmount - totalPaidAmount }}</div>
      </div>
      <div class="flex items-end justify-end">
        <button @click="isAddOpen = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Expense
        </button>
      </div>
    </div>

    <!-- Expense Table -->
    <table class="w-full table-auto border mt-4">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">SL. No.</th>
          <th class="p-2 border">Expense Name</th>
          <th class="p-2 border">Category</th>
          <th class="p-2 border">Amount</th>
          <th class="p-2 border">Paid</th>
          <th class="p-2 border">Date</th>
          <th class="p-2 border">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="expense.id">
          <td class="p-2 border">{{ index + 1 }}</td>
          <td class="p-2 border">{{ expense.name }}</td>
          <td class="p-2 border">{{ expense.category }}</td>
          <td class="p-2 border">{{ expense.amount }}</td>
          <td class="p-2 border">{{ expense.paid }}</td>
          <td class="p-2 border">{{ expense.date }}</td>
          <td class="p-2 border space-x-2">
            <button class="text-blue-600" @click="openEditModal(expense)">Edit</button>
            <button class="text-red-600" @click="deleteExpense(expense.id)">Delete</button>
            <button class="text-green-600" @click="navigateToPayments(expense.id)">Payments</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add New Expense Modal -->
    <BaseModal v-if="isAddOpen" @close="isAddOpen = false">
      <template #header>Add New Expense</template>
      <template #body>
        <form @submit.prevent="addExpense">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="font-semibold">Expense Name*</label>
              <input v-model="newForm.name" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Category*</label>
              <select v-model="newForm.category" class="w-full p-2 border rounded" required>
                <option disabled value="">Please Select Category</option>
                <option>AdminExpense</option>
                <option>Transport</option>
                <option>Daily Labour</option>
                <option>Vet Services</option>
                <option>Repairs</option>
              </select>
            </div>
            <div>
              <label class="font-semibold">Expense Amount*</label>
              <input v-model="newForm.amount" type="number" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Paid Amount</label>
              <input v-model="newForm.paid" type="number" class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="font-semibold">Paid By*</label>
              <select v-model="newForm.paidBy" class="w-full p-2 border rounded" required>
                <option disabled value="">Select Payment Method</option>
                <option>Cash</option>
                <option>Cheque</option>
                <option>ATM</option>
                <option>MPESA</option>
              </select>
            </div>
            <div>
              <label class="font-semibold">Expense Date*</label>
              <input v-model="newForm.date" type="date" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="newForm.description" class="w-full p-2 border rounded" />
            </div>
            <button type="submit" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Expense
            </button>
          </div>
        </form>
      </template>
    </BaseModal>

    <!-- Edit Expense Modal -->
    <BaseModal v-if="isEditOpen" @close="isEditOpen = false">
      <template #header>Edit Expense</template>
      <template #body>
        <form @submit.prevent="saveChanges">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="font-semibold">Expense Name*</label>
              <input v-model="editForm.name" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Category*</label>
              <input v-model="editForm.category" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Expense Amount*</label>
              <input v-model="editForm.amount" type="number" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Paid Amount</label>
              <input v-model="editForm.paid" type="number" class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="font-semibold">Paid By*</label>
              <input v-model="editForm.paidBy" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Expense Date*</label>
              <input v-model="editForm.date" type="date" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="editForm.description" class="w-full p-2 border rounded" />
            </div>
            <button type="submit" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '#app'
import BaseModal from '@/components/BaseModal.vue'

// Modal visibility and form states
const isAddOpen = ref(false)
const isEditOpen = ref(false)
const expenses = ref([])
const newForm = ref({
  name: '',
  category: '',
  amount: '',
  paid: '',
  paidBy: '',
  date: '',
  description: '',
})
const editForm = ref({ ...newForm.value })

// Fetch expenses
const fetchExpenses = async () => {
  try {
    const { data } = await useFetch('/api/expense/expenses')
    expenses.value = data
  } catch (error) {
    console.error('Error fetching expenses:', error)
  }
}

// Add new expense
const addExpense = async () => {
  try {
    await useFetch('/api/expense/expense', {
      method: 'POST',
      body: JSON.stringify(newForm.value),
    })
    fetchExpenses()
    isAddOpen.value = false
  } catch (error) {
    console.error('Error adding expense:', error)
  }
}

// Edit expense logic
const openEditModal = (expense) => {
  editForm.value = { ...expense }
  isEditOpen.value = true
}

const saveChanges = async () => {
  try {
    await useFetch(`/api/expense/expense/${editForm.value.id}`, {
      method: 'PUT',
      body: JSON.stringify(editForm.value),
    })
    fetchExpenses()
    isEditOpen.value = false
  } catch (error) {
    console.error('Error saving changes:', error)
  }
}

// Delete expense
const deleteExpense = async (id) => {
  try {
    await useFetch(`/api/expense/expense/${id}`, { method: 'DELETE' })
    fetchExpenses()
  } catch (error) {
    console.error('Error deleting expense:', error)
  }
}

// Payment navigation
const navigateToPayments = (expenseId) => {
  const router = useRouter()
  router.push(`/expense/payments/${expenseId}`)
}

// Fetch expenses on mount
fetchExpenses()
</script>


