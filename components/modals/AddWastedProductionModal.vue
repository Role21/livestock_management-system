// AddWastedProductionModal.vue
<template>
  <Modal :show="show" @close="emit('close')">
    <template #title>Add Wasted Production</template>

    <div class="space-y-4">
      <div>
        <label>Product Name</label>
        <input v-model="form.productName" class="input" disabled />
      </div>
      <div>
        <label>Category</label>
        <input v-model="form.category" class="input" disabled />
      </div>
      <div>
        <label>Shed</label>
        <input v-model="form.shed" class="input" disabled />
      </div>
      <div>
        <label>Batch</label>
        <input v-model="form.batch" class="input" disabled />
      </div>
      <div>
        <label>Product in Stock</label>
        <input v-model="form.inStock" class="input" disabled />
      </div>
      <div>
        <label>Wasted Quantity*</label>
        <input type="number" v-model="form.wastedQuantity" class="input" required />
      </div>
      <div>
        <label>Production Date*</label>
        <input type="date" v-model="form.date" class="input" required />
      </div>
      <div>
        <label>Description</label>
        <textarea v-model="form.description" class="textarea"></textarea>
      </div>

      <div class="flex justify-end space-x-2">
        <button class="btn" @click="submit">Submit</button>
        <button class="btn-secondary" @click="emit('close')">Cancel</button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['close', 'submit'])
const props = defineProps({
  show: Boolean,
  productData: Object
})

const form = ref({
  productName: props.productData.productName,
  category: props.productData.category,
  shed: props.productData.shed,
  batch: props.productData.batch,
  inStock: props.productData.inStock,
  wastedQuantity: '',
  date: '',
  description: ''
})

function submit() {
  // Validate
  if (!form.value.wastedQuantity || !form.value.date) return
  emit('submit', form.value)
  emit('close')
}
</script>

<style scoped>
.input, .textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.btn-secondary {
  background-color: #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
</style>