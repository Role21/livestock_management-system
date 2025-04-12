<template>
  <div class="add-animal">
    <h1>New Livestock</h1>
    <form @submit.prevent="addAnimal">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <select v-model="animal.name" id="name" required @change="updateSpeciesAndBreeds">
            <option value="" disabled>Select Livestock Type</option>
            <option value="cattle">Cattle</option>
            <option value="sheep">Sheep</option>
            <option value="goat">Goat</option>
            <option value="pig">Pig</option>
            <option value="poultry">Poultry</option>
            <option value="rabbit">Rabbit</option>
            <option value="llama">Llama</option>
            <option value="bison">Bison</option>
            <option value="horse">Horse</option>
            <option value="camel">Camel</option>
            <option value="alpaca">Alpaca</option>
            <option value="donkey">Donkey</option>
            <option value="turkey">Turkey</option>
            <option value="guinea_pig">Guinea Pig</option>
          </select>
        </div>

        <div class="form-group" v-if="animal.name">
          <label for="species">Species</label>
          <select v-model="animal.species" id="species" required>
            <option value="" disabled>Select Species</option>
            <option v-for="species in speciesOptions[animal.name]" :key="species" :value="species">{{ species }}</option>
          </select>
        </div>

        <div class="form-group" v-if="animal.species">
          <label for="breed">Breed</label>
          <select v-model="animal.breed" id="breed" required>
            <option value="" disabled>Select Breed</option>
            <option v-for="breed in breedOptions[animal.species]" :key="breed" :value="breed">{{ breed }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input v-model="animal.dob" id="dob" type="date" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="gender">Gender</label>
          <select v-model="animal.gender" id="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="weight">Weight (kg)</label>
          <input v-model="animal.weight" id="weight" type="number" step="0.1" required />
        </div>
        <div class="form-group">
          <label for="purchase_price">Purchase Price</label>
          <input v-model="animal.purchase_price" id="purchase_price" type="number" step="0.01" required />
        </div>
        <div class="form-group">
          <label for="sold_price">Sold Price</label>
          <input v-model="animal.sold_price" id="sold_price" type="number" step="0.01" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input v-model="animal.quantity" id="quantity" type="number" min="1" required />
        </div>
        <div class="form-group">
          <label for="health_status">Health Status</label>
          <select v-model="animal.health_status" id="health_status" required>
            <option value="healthy">Healthy</option>
            <option value="sick">Sick</option>
            <option value="injured">Injured</option>
          </select>
        </div>
        <div class="form-group" style="grid-column: span 4;">
          <label for="notes">Notes</label>
          <textarea v-model="animal.notes" id="notes" placeholder="Additional information about the animal"></textarea>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
      <!-- Centered Back Button -->
      <div class="back-button-container">
        <button @click="goBack" class="back-button">Back</button>
      </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const animal = ref({
  name: '',
  species: '',
  breed: '',
  dob: '',
  gender: 'male',
  weight: '',
  purchase_price: '',
  sold_price: '',
  quantity: 1,
  health_status: 'healthy',
  notes: ''
});

const message = ref('');

const speciesOptions = {
  cattle: ['Dairy', 'Beef'],
  sheep: ['Dorset', 'Suffolk', 'Cheviot'],
  goat: ['Boer', 'Alpine', 'Nubian'],
  pig: ['Yorkshire', 'Landrace', 'Berkshire'],
  poultry: ['Chicken', 'Duck', 'Turkey'],
  rabbit: ['Angora', 'Californian', 'New Zealand'],
  llama: ['White', 'Black', 'Brown'],
  bison: ['Plains', 'Wood'],
  horse: ['Thoroughbred', 'Arabian', 'Clydesdale'],
  camel: ['Dromedary', 'Bactrian'],
  alpaca: ['Huacaya', 'Suri'],
  donkey: ['Miniature', 'Mammoth'],
  guinea_pig: ['American', 'Abyssinian', 'Peruvian'],
  turkey: ['Broad Breasted White', 'Heritage', 'Midget White'],
};

const breedOptions = {
  Dairy: ['Holstein', 'Jersey', 'Guernsey'],
  Beef: ['Angus', 'Hereford', 'Charolais'],
  Dorset: ['Whiteface Dorset'],
  Suffolk: ['Suffolk'],
  Cheviot: ['Cheviot'],
  Boer: ['Boer'],
  Alpine: ['Alpine'],
  Nubian: ['Nubian'],
  Yorkshire: ['Yorkshire'],
  Landrace: ['Landrace'],
  Berkshire: ['Berkshire'],
  Chicken: ['Rhode Island Red', 'Leghorn', 'Plymouth Rock'],
  Duck: ['Pekin', 'Muscovy', 'Khaki Campbell'],
  Turkey: ['Bronze', 'Broad Breasted White'],
  Angora: ['Angora'],
  Californian: ['Californian'],
  'New Zealand': ['New Zealand'],
  White: ['White'],
  Black: ['Black'],
  Brown: ['Brown'],
  Plains: ['Plains'],
  Wood: ['Wood'],
  Thoroughbred: ['American Thoroughbred', 'British Thoroughbred'],
  Arabian: ['Egyptian Arabian', 'Crabbet Arabian'],
  Clydesdale: ['Scottish Clydesdale', 'American Clydesdale'],
  Dromedary: ['Arabian Camel'],
  Bactrian: ['Mongolian Bactrian Camel'],
  Huacaya: ['Huacaya Alpaca'],
  Suri: ['Suri Alpaca'],
  Miniature: ['Miniature Donkey'],
  Mammoth: ['Mammoth Donkey'],
  American: ['American Guinea Pig'],
  Abyssinian: ['Abyssinian Guinea Pig'],
  Peruvian: ['Peruvian Guinea Pig'],
};

const updateSpeciesAndBreeds = () => {
  animal.value.species = '';
  animal.value.breed = '';
};

const addAnimal = async () => {
  try {
    await $fetch('/api/animals', {
      method: 'POST',
      body: animal.value,
    });

    message.value = 'Animal added successfully!';

    // Wait a bit then redirect
    setTimeout(() => {
      message.value = '';
      router.back(); // 👈 This line takes the user to the previous page
      // or use: router.push('/animals') if you want to go to a specific route
    }, 1000);
  } catch (error) {
    message.value = 'Failed to add animal. Please try again.';
    console.error(error);
  }
};

// Back button handler
const goBack = () => {
  router.push('/animals'); // Go back to the animals list page
};
</script>
<style scoped>
.add-animal {
  padding: 30px;
  font-family: 'Arial', sans-serif;
  max-width: 1000px;
  margin: 40px auto;
  border: 2px solid #007bff;
  border-radius: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  color: #007bff;
  margin-bottom: 20px;
}

form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 70px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  font-weight: bold;
  color: #333;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

textarea {
  resize: vertical;
  height: 100px;
}

button {
  grid-column: span 1;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  width: auto;
  align-self: center;
}

button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 20px;
  font-size: 16px;
  color: green;
  text-align: center;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  form {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .form-group {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .add-animal {
    margin: 20px;
    width: 100%;
    padding: 20px;
  }

  form {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-group {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
.back-button-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.back-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: #2779bd;
}

</style>