<template>
  <div class="animals-list">
    <h1>Livestock</h1>
    <NuxtLink to="/animals/add" class="add-animal-button">New Animal</NuxtLink>

    <div v-if="animals && animals.length > 0">
      <div class="table-wrapper">
        <table class="animals-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Purchase Price</th>
              <th>Sold Price</th>
              <th>Health Status</th>
              <th>Quantity</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="animal in animals" :key="animal.id">
              <td>{{ animal.id }}</td>
              <td>{{ animal.name }}</td>
              <td>{{ animal.species }}</td>
              <td>{{ animal.breed }}</td>
              <td>{{ animal.dob }}</td>
              <td>{{ animal.gender }}</td>
              <td>{{ animal.weight }}</td>
              <td>{{ animal.purchase_price }}</td>
              <td>{{ animal.sold_price }}</td>
              <td>{{ animal.health_status }}</td>
              <td>{{ animal.quantity }}</td>
              <td>{{ animal.notes }}</td>
              <td>
                <NuxtLink :to="`/animals/${animal.id}`" class="view-button">View</NuxtLink>
                <NuxtLink :to="`/animals/${animal.id}/edit`" class="edit-button">Edit</NuxtLink>
                <button @click="deleteAnimal(animal.id)" class="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>No animals found or loading...</p>
    </div>
  </div>
</template>

<script setup>
const { data: animals, refresh } = await useFetch('/api/animals');

const deleteAnimal = async (id) => {
  if (confirm('Are you sure you want to delete this animal?')) {
    try {
      await $fetch(`/api/animals/${id}`, {
        method: 'DELETE',
      });
      refresh();
    } catch (error) {
      console.error('Error deleting animal:', error);
      alert('Failed to delete animal. Please try again.');
    }
  }
};
</script>

<style scoped>
.animals-list {
  padding: 20px;
  font-family: sans-serif;
  max-width: 100%;
  width: 90%;
  margin: 0 auto;
}

h1 {
  text-align: left;
  margin-bottom: 10px;
}

.add-animal-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

.animals-table {
  width: 100%;
  min-width: 1200px; /* Adjust the table minimum width */
  border-collapse: collapse;
  margin-top: 10px;
}

.animals-table th,
.animals-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.animals-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.animals-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.animals-table tr:hover {
  background-color: #f1f1f1;
}

.view-button,
.edit-button,
.delete-button {
  display: inline-block;
  padding: 6px 10px;
  margin: 2px;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.view-button {
  background-color: #28a745;
}

.view-button:hover {
  background-color: #218838;
}

.edit-button {
  background-color: #ffc107;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
