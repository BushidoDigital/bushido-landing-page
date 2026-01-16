// Server-side theme initialization - sets theme attribute during SSR to prevent flash
export default defineNuxtPlugin((nuxtApp) => {
  const event = useRequestEvent()

  if (event) {
    // Read cookie from request
    const cookies = event.node.req.headers.cookie || ''
    const match = cookies.match(/bushido-theme=(playful|serious)/)
    const theme = match ? match[1] : 'playful'

    // Set the attribute on the HTML element during SSR
    useHead({
      htmlAttrs: {
        'data-theme': theme
      }
    })
  }
})
