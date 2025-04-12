<template>
    <BaseModal :show="show" @close="$emit('close')">
      <template #header>Add Supplier Payment</template>
      <template #body>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="font-semibold">Name</label>
              <input v-model="form.name" type="text" class="w-full border p-2 rounded" />
            </div>
            <div>
              <label class="font-semibold">Due Amount</label>
              <input v-model="form.due" type="number" class="w-full border p-2 rounded" />
            </div>
            <div>
              <label class="font-semibold">Amount*</label>
              <input v-model="form.amount" type="number" class="w-full border p-2 rounded" required />
            </div>
            <div>
              <label class="font-semibold">Paid By*</label>
              <select v-model="form.paidBy" class="w-full border p-2 rounded" required>
                <option disabled value="">Select Method</option>
                <option>Cash</option>
                <option>Cheque</option>
                <option>MPESA</option>
                <option>Bank</option>
              </select>
            </div>
            <div>
              <label class="font-semibold">Ref. No</label>
              <input v-model="form.refNo" type="text" class="w-full border p-2 rounded" />
            </div>
            <div>
              <label class="font-semibold">Date*</label>
              <input v-model="form.date" type="date" class="w-full border p-2 rounded" required />
            </div>
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="form.description" class="w-full border p-2 rounded"></textarea>
            </div>
          </div>
          <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </template>
    </BaseModal>
  </template>
  
  <script setup>
  const props = defineProps(['show', 'supplierId'])
  const emit = defineEmits(['close', 'saved'])
  
  const form = reactive({
    name: '',
    due: 0,
    amount: '',
    paidBy: '',
    refNo: '',
    date: '',
    description: '',
  })
  
  const submitForm = async () => {
    try {
      await $fetch(`/api/supplier/supplier`, {
        method: 'POST',
        body: {
          supplierId: props.supplierId,
          ...form,
        },
      })
      emit('saved')
      emit('close')
    } catch (err) {
      alert('Error saving payment: ' + err.message)
    }
  }
  </script>