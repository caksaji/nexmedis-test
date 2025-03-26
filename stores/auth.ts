export const useAuthStore = defineStore('auth', () => {
  const profile = ref({})
  const verified = ref({})

  const setProfile = data => profile.value = data
  const setVerified = data => verified.value = data

  const login = async data => await fetchApi('auth/login', { method: 'post', body: data })
  const register = async data => await fetchApi('auth/register', { method: 'post', body: data })
  const loginSocial = async data => await fetchApi('auth/login-sosmed', { method: 'post', body: data })
  const getProfile = async () => {
    try {
      await fetchApi('auth/profile', { method: 'get' }).then((res) => {
        const loggedinUserCookie = useCookie('loggedinUser')
        loggedinUserCookie.value = {
          ...loggedinUserCookie.value,
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname,
          fullname: res.data.user.fullname,
          email: res.data.user.email,
          verified: res.data.is_verified_account,
          avatar: res.data.user.avatar || loggedinUserCookie.value.avatar
        }
        setProfile(res)
      })
    }
    catch (error) {
      setProfile(error)
    }
  }
  const editProfile = async data => await fetchApi('auth/update-profile', { method: 'post', body: data })
  const editDisease = async data => await fetchApi('auth/riwayat-penyakit', { method: 'post', body: data })
  const editEmergencyContact = async data => await fetchApi('auth/user-emergency', { method: 'post', body: data })
  const verification = async data => await fetchApi('auth/upgrade-account', { method: 'get' })
  const checkVerification = async (data) => {
    try {
      await fetchApi('auth/email/data/verification', { method: 'post', body: data }).then((res) => {
        setVerified(res)
      })
    }
    catch (error) {
      setVerified(error)
    }
  }

  return {
    profile,
    verified,
    login,
    register,
    loginSocial,
    getProfile,
    editProfile,
    editDisease,
    editEmergencyContact,
    verification,
    checkVerification
  }
})
