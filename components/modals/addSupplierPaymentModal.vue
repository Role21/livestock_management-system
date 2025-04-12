<template>
    <BaseModal @close="$emit('close')">
      <template #header>Add Supplier Payment</template>
  
      <template #body>
        <form @submit.prevent="$emit('submit', form)">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="font-semibold">Name</label>
              <input v-model="form.name" class="w-full p-2 border rounded" required />
            </div>
  
            <div>
              <label class="font-semibold">Due Amount</label>
              <input v-model.number="form.due" class="w-full p-2 border rounded" disabled />
            </div>
  
            <div>
              <label class="font-semibold">Amount*</label>
              <input v-model.number="form.amount" class="w-full p-2 border rounded" required type="number" />
            </div>
  
            <div>
              <label class="font-semibold">Paid By*</label>
              <select v-model="form.paidBy" class="w-full p-2 border rounded" required>
                <option disabled value="">Select</option>
                <option>Cash</option>
                <option>Cheque</option>
                <option>MPESA</option>
                <option>Bank Transfer</option>
              </select>
            </div>
  
            <div>
              <label class="font-semibold">Ref. No</label>
              <input v-model="form.refNo" class="w-full p-2 border rounded" />
            </div>
  
            <div>
              <label class="font-semibold">Date*</label>
              <input v-model="form.date" type="date" class="w-full p-2 border rounded" required />
            </div>
  
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="form.description" class="w-full p-2 border rounded" />
            </div>
  
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Payment
            </button>
          </div>
        </form>
      </template>
    </BaseModal>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const form = reactive({
    name: '',
    due: 0,
    amount: 0,
    paidBy: '',
    refNo: '',
    date: '',
    description: ''
  })
  </script>
  