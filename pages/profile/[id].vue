<template>
  <div v-if="isAdmin">
    <h1 class="text-2xl font-bold mb-4">User Profile - {{ user?.name }}</h1>

    <div class="mb-4 flex space-x-2">
      <button @click="activeTab = 'info'" :class="tabClass('info')">Personal Info</button>
      <button @click="activeTab = 'activity'" :class="tabClass('activity')">Activity</button>
      <button @click="activeTab = 'settings'" :class="tabClass('settings')">Settings</button>
    </div>

    <!-- Tabs -->
    <div v-if="activeTab === 'info'" class="p-4 border rounded">
      <p><strong>Email:</strong> {{ user?.email }}</p>
      <p><strong>Role:</strong> {{ user?.role }}</p>
      <p><strong>Status:</strong> {{ user?.banned ? 'Banned' : 'Active' }}</p>
    </div>

    <div v-else-if="activeTab === 'activity'" class="p-4 border rounded">
      <p>Recent activity goes here...</p>
    </div>

    <div v-else-if="activeTab === 'settings'" class="p-4 border rounded">
      <p>Settings for {{ user?.name }}...</p>
    </div>

    <!-- Admin Action Buttons -->
    <div class="mt-6 space-x-2">
      <button @click="showEdit = true" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
      <button @click="showBan = true" class="bg-yellow-500 text-white px-3 py-1 rounded">Ban</button>
      <button @click="showDelete = true" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
    </div>

    <!-- Modals -->
    <EditUserModal v-if="showEdit" :user="user" @close="showEdit = false" />
    <BanUserModal v-if="showBan" :user="user" @close="showBan = false" />
    <DeleteUserModal v-if="showDelete" :user="user" @close="showDelete = false" />
  </div>

  <div v-else>
    <p>You do not have permission to view this page.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EditUserModal from '~/components/profile/EditUserModal.vue'
import BanUserModal from '~/components/profile/BanUserModal.vue'
import DeleteUserModal from '~/components/profile/DeleteUserModal.vue'

const route = useRoute()
const userId = route.params.id
const user = ref(null)
const activeTab = ref('info')
const isAdmin = ref(false)

const showEdit = ref(false)
const showBan = ref(false)
const showDelete = ref(false)

function tabClass(tab) {
  return activeTab.value === tab
    ? 'px-3 py-1 border-b-2 border-blue-500 font-semibold'
    : 'px-3 py-1 border-b'
}

onMounted(async () => {
  const res = await $fetch(`/api/profile/${userId}`)
  user.value = res.user
  isAdmin.value = res.currentUser?.role === 'admin'
})
</script>