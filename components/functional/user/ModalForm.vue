<template>
  <SpModal v-model="showModal" :title="`${mode === 'add' ? 'Tambah' : 'Perbarui'} Pengguna`" :closable="!loading" size="sm">
    <div class="space-y-4">
      <SpInputText v-model="input.firstName.value" label="Nama depan" placeholder="Contoh: Riki" :disabled="loading" :error="input.firstName.error" />
      <SpInputText v-model="input.lastName.value" label="Nama belakang" placeholder="Contoh: Irwanda" :disabled="loading" :error="input.lastName.error" />
      <SpInputText
        v-model="input.email.value"
        type="email"
        label="Email"
        placeholder="Contoh: riki.irwanda@mail.com"
        :disabled="loading"
        :error="input.email.error"
      />
    </div>
    <template #footer-content>
      <SpButton color="white" :disabled="loading" @click="closeModal">
        Batal
      </SpButton>
      <SpButton color="prime" :loading="loading" :disabled="loading" @click="checkForm">
        {{ `${mode === 'add' ? 'Tambah' : 'Perbarui'} pengguna` }}
      </SpButton>
    </template>
  </SpModal>
</template>

<script setup>
import SpModal from '~/components/partial/SpModal'
import SpInputText from '~/components/partial/SpInputText'
import SpButton from '~/components/partial/SpButton'

const user = useUserStore()
const showModal = ref(false)
const mode = ref('add')
const input = ref({
  firstName: { value: null, error: null },
  lastName: { value: null, error: null },
  email: { value: null, error: null }
})
const originalData = ref(null)
const loading = ref(false)

const emit = defineEmits(['completed'])

const openModal = (value = null) => {
  mode.value = 'add'
  originalData.value = null
  input.value = {
    firstName: { value: null, error: null },
    lastName: { value: null, error: null },
    email: { value: null, error: null }
  }
  showModal.value = true
  if (value) {
    mode.value = 'edit'
    originalData.value = JSON.parse(JSON.stringify(value))
    input.value.firstName.value = originalData.value.first_name
    input.value.lastName.value = originalData.value.last_name
    input.value.email.value = originalData.value.email
  }
}

const checkForm = () => {
  if (input.value.firstName.value && input.value.lastName.value && input.value.email.value && useNuxtApp().$validEmail(input.value.email.value)) {
    submitForm()
  }
  input.value.firstName.error = input.value.firstName.value ? null : 'Nama depan harus diisi'
  input.value.lastName.error = input.value.lastName.value ? null : 'Nama belakang harus diisi'
  input.value.email.error = input.value.email.value && useNuxtApp().$validEmail(input.value.email.value) ? null : input.value.email.value && !useNuxtApp().$validEmail(input.value.email.value) ? 'Format email salah, contoh: nama@mail.com' : 'Email harus diisi'
}
const submitForm = () => {
  loading.value = true
  let data = {
    first_name: input.value.firstName.value,
    last_name: input.value.lastName.value,
    email: input.value.email.value
  }
  if (mode.value === 'add') {
    useNuxtApp().$toast.success('Berhasil tambah pengguna')
    closeModal()
    emit('completed', { ...user.add(data), mode: mode.value })
  }
  else if (mode.value === 'edit') {
    data = { ...originalData.value, ...data }
    useNuxtApp().$toast.success('Berhasil ubah data pengguna')
    closeModal()
    emit('completed', { ...user.edit(data), mode: mode.value })
  }
  loading.value = false
}
const closeModal = () => {
  showModal.value = false
  setTimeout(() => loading.value = false, 1000)
}

defineExpose({ openModal })
</script>
