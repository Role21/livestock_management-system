<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Expense Categories</h1>
        <button
          @click="isAddModalOpen = true"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Category
        </button>
      </div>
  
      <table class="w-full border-collapse border border-gray-300">
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
  
      <!-- Add Category Modal -->
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
  
      <!-- Edit Category Modal -->
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
  const isAddModalOpen = ref(false)
  const isEditModalOpen = ref(false)
  
  const categories = ref([
    { id: 1, name: 'AdminExpense', description: 'Admin related costs' },
    { id: 2, name: 'Transport', description: 'Transportation costs' },
  ])
  
  const form = ref({
    name: '',
    description: '',
  })
  
  const editForm = ref({
    id: null,
    name: '',
    description: '',
  })
  
  const addCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: form.value.name,
      description: form.value.description,
    }
    categories.value.push(newCategory)
    isAddModalOpen.value = false
    form.value = { name: '', description: '' }
  }
  
  const openEditModal = (category) => {
    editForm.value = { ...category }
    isEditModalOpen.value = true
  }
  
  const updateCategory = () => {
    const index = categories.value.findIndex(c => c.id === editForm.value.id)
    if (index !== -1) {
      categories.value[index] = { ...editForm.value }
    }
    isEditModalOpen.value = false
  }
  
  const deleteCategory = (id) => {
    categories.value = categories.value.filter(c => c.id !== id)
  }
  </script>
  