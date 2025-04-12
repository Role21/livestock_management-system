<template>
  <form @submit.prevent="submitForm" class="animal-form">
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="animalData.name" required />
  
    <label for="species">Species:</label>
    <input type="text" id="species" v-model="animalData.species" required />
  
    <label for="breed">Breed:</label>
    <input type="text" id="breed" v-model="animalData.breed" />
  
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" v-model="animalData.dob" />
  
    <label for="gender">Gender:</label>
    <input type="text" id="gender" v-model="animalData.gender" />
  
    <label for="weight">Weight:</label>
    <input type="number" id="weight" v-model="animalData.weight" />
  
    <label for="notes">Notes:</label>
    <textarea id="notes" v-model="animalData.notes"></textarea>

    <!-- New fields for age and health status -->
    <label for="age">Age:</label>
    <input type="number" id="age" v-model="animalData.age" readonly />

    <label for="health_status">Health Status:</label>
    <input type="text" id="health_status" v-model="animalData.health_status" />

    <button type="submit">Submit</button>
    
    <div v-if="message" :class="messageType">{{ message }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const animalData = ref({
  name: '',
  species: '',
  breed: '',
  dob: null,
  gender: '',
  weight: null,
  notes: '',
  age: null,            // Add age
  health_status: ''     // Add health status
});

const message = ref('');
const messageType = ref(''); // Used to apply different styles for success or error messages

const submitForm = async () => {
  try {
    // Calculate age based on DOB
    const dob = new Date(animalData.value.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    animalData.value.age = age;  // Assign age to the form data

    // Send the form data to the backend
    const response = await $fetch('/api/animals', {
      method: 'POST',
      body: animalData.value, // Send the form data as the request body
    });
    
    // Handle success
    message.value = 'Animal added successfully!';
    messageType.value = 'success';  // Assign a success class for styling
    
    // Optionally, redirect or reset the form after successful submission
    animalData.value = { name: '', species: '', breed: '', dob: null, gender: '', weight: null, notes: '', age: null, health_status: '' }; // Reset the form

  } catch (error) {
    // Handle errors
    message.value = 'Failed to add animal. Please try again.';
    messageType.value = 'error';  // Assign an error class for styling
    console.error('Error adding animal:', error);
  }
};
</script>

<style scoped>
.animal-form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

label,
input {
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 10px;
  font-size: 16px;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
