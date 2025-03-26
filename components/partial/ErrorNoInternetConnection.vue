<template>
  <div class="flex fixed top-0 left-0 h-screen w-full transform duration-300 bg-white" :class="{ 'translate-y-full': isOnline, 'cursor-progress': loading }" style="z-index: 13;">
    <div class="container flex flex-col items-center justify-center h-full max-w-sm space-y-8 py-4">
      <div class="bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(/img/illu/error-noInternet.svg)' }">
        <img src="/img/illu/error-noInternet.svg" class="h-full invisible">
      </div>
      <div class="font-semibold text-center text-xl text-prime-700">
        Koneksi internet terputus
      </div>
      <div class="text-center">
        Periksa kembali koneksi internet anda. Nyalakan internet atau hubungkan dengan wifi.
      </div>
      <SpButton color="prime" block :loading="loading" :disabled="loading" @click="checkConnection">
        Muat ulang
      </SpButton>
    </div>
  </div>
</template>

<script setup>
import { useOnline } from '@vueuse/core'

import SpButton from '~/components/partial/SpButton'

const isOnline = useOnline()
const loading = ref(false)

const checkConnection = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 5000)
}
</script>
