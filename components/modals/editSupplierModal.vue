<template>
    <BaseModal :show="show" @close="$emit('close')">
      <template #header>Edit Supplier Payment</template>
  
          <button class="mt-4 bg-green-600 text-white px-4 py-2 rounded">Update Payment</button>
        </form>
      </template>
    </BaseModal>
  </template>
  <script setup>
  const props = defineProps(['show', 'paymentData'])
  const emit = defineEmits(['close', 'updated'])
  
  const form = reactive({ ...props.paymentData })
  
  watch(() => props.paymentData, (newVal) => {
    Object.assign(form, newVal)
  })
  
  const submitForm = async () => {
    try {
      await $fetch(`/api/supplier/payments/${form.id}`, {
        method: 'PUT',
        body: form,
      })
      emit('updated')
      emit('close')
    } catch (err) {
      alert('Error updating payment: ' + err.message)
    }
  }
  </script>