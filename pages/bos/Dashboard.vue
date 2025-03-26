<template>
  <div class="space-y-4">
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
    <div class="flex items-center justify-between gap-4 w-full">
      <div>
        <SectionTitle title="Daftar Pengguna" />
        <SectionTitle :subtitle="`Total: ${(user.all?.total - 1).toString()}`" />
      </div>
      <SpButton color="prime" size="sm">
        Tambah pengguna
        <template #icon>
          <IconSvg name="plus" class="h-6 w-6" />
        </template>
      </SpButton>
    </div>
    <div v-for="(u, i) in userList" :key="i" class="p-4 rounded-xl border border-gray-400 shadow-md">
      <div class="flex gap-4 w-full">
        <div class="flex-shrink-0 h-12 w-12 rounded-full bg-center bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${u.avatar})` }" />
        <div class="w-full">
          <div class="font-semibold text-xl">
            {{ u.first_name }} {{ u.last_name }}
          </div>
          <div>
            {{ u.email }}
          </div>
        </div>
      </div>
      <div class="flex gap-2 w-full pt-4">
        <SpButton color="blue" block size="sm">
          Ubah
          <template #icon>
            <IconSvg name="edit-pencil" class="h-6 w-6" />
          </template>
        </SpButton>
        <SpButton color="red" block size="sm">
          Hapus
          <template #icon>
            <IconSvg name="trash" class="h-6 w-6" />
          </template>
        </SpButton>
      </div>
    </div>
    <div v-if="showSkeleton" class="flex gap-4 w-full p-4 rounded-xl border border-gray-400 shadow-md">
      <SkeletonBlock class="flex-shrink-0 h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <SkeletonBlock class="flex-shrink-0 h-6 w-32 rounded-md" />
        <SkeletonBlock class="flex-shrink-0 h-4 w-28 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'
import SpButton from '~/components/partial/SpButton'
import IconSvg from '~/components/partial/IconSvg'
import SkeletonBlock from '~/components/partial/SkeletonBlock'

definePageMeta({
  path: '/dashboard',
  layout: 'bos'
})

useHead({ title: 'Dashboard' })

const loggedinUserCookie = useCookie('loggedinUser')
const user = useUserStore()
const filter = ref({ page: 1 })
const showSkeleton = ref(true)
const userList = ref([])

onMounted(() => loadData())

const loadData = async () => {
  showSkeleton.value = true
  await user.getAll(filter.value).then(() => {
    user.all?.data?.forEach((value) => {
      if (value.email !== loggedinUserCookie.value.email) {
        userList.value.push(value)
      }
    })
    showSkeleton.value = false
    if (filter.value.page < user.all?.total_pages) {
      filter.value.page += 1
      loadData()
    }
  })
}
</script>
