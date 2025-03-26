<template>
  <div class="flex min-h-screen max-w-screen-xl mx-auto md:gap-4 md:px-4">
    <div class="flex flex-col items-center justify-center min-h-screen w-full max-w-sm space-y-8 p-4 mx-auto md:px-0">
      <div class="w-full mx-auto bg-center bg-no-repeat bg-contain" :style="{ backgroundImage: 'url(/img/logo-auth.png)' }">
        <img src="/img/logo-auth.png" class="h-16 invisible">
      </div>
      <div class="w-full">
        <slot />
      </div>
      <div class="text-center">
        {{ $route.path === '/daftar' ? 'Sudah punya akun?' : 'Belum punya akun?' }} <span v-wave tabindex="0" class="link" @click="switchMode" @keydown.enter="switchMode">{{ $route.path === '/daftar' ? 'Masuk disini' : 'Daftar disini' }}</span>
      </div>
    </div>
    <div class="hidden w-full py-4 md:block">
      <div class="h-full rounded-xl bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: 'url(/img/illu/authCover.png)' }" />
    </div>
  </div>
</template>

<script setup>
import SpButton from '~/components/partial/SpButton'

const authTokenCookie = useCookie('authToken')
const auth = useAuthStore()

onMounted(() => {
  if (authTokenCookie.value) {
    navigateTo('/dashboard', { replace: true })
  }
})

const switchMode = () => {
  if (useRoute().path === '/daftar') {
    navigateTo({
      path: '/masuk',
      query: useRoute().query
    },
    { replace: true })
  }
  else {
    navigateTo({
      path: '/daftar',
      query: useRoute().query
    },
    { replace: true })
  }
}
</script>
