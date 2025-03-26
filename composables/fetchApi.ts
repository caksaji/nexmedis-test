export const fetchApi = async (path, data) => {
  const authTokenCookie = useCookie('authToken')
  const loggedinUserCookie = useCookie('loggedinUser')
  const route = useRoute()
  const { $toast } = useNuxtApp()
  return await $fetch(`https://reqres.in/api/${path}`, {
    ...data,
    headers: authTokenCookie.value
      ? { Authorization: `Bearer ${authTokenCookie.value.token}` }
      : {}
  })
    .then(res => res)
    .catch((error) => {
      if (error.response.status === 401 && route.path === '/masuk') {
        authTokenCookie.value = null
        loggedinUserCookie.value = null
        throw error
      }
      else if (error.response.status === 401) {
        authTokenCookie.value = null
        loggedinUserCookie.value = null
        $toast.error('Anda tidak memiliki akses, silakan masuk terlebih dahulu')
        navigateTo('/masuk', { replace: true })
      }
      else {
        throw error
      }
    })
}
