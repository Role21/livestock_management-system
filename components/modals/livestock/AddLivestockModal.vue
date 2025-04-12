<template>
    <UModal v-model="isOpen">
      <UCard title="Add New Livestock" class="space-y-4">
        <UForm @submit.prevent="submit">
          <UFormGroup label="Livestock Name*" name="name" required>
            <UInput v-model="form.name" />
          </UFormGroup>
          <UFormGroup label="Description" name="description">
            <UTextarea v-model="form.description" />
          </UFormGroup>
          <div class="flex justify-end gap-2">
            <UButton type="submit" color="primary">Save</UButton>
            <UButton @click="isOpen = false" color="gray">Cancel</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </template>
  
  <script setup>
  const props = defineProps(['isOpen'])
  const emit = defineEmits(['update:isOpen', 'submit'])
  const form = reactive({ name: '', description: '' })
  
  function submit() {
    emit('submit', form)
    emit('update:isOpen', false)
  }
  </script>
  