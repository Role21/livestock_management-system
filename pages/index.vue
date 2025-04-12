<template>
  <div class="dashboard-background">
    <div class="dashboard">
      <h1>Livestock Management Dashboard</h1>
      <p>Welcome to your livestock management system.</p>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h2>Total Animals</h2>
          <p>
            <span v-if="pending">Loading...</span>
            <span v-else>{{ totalAnimals }}</span>
          </p>
        </div>
        <div class="stat-card">
          <h2>Breeding Pairs</h2>
          <p>{{ breedingPairs }}</p>
        </div>
        <div class="stat-card">
          <h2>Health Alerts</h2>
          <p>{{ healthAlerts }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data, pending } = await useFetch('/api/animals/count')
const totalAnimals = computed(() => data.value?.count || 0)

const breedingPairs = 10 // You can fetch this too from DB if needed
const healthAlerts = 3   // Same here
</script>

<style scoped>
.dashboard-background {
  background-image: url('/images/farm-background.jpeg'); /* Add this image in public/images/ */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dashboard h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
}

.dashboard p {
  font-size: 1.2rem;
  color: #555;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.stat-card h2 {
  margin-bottom: 10px;
  color: #222;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
}
</style>
