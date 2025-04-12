<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ livestock?.name }}</h2>
        <p class="text-gray-500">{{ livestock?.description }}</p>
      </div>
  
      <!-- Records per page and search -->
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
  
      <!-- Variants table -->
      <table class="w-full table-auto border">
        <thead class="bg-gray-200">
          <tr>
            <th>SL. No.</th>
            <th>Name</th>
            <th>Purchase Quantity (pcs)</th>
            <th>Variant</th>
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(variant, index) in filteredVariants"
            :key="variant.id"
            class="text-center border-b"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ livestock.name }}</td>
            <td>{{ livestock.quantity }}</td>
            <td>{{ variant.typeTitle }}</td>
            <td>{{ variant.description }}</td>
            <td class="space-x-2">
              <button @click="editVariant(variant)" class="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button @click="deleteVariant(variant.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
          <tr v-if="variants.length">
            <td colspan="2" class="font-bold text-right">Total:</td>
            <td>{{ livestock.quantity }}</td>
            <td colspan="3">{{ variants.length }} Variant(s)</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Edit Variant Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <h3 class="text-xl font-bold mb-4">Edit Variant</h3>
          <div class="mb-2">
            <label>Livestock Type*</label>
            <input v-model="form.typeTitle" type="text" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label>Description</label>
            <textarea v-model="form.description" class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="updateVariant" class="bg-green-500 text-white px-3 py-1 rounded">Save</button>
            <button @click="showEditModal = false" class="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { onMounted, ref, computed } from 'vue';
  const route = useRoute();
  const id = route.params.id;
  
  const livestock = ref({});
  const variants = ref([]);
  const form = ref({ id: null, typeTitle: '', description: '' });
  const showEditModal = ref(false);
  const perPage = ref(10);
  const searchQuery = ref('');
  
  const fetchData = async () => {
    const res = await $fetch(`/api/livestock/${id}`);
    livestock.value = res;
  
    const varRes = await $fetch(`/api/variant?livestockId=${id}`);
    variants.value = varRes;
  };
  
  const editVariant = (variant) => {
    form.value = { ...variant };
    showEditModal.value = true;
  };
  
  const updateVariant = async () => {
    await $fetch(`/api/variant/${form.value.id}`, {
      method: 'PUT',
      body: form.value
    });
    showEditModal.value = false;
    fetchData();
  };
  
  const deleteVariant = async (variantId) => {
    if (confirm('Are you sure you want to delete this variant?')) {
      await $fetch(`/api/variant/${variantId}`, { method: 'DELETE' });
      fetchData();
    }
  };
  
  const filteredVariants = computed(() => {
    return variants.value.filter((v) =>
      v.typeTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).slice(0, perPage.value);
  });
  
  onMounted(fetchData);
  </script>
  