<template>
  <div class="relative overflow-hidden">
    <!-- Decorative halftone background -->
    <div class="halftone absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true"></div>

    <!-- Decorative accent blobs -->
    <div ref="blob1" class="absolute top-20 -right-20 w-80 h-80 bg-neo-lime/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
    <div ref="blob2" class="absolute bottom-40 -left-20 w-96 h-96 bg-neo-orange/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

    <!-- Comic Sound Effects -->
    <div ref="powText" class="absolute top-32 right-10 comic text-6xl md:text-8xl font-black text-neo-orange opacity-20 -rotate-12 pointer-events-none select-none" aria-hidden="true">
      POW!
    </div>
    <div ref="zapText" class="absolute bottom-32 left-10 comic text-5xl md:text-7xl font-black text-neo-cyan opacity-20 rotate-6 pointer-events-none select-none" aria-hidden="true">
      ZAP!
    </div>

    <!-- Hero Section with Speech Bubble -->
    <section class="container pt-16 pb-8">
      <div class="relative">
        <!-- Main hero card -->
        <div class="pop-card bg-neo-lime rounded-2xl p-6 md:p-8 relative overflow-visible -rotate-1 hover:rotate-0 transition-transform">
          <h1 class="comic text-4xl md:text-5xl lg:text-6xl font-black ink leading-tight">Let's build something!</h1>
          <p class="ink/80 mt-3 text-lg md:text-xl max-w-2xl">
            Got a project in mind? Want to chat about what we can build together? Drop us a line.
          </p>
        </div>

        <!-- Speech bubble -->
        <div ref="speechBubble" class="hidden lg:block absolute -right-20 top-0 speech bg-white px-6 py-4 max-w-xs animate-float">
          <p class="comic text-xl font-black ink">We're friendly, we promise!</p>
        </div>
      </div>
    </section>

    <!-- Email Section with animated envelope -->
    <section class="container pb-8">
      <div class="pop-card bg-white rounded-2xl p-6 md:p-8 relative overflow-visible rotate-1 hover:rotate-0 transition-transform">
        <h2 class="comic text-2xl md:text-3xl font-black ink mb-4">Email us directly</h2>
        <a href="mailto:hello@bushido.digital"
           @click="showPow"
           class="group inline-flex items-center gap-3 pop-btn px-6 py-4 rounded-xl bg-neo-magenta text-xl font-bold hover:-rotate-1 hover:scale-105 transition-all">
          <UIcon name="i-heroicons-envelope" class="w-6 h-6 group-hover:animate-bounce" />
          hello@bushido.digital
        </a>
      </div>
    </section>

    <!-- POW! effects -->
    <div
      v-for="pow in pows"
      :key="pow.id"
      class="fixed pointer-events-none z-50 comic-pow"
      :style="{ left: pow.x + 'px', top: pow.y + 'px' }"
    >
      <div class="relative flex items-center justify-center w-48 h-48">
        <!-- Colored starburst background -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="border-[8px] border-black w-full h-full starburst shadow-[10px_10px_0_#000]" :class="pow.color.replace('text-', 'bg-')"></div>
        </div>
        <span class="comic text-6xl font-black text-white relative z-10 comic-text-stroke">{{ pow.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animate } from 'motion'

// Page-specific SEO
useSeoMeta({
  title: 'Contact — Bushido.digital',
  description: 'Get in touch with Bushido. Email us or find us on social media.',
})

// Magenta background for this page
useHead({
  bodyAttrs: {
    class: ['bg-neo-magenta']
  }
})

// Refs for entrance animations
const blob1 = ref<HTMLElement>()
const blob2 = ref<HTMLElement>()
const powText = ref<HTMLElement>()
const zapText = ref<HTMLElement>()
const speechBubble = ref<HTMLElement>()

// POW! effect state
interface Pow {
  id: number
  x: number
  y: number
  text: string
  color: string
}

const pows = ref<Pow[]>([])
let powId = 0

const comicWords = [
  { text: 'POW!', color: 'text-neo-orange' },
  { text: 'ZAP!', color: 'text-neo-cyan' },
  { text: 'BOOM!', color: 'text-neo-magenta' },
  { text: 'BAM!', color: 'text-neo-lime' },
  { text: 'WHAM!', color: 'text-neo-purple' },
]

function showPow(event: MouseEvent) {
  const randomIndex = Math.floor(Math.random() * comicWords.length)
  const randomWord = comicWords[randomIndex] || comicWords[0]

  const pow: Pow = {
    id: powId++,
    x: event.clientX - 96, // Center the larger container (w-48 = 192px / 2)
    y: event.clientY - 96,
    text: randomWord.text,
    color: randomWord.color
  }

  pows.value.push(pow)

  // Remove after animation completes
  setTimeout(() => {
    pows.value = pows.value.filter(p => p.id !== pow.id)
  }, 600)
}

// Entrance animations on mount
onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  // Animate decorative blobs - unfold from center
  if (blob1.value) {
    animate(
      blob1.value,
      { scale: [0, 1], opacity: [0, 0.3], rotate: [180, 0] },
      { duration: 1.2, delay: 0.2, easing: [0.34, 1.56, 0.64, 1] } // Bouncy easing
    )
  }

  if (blob2.value) {
    animate(
      blob2.value,
      { scale: [0, 1], opacity: [0, 0.2], rotate: [-180, 0] },
      { duration: 1.2, delay: 0.4, easing: [0.34, 1.56, 0.64, 1] }
    )
  }

  // Animate POW! - pop in with rotation
  if (powText.value) {
    animate(
      powText.value,
      { scale: [0, 1.2, 1], opacity: [0, 0.2], rotate: [-90, -12] },
      { duration: 0.8, delay: 0.6, easing: [0.34, 1.56, 0.64, 1] }
    )
  }

  // Animate ZAP! - pop in with opposite rotation
  if (zapText.value) {
    animate(
      zapText.value,
      { scale: [0, 1.2, 1], opacity: [0, 0.2], rotate: [90, 6] },
      { duration: 0.8, delay: 0.8, easing: [0.34, 1.56, 0.64, 1] }
    )
  }

  // Animate speech bubble - slide and bounce
  if (speechBubble.value) {
    animate(
      speechBubble.value,
      { scale: [0, 1.1, 1], x: [50, 0], opacity: [0, 1] },
      { duration: 0.6, delay: 1, easing: [0.34, 1.56, 0.64, 1] }
    )
  }
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes comicPow {
  0% {
    transform: scale(0) rotate(-12deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(8deg);
    opacity: 1;
  }
  100% {
    transform: scale(1.4) rotate(-5deg);
    opacity: 0;
  }
}

.comic-pow {
  animation: comicPow 0.6s ease-out forwards;
}

.comic-text-stroke {
  text-shadow:
    -5px -5px 0 #000,
    5px -5px 0 #000,
    -5px 5px 0 #000,
    5px 5px 0 #000,
    -5px 0 0 #000,
    5px 0 0 #000,
    0 -5px 0 #000,
    0 5px 0 #000,
    -3px -3px 0 #000,
    3px -3px 0 #000,
    -3px 3px 0 #000,
    3px 3px 0 #000,
    -2px 0 0 #000,
    2px 0 0 #000,
    0 -2px 0 #000,
    0 2px 0 #000;
}

.starburst {
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
  );
}
</style>
