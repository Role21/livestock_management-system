<template>
    <BaseModal @close="$emit('close')">
      <template #header>Edit Supplier Payment</template>
  
      <template #body>
        <form @submit.prevent="$emit('submit', form)">
          <div class="grid grid-cols-1 gap-4">
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
  
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Update Payment
            </button>
          </div>
        </form>
      </template>
    </BaseModal>
  </template>
  
  <script setup>
  import { reactive, defineProps } from 'vue'
  
  const props = defineProps({
    existing: Object
  })
  
  const form = reactive({ ...props.existing })
  </script>
  