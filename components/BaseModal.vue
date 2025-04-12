<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
      <!-- Close button -->
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-600 hover:text-black">
        &times;
      </button>
      <!-- Modal Title -->
      <h3 v-if="title" class="text-lg font-semibold mb-4">{{ title }}</h3>
      <!-- Modal Content -->
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* Optional additional styles */
</style>
