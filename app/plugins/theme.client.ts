// Early theme initialization to prevent flash of wrong theme
export default defineNuxtPlugin(() => {
  // Read theme from cookie before Vue hydration
  const themeCookie = useCookie<'playful' | 'serious'>('bushido-theme', {
    default: () => 'playful'
  })

  // Apply theme immediately to prevent flash
  if (import.meta.client) {
    document.documentElement.setAttribute('data-theme', themeCookie.value || 'playful')
  }
})
