<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Decorative halftone background -->
    <div class="halftone absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true"></div>

    <!-- Decorative accent blobs -->
    <div class="absolute top-20 -right-20 w-80 h-80 bg-neo-lime/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
    <div class="absolute bottom-40 -left-20 w-96 h-96 bg-neo-orange/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

    <!-- Comic Sound Effects -->
    <div class="absolute top-32 right-10 comic text-6xl md:text-8xl font-black text-neo-orange opacity-20 -rotate-12 pointer-events-none select-none" aria-hidden="true">
      POW!
    </div>
    <div class="absolute bottom-32 left-10 comic text-5xl md:text-7xl font-black text-neo-cyan opacity-20 rotate-6 pointer-events-none select-none" aria-hidden="true">
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
        <div class="hidden lg:block absolute -right-20 top-0 speech bg-white px-6 py-4 max-w-xs animate-float">
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

    <!-- Social Media Section with dynamic cards -->
    <section class="container pb-16">
      <div class="pop-card bg-white rounded-2xl p-6 md:p-8 relative overflow-visible -rotate-1 hover:rotate-0 transition-transform">
        <h2 class="comic text-2xl md:text-3xl font-black ink mb-2">Catch us on social!</h2>
        <p class="ink/60 mb-6">Follow for behind-the-scenes, project updates, and tech tips</p>

        <div class="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <!-- GitHub -->
          <a href="https://github.com/BushidoDigital" target="_blank" rel="noopener noreferrer"
             @click="showPow"
             class="group pop-card bg-gray-900 rounded-xl p-6 flex flex-col items-center gap-3 hover:scale-110 hover:-rotate-3 transition-all relative overflow-visible">
            <div class="absolute -top-3 -right-3 bg-neo-lime border-3 border-black rounded-full px-3 py-1 comic text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity">
              💻 Code!
            </div>
            <UIcon name="i-simple-icons-github" class="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
            <span class="comic text-xl font-black text-white">GitHub</span>
            <span class="text-white/80 text-sm">@BushidoDigital</span>
          </a>

          <!-- Facebook -->
          <a href="https://www.facebook.com/profile.php?id=61583902959065" target="_blank" rel="noopener noreferrer"
             @click="showPow"
             class="group pop-card bg-blue-600 rounded-xl p-6 flex flex-col items-center gap-3 hover:scale-110 hover:rotate-3 transition-all relative overflow-visible">
            <div class="absolute -top-3 -right-3 bg-neo-orange border-3 border-black rounded-full px-3 py-1 comic text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity">
              👋 Follow us!
            </div>
            <UIcon name="i-simple-icons-facebook" class="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
            <span class="comic text-xl font-black text-white">Facebook</span>
            <span class="text-white/80 text-sm">Bushido Digital</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Fun footer message -->
    <section class="container pb-16">
      <div class="speech bg-neo-cyan px-8 py-6 mx-auto max-w-2xl text-center">
        <p class="comic text-2xl md:text-3xl font-black ink">
          Can't wait to hear from you! 🚀
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
