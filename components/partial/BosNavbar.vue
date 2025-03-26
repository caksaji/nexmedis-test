<template>
  <div>
    <div v-if="showSidebar" class="fixed top-0 left-0 h-screen w-screen bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur md:hidden dark:bg-black dark:bg-opacity-25" style="z-index: 10;" @click="showSidebar = false" />
    <div
      v-wave
      tabindex="0"
      class="fixed bottom-8 right-4 grid place-items-center h-16 w-16 rounded-full outline-0 text-white bg-prime-600 hover:bg-prime-700 focus:bg-prime-700 cursor-pointer focus:ring focus:ring-opacity-90 focus:ring-offset-2 focus:ring-prime-700 dark:ring-offset-gray-800 md:hidden click-effect"
      style="z-index: 12;"
      @click="showSidebar = !showSidebar"
      @keydown.enter="showSidebar = !showSidebar"
      @keydown.space="showSidebar = !showSidebar"
    >
      <IconSvg :name="showSidebar ? 'xmark' : 'menu'" class="h-8 w-8" />
    </div>
    <div class="hidden w-60 md:block" />
    <div class="fixed top-0 right-0 h-screen w-60 p-2 transform duration-300 md:left-0 md:translate-x-0 sidebar" :class="{ 'translate-x-full': showSidebar === false }" style="z-index: 11;">
      <div class="h-full border border-gray-300 rounded-xl bg-white overflow-hidden dark:border-gray-800 dark:bg-gray-800">
        <div class="pt-2 px-2">
          <div class="h-8 bg-contain bg-no-repeat bg-center md:bg-left" :style="{ backgroundImage: 'url(/img/logo-long.png)' }" />
        </div>
        <div class="px-2 mt-8">
          <div class="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-500" />
          <div class="pt-6 pb-8 space-y-4">
            <div class="flex items-center space-x-2">
              <div
                class="grid place-items-center flex-shrink-0 h-8 w-8 rounded-full overflow-hidden"
                :class="{
                  'bg-red-300 text-red-600': loggedinUserCookie?.avatar?.color === 'red',
                  'bg-yellow-300 text-yellow-600': loggedinUserCookie?.avatar?.color === 'yellow',
                  'bg-green-300 text-green-600': loggedinUserCookie?.avatar?.color === 'green',
                  'bg-blue-300 text-blue-600': loggedinUserCookie?.avatar?.color === 'blue',
                  'bg-pink-300 text-pink-600': loggedinUserCookie?.avatar?.color === 'pink'
                }"
              >
                <div class="m-auto font-semibold" style="font-size: 2rem; line-height: 0.9;">
                  {{ loggedinUserCookie?.avatar?.initial }}
                </div>
              </div>
              <div class="font-semibold">
                {{ loggedinUserCookie.username }}
              </div>
            </div>
            <div class="flex items-center justify-between space-x-2">
              <div
                v-wave
                :tabindex="showSidebar || screenMinWidth ? 0 : -1"
                class="grid place-items-center flex-shrink-0 h-8 px-2 rounded-md border border-gray-600 outline-0 overflow-hidden cursor-pointer click-effect hover:border-prime-600 hover:text-prime-600 focus:border-prime-600 focus:text-prime-600 dark:border-gray-400"
                style="line-height: 1.5; font-size: calc(1rem - 2px);"
                @click="swapColorMode"
                @keydown.enter="swapColorMode"
                @keydown.space="swapColorMode"
              >
                Tema
              </div>
              <SpButton color="red" size="sm" border :disabled="!showSidebar && !screenMinWidth" @click="openModalLogout">
                <template #icon>
                  <IconSvg name="log-out" class="h-5 w-5" />
                </template>
                Keluar
              </SpButton>
            </div>
          </div>
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
