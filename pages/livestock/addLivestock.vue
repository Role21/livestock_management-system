<template>
    <div class="p-6">
      <!-- Heading and Add New Livestock Button -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Livestock List</h2>
        <button @click="showAddModal = true" class="bg-blue-600 text-white px-4 py-2 rounded">
          Add New Livestock
        </button>
      </div>
  
      <!-- Summary Boxes -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div
          class="p-4 bg-white rounded shadow hover:shadow-lg transition"
        >
          <p class="font-semibold text-gray-600">Total Purchased:</p>
          <p class="text-xl font-bold">{{ summary.totalPurchased }}</p>
          <p class="font-semibold text-gray-600">Reproduction:</p>
          <p class="text-xl font-bold">{{ summary.reproduction }}</p>
        </div>
        <div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
          <p class="font-semibold text-gray-600">Assigned to Shed (pcs):</p>
          <p class="text-2xl font-bold">{{ summary.assignedToShed }}</p>
        </div>
        <div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
          <p class="font-semibold text-gray-600">Total Unassigned (pcs):</p>
          <p class="text-2xl font-bold">{{ summary.unassigned }}</p>
        </div>
        <div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
          <p class="font-semibold text-gray-600">Total Purchased Amount:</p>
          <p class="text-2xl font-bold">{{ summary.totalAmount }}</p>
        </div>
      </div>
  
      <!-- Records Per Page + Search -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center space-x-2">
          <label for="perPage">Records per page:</label>
          <select v-model="perPage" id="perPage" class="border rounded px-2 py-1">
            <option v-for="num in [5, 10, 20]" :key="num" :value="num">{{ num }}</option>
          </select>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="border rounded px-2 py-1"
        />
      </div>
  
      <!-- Table -->
      <table class="w-full table-auto border">
        <thead class="bg-gray-200">
          <tr>
            <th>SL. No.</th>
            <th>Name</th>
            <th>Total Purchased (pcs)</th>
            <th>Variant</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredLivestock"
            :key="item.id"
            class="text-center border-b"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.variants.length }}</td>
            <td class="space-x-2">
              <button @click="editLivestock(item)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button @click="deleteLivestock(item.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              <button @click="openAddVariant(item)" class="bg-green-500 text-white px-2 py-1 rounded">Add Variant</button>
              <NuxtLink :to="`/livestock/${item.id}`" class="bg-blue-600 text-white px-2 py-1 rounded">View Variant</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Add Livestock Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <h3 class="text-xl font-bold mb-4">Add New Livestock</h3>
          <div class="mb-2">
            <label>Livestock Name*</label>
            <input v-model="form.name" type="text" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label>Description</label>
            <textarea v-model="form.description" class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="saveLivestock" class="bg-green-600 text-white px-3 py-1 rounded">Save</button>
            <button @click="showAddModal = false" class="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      </div>
  
      <!-- Edit Livestock Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <h3 class="text-xl font-bold mb-4">Edit Livestock</h3>
          <div class="mb-2">
            <label>Livestock Name*</label>
            <input v-model="form.name" type="text" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label>Description</label>
            <textarea v-model="form.description" class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="updateLivestock" class="bg-green-600 text-white px-3 py-1 rounded">Update</button>
            <button @click="showEditModal = false" class="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      </div>
  
      <!-- Add Variant Modal -->
      <div v-if="showAddVariantModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <h3 class="text-xl font-bold mb-4">Add Variant to {{ selectedLivestock.name }}</h3>
          <div class="mb-2">
            <label>Type Title*</label>
            <input v-model="variantForm.typeTitle" type="text" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label>Description</label>
            <textarea v-model="variantForm.description" class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="saveVariant" class="bg-green-600 text-white px-3 py-1 rounded">Add</button>
            <button @click="showAddVariantModal = false" class="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue';
  
  const livestockList = ref([]);
  const form = ref({ id: null, name: '', description: '' });
  const variantForm = ref({ typeTitle: '', description: '' });
  const selectedLivestock = ref({});
  const summary = ref({
    totalPurchased: 0,
    reproduction: 0,
    assignedToShed: 0,
    unassigned: 0,
    totalAmount: 0
  });
  
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  const showAddVariantModal = ref(false);
  const perPage = ref(10);
  const searchQuery = ref('');
  
  const fetchLivestock = async () => {
    const data = await $fetch('/api/livestock');
    livestockList.value = data;
  
    // fake summary for now — replace with your summary API logic if needed
    summary.value = {
      totalPurchased: data.reduce((sum, l) => sum + l.quantity, 0),
      reproduction: 0,
      assignedToShed: 0,
      unassigned: 0,
      totalAmount: 0
    };
  };
  
  const saveLivestock = async () => {
    await $fetch('/api/livestock', { method: 'POST', body: form.value });
    form.value = { name: '', description: '' };
    showAddModal.value = false;
    fetchLivestock();
  };
  
  const editLivestock = (item) => {
    form.value = { ...item };
    showEditModal.value = true;
  };
  
  const updateLivestock = async () => {
    await $fetch(`/api/livestock/${form.value.id}`, { method: 'PUT', body: form.value });
    form.value = { name: '', description: '' };
    showEditModal.value = false;
    fetchLivestock();
  };
  
  const deleteLivestock = async (id) => {
    if (confirm('Are you sure you want to delete this livestock?')) {
      await $fetch(`/api/livestock/${id}`, { method: 'DELETE' });
      fetchLivestock();
    }
  };
  
  const openAddVariant = (item) => {
    selectedLivestock.value = item;
    variantForm.value = { typeTitle: '', description: '' };
    showAddVariantModal.value = true;
  };
  
  const saveVariant = async () => {
    await $fetch('/api/variant', {
      method: 'POST',
      body: {
        livestockId: selectedLivestock.value.id,
        ...variantForm.value
      }
    });
    showAddVariantModal.value = false;
    fetchLivestock();
  };
  
  const filteredLivestock = computed(() =>
    livestockList.value.filter((l) =>
      l.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).slice(0, perPage.value)
  );
  
  onMounted(fetchLivestock);
  </script>
  