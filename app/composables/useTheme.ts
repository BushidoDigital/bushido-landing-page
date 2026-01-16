export type Theme = 'playful' | 'serious'

export interface TransitionOrigin {
  x: number
  y: number
}

export const useTheme = () => {
  // Use cookie for persistence (prevents flash on page load)
  const themeCookie = useCookie<Theme>('bushido-theme', {
    default: () => 'playful',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })

  const theme = useState<Theme>('theme', () => themeCookie.value || 'playful')

  // Transition state
  const isTransitioning = useState<boolean>('theme-transitioning', () => false)
  const transitionOrigin = useState<TransitionOrigin | null>('theme-transition-origin', () => null)
  const transitionTarget = useState<Theme | null>('theme-transition-target', () => null)

  // Reactive useHead to keep data-theme attribute in sync (works on both server and client)
  useHead({
    htmlAttrs: {
      'data-theme': computed(() => theme.value)
    }
  })

  // Toggle theme with click event for transition animation origin
  const toggleTheme = (clickEvent?: MouseEvent) => {
    // Set transition origin from click event
    if (clickEvent && import.meta.client) {
      transitionOrigin.value = {
        x: clickEvent.clientX,
        y: clickEvent.clientY
      }
    } else if (import.meta.client) {
      // Default to center of screen
      transitionOrigin.value = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    }

    // Set target theme
    const newTheme = theme.value === 'playful' ? 'serious' : 'playful'
    transitionTarget.value = newTheme

    // Start transition
    isTransitioning.value = true
  }

  // Called by transition overlay when animation reaches midpoint
  const applyThemeChange = () => {
    if (transitionTarget.value) {
      theme.value = transitionTarget.value
      themeCookie.value = transitionTarget.value
    }
  }

  // Called by transition overlay when animation completes
  const finishTransition = () => {
    isTransitioning.value = false
    transitionOrigin.value = null
    transitionTarget.value = null
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    themeCookie.value = newTheme
  }

  return {
    theme: readonly(theme),
    toggleTheme,
    setTheme,
    applyThemeChange,
    finishTransition,
    isPlayful: computed(() => theme.value === 'playful'),
    isSerious: computed(() => theme.value === 'serious'),
    // Transition state (readonly)
    isTransitioning: readonly(isTransitioning),
    transitionOrigin: readonly(transitionOrigin),
    transitionTarget: readonly(transitionTarget)
  }
}
