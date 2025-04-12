<template>
    <UModal v-model="isOpen">
      <UCard title="Edit Variant" class="space-y-4">
        <UForm @submit.prevent="submit">
          <UFormGroup label="Livestock Type*" name="title" required>
            <UInput v-model="form.title" />
          </UFormGroup>
          <UFormGroup label="Description" name="description">
            <UTextarea v-model="form.description" />
          </UFormGroup>
          <div class="flex justify-end gap-2">
            <UButton type="submit" color="primary">Update</UButton>
            <UButton @click="isOpen = false" color="gray">Cancel</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </template>
  
  <script setup>
  const props = defineProps(['isOpen', 'variant'])
  const emit = defineEmits(['update:isOpen', 'submit'])
  
  const form = reactive({
    title: props.variant?.title || '',
    description: props.variant?.description || ''
  })
  
  watch(() => props.variant, (newVal) => {
    if (newVal) {
      form.title = newVal.title
      form.description = newVal.description
    }
  })
  
  function submit() {
    emit('submit', form)
    emit('update:isOpen', false)
  }
  </script>
  