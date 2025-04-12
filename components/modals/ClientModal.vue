<template>
    <BaseModal :show="show" :title="isEdit ? 'Edit Client' : 'Add New Client'" @close="$emit('close')">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="form.name" type="text" required class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" required class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="form.phone" type="text" required class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <input v-model="form.address" type="text" required class="input" />
          </div>
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="form.description" class="input" />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" @change="handleImageUpload" class="input" />
          <div v-if="form.existingImage" class="mt-2">
            <img :src="form.existingImage" alt="Preview" class="h-16 rounded" />
          </div>
        </div>
  
        <div class="flex justify-end pt-4">
          <button type="submit" class="btn-primary">
            {{ isEdit ? 'Update' : 'Add' }} Client
          </button>
        </div>
      </form>
    </BaseModal>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import BaseModal from './BaseModal.vue';
  import { addClient, updateClient } from '@/services/clientService';
  
  const props = defineProps({
    show: Boolean,
    isEdit: Boolean,
    client: Object
  });
  
  const emit = defineEmits(['close', 'refresh']);
  
  const form = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    image: null,
    existingImage: ''
  });
  
  watch(
    () => props.client,
    (newClient) => {
      if (props.isEdit && newClient) {
        form.value = {
          ...newClient,
          existingImage: newClient.image || '',
          image: null
        };
      } else {
        form.value = {
          name: '',
          email: '',
          phone: '',
          address: '',
          description: '',
          image: null,
          existingImage: ''
        };
      }
    },
    { immediate: true }
  );
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.value.image = file;
    }
  };
  
  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in form.value) {
      if (key === 'image' && form.value[key]) {
        formData.append('image', form.value[key]);
      } else {
        formData.append(key, form.value[key]);
      }
    }
  
    if (props.isEdit && props.client?.id) {
      await updateClient(props.client.id, formData);
    } else {
      await addClient(formData);
    }
  
    emit('refresh');
    emit('close');
  };
  </script>
  
  <style scoped>
  .input {
    @apply w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-200;
  }
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition;
  }
  </style>
  