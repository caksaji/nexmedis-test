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
  const add = (data) => {
    return { ...data, id: Date.now(), avatar: 'https://avatar.iran.liara.run/public' }
  }
  const edit = (data) => {
    return { ...data }
  }
  const del = id => id

  return {
    all,
    getAll,
    add,
    edit,
    del
  }
})
