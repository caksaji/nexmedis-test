<template>
  <div class="space-y-4">
    <SectionTitle title="Dashboard" />
    <div class="p-4 rounded-xl border border-gray-400 shadow-md">
      <div class="flex gap-4 w-full">
        <div class="flex-shrink-0 h-20 w-20 rounded-full bg-center bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${loggedinUserCookie.avatar})` }" />
        <div class="w-full">
          <div class="font-semibold text-xl">
            {{ loggedinUserCookie.firstname }} {{ loggedinUserCookie.lastname }}
          </div>
          <div>
            {{ loggedinUserCookie.email }}
          </div>
          <div class="pt-2">
            <SpButton color="red" size="sm" @click="navigateTo('/keluar', { replace: true })">
              Keluar
              <template #icon>
                <IconSvg name="log-out" class="h-6 w-6" />
              </template>
            </SpButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'
import SpButton from '~/components/partial/SpButton'
import IconSvg from '~/components/partial/IconSvg'

definePageMeta({
  path: '/dashboard',
  layout: 'bos'
})

useHead({ title: 'Dashboard' })

const loggedinUserCookie = useCookie('loggedinUser')
</script>
