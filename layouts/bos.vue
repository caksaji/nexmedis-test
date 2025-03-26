<template>
  <div class="flex justify-center w-full mx-auto" style="max-width: 1440px;">
    <div v-if="blockView" class="fixed top-0 left-0 h-screen w-screen bg-gray-50 dark:bg-gray-900" style="z-index: 999;" />
    <BosNavbar class="flex-shrink-0" />
    <div class="pt-8 px-4 pb-32 md:pb-12 md:pr-4 content-container">
      <slot />
    </div>
  </div>
</template>

<script setup>
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

<style lang="less" scoped>
  .content-container {
    width: 100%;
    @media (min-width: 768px) { width: calc(100% - 15rem); }
  }
</style>
