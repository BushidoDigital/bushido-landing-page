<template>
  <button
    @click="handleToggle"
    :class="[
      'relative overflow-hidden px-3 py-1.5 font-bold rounded-lg text-sm border-[3px] border-black shadow-[3px_3px_0_#000] transition-all duration-100',
      'hover:shadow-[4px_4px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5',
      'active:shadow-[1px_1px_0_#000] active:translate-x-0.5 active:translate-y-0.5',
      isPlayful ? 'bg-neo-lime' : 'bg-white'
    ]"
    :aria-label="isPlayful ? 'Switch to sensible mode' : 'Switch to fun mode'"
  >
    <div class="flex items-center gap-1.5">
      <span class="text-base">{{ isPlayful ? '🎨' : '👔' }}</span>
      <span class="hidden lg:inline">{{ isPlayful ? 'Fun' : 'Sensible' }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
const { toggleTheme, isPlayful } = useTheme()

const handleToggle = () => {
  toggleTheme()
}
</script>
