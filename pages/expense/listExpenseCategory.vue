<template>
  <div class="p-6">
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center">Loading...</div>
    
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Expense Categories</h1>
      <button
        @click="isAddModalOpen = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add New Category
      </button>
    </div>

    <!-- Categories Table -->
    <table v-if="!isLoading" class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2">SL. No.</th>
          <th class="border px-4 py-2">Category</th>
          <th class="border px-4 py-2">Description</th>
          <th class="border px-4 py-2">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(category, index) in categories"
          :key="category.id"
          class="hover:bg-gray-50"
        >
          <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ category.name }}</td>
          <td class="border px-4 py-2">{{ category.description }}</td>
          <td class="border px-4 py-2 text-center space-x-2">
            <button
              @click="openEditModal(category)"
              class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="deleteCategory(category.id)"
              class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Modal -->
    <BaseModal v-if="isAddModalOpen" @close="isAddModalOpen = false">
      <template #header>Add New Category</template>
      <template #body>
        <form @submit.prevent="addCategory">
          <div class="space-y-4">
            <div>
              <label class="font-semibold">Name*</label>
              <input v-model="form.name" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="form.description" class="w-full p-2 border rounded" />
            </div>
            <button
              type="submit"
              class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Category
            </button>
          </div>
        </form>
      </template>
    </BaseModal>

    <!-- Edit Modal -->
    <BaseModal v-if="isEditModalOpen" @close="isEditModalOpen = false">
      <template #header>Edit Category</template>
      <template #body>
        <form @submit.prevent="updateCategory">
          <div class="space-y-4">
            <div>
              <label class="font-semibold">Name*</label>
              <input v-model="editForm.name" type="text" class="w-full p-2 border rounded" required />
            </div>
            <div>
              <label class="font-semibold">Description</label>
              <textarea v-model="editForm.description" class="w-full p-2 border rounded" />
            </div>
            <button
              type="submit"
              class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Category
            </button>
          </div>
        </form>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

const isLoading = ref(false)  // Loading state
const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)

const categories = ref([])
const form = ref({ name: '', description: '' })
const editForm = ref({ id: null, name: '', description: '' })

// Fetch categories with loading state
const fetchCategories = async () => {
  isLoading.value = true;
  const { data, error } = await useFetch('/api/category/category')  // Updated endpoint
  if (data.value) {
    categories.value = data.value
  } else {
    console.error('Failed to fetch categories:', error.value)
  }
  isLoading.value = false;
}

onMounted(fetchCategories)

// Add new category
const addCategory = async () => {
  isLoading.value = true;

  const res = await $fetch('/api/category/category', {
    method: 'POST',
    body: form.value,
  })
  categories.value.push(res)
  isAddModalOpen.value = false
  form.value = { name: '', description: '' }

  isLoading.value = false;
}

// Open edit modal
const openEditModal = (category) => {
  editForm.value = { ...category }
  isEditModalOpen.value = true
}

// Update existing category
const updateCategory = async () => {
  isLoading.value = true;

  await $fetch(`/api/category/category/${editForm.value.id}`, {  // Updated endpoint
    method: 'PUT',
    body: editForm.value,
  })
  const index = categories.value.findIndex(c => c.id === editForm.value.id)
  if (index !== -1) categories.value[index] = { ...editForm.value }
  isEditModalOpen.value = false

  isLoading.value = false;
}

// Delete a category
const deleteCategory = async (id) => {
  isLoading.value = true;

  await $fetch(`/api/category/category/${id}`, {  // Updated endpoint
    method: 'DELETE',
  })
  categories.value = categories.value.filter(c => c.id !== id)

  isLoading.value = false;
}
</script>
