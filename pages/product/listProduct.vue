    <template>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Assigned Product List -->
        <div>
            <h2 class="text-xl font-bold mb-4">Assigned Product List</h2>
            <table class="min-w-full bg-white border border-gray-200 rounded">
            <thead class="bg-gray-100">
                <tr>
                <th class="py-2 px-4 border">SL. No.</th>
                <th class="py-2 px-4 border">Product Name</th>
                <th class="py-2 px-4 border">Shed</th>
                <th class="py-2 px-4 border">Batch</th>
                <th class="py-2 px-4 border">In Stock</th>
                <th class="py-2 px-4 border">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in assignedProducts" :key="product.id">
                <td class="py-2 px-4 border">{{ index + 1 }}</td>
                <td class="py-2 px-4 border">{{ product.name }}</td>
                <td class="py-2 px-4 border">{{ product.shed }}</td>
                <td class="py-2 px-4 border">{{ product.batch }}</td>
                <td class="py-2 px-4 border">{{ product.inStock }}</td>
                <td class="py-2 px-4 border space-x-2">
                    <button @click="openAddStockModal(product)" class="text-blue-600 hover:underline">Add Stock</button>
                    <NuxtLink :to="`/product/viewAssignedShedAndBatchWiseProduction?id=${product.id}`" class="text-green-600 hover:underline">View Stock</NuxtLink>
                    <button @click="openAddWasteModal(product)" class="text-yellow-600 hover:underline">Waste</button>
                    <NuxtLink :to="`/product/viewWastedShedAndBatchWiseProduction?id=${product.id}`" class="text-red-600 hover:underline">View Waste</NuxtLink>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    
        <!-- Product List -->
        <div>
            <h2 class="text-xl font-bold mb-4">Product List</h2>
            <div class="flex space-x-4 mb-4">
            <button class="btn btn-primary" @click="showAddProductModal = true">Add New Product</button>
            <NuxtLink to="/sale/addNewProductSale" class="btn btn-secondary">Product Sale</NuxtLink>
            </div>
    
            <table class="min-w-full bg-white border border-gray-200 rounded">
            <thead class="bg-gray-100">
                <tr>
                <th class="py-2 px-4 border">SL. No.</th>
                <th class="py-2 px-4 border">Product Name</th>
                <th class="py-2 px-4 border">Category</th>
                <th class="py-2 px-4 border">Product Unit</th>
                <th class="py-2 px-4 border">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in productList" :key="product.id">
                <td class="py-2 px-4 border">{{ index + 1 }}</td>
                <td class="py-2 px-4 border">{{ product.name }}</td>
                <td class="py-2 px-4 border">{{ product.category }}</td>
                <td class="py-2 px-4 border">{{ product.unit }}</td>
                <td class="py-2 px-4 border space-x-2">
                    <button @click="openEditProductModal(product)" class="text-blue-600 hover:underline">Edit</button>
                    <button @click="deleteProduct(product.id)" class="text-red-600 hover:underline">Delete</button>
                    <button @click="openAssignProductModal(product)" class="text-yellow-600 hover:underline">Assign</button>
                    <NuxtLink :to="`/product/viewProductWiseProduction?id=${product.id}`" class="text-green-600 hover:underline">Details</NuxtLink>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    
        <!-- Add New Product Modal -->
        <BaseModal :show="showAddProductModal" title="Add New Product" @close="closeModal">
            <form @submit.prevent="submitAddProduct">
            <div class="space-y-4">
                <div><label>Name*</label><input v-model="productForm.name" class="input" required /></div>
                <div><label>Product Category*</label><input v-model="productForm.category" class="input" required /></div>
                <div><label>Product Unit*</label><input v-model="productForm.unit" class="input" required /></div>
                <div><label>Approx Selling Price Per Quantity*</label><input v-model="productForm.price" type="number" class="input" required /></div>
                <div><label>Description</label><textarea v-model="productForm.description" class="input"></textarea></div>
            </div>
            <div class="mt-4 text-right">
                <button class="btn btn-primary" type="submit">Add Product</button>
            </div>
            </form>
        </BaseModal>
    
        <!-- Edit Product Modal -->
        <BaseModal :show="showEditProductModal" title="Edit Product" @close="closeModal">
            <form @submit.prevent="submitEditProduct">
            <div class="space-y-4">
                <div><label>Name*</label><input v-model="productForm.name" class="input" required /></div>
                <div><label>Product Category*</label><input v-model="productForm.category" class="input" required /></div>
                <div><label>Product Unit*</label><input v-model="productForm.unit" class="input" required /></div>
                <div><label>Approx Selling Price Per Quantity*</label><input v-model="productForm.price" type="number" class="input" required /></div>
                <div><label>Description</label><textarea v-model="productForm.description" class="input"></textarea></div>
            </div>
            <div class="mt-4 text-right">
                <button class="btn btn-primary" type="submit">Save Changes</button>
            </div>
            </form>
        </BaseModal>
    
        <!-- Assign Product Modal -->
        <BaseModal :show="showAssignProductModal" title="Assign Product" @close="closeModal">
            <form @submit.prevent="submitAssignProduct">
            <div class="space-y-4">
                <div><label>Product Name</label><input v-model="assignForm.name" class="input" disabled /></div>
                <div><label>Category</label><input v-model="assignForm.category" class="input" disabled /></div>
                <div>
                <label>Shed*</label>
                <select v-model="assignForm.shed" @change="fetchBatches(assignForm.shed)" class="input" required>
                    <option v-for="shed in sheds" :value="shed.id">{{ shed.name }}</option>
                </select>
                </div>
                <div>
                <label>Batch*</label>
                <select v-model="assignForm.batch" class="input" required>
                    <option v-for="batch in batches" :value="batch.id">{{ batch.name }}</option>
                </select>
                </div>
                <div><label>Description</label><textarea v-model="assignForm.description" class="input"></textarea></div>
            </div>
            <div class="mt-4 text-right">
                <button class="btn btn-primary" type="submit">Assign</button>
            </div>
            </form>
        </BaseModal>
    
        <!-- Add Production to Stock Modal -->
    <BaseModal :show="showAddStockModal" title="Add Production to Stock" @close="closeModal">
    <form @submit.prevent="submitAddStock">
        <div class="space-y-4">
        <div><label>Product</label><input v-model="form.name" class="input" disabled /></div>
        <div><label>Shed</label><input v-model="form.shed" class="input" disabled /></div>
        <div><label>Batch</label><input v-model="form.batch" class="input" disabled /></div>
        <div><label>Quantity*</label><input v-model="form.quantity" type="number" class="input" required /></div>
        <div><label>Unit*</label><input v-model="form.unit" class="input" required /></div>
        <div><label>Date*</label><input v-model="form.date" type="date" class="input" required /></div>
        <div><label>Description</label><textarea v-model="form.description" class="input"></textarea></div>
        </div>
        <div class="mt-4 text-right">
        <button class="btn btn-primary" type="submit">Add to Stock</button>
        </div>
    </form>
    </BaseModal>

    
        <!-- Add Wasted Production Modal -->
    <BaseModal :show="showAddWasteModal" title="Add Wasted Production" @close="closeModal">
    <form @submit.prevent="submitAddWaste">
        <div class="space-y-4">
        <div><label>Product</label><input v-model="form.name" class="input" disabled /></div>
        <div><label>Shed</label><input v-model="form.shed" class="input" disabled /></div>
        <div><label>Batch</label><input v-model="form.batch" class="input" disabled /></div>
        <div><label>Waste Quantity*</label><input v-model="form.wasteQuantity" type="number" class="input" required /></div>
        <div><label>Date*</label><input v-model="form.date" type="date" class="input" required /></div>
        <div><label>Description</label><textarea v-model="form.description" class="input"></textarea></div>
        </div>
        <div class="mt-4 text-right">
        <button class="btn btn-primary" type="submit">Add Waste</button>
        </div>
    </form>
    </BaseModal>

        </div>
    </template>
    
    <script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import BaseModal from '@/components/BaseModal.vue'
    
    const router = useRouter()
    const assignedProducts = ref([])
    const productList = ref([])
    const showAddStockModal = ref(false)
    const showAddWasteModal = ref(false)
    const showAddProductModal = ref(false)
    const showEditProductModal = ref(false)
    const showAssignProductModal = ref(false)
    
    const form = ref({})
    const productForm = ref({})
    const assignForm = ref({})
    const sheds = ref([])
    const batches = ref([])
    
    const openAddStockModal = (product) => {
        form.value = { ...product, quantity: '', unit: '', date: '', description: '' }
        showAddStockModal.value = true
    }
    
    const openAddWasteModal = (product) => {
        form.value = { ...product, wasteQuantity: '', date: '', description: '' }
        showAddWasteModal.value = true
    }
    
    const openEditProductModal = (product) => {
        productForm.value = { ...product }
        showEditProductModal.value = true
    }
    
    const openAssignProductModal = (product) => {
        assignForm.value = { name: product.name, category: product.category, shed: '', batch: '', description: '' }
        showAssignProductModal.value = true
        fetchSheds()
    }
    
    const closeModal = () => {
        showAddStockModal.value = false
        showAddWasteModal.value = false
        showAddProductModal.value = false
        showEditProductModal.value = false
        showAssignProductModal.value = false
        form.value = {}
        productForm.value = {}
        assignForm.value = {}
    }
    
    const fetchSheds = () => {
        sheds.value = [
        { id: 1, name: 'Shed A' },
        { id: 2, name: 'Shed B' }
        ]
    }
    
    const fetchBatches = (shedId) => {
        if (shedId === 1) {
        batches.value = [
            { id: 'batch-1', name: 'Batch 1A' },
            { id: 'batch-2', name: 'Batch 1B' }
        ]
        } else {
        batches.value = [
            { id: 'batch-3', name: 'Batch 2A' }
        ]
        }
    }
    
    const submitAddStock = () => {
        console.log('Submitting add stock', form.value)
        closeModal()
    }
    
    const submitAddWaste = () => {
        console.log('Submitting waste', form.value)
        closeModal()
    }
    
    const submitAddProduct = () => {
        console.log('Add Product', productForm.value)
        closeModal()
    }
    
    const submitEditProduct = () => {
        console.log('Edit Product', productForm.value)
        closeModal()
    }
    
    const submitAssignProduct = () => {
        console.log('Assign Product', assignForm.value)
        closeModal()
    }
    
    const deleteProduct = (id) => {
        console.log('Delete Product with ID:', id)
    }
    </script>
    
    <style scoped>
    .input {
        @apply w-full border rounded px-3 py-2;
    }
    .btn {
        @apply px-4 py-2 rounded text-white;
    }
    .btn-primary {
        @apply bg-blue-600 hover:bg-blue-700;
    }
    .btn-secondary {
        @apply bg-green-600 hover:bg-green-700;
    }
    </style>
    