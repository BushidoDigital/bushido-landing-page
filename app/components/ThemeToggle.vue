<template>
  <button
    @click="handleToggle"
    class="theme-toggle pop-btn relative overflow-hidden px-6 py-3 font-bold rounded-lg text-sm uppercase tracking-wide"
    :aria-label="isPlayful ? 'Switch to serious theme' : 'Switch to playful theme'"
  >
    <!-- Sliding text container -->
    <div class="relative h-5 flex items-center justify-center">
      <div
        class="absolute inset-0 flex flex-col items-center justify-start theme-text-container"
        :class="{ 'slide-up': isToggling }"
      >
        <!-- Current state text (visible) -->
        <span class="block h-5 leading-5 whitespace-nowrap flex items-center gap-1.5">
          <span>{{ isPlayful ? 'Go Serious' : 'Get Fun!' }}</span>
          <span class="text-base">{{ isPlayful ? '👔' : '🎨' }}</span>
        </span>
        <!-- Next state text (below, will slide up) -->
        <span class="block h-5 leading-5 whitespace-nowrap font-black flex items-center gap-1.5" :class="isPlayful ? 'text-slate-600' : 'text-neo-orange'">
          <span>{{ isPlayful ? 'SUIT UP!' : 'WHEE!' }}</span>
          <span class="text-base">{{ isPlayful ? '🎩' : '✨' }}</span>
        </span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
const { toggleTheme, isPlayful } = useTheme()
const isToggling = ref(false)
let pendingEvent: MouseEvent | null = null

const handleToggle = (event: MouseEvent) => {
  isToggling.value = true
  pendingEvent = event

  // Wait for text animation to complete before triggering theme change
  setTimeout(() => {
    toggleTheme(pendingEvent || undefined)
    isToggling.value = false
    pendingEvent = null
  }, 400)
}
</script>

<style scoped>
.theme-toggle {
  /* Override the default pop-btn transition to only apply to transform/shadow */
  transition: transform .05s ease, box-shadow .05s ease !important;
}

.theme-text-container {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.theme-text-container.slide-up {
  transform: translateY(-100%);
}

/* Add a fun rotation effect on click */
.theme-toggle:active {
  transform: translate(2px, 2px) rotate(-2deg);
}
</style>
