<template>
  <div class="space-y-4">
    <SectionTitle title="Daftar" class="text-prime-700" />
    <SpInputText
      v-model="input.email.value"
      type="email"
      label="Email"
      placeholder="Masukkan email anda"
      :disabled="loading"
      :error="input.email.error"
    />
    <SpInputText
      v-model="input.pw.value"
      :type="viewPw ? 'text' : 'password'"
      label="Sandi"
      placeholder="Masukkan sandi anda"
      :disabled="loading"
      :error="input.pw.error"
      icon="right"
      class="relative"
    >
      <template #icon>
        <div v-wave tabindex="0" class="h-6 w-6 rounded-full outline-0 ring-prime-700 cursor-pointer click-effect focus:ring" @click="viewPw = !viewPw" @keydown.enter="viewPw = !viewPw">
          <IconSvg :name="viewPw ? 'eye-closed' : 'eye'" />
        </div>
      </template>
    </SpInputText>
    <SpButton color="prime" block :loading="loading" :disabled="loading" @click="checkFormLogin">
      Daftar
    </SpButton>
  </div>
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'
import SpInputText from '~/components/partial/SpInputText'
import IconSvg from '~/components/partial/IconSvg'
import SpButton from '~/components/partial/SpButton'

definePageMeta({
  path: '/daftar',
  layout: 'auth'
})

useHead({ title: 'Daftar' })

const auth = useAuthStore()
const viewPw = ref(false)
const loading = ref(false)
const input = ref({
  email: { value: null, error: null },
  pw: { value: null, error: null }
})

const checkFormLogin = () => {
  if (input.value.email.value && useNuxtApp().$validEmail(input.value.email.value) && input.value.pw.value) {
    submitFormLogin()
  }
  input.value.email.error = input.value.email.value && useNuxtApp().$validEmail(input.value.email.value) ? null : input.value.email.value && !useNuxtApp().$validEmail(input.value.email.value) ? 'Format email salah, contoh: nama@mail.com' : 'Email harus diisi'
  input.value.pw.error = input.value.pw.value ? null : 'Sandi harus diisi'
}
const submitFormLogin = async () => {
  loading.value = true
  const data = {
    email: input.value.email.value,
    password: input.value.pw.value
  }
  await auth.register(data)
    .then(() => {
      useNuxtApp().$toast.success('Berhasil daftar, silakan masuk dengan akun yang didaftarkan')
      navigateTo({
        path: '/masuk',
        query: useRoute().query
      },
      { replace: true })
    })
    .catch((error) => {
      useNuxtApp().$toast.error(error?.data?.error)
    })
  loading.value = false
}
</script>
