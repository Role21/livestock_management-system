<template>
    <Modal :show="isOpen" @close="closeModal">
      <template #title>
        <h2 class="text-xl font-semibold">Add Production to Stock</h2>
      </template>
  
      <form @submit.prevent="submitForm" class="space-y-4">
        <h3 class="font-medium">Product Information</h3>
  
        <div class="grid grid-cols-2 gap-4">
          <InputField label="Product Name" v-model="form.productName" disabled />
          <InputField label="Category" v-model="form.category" disabled />
          <InputField label="Shed" v-model="form.shed" disabled />
          <InputField label="Batch" v-model="form.batch" disabled />
          <InputField label="Production Quantity *" v-model="form.quantity" required type="number" />
          <InputField label="Production Unit" v-model="form.unit" />
          <InputField label="Production Date *" v-model="form.date" required type="date" />
          <TextArea label="Description" v-model="form.description" />
        </div>
  
        <div class="text-right">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </Modal>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import Modal from '@/components/BaseModal.vue'
  import InputField from '@/components/common/InputField.vue'
  import TextArea from '@/components/common/TextArea.vue'
  
  const props = defineProps({
    isOpen: Boolean,
    product: Object,
  })
  
  const emit = defineEmits(['close', 'saved'])
  
  const form = ref({
    productName: '',
    category: '',
    shed: '',
    batch: '',
    quantity: '',
    unit: '',
    date: '',
    description: ''
  })
  
  watch(() => props.product, (product) => {
    if (product) {
      form.value = {
        productName: product.name,
        category: product.category,
        shed: product.shed,
        batch: product.batch,
        quantity: '',
        unit: '',
        date: '',
        description: ''
      }
    }
  }, { immediate: true })
  
  function closeModal() {
    emit('close')
  }
  
  function submitForm() {
    // You should validate and send this data to the API
    emit('saved', form.value)
    closeModal()
  }
  </script>
  