<template>
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="font-semibold">Name*</label>
          <input v-model="form.name" class="w-full p-2 border rounded" required />
        </div>
  
        <div>
          <label class="font-semibold">Email*</label>
          <input v-model="form.email" type="email" class="w-full p-2 border rounded" required />
        </div>
  
        <div>
          <label class="font-semibold">Phone*</label>
          <input v-model="form.phone" type="text" class="w-full p-2 border rounded" required />
        </div>
  
        <div>
          <label class="font-semibold">Address</label>
          <textarea v-model="form.address" class="w-full p-2 border rounded" />
        </div>
  
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ isEdit ? 'Update' : 'Save' }} Supplier
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    isEdit: Boolean,
    supplier: Object
  })
  
  const emit = defineEmits(['close'])
  
  const form = ref({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  
  watch(() => props.supplier, (newVal) => {
    if (props.isEdit && newVal) {
      form.value = { ...newVal }
    }
  }, { immediate: true })
  
  const handleSubmit = async () => {
    const method = props.isEdit ? 'PUT' : 'POST'
    const url = props.isEdit ? `/api/supplier/${props.supplier.id}` : '/api/supplier'
  
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
  
    emit('close')
  }
  </script>
  