<template>
  <div class="content-space flex min-h-screen w-full text-center bg-white shadow-xl">
    <div class="container flex flex-col py-4">
      <div class="flex flex-col items-center justify-center h-full space-y-4">
        <template v-if="error.statusCode === 404 || error.statusCode === 500">
          <div class="bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url(/img/illu/error-${error.statusCode}.png)` }">
            <img :src="`/img/illu/error-${error.statusCode}.png`" class="h-full invisible">
          </div>
          <div class="font-semibold text-center text-xl text-prime-700">
            {{ error.statusCode === 404 ? 'Halaman yang anda tuju tidak ditemukan' : 'Terjadi gangguan pada server kami' }}
          </div>
        </template>
        <template v-else>
          <div class="font-semibold text-center text-xl text-prime-700">
            {{ error.statusCode }}
          </div>
          <div>
            Terjadi kesalahan
          </div>
        </template>
      </div>
      <SpButton color="prime" @click="$router.back()">
        Kembali
      </SpButton>
    </div>
  </div>
</template>

<script setup>
import SpButton from '~/components/partial/SpButton'

defineProps(['error'])
</script>
