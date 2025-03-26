export default defineNuxtRouteMiddleware((to, from) => {
  const authTokenCookie = useCookie('authToken')

  if (!authTokenCookie.value) {
    return navigateTo({
      path: '/masuk',
      query: { then: 'back' }
    })
  }
})
