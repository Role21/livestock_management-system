<template>
    <div class="animal-details">
      <h1>Animal Details</h1>
      <div v-if="animal" class="animal-info">
        <h2>{{ animal.name }}</h2>
        <p><strong>Species:</strong> {{ animal.species }}</p>
        <p><strong>Breed:</strong> {{ animal.breed }}</p>
        <p><strong>Date of Birth:</strong> {{ animal.dob }}</p>
        <p><strong>Gender:</strong> {{ animal.gender }}</p>
        <p><strong>Weight:</strong> {{ animal.weight }}</p>
        <p><strong>Notes:</strong> {{ animal.notes }}</p>
        <p><strong>Age:</strong>{{animal.age}}</p>
      </div>
      <div v-else>
        <p>Loading animal details...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const animalId = route.params.id;
  const { data: animal } = await useFetch(`/api/animals/${animalId}`);
  </script>
  
  <style scoped>
  .animal-details {
    padding: 20px;
    font-family: sans-serif;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .animal-info {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .animal-info h2 {
    color: #333;
    margin-bottom: 10px;
  }
  
  .animal-info p {
    line-height: 1.6;
  }
  
  .animal-info strong {
    font-weight: bold;
  }
  </style>