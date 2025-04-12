<template>
    <div class="p-6">
      <h1 class="text-xl font-bold mb-4">Supplier Payment Details</h1>
  
      <!-- Supplier Info -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
        <div><strong>Supplier:</strong> {{ supplier.name }}</div>
        <div><strong>E-mail:</strong> {{ supplier.email }}</div>
        <div><strong>Phone:</strong> {{ supplier.phone }}</div>
        <div><strong>Address:</strong> {{ supplier.address }}</div>
        <div><strong>Total Payable:</strong> {{ totals.totalPayable }}</div>
        <div><strong>Total Paid:</strong> {{ totals.totalPaid }}</div>
        <div><strong>Due Amount:</strong> {{ totals.totalPayable - totals.totalPaid }}</div>
      </div>
  
      <!-- Payments Table -->
      <h2 class="text-lg font-semibold mb-2">Payments & Purchases</h2>
      <table class="w-full table-auto border mb-4">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">Purchase Date</th>
            <th class="p-2 border">Purchase Type</th>
            <th class="p-2 border">Total Payable</th>
            <th class="p-2 border">Paid Amount</th>
            <th class="p-2 border">Due Amount</th>
            <th class="p-2 border">Status</th>
            <th class="p-2 border">Payment Count</th>
            <th class="p-2 border">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(purchase, index) in purchases" :key="index" class="text-sm">
            <td class="p-2 border">{{ purchase.date }}</td>
            <td class="p-2 border">{{ purchase.type }}</td>
            <td class="p-2 border">{{ purchase.total }}</td>
            <td class="p-2 border">{{ purchase.paid }}</td>
            <td class="p-2 border">{{ purchase.total - purchase.paid }}</td>
            <td class="p-2 border">{{ purchase.status }}</td>
            <td class="p-2 border">{{ purchase.count }}</td>
            <td class="p-2 border space-x-1">
              <button @click="openAddPayment(purchase)" class="bg-blue-600 text-white px-2 py-1 rounded">Add Payment</button>
              <button @click="openEditPayment(purchase)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button @click="viewPurchasePayments(purchase.id)" class="bg-green-600 text-white px-2 py-1 rounded">View</button>
              <button class="bg-indigo-700 text-white px-2 py-1 rounded">Invoice</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modals -->
      <AddSupplierPaymentModal v-if="showAddModal" :purchase="selectedPurchase" @close="showAddModal = false" />
      <EditSupplierPaymentModal v-if="showEditModal" :purchase="selectedPurchase" @close="showEditModal = false" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import AddSupplierPaymentModal from '@/components/modals/addSupplierPaymentModal.vue'
  import EditSupplierPaymentModal from '@/components/modals/editSupplierPaymentModal.vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  
  const supplier = ref({})
  const totals = ref({ totalPayable: 0, totalPaid: 0 })
  const purchases = ref([])
  
  const showAddModal = ref(false)
  const showEditModal = ref(false)
  const selectedPurchase = ref({})
  
  const fetchSupplierData = async () => {
    const id = route.query.id
    const res = await $fetch(`/api/supplier/${id}`)
    supplier.value = res
    totals.value.totalPayable = res.total_payable
    totals.value.totalPaid = res.total_paid
  
    const purRes = await $fetch(`/api/supplier/payments/${id}`)
    purchases.value = purRes
  }
  
  const openAddPayment = (purchase) => {
    selectedPurchase.value = purchase
    showAddModal.value = true
  }
  
  const openEditPayment = (purchase) => {
    selectedPurchase.value = purchase
    showEditModal.value = true
  }
  
  const viewPurchasePayments = (purchaseId) => {
    router.push(`/supplier/viewSupplierPurchaseWisePayments?id=${purchaseId}`)
  }
  
  onMounted(() => {
    fetchSupplierData()
  })
  </script>
  