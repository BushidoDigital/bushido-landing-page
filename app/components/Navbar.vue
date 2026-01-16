<template>
  <header
    class="sticky top-0 z-50 transition-all duration-200"
    :class="scrolled ? 'scrolled bg-white/95 backdrop-blur-sm border-b-4 border-black shadow-[0_4px_0_#000]' : ''"
  >
    <div class="container py-2 md:py-3 flex items-center justify-between">
      <NuxtLink to="/" aria-label="Home" class="flex items-center gap-2 md:gap-3 group min-h-[44px] shrink-0">
        <span class="comic text-3xl lg:text-4xl leading-none font-black ink group-hover:underline underline-offset-4">Bushido</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-4">
        <NuxtLink to="/" class="px-3 py-2 rounded-lg ink font-semibold hover:underline underline-offset-4">Home</NuxtLink>
        <NuxtLink to="/portfolio" class="px-3 py-2 rounded-lg ink font-semibold hover:underline underline-offset-4">Work</NuxtLink>
        <ThemeToggleCompact />
        <NuxtLink to="/contact" class="pop-btn px-4 py-2 rounded-xl inline-flex items-center gap-2 bg-neo-magenta">
          <UIcon name="i-heroicons-paper-airplane" />
          <span class="font-bold">Start something</span>
        </NuxtLink>
      </nav>

      <!-- Mobile menu toggle -->
      <button
        type="button"
        :class="[
          'md:hidden inline-flex items-center justify-center w-11 h-11 focus:outline-none focus:ring-2',
          isSerious
            ? 'rounded-lg border border-gray-200 bg-white shadow-sm focus:ring-blue-500'
            : 'rounded-xl border-4 border-black bg-neo-orange shadow-[4px_4px_0_#000] focus:ring-black'
        ]"
        :aria-expanded="open ? 'true' : 'false'"
        aria-controls="mobile-menu"
        @click="toggle()"
      >
        <UIcon :name="open ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'" class="w-5 h-5 ink" />
        <span class="sr-only">Toggle navigation</span>
      </button>
    </div>

    <!-- Mobile menu panel -->
    <transition :name="isSerious ? 'slide' : 'collapse'">
      <div
        v-show="open"
        id="mobile-menu"
        :class="[
          'md:hidden px-4 pb-4 pt-3 space-y-2',
          isSerious
            ? 'bg-white border-t border-gray-100 shadow-lg'
            : 'border-t-4 border-black bg-neo-orange rounded-b-xl shadow-[6px_6px_0_#000]'
        ]"
        :style="safeInsets"
      >
        <NuxtLink @click="close()" to="/" class="block px-3 py-3 rounded-lg ink font-semibold hover:underline underline-offset-4">Home</NuxtLink>
        <NuxtLink @click="close()" to="/portfolio" class="block px-3 py-3 rounded-lg ink font-semibold hover:underline underline-offset-4">Work</NuxtLink>
        <div class="py-2">
          <ThemeToggleCompact />
        </div>
        <NuxtLink
          @click="close()"
          to="/contact"
          :class="[
            'block px-4 py-3 rounded-xl inline-flex items-center gap-2 font-bold',
            isSerious
              ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
              : 'pop-btn bg-neo-magenta'
          ]"
        >
          <UIcon name="i-heroicons-paper-airplane" />
          <span>Start something</span>
        </NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
defineOptions({ name: 'SiteNavbar' })

const { isSerious } = useTheme()
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

function toggle() { open.value = !open.value }
function close() { open.value = false }

// Track scroll position for navbar background
function onScroll() {
  scrolled.value = window.scrollY > 20
}

// Safe-area aware inline padding for the mobile dropdown
const safeInsets = computed(() => ({
  paddingLeft: 'max(1rem, env(safe-area-inset-left))',
  paddingRight: 'max(1rem, env(safe-area-inset-right))'
}))

onMounted(() => {
  // Close on ESC
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
  window.addEventListener('keydown', onKey)

  // Scroll listener for navbar background
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // Check initial scroll position

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('scroll', onScroll)
  })
})

// Lock page scroll when mobile menu is open
watch(open, (v) => {
  const el = document.documentElement
  if (v) {
    el.style.overflow = 'hidden'
  } else {
    el.style.overflow = ''
  }
})

// Close menu on route change
watch(() => route.fullPath, () => close())
</script>

<style scoped>
/* Ensure header spans full width without causing horizontal scroll */
header { contain: layout paint style; }

/* Playful mode: bouncy collapse transition */
.collapse-enter-active, .collapse-leave-active {
  transition: opacity .15s ease, transform .15s ease;
  transform-origin: top;
}
.collapse-enter-from, .collapse-leave-to { opacity: 0; transform: scaleY(0.98); }
.collapse-enter-to, .collapse-leave-from { opacity: 1; transform: scaleY(1); }

/* Serious mode: smooth slide transition */
.slide-enter-active, .slide-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
.slide-enter-to, .slide-leave-from { opacity: 1; transform: translateY(0); }
</style>
