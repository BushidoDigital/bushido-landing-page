<template>
  <div class="contact-page relative flex-1 flex items-center transition-colors duration-500 bg-neo-cyan">
    <!-- Organic blob decorations - fixed to viewport so they flow everywhere -->
    <div ref="blobContainerRef" class="fixed inset-0 pointer-events-none opacity-0" aria-hidden="true">
      <div class="blob blob-1 bg-neo-lime"></div>
      <div class="blob blob-2 bg-neo-magenta"></div>
      <div class="blob blob-3 bg-neo-cyan"></div>
      <div class="blob blob-4 bg-neo-orange"></div>
    </div>

    <!-- Subtle grid pattern (serious mode) -->
    <div v-if="isSerious" class="absolute inset-0 serious-grid pointer-events-none" aria-hidden="true" />

    <!-- Main content -->
    <section class="container relative z-10 py-8 md:py-4">
      <div class="grid md:grid-cols-2 gap-6 md:gap-6 lg:gap-12 items-center w-full">
        <!-- Left side - Hero text -->
        <div ref="heroRef" class="space-y-3 md:space-y-3 lg:space-y-6 text-center md:text-left">
          <h1 class="comic text-[4.5rem] sm:text-8xl md:text-7xl lg:text-[10rem] font-black ink leading-[0.85]">
            <span ref="line1Ref" class="block opacity-0">Let's</span>
            <span ref="line2Ref" class="block opacity-0">chat.</span>
          </h1>

          <!-- Animated tagline -->
          <p ref="taglineRef" class="comic text-2xl sm:text-3xl md:text-2xl lg:text-5xl font-bold ink/90 opacity-0">
            No project too
            <span ref="bigRef" class="inline-block text-neo-magenta squish-word">big</span>
            <span class="mx-1">or too</span>
            <span ref="smallRef" class="inline-block text-neo-cyan squish-word">small</span>.
          </p>

          <p ref="subtitleRef" class="text-lg sm:text-xl md:text-base lg:text-2xl ink/70 max-w-xl mx-auto md:mx-0 leading-relaxed opacity-0">
            Got a project in mind? Drop us a line and let's make something great together.
          </p>
        </div>

        <!-- Right side - Contact cards -->
        <div class="space-y-3 md:space-y-2 lg:space-y-4">
          <!-- Email card -->
          <div
            ref="card1Ref"
            class="contact-card bg-white rounded-2xl p-4 md:p-4 lg:p-6 border-[3px] md:border-[3px] lg:border-[4px] border-black shadow-[4px_4px_0_#000] md:shadow-[4px_4px_0_#000] lg:shadow-[6px_6px_0_#000] opacity-0"
          >
            <div class="flex items-center gap-3 md:gap-3 lg:gap-4 mb-3 md:mb-3 lg:mb-5">
              <div class="w-11 h-11 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-neo-magenta rounded-xl md:rounded-lg lg:rounded-2xl border-[2px] md:border-[2px] lg:border-[3px] border-black flex items-center justify-center flex-shrink-0">
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 ink" />
              </div>
              <div>
                <h2 class="comic text-lg md:text-lg lg:text-2xl font-black ink">Email us</h2>
                <p class="text-xs md:text-xs lg:text-sm ink/60">We reply within 24 hours</p>
              </div>
            </div>
            <a
              href="mailto:hello@bushido.digital"
              @click="showPow"
              class="block w-full text-center py-2.5 md:py-2.5 lg:py-4 px-4 md:px-4 lg:px-6 bg-neo-lime rounded-lg md:rounded-lg lg:rounded-xl border-[2px] md:border-[2px] lg:border-[3px] border-black font-bold text-sm md:text-sm lg:text-lg ink
                     shadow-[3px_3px_0_#000] md:shadow-[3px_3px_0_#000] lg:shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                     transition-all duration-200 ease-out"
            >
              hello@bushido.digital
            </a>
          </div>

          <!-- Social card -->
          <div
            ref="card2Ref"
            class="contact-card bg-neo-orange rounded-2xl p-4 md:p-4 lg:p-6 border-[3px] md:border-[3px] lg:border-[4px] border-black shadow-[4px_4px_0_#000] md:shadow-[4px_4px_0_#000] lg:shadow-[6px_6px_0_#000] opacity-0"
          >
            <div class="flex items-center gap-3 md:gap-3 lg:gap-4 mb-3 md:mb-3 lg:mb-5">
              <div class="w-11 h-11 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-white rounded-xl md:rounded-lg lg:rounded-2xl border-[2px] md:border-[2px] lg:border-[3px] border-black flex items-center justify-center flex-shrink-0">
                <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 ink" />
              </div>
              <div>
                <h2 class="comic text-lg md:text-lg lg:text-2xl font-black ink">Find us online</h2>
                <p class="text-xs md:text-xs lg:text-sm ink/60">Follow our work</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 md:gap-2 lg:gap-3">
              <a
                href="https://github.com/BushidoDigital"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 py-2 md:py-2 lg:py-3 px-3 md:px-3 lg:px-4 bg-white rounded-lg md:rounded-lg lg:rounded-xl border-[2px] md:border-[2px] lg:border-[3px] border-black font-bold text-xs md:text-xs lg:text-base ink
                       shadow-[3px_3px_0_#000] md:shadow-[3px_3px_0_#000] lg:shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                       transition-all duration-200 ease-out"
              >
                <UIcon name="i-simple-icons-github" class="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                GitHub
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61583902959065"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 py-2 md:py-2 lg:py-3 px-3 md:px-3 lg:px-4 bg-white rounded-lg md:rounded-lg lg:rounded-xl border-[2px] md:border-[2px] lg:border-[3px] border-black font-bold text-xs md:text-xs lg:text-base ink
                       shadow-[3px_3px_0_#000] md:shadow-[3px_3px_0_#000] lg:shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                       transition-all duration-200 ease-out"
              >
                <UIcon name="i-simple-icons-facebook" class="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                Facebook
              </a>
            </div>
          </div>
        </div>
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
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="border-[6px] border-black w-full h-full starburst shadow-[8px_8px_0_#000]" :class="pow.color.replace('text-', 'bg-')"></div>
        </div>
        <span class="comic text-6xl font-black text-white relative z-10 comic-text-stroke">{{ pow.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animate } from 'motion'

// Theme state
const { isSerious } = useTheme()

definePageMeta({
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  }
})

useSeoMeta({
  title: 'Contact — Bushido.digital',
  description: 'Get in touch with Bushido. Email us or find us on social media.',
})

// Refs for animations
const blobContainerRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const line1Ref = ref<HTMLElement | null>(null)
const line2Ref = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)
const bigRef = ref<HTMLElement | null>(null)
const smallRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const card1Ref = ref<HTMLElement | null>(null)
const card2Ref = ref<HTMLElement | null>(null)

// Check for reduced motion
const prefersReducedMotion = ref(false)

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReducedMotion.value) {
    // Fade in blobs first
    if (blobContainerRef.value) {
      animate(
        blobContainerRef.value,
        { opacity: [0, 1] },
        { duration: 1.2, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Staggered text animations (slightly delayed to let blobs fade in)
    if (line1Ref.value) {
      animate(
        line1Ref.value,
        { opacity: [0, 1], y: [60, 0] },
        { duration: 1, delay: 0.3, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (line2Ref.value) {
      animate(
        line2Ref.value,
        { opacity: [0, 1], y: [60, 0] },
        { duration: 1, delay: 0.45, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Tagline animation
    if (taglineRef.value) {
      animate(
        taglineRef.value,
        { opacity: [0, 1], y: [30, 0] },
        { duration: 1, delay: 0.65, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Squish animations for "big" and "small" - start after tagline appears
    const startSquishAnimations = () => {
      // "big" grows large then squishes
      if (bigRef.value) {
        animate(
          bigRef.value,
          {
            scale: [1, 1.4, 1.5, 1.1, 1],
            rotate: [0, -2, 1, 0, 0]
          },
          {
            duration: 1.6,
            delay: 0,
            easing: [0.34, 1.56, 0.64, 1]
          }
        )
      }

      // "small" shrinks then bounces back
      if (smallRef.value) {
        animate(
          smallRef.value,
          {
            scale: [1, 0.65, 0.6, 0.9, 1],
            rotate: [0, 1, -1, 0, 0]
          },
          {
            duration: 1.6,
            delay: 0.8,
            easing: [0.34, 1.56, 0.64, 1]
          }
        )
      }
    }

    // Start squish animations after initial entrance, then loop
    setTimeout(() => {
      startSquishAnimations()
      setInterval(startSquishAnimations, 4000)
    }, 1800)

    if (subtitleRef.value) {
      animate(
        subtitleRef.value,
        { opacity: [0, 1], y: [30, 0] },
        { duration: 1, delay: 0.85, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Card animations
    if (card1Ref.value) {
      animate(
        card1Ref.value,
        { opacity: [0, 1], y: [40, 0], rotate: [2, 0] },
        { duration: 1, delay: 0.5, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (card2Ref.value) {
      animate(
        card2Ref.value,
        { opacity: [0, 1], y: [40, 0], rotate: [-2, 0] },
        { duration: 1, delay: 0.7, easing: [0.22, 1, 0.36, 1] }
      )
    }
  } else {
    // No motion - just show elements
    [blobContainerRef, line1Ref, line2Ref, taglineRef, subtitleRef, card1Ref, card2Ref].forEach(ref => {
      if (ref.value) ref.value.style.opacity = '1'
    })
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
  { text: 'BAM!', color: 'text-neo-lime' },
  { text: 'WHAM!', color: 'text-neo-magenta' },
]

function showPow(event: MouseEvent) {
  const randomWord = comicWords[Math.floor(Math.random() * comicWords.length)]

  const pow: Pow = {
    id: powId++,
    x: event.clientX - 96,
    y: event.clientY - 96,
    text: randomWord.text,
    color: randomWord.color
  }

  pows.value.push(pow)
  setTimeout(() => {
    pows.value = pows.value.filter(p => p.id !== pow.id)
  }, 600)
}
</script>

<style scoped>
/* Organic morphing blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  border: 5px solid black;
  animation: morph 20s ease-in-out infinite;
  z-index: 0;
}

.blob-1 {
  width: 400px;
  height: 400px;
  top: -150px;
  right: -100px;
  animation-delay: 0s;
}

.blob-2 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  left: -80px;
  animation-delay: -5s;
}

.blob-3 {
  width: 200px;
  height: 200px;
  top: 40%;
  right: 5%;
  animation-delay: -10s;
}

.blob-4 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 10%;
  animation-delay: -15s;
}

@keyframes morph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(0deg) scale(1);
  }
  25% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: rotate(5deg) scale(1.05);
  }
  50% {
    border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
    transform: rotate(-5deg) scale(0.95);
  }
  75% {
    border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
    transform: rotate(3deg) scale(1.02);
  }
}

/* Float animation for smaller blobs */
.blob-3, .blob-4 {
  animation: morph 20s ease-in-out infinite, float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* POW effect */
@keyframes comicPow {
  0% { transform: scale(0) rotate(-15deg); opacity: 0; }
  40% { transform: scale(1.3) rotate(10deg); opacity: 1; }
  100% { transform: scale(1.5) rotate(-5deg); opacity: 0; }
}

.comic-pow {
  animation: comicPow 0.6s ease-out forwards;
}

.comic-text-stroke {
  text-shadow:
    -4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000, 4px 4px 0 #000,
    -4px 0 0 #000, 4px 0 0 #000, 0 -4px 0 #000, 0 4px 0 #000;
}

.starburst {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* Squish word styling */
.squish-word {
  display: inline-block;
  transform-origin: center center;
  will-change: transform;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
  }
  .comic-pow {
    animation: none;
    opacity: 0;
  }
  .squish-word {
    transform: none !important;
  }
}

/* Tablet blob sizing */
@media (max-width: 1024px) {
  .blob-1 {
    width: 320px;
    height: 320px;
    top: -100px;
    right: -80px;
  }
  .blob-2 {
    width: 280px;
    height: 280px;
    bottom: -80px;
    left: -70px;
  }
  .blob-3 {
    width: 180px;
    height: 180px;
    top: 50%;
    right: -40px;
  }
  .blob-4 {
    width: 140px;
    height: 140px;
    bottom: 30%;
    left: 5%;
  }
}

/* Mobile blob sizing - bigger and bolder */
@media (max-width: 640px) {
  .blob-1 {
    width: 280px;
    height: 280px;
    top: -100px;
    right: -100px;
  }
  .blob-2 {
    width: 320px;
    height: 320px;
    bottom: -120px;
    left: -120px;
  }
  .blob-3 {
    width: 150px;
    height: 150px;
    top: 15%;
    right: -30px;
  }
  .blob-4 {
    width: 120px;
    height: 120px;
    bottom: auto;
    top: 45%;
    left: -40px;
  }
}
</style>
