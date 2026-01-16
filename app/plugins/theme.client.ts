// Client-side theme initialization - ensures theme stays in sync after hydration
export default defineNuxtPlugin(() => {
  const themeCookie = useCookie<'playful' | 'serious'>('bushido-theme', {
    default: () => 'playful'
  })

  // Sync theme attribute with cookie value (server should have already set it)
  useHead({
    htmlAttrs: {
      'data-theme': themeCookie.value || 'playful'
    }
  })
})
