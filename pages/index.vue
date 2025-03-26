<template>
  <div />
</template>

<script setup>
const authTokenCookie = useCookie('authToken')

onMounted(async () => {
  if (authTokenCookie.value) {
    navigateTo('/dashboard', { replace: true })
  }
  else {
    navigateTo('/keluar', { replace: true })
  }
})
</script>
