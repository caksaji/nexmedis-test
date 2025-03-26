<template>
  <SpModal v-model="showModal" title="Hapus Pengguna" :closable="!loading">
    <template v-if="originalData">
      Yakin hapus pengguna ini?
      <div class="flex gap-4 w-full p-4 rounded-xl border my-4 border-gray-400 shadow-md">
        <div class="flex-shrink-0 h-12 w-12 rounded-full bg-center bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${originalData.avatar})` }" />
        <div class="w-full">
          <div class="font-semibold text-xl">
            {{ originalData.first_name }} {{ originalData.last_name }}
          </div>
          <div>
            {{ originalData.email }}
          </div>
        </div>
      </div>
      Setelah dihapus maka data pengguna ini <span class="font-semibold">tidak dapat dikembalikan</span>
    </template>
    <template #footer-content>
      <SpButton color="white" :disabled="loading" @click="closeModal">
        Batal
      </SpButton>
      <SpButton color="red" :loading="loading" :disabled="loading" @click="submitFormDelete">
        Hapus pengguna
      </SpButton>
    </template>
  </SpModal>
</template>

<script setup>
import SpModal from '~/components/partial/SpModal'
import SpButton from '~/components/partial/SpButton'
import SpinnerCircle from '~/components/partial/SpinnerCircle'

const user = useUserStore()
const showModal = ref(false)
const originalData = ref(null)
const loading = ref(false)

const emit = defineEmits(['completed'])

const openModal = (value) => {
  showModal.value = true
  originalData.value = JSON.parse(JSON.stringify(value))
}
const submitFormDelete = () => {
  loading.value = true
  useNuxtApp().$toast.success('Berhasil hapus pengguna')
  closeModal()
  emit('completed', user.del(originalData.value.id))
  loading.value = false
}
const closeModal = () => {
  showModal.value = false
  loading.value = false
}

defineExpose({ openModal })
</script>
