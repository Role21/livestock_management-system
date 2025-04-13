<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">My Profile</h1>

    <div class="mb-4">
      <img :src="user.avatar || '/default-avatar.png'" class="w-24 h-24 rounded-full" />
      <p class="mt-2 font-semibold">{{ user.name }}</p>
      <p class="text-sm text-gray-600">{{ user.email }}</p>
      <p class="text-sm text-gray-600">Role: {{ user.role }}</p>
    </div>

    <div class="flex flex-wrap gap-4 mt-4">
      <!-- Standard Edit for self -->
      <button @click="openEditModal" class="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>

      <!-- Admin-only actions -->
      <template v-if="user.role === 'admin'">
        <button @click="openAddModal" class="bg-green-600 text-white px-4 py-2 rounded">Add User</button>
        <button @click="openAdminEditModal" class="bg-blue-700 text-white px-4 py-2 rounded">Edit User</button>
        <button @click="openDeleteModal" class="bg-red-500 text-white px-4 py-2 rounded">Delete User</button>
        <button @click="openBanModal" class="bg-yellow-500 text-white px-4 py-2 rounded">Ban User</button>
      </template>
    </div>

    <!-- Modals -->
    <EditUserModal :user="user" v-if="showEditModal" @close="showEditModal = false" />

    <AddUserModal v-if="showAddModal" @close="showAddModal = false" @added="handleUserAdded" />
    <EditUserModal v-if="showAdminEditModal" :user="user" admin-mode @close="showAdminEditModal = false" @updated="handleUserUpdated" />
    <DeleteUserModal :userId="user.id" v-if="showDeleteModal" @close="showDeleteModal = false" @deleted="handleUserDeleted" />
    <BanUserModal :userId="user.id" v-if="showBanModal" @close="showBanModal = false" @banned="handleUserBanned" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

import EditUserModal from '~/components/modals/admin/EditUserModal.vue'
import AddUserModal from '~/components/modals/admin/AddUserModal.vue'
import DeleteUserModal from '~/components/modals/admin/DeleteUserModal.vue'
import BanUserModal from '~/components/modals/admin/BanUserModal.vue'

const { user } = useAuth()

const showEditModal = ref(false)        // For editing self
const showAddModal = ref(false)
const showAdminEditModal = ref(false)   // For admin editing users
const showDeleteModal = ref(false)
const showBanModal = ref(false)

const openEditModal = () => (showEditModal.value = true)
const openAddModal = () => (showAddModal.value = true)
const openAdminEditModal = () => (showAdminEditModal.value = true)
const openDeleteModal = () => (showDeleteModal.value = true)
const openBanModal = () => (showBanModal.value = true)

// Handle events
const handleUserAdded = () => {
  console.log('User added')
}
const handleUserUpdated = () => {
  console.log('User updated by admin')
}
const handleUserDeleted = () => {
  console.log('User deleted')
}
const handleUserBanned = () => {
  console.log('User banned')
}
</script>
