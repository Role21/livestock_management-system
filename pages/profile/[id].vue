<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">User Profile</h1>

    <!-- Display user info -->
    <div v-if="user" class="mb-4">
      <img :src="user.avatar || '/default-avatar.png'" class="w-24 h-24 rounded-full" />
      <p class="mt-2 font-semibold">{{ user.name }}</p>
      <p class="text-sm text-gray-600">{{ user.email }}</p>
      <p class="text-sm text-gray-600">Role: {{ user.role }}</p>
    </div>

    <!-- Admin actions (Edit, Ban, Delete) -->
    <div v-if="isAdmin || isSelf" class="flex space-x-4 mt-4">
      <button @click="showEdit = true" class="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
      <button @click="showBan = true" class="bg-yellow-500 text-white px-4 py-2 rounded" v-if="isAdmin">Ban</button>
      <button @click="showDelete = true" class="bg-red-600 text-white px-4 py-2 rounded" v-if="isAdmin">Delete</button>
    </div>

    <!-- Add User Button (Admin only) -->
    <div v-if="isAdmin" class="mt-4">
      <button @click="showAddUserModal = true" class="bg-green-500 text-white px-4 py-2 rounded">Add User</button>
    </div>

    <!-- Modals -->
    <EditUserModal v-if="showEdit" :user="user" @close="showEdit = false" />
    <BanUserModal v-if="showBan" :user="user" @close="showBan = false" />
    <DeleteUserModal v-if="showDelete" :user="user" @close="showDelete = false" />
    <AddUserModal v-if="showAddUserModal" @close="showAddUserModal = false" />

    <!-- Error handling (if profile is not found or fetch fails) -->
    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import EditUserModal from '~/components/modals/EditUserModal.vue'
import BanUserModal from '~/components/modals/BanUserModal.vue'
import DeleteUserModal from '~/components/modals/DeleteUserModal.vue'
import AddUserModal from '~/components/modals/AddUserModal.vue'
import { useAuth } from '~/composables/useAuth'
import { useFetch } from '#app'

const route = useRoute()
const userId = route.params.id
const user = ref(null)
const showEdit = ref(false)
const showBan = ref(false)
const showDelete = ref(false)
const showAddUserModal = ref(false)
const error = ref('')

const { user: currentUser } = useAuth()
const isAdmin = computed(() => currentUser.value?.role === 'admin')
const isSelf = computed(() => currentUser.value?.id === parseInt(userId))

onMounted(async () => {
  try {
    const res = await useFetch(`/api/profile/${userId}`)
    if (res.error) {
      error.value = 'User profile not found or there was an error fetching the profile.'
    } else {
      user.value = res.data.value
    }
  } catch (err) {
    error.value = 'An error occurred while fetching the user profile.'
  }
})
</script>
