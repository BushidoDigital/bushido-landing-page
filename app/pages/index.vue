<template>
  <div class="home-page relative bg-neo-cyan flex-1 flex items-start md:items-center overflow-hidden">
    <!-- Speed lines background -->
    <div ref="speedLinesRef" class="absolute inset-0 pointer-events-none opacity-0" aria-hidden="true">
      <div class="speed-lines"></div>
    </div>

    <!-- Halftone pattern overlay -->
    <div class="absolute inset-0 halftone-bg pointer-events-none" aria-hidden="true"></div>

    <!-- Main content -->
    <section class="container relative z-10 py-6 md:py-6">
      <div class="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center w-full">
        <!-- Left side - Hero text -->
        <div class="space-y-3 md:space-y-4 lg:space-y-6 text-center md:text-left">
          <div ref="bubble" class="speech inline-block text-sm md:text-sm lg:text-base opacity-0" tabindex="0">
            <span class="font-bold">なぜこれを翻訳するのでしょうか？</span>
          </div>

          <h1 class="comic text-5xl sm:text-6xl md:text-6xl lg:text-8xl xl:text-9xl font-black ink leading-[0.9]">
            <span ref="line1Ref" class="block opacity-0">Web apps</span>
            <span ref="line2Ref" class="block opacity-0">with punch.</span>
          </h1>

          <p ref="subtitleRef" class="text-base sm:text-lg md:text-lg lg:text-2xl ink/80 max-w-xl mx-auto md:mx-0 leading-relaxed opacity-0">
            We build custom web apps that power your business — from stunning storefronts to internal tools that streamline your operations.
          </p>

          <div ref="ctaRef" class="flex flex-row gap-3 md:gap-3 lg:gap-4 justify-center md:justify-start opacity-0">
            <NuxtLink
              class="pop-btn px-5 py-2.5 sm:px-6 sm:py-3 md:px-5 md:py-2.5 lg:px-8 lg:py-4 rounded-xl inline-block text-sm sm:text-base md:text-sm lg:text-lg font-bold bg-white"
              to="/portfolio"
            >
              See our work
            </NuxtLink>
            <NuxtLink
              class="pop-btn px-5 py-2.5 sm:px-6 sm:py-3 md:px-5 md:py-2.5 lg:px-8 lg:py-4 rounded-xl inline-block text-sm sm:text-base md:text-sm lg:text-lg font-bold bg-neo-magenta"
              to="/contact"
            >
              Start a project
            </NuxtLink>
          </div>
        </div>

        <!-- Right side - Service highlights -->
        <div class="space-y-3 md:space-y-3 lg:space-y-4">
          <div
            ref="card1Ref"
            class="service-highlight bg-white rounded-2xl p-4 md:p-4 lg:p-6 border-[3px] md:border-[3px] lg:border-4 border-black shadow-[4px_4px_0_#000] md:shadow-[4px_4px_0_#000] lg:shadow-[6px_6px_0_#000] opacity-0"
          >
            <div class="flex items-center gap-3 lg:gap-4">
              <div class="w-11 h-11 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-neo-orange rounded-xl md:rounded-lg lg:rounded-2xl border-2 md:border-2 lg:border-[3px] border-black flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 ink" />
              </div>
              <div>
                <h2 class="comic text-lg md:text-base lg:text-2xl font-black ink">Business Apps</h2>
                <p class="text-xs md:text-xs lg:text-sm ink/60">Custom tools that help your business work smarter</p>
              </div>
            </div>
          </div>

          <div
            ref="card2Ref"
            class="service-highlight bg-neo-orange rounded-2xl p-4 md:p-4 lg:p-6 border-[3px] md:border-[3px] lg:border-4 border-black shadow-[4px_4px_0_#000] md:shadow-[4px_4px_0_#000] lg:shadow-[6px_6px_0_#000] opacity-0"
          >
            <div class="flex items-center gap-3 lg:gap-4">
              <div class="w-11 h-11 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-white rounded-xl md:rounded-lg lg:rounded-2xl border-2 md:border-2 lg:border-[3px] border-black flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-sparkles" class="w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 ink" />
              </div>
              <div>
                <h2 class="comic text-lg md:text-base lg:text-2xl font-black ink">Beautiful Interfaces</h2>
                <p class="text-xs md:text-xs lg:text-sm ink/60">Designs that delight users</p>
              </div>
            </div>
          </div>

          <div
            ref="card3Ref"
            class="service-highlight bg-neo-magenta rounded-2xl p-4 md:p-4 lg:p-6 border-[3px] md:border-[3px] lg:border-4 border-black shadow-[4px_4px_0_#000] md:shadow-[4px_4px_0_#000] lg:shadow-[6px_6px_0_#000] opacity-0"
          >
            <div class="flex items-center gap-3 lg:gap-4">
              <div class="w-11 h-11 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-white rounded-xl md:rounded-lg lg:rounded-2xl border-2 md:border-2 lg:border-[3px] border-black flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 ink" />
              </div>
              <div>
                <h2 class="comic text-lg md:text-base lg:text-2xl font-black ink">E-Commerce</h2>
                <p class="text-xs md:text-xs lg:text-sm ink/60">Online stores that sell</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { animate } from 'motion'

