<template>
    <BaseModal :show="show" title="Vaccine Purchase Invoice" @close="$emit('close')">
      <div v-if="loading" class="text-center text-gray-600">Loading invoice...</div>
  
      <div v-else-if="invoice" class="space-y-4 text-gray-800">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><span class="font-semibold">Invoice #:</span> {{ invoice.id }}</p>
            <p><span class="font-semibold">Supplier:</span> {{ invoice.supplier_name }}</p>
            <p><span class="font-semibold">Date:</span> {{ formatDate(invoice.purchase_date) }}</p>
          </div>
          <div>
            <p><span class="font-semibold">Total Amount:</span> ${{ invoice.total_amount.toFixed(2) }}</p>
            <p><span class="font-semibold">Payment Status:</span> {{ invoice.payment_status }}</p>
          </div>
        </div>
  
        <hr class="my-4 border-gray-300" />
  
        <div>
          <h3 class="text-lg font-semibold mb-2">Vaccines Purchased:</h3>
          <table class="w-full table-auto border border-gray-300 text-sm">
            <thead class="bg-gray-100 text-left">
              <tr>
                <th class="p-2 border">Vaccine Name</th>
                <th class="p-2 border">Batch No.</th>
                <th class="p-2 border">Qty</th>
                <th class="p-2 border">Price</th>
                <th class="p-2 border">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in invoice.items" :key="item.id" class="border-t">
                <td class="p-2 border">{{ item.vaccine_name }}</td>
                <td class="p-2 border">{{ item.batch_no }}</td>
                <td class="p-2 border">{{ item.quantity }}</td>
                <td class="p-2 border">${{ item.price.toFixed(2) }}</td>
                <td class="p-2 border">${{ (item.quantity * item.price).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="flex justify-end mt-4">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            @click="downloadPDF"
          >
            Download PDF
          </button>
        </div>
      </div>
  
      <div v-else class="text-red-500 text-center">Invoice not found.</div>
    </BaseModal>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useFetch } from '#app'
  import BaseModal from '~/components/BaseModal.vue'
  
  const props = defineProps({
    show: Boolean,
    invoiceId: Number
  })
  
  const emit = defineEmits(['close'])
  
  const invoice = ref(null)
  const loading = ref(false)
  
  watch(
    () => props.show,
    async (val) => {
      if (val && props.invoiceId) {
        loading.value = true
        try {
          const { data } = await useFetch(`/api/vaccination/purchase/${props.invoiceId}`)
          invoice.value = data.value
        } catch (e) {
          invoice.value = null
        } finally {
          loading.value = false
        }
      }
    },
    { immediate: true }
  )
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }
  
  const downloadPDF = () => {
    window.open(`/api/vaccination/purchase/${props.invoiceId}/pdf`, '_blank')
  }
  </script>
  