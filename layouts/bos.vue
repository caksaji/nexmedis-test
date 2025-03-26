<template>
  <div class="max-w-screen-lg mx-auto">
    <div v-if="blockView" class="fixed top-0 left-0 h-screen w-screen bg-white" style="z-index: 999;" />
    <BosNavbar class="flex-shrink-0" />
    <div class="container py-8">
      <slot />
    </div>
    <ModalsContainer />
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
import BosNavbar from '~/components/partial/BosNavbar'

const authTokenCookie = useCookie('authToken')
const loggedinUserCookie = useCookie('loggedinUser')
const blockView = ref(false)

onMounted(async () => {
  if (!authTokenCookie.value || !loggedinUserCookie.value) {
    navigateTo('/', { replace: true })
  }
  else {
    blockView.value = false
  }
})
</script>
