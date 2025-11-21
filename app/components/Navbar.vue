<template>
  <header
    :class="[
      // Mobile-first thinner frame; thicker from md up
      'sticky top-0 z-50 transition-all duration-200 border-[4px] md:border-[6px] border-transparent',
      scrolled
        ? 'bg-white/95 supports-[backdrop-filter]:backdrop-blur border-black rounded-xl md:rounded-2xl shadow-[6px_6px_0_#000] md:shadow-[8px_8px_0_#000]'
        : 'bg-transparent'
    ]"
  >
    <div class="container py-2 md:py-3 flex items-center justify-between">
      <NuxtLink to="/" aria-label="Home" class="flex items-center gap-2 md:gap-3 group min-h-[44px] shrink-0">
        <span class="comic text-3xl lg:text-4xl leading-none font-black ink group-hover:underline underline-offset-4">Bushido</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-4">
        <NuxtLink to="#services" class="px-3 py-2 rounded-lg ink font-semibold hover:underline underline-offset-4">What we build</NuxtLink>
        <NuxtLink to="/portfolio" class="px-3 py-2 rounded-lg ink font-semibold hover:underline underline-offset-4">Work</NuxtLink>
        <NuxtLink to="/contact" class="pop-btn px-4 py-2 rounded-xl inline-flex items-center gap-2 bg-neo-magenta">
          <UIcon name="i-heroicons-paper-airplane" />
          <span class="font-bold">Start something</span>
        </NuxtLink>
      </nav>

      <!-- Mobile menu toggle -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border-4 border-black bg-white/95 shadow-[4px_4px_0_#000] focus:outline-none focus:ring-2 focus:ring-black"
        :aria-expanded="open ? 'true' : 'false'"
        aria-controls="mobile-menu"
        @click="toggle()"
      >
        <UIcon :name="open ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'" class="w-5 h-5 ink" />
        <span class="sr-only">Toggle navigation</span>
      </button>
    </div>

    <!-- Mobile menu panel -->
    <transition name="collapse">
      <div
        v-show="open"
        id="mobile-menu"
        class="md:hidden px-4 pb-3 pt-2 space-y-2 border-t-4 border-black bg-white/98 supports-[backdrop-filter]:backdrop-blur rounded-b-xl shadow-[6px_6px_0_#000]"
        :style="safeInsets"
      >
        <NuxtLink @click="close()" to="#services" class="block px-3 py-3 rounded-lg ink font-semibold hover:underline underline-offset-4">What we build</NuxtLink>
        <NuxtLink @click="close()" to="/portfolio" class="block px-3 py-3 rounded-lg ink font-semibold hover:underline underline-offset-4">Work</NuxtLink>
        <NuxtLink @click="close()" to="/contact" class="block pop-btn px-4 py-3 rounded-xl inline-flex items-center gap-2 bg-neo-magenta">
          <UIcon name="i-heroicons-paper-airplane" />
          <span class="font-bold">Start something</span>
        </NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
defineOptions({ name: 'SiteNavbar' })

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()

function toggle() { open.value = !open.value }
function close() { open.value = false }

// Safe-area aware inline padding for the mobile dropdown
const safeInsets = computed(() => ({
  paddingLeft: 'max(1rem, env(safe-area-inset-left))',
  paddingRight: 'max(1rem, env(safe-area-inset-right))'
}))

onMounted(() => {
  const onScroll = () => {
    // Toggle once user scrolls a little bit
    scrolled.value = window.scrollY > 8
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  // Close on ESC
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
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

/* Simple collapse transition for the mobile panel */
.collapse-enter-active, .collapse-leave-active {
  transition: opacity .15s ease, transform .15s ease;
  transform-origin: top;
}
.collapse-enter-from, .collapse-leave-to { opacity: 0; transform: scaleY(0.98); }
.collapse-enter-to, .collapse-leave-from { opacity: 1; transform: scaleY(1); }
</style>
