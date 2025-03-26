<template>
  <div class="content-space bg-white shadow-xl">
    <div class="content-space fixed top-0 h-screen w-full bg-white bg-contain bg-center bg-no-repeat" style="z-index: -1; background-size: 125px;" :style="{ backgroundImage: 'url(/img/logo-auth.png)' }" />
    <div class="min-h-screen">
      <NuxtLayout>
        <NuxtPage />
        <ErrorNoInternetConnection />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
import ErrorNoInternetConnection from '~/components/partial/ErrorNoInternetConnection'

useHead({ titleTemplate: titleChunk => titleChunk ? `${titleChunk} | Nexmedis` : 'Nexmedis' })
</script>
