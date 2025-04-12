<template>
    <div class="animal-card">
      <h3>{{ animal.name }}</h3>
      <p>Species: {{ animal.species }}</p>
      <NuxtLink :to="`./animals/${animal.id}`" class="view-details">View Details</NuxtLink>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    animal: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .animal-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .animal-card h3 {
    color: #333;
    margin-bottom: 5px;
  }
  
  .view-details {
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    margin-top: 10px;
  }
  </style>