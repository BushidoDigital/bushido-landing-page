export type Theme = 'playful' | 'professional'

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'playful')

  const toggleTheme = () => {
    theme.value = theme.value === 'playful' ? 'professional' : 'playful'

    // Update the data attribute on the document element for CSS
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', theme.value)
    }
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  // Initialize theme on mount
  if (import.meta.client) {
    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value)
    })
  }

  return {
    theme: readonly(theme),
    toggleTheme,
    setTheme,
    isPlayful: computed(() => theme.value === 'playful'),
    isProfessional: computed(() => theme.value === 'professional')
  }
}