// Refs for animations
const speedLinesRef = ref<HTMLElement | null>(null)
const bubble = ref<HTMLElement | null>(null)
const line1Ref = ref<HTMLElement | null>(null)
const line2Ref = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const card1Ref = ref<HTMLElement | null>(null)
const card2Ref = ref<HTMLElement | null>(null)
const card3Ref = ref<HTMLElement | null>(null)

let floatControls: ReturnType<typeof animate> | null = null

onMounted(() => {
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReduce) {
    // Speed lines zoom in
    if (speedLinesRef.value) {
      animate(
        speedLinesRef.value,
        { opacity: [0, 1], scale: [0.8, 1] },
        { duration: 1.5, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Staggered text animations
    if (line1Ref.value) {
      animate(
        line1Ref.value,
        { opacity: [0, 1], y: [60, 0] },
        { duration: 1, delay: 0.2, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (line2Ref.value) {
      animate(
        line2Ref.value,
        { opacity: [0, 1], y: [60, 0] },
        { duration: 1, delay: 0.35, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (subtitleRef.value) {
      animate(
        subtitleRef.value,
        { opacity: [0, 1], y: [30, 0] },
        { duration: 1, delay: 0.55, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (ctaRef.value) {
      animate(
        ctaRef.value,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 1, delay: 0.75, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Card animations
    if (card1Ref.value) {
      animate(
        card1Ref.value,
        { opacity: [0, 1], x: [40, 0], rotate: [3, 0] },
        { duration: 1, delay: 0.4, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (card2Ref.value) {
      animate(
        card2Ref.value,
        { opacity: [0, 1], x: [40, 0], rotate: [-2, 0] },
        { duration: 1, delay: 0.55, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (card3Ref.value) {
      animate(
        card3Ref.value,
        { opacity: [0, 1], x: [40, 0], rotate: [2, 0] },
        { duration: 1, delay: 0.7, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Bubble appears last with float animation
    if (bubble.value) {
      const el = bubble.value
      animate(
        el,
        { opacity: [0, 1], scale: [0.9, 1], rotate: [-2, 0] },
        { duration: 0.5, delay: 1, easing: [0.22, 1, 0.36, 1] }
      ).finished?.then(() => {
        floatControls = animate(
          el,
          { y: [0, -4, 0], rotate: [0, -0.8, 0] },
          { duration: 5, easing: 'ease-in-out', repeat: Infinity }
        )
      })

      // Wiggle on hover
      const onEnter = () => {
        animate(el, { rotate: [0, 1.5, 0, -1.5, 0] }, { duration: 0.35, easing: 'ease-in-out' })
      }
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('focus', onEnter)
    }
  } else {
    // No motion - show all elements
    [speedLinesRef, bubble, line1Ref, line2Ref, subtitleRef, ctaRef, card1Ref, card2Ref, card3Ref].forEach(r => {
      if (r.value) r.value.style.opacity = '1'
    })
  }
})

onBeforeUnmount(() => {
  if (floatControls) floatControls.cancel()
})
</script>

<style scoped>
/* Halftone pattern background */
.halftone-bg {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px);
  background-size: 8px 8px;
}

/* Larger dots on bigger screens */
@media (min-width: 768px) {
  .halftone-bg {
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.12) 1.5px, transparent 1.5px);
    background-size: 12px 12px;
  }
}

@media (min-width: 1024px) {
  .halftone-bg {
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 2px, transparent 2px);
    background-size: 16px 16px;
  }
}

/* Comic speed lines */
.speed-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200vmax;
  height: 200vmax;
  transform: translate(-50%, -50%);
  background: repeating-conic-gradient(
    from 0deg,
    transparent 0deg 4deg,
    rgba(0, 0, 0, 0.06) 4deg 5deg,
    transparent 5deg 9deg
  );
  mask-image: radial-gradient(
    ellipse 80% 70% at 50% 50%,
    transparent 20%,
    black 50%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 80% 70% at 50% 50%,
    transparent 20%,
    black 50%
  );
}

/* Offset the center on larger screens to feel more dynamic */
@media (min-width: 768px) {
  .speed-lines {
    left: 30%;
    background: repeating-conic-gradient(
      from 0deg,
      transparent 0deg 3deg,
      rgba(0, 0, 0, 0.05) 3deg 4deg,
      transparent 4deg 7deg
    );
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .speed-lines {
    opacity: 0.5;
  }
}
</style>
