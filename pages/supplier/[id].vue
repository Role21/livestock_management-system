<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Supplier Details</h1>
  
      <div v-if="supplier">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Name:</strong> {{ supplier.name }}</div>
          <div><strong>Email:</strong> {{ supplier.email }}</div>
          <div><strong>Phone:</strong> {{ supplier.phone }}</div>
          <div><strong>Address:</strong> {{ supplier.address }}</div>
        </div>
        <div class="mt-6">
          <button class="bg-blue-600 text-white px-4 py-2 rounded mr-2" @click="isEditOpen = true">Edit</button>
          <button class="bg-red-600 text-white px-4 py-2 rounded" @click="deleteSupplier">Delete</button>
        </div>
      </div>
  
      <BaseModal v-if="isEditOpen" @close="isEditOpen = false">
        <template #header>Edit Supplier</template>
        <template #body>
          <add-supplier-modal :supplier="supplier" is-edit @close="isEditOpen = false" />
        </template>
      </BaseModal>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AddSupplierModal from '@/components/modal/addSupplierModal.vue'
  import BaseModal from '@/components/BaseModal.vue'
  
  const route = useRoute()
  const router = useRouter()
  const isEditOpen = ref(false)
  const supplier = ref(null)
  
  onMounted(async () => {
    const res = await fetch(`/api/supplier/${route.params.id}`)
    supplier.value = await res.json()
  })
  
  const deleteSupplier = async () => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      await fetch(`/api/supplier/${route.params.id}`, { method: 'DELETE' })
      router.push('/supplier/listSupplier')
    }
  }
  </script>
  