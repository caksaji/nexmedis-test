export const useUserStore = defineStore('user', () => {
  const all = ref([])

  const setAll = data => all.value = data

  const getAll = async (data) => {
    try {
      const res = await fetchApi(`users?page=${data?.page || 1}`, { method: 'get' })
      setAll(res)
    }
    catch (error) { setAll([]) }
  }

  return {
    all,
    getAll
  }
})
