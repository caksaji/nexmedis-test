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
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="col-span-full flex items-center justify-between gap-4 w-full">
        <div>
          <SectionTitle title="Daftar Pengguna" />
          <SectionTitle v-if="user.all?.total" :subtitle="`Total: ${(user.all.total - 1).toString()}`" />
        </div>
        <SpButton v-if="!showSkeleton" color="prime" size="sm" @click="modalForm.openModal()">
          Tambah pengguna
          <template #icon>
            <IconSvg name="plus" class="h-6 w-6" />
          </template>
        </SpButton>
      </div>
      <div v-for="(u, i) in userList" :key="i" class="col-span-1">
        <div class="h-full p-4 rounded-xl border border-gray-400 shadow-md">
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
            <SpButton color="blue" block size="sm" @click="modalForm.openModal(u)">
              Perbarui
              <template #icon>
                <IconSvg name="edit-pencil" class="h-6 w-6" />
              </template>
            </SpButton>
            <SpButton color="red" block size="sm" @click="modalDel.openModal(u)">
              Hapus
              <template #icon>
                <IconSvg name="trash" class="h-6 w-6" />
              </template>
            </SpButton>
          </div>
        </div>
      </div>
      <div v-if="showSkeleton" class="col-span-1">
        <div class="flex gap-4 h-full w-full p-4 rounded-xl border border-gray-400 shadow-md">
          <SkeletonBlock class="flex-shrink-0 h-12 w-12 rounded-full" />
          <div class="space-y-2">
            <SkeletonBlock class="flex-shrink-0 h-6 w-32 rounded-md" />
            <SkeletonBlock class="flex-shrink-0 h-4 w-28 rounded-md" />
          </div>
        </div>
      </div>
    </div>
    <ModalForm ref="modalForm" @completed="updateList" />
    <ModalDel ref="modalDel" @completed="delUser" />
  </div>
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'
import SpButton from '~/components/partial/SpButton'
import IconSvg from '~/components/partial/IconSvg'
import SkeletonBlock from '~/components/partial/SkeletonBlock'
import ModalForm from '~/components/functional/user/ModalForm'
import ModalDel from '~/components/functional/user/ModalDel'

definePageMeta({
  path: '/dashboard',
  layout: 'bos'
})

useHead({ title: 'Dashboard' })

const loggedinUserCookie = useCookie('loggedinUser')
const user = useUserStore()
const modalForm = ref()
const modalDel = ref()
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
    else {
      userList.value = JSON.parse(JSON.stringify(userList.value))
    }
  })
}
const updateList = (data) => {
  if (data.mode === 'add') {
    userList.value.push(data)
  }
  else if (data.mode === 'edit') {
    userList.value[userList.value.findIndex(i => i.id === data.id)] = data
  }
}
const delUser = (id) => userList.value.splice(userList.value.findIndex(i => i.id === id), 1)
</script>
