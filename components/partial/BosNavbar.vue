<template>
  <div class="h-16">
    <div class="fixed top-0 left-0 w-screen py-2 bg-white/50 backdrop-filter backdrop-blur" style="z-index: 1;">
      <div class="container flex items-center justify-between gap-4">
        <div class="w-full mx-auto bg-left bg-no-repeat bg-contain" :style="{ backgroundImage: 'url(/img/logo-auth.png)' }">
          <img src="/img/logo-auth.png" class="h-12 invisible">
        </div>
        <div class="flex items-center gap-2 py-1 pr-4 pl-1 rounded-full bg-white border border-gray-400 shadow-md">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-center bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${loggedinUserCookie.avatar})` }" />
          <span class="whitespace-nowrap font-semibold">{{ loggedinUserCookie.firstname }} {{ loggedinUserCookie.lastname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconSvg from '~/components/partial/IconSvg'
import SpButton from '~/components/partial/SpButton'

const loggedinUserCookie = useCookie('loggedinUser')
</script>
