<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">My Profile</h1>

    <!-- Tab Navigation -->
    <div class="flex space-x-4 border-b mb-6">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['pb-2 px-4', currentTab === tab ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500']"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Profile Picture -->
    <div class="mb-6 flex items-center space-x-4">
      <img
        :src="user.profilePicture || 'https://via.placeholder.com/100'"
        alt="Profile"
        class="w-24 h-24 rounded-full object-cover border"
      />
      <input type="file" @change="handleProfilePictureUpload" />
    </div>

    <!-- Tab Content -->
    <div v-if="currentTab === 'Personal Info'" class="space-y-4">
      <div><strong>Name:</strong> {{ user.name }}</div>
      <div><strong>Email:</strong> {{ user.email }}</div>
      <div><strong>Role:</strong> {{ user.role }}</div>
      <div><strong>Joined On:</strong> {{ user.createdAt }}</div>
    </div>

    <div v-if="currentTab === 'Activity'" class="space-y-2">
      <div v-for="(log, index) in user.activityLogs" :key="index" class="text-gray-600">
        • {{ log }}
      </div>
    </div>

    <div v-if="currentTab === 'Settings'" class="space-y-4">
      <label>
        <span class="block font-medium">Update Name:</span>
        <input v-model="user.name" class="border p-2 rounded w-full" />
      </label>
      <label>
        <span class="block font-medium">Update Email:</span>
        <input v-model="user.email" class="border p-2 rounded w-full" />
      </label>
      <button @click="saveSettings" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTab = ref('Personal Info')
const tabs = ['Personal Info', 'Activity', 'Settings']

const user = ref({
  name: '',
  email: '',
  role: '',
  createdAt: '',
  profilePicture: '',
  activityLogs: [],
})

onMounted(async () => {
  const response = await $fetch('/api/profile') // Adjust based on auth/user context
  user.value = response
})

const handleProfilePictureUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('profilePicture', file)

  const uploaded = await $fetch('/api/profile/uploadProfilePicture', {
    method: 'POST',
    body: formData,
  })

  if (uploaded && uploaded.url) {
    user.value.profilePicture = uploaded.url
  }
}

const saveSettings = async () => {
  await $fetch('/api/profile', {
    method: 'PUT',
    body: {
      name: user.value.name,
      email: user.value.email,
    },
  })
  alert('Profile updated successfully!')
}
</script>