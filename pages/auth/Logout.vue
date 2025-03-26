<template>
  <div />
</template>

<script setup>
definePageMeta({ path: '/keluar' })

onMounted(() => {
  const cookieList = document.cookie.split(';')
  cookieList.forEach(c => {
    const cookie = c.split('=')[0].trim()
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  })
  navigateTo('/masuk', { replace: true })
})
</script>
