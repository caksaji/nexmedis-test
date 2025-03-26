export const useAuthStore = defineStore('auth', () => {
  const profile = ref({})

  const setProfile = data => profile.value = data

  const login = async data => await fetchApi('login', { method: 'post', body: data })
  const register = async data => await fetchApi('register', { method: 'post', body: data })
  const getProfile = async (data) => {
    try {
      await fetchApi(`users/${data}`, { method: 'get' }).then((res) => {
        const loggedinUserCookie = useCookie('loggedinUser')
        loggedinUserCookie.value = {
          ...loggedinUserCookie.value,
          firstname: res.data.first_name,
          lastname: res.data.last_name,
          email: res.data.email,
          avatar: res.data.avatar
        }
        setProfile(res)
      })
    }
    catch (error) {
      setProfile(error)
    }
  }

  return {
    profile,
    login,
    register,
    getProfile
  }
})
