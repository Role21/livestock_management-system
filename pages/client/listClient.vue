<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Clients</h1>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          @click="openModalForAdd"
        >
          Add New Client
        </button>
      </div>
  
      <!-- Clients Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border">SL No</th>
              <th class="py-2 px-4 border">Image</th>
              <th class="py-2 px-4 border">Name</th>
              <th class="py-2 px-4 border">Email</th>
              <th class="py-2 px-4 border">Phone</th>
              <th class="py-2 px-4 border">Address</th>
              <th class="py-2 px-4 border">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, index) in clients" :key="client.id" class="border-t">
              <td class="py-2 px-4">{{ index + 1 }}</td>
              <td class="py-2 px-4">
                <img :src="client.imageUrl" alt="Client Image" class="w-12 h-12 rounded-full object-cover" />
              </td>
              <td class="py-2 px-4">{{ client.name }}</td>
              <td class="py-2 px-4">{{ client.email }}</td>
              <td class="py-2 px-4">{{ client.phone }}</td>
              <td class="py-2 px-4">{{ client.address }}</td>
              <td class="py-2 px-4 flex gap-2">
                <button class="text-blue-600 hover:underline" @click="openModalForEdit(client)">Edit</button>
                <button class="text-gray-400 cursor-not-allowed">Delete</button>
                <NuxtLink :to="`/payments/viewClientWisePayment?id=${client.id}`" class="text-green-600 hover:underline">Ledger</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal -->
      <BaseModal :show="showModal" :title="modalTitle" @close="resetModal">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label class="block mb-1 font-medium">Name*</label>
              <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label class="block mb-1 font-medium">Email</label>
              <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Phone*</label>
              <input v-model="form.phone" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label class="block mb-1 font-medium">Address</label>
              <input v-model="form.address" type="text" class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Description</label>
              <textarea v-model="form.description" class="w-full border rounded px-3 py-2"></textarea>
            </div>
            <div>
              <label class="block mb-1 font-medium">Image</label>
              <input type="file" @change="handleImageUpload" class="w-full" />
              <div v-if="form.previewImage" class="mt-2">
                <img :src="form.previewImage" class="w-24 h-24 object-cover rounded" />
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
              {{ editMode ? 'Update' : 'Add' }} Client
            </button>
          </div>
        </form>
      </BaseModal>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import BaseModal from '@/components/BaseModal.vue'
  import { getClients, addClient, updateClient } from '@/services/clientService'
  
  const clients = ref([])
  const showModal = ref(false)
  const editMode = ref(false)
  const modalTitle = ref('Add Client')
  
  const form = ref({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    imageFile: null,
    previewImage: ''
  })
  
  // 🔃 Fetch clients
  const fetchClients = async () => {
    clients.value = await getClients()
  }
  
  onMounted(() => {
    fetchClients()
  })
  
  // ➕ Open modal for adding
  const openModalForAdd = () => {
    resetForm()
    modalTitle.value = 'Add Client'
    editMode.value = false
    showModal.value = true
  }
  
  // ✏️ Open modal for editing
  const openModalForEdit = (client) => {
    form.value = {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      description: client.description,
      imageFile: null,
      previewImage: client.imageUrl || ''
    }
    modalTitle.value = 'Edit Client'
    editMode.value = true
    showModal.value = true
  }
  
  // 🖼 Handle file/image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      form.value.imageFile = file
      form.value.previewImage = URL.createObjectURL(file)
    }
  }
  
  // ✅ Handle add/update
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('phone', form.value.phone)
    formData.append('address', form.value.address)
    formData.append('description', form.value.description)
    if (form.value.imageFile) {
      formData.append('image', form.value.imageFile)
    }
  
    if (editMode.value) {
      await updateClient(form.value.id, formData)
    } else {
      await addClient(formData)
    }
  
    fetchClients()
    resetModal()
  }
  
  // ♻️ Reset form/modal
  const resetForm = () => {
    form.value = {
      id: null,
      name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      imageFile: null,
      previewImage: ''
    }
  }
  
  const resetModal = () => {
    resetForm()
    showModal.value = false
  }
  </script>
  
  