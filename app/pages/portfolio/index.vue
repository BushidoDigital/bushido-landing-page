<template>
  <div class="portfolio-page relative bg-neo-cyan flex-1 flex flex-col overflow-hidden">
    <!-- Scattered frames decoration -->
    <div ref="framesRef" class="fixed inset-0 pointer-events-none opacity-0" aria-hidden="true">
      <div class="frame frame-1"></div>
      <div class="frame frame-2"></div>
      <div class="frame frame-3"></div>
    </div>

    <!-- Main content -->
    <section class="container relative z-10 py-6 md:py-8">
      <!-- Header - two column like home/contact -->
      <div class="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-end mb-8 md:mb-12">
        <div class="text-center md:text-left">
          <h1 class="comic text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-black ink leading-[0.9]">
            <span ref="line1Ref" class="block opacity-0">Our</span>
            <span ref="line2Ref" class="block opacity-0">Work.</span>
          </h1>
        </div>

        <!-- CTA card -->
        <div
          ref="ctaRef"
          class="hidden md:block pop-card bg-neo-magenta rounded-2xl p-6 lg:p-8 border-[3px] lg:border-4 border-black shadow-[4px_4px_0_#000] lg:shadow-[6px_6px_0_#000] opacity-0"
        >
          <p class="comic text-xl lg:text-2xl font-black ink mb-3">Want to be next?</p>
          <p class="text-sm lg:text-base ink/70 mb-4">We're always looking for exciting projects.</p>
          <NuxtLink to="/contact" class="pop-btn bg-white px-6 py-3 rounded-xl inline-block font-bold">
            Start a project
          </NuxtLink>
        </div>
      </div>

      <!-- Portfolio grid -->
      <div ref="gridRef" class="opacity-0">
        <PortfolioGrid />
      </div>

      <!-- Mobile CTA -->
      <div ref="ctaMobileRef" class="md:hidden mt-10 text-center opacity-0">
        <p class="comic text-2xl font-black ink mb-4">Want to be next?</p>
        <NuxtLink to="/contact" class="pop-btn bg-neo-magenta px-8 py-4 rounded-xl inline-block text-lg font-bold">
          Start a project
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animate } from 'motion'

useSeoMeta({
  title: 'Portfolio — Bushido.digital',
  description: 'Selected projects and case studies from Bushido.digital',
})

// Refs for animations
const framesRef = ref<HTMLElement | null>(null)
const line1Ref = ref<HTMLElement | null>(null)
const line2Ref = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const ctaMobileRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReduce) {
    // Fade in frames
    if (framesRef.value) {
      animate(
        framesRef.value,
        { opacity: [0, 1] },
        { duration: 1.2, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Text animations
    if (line1Ref.value) {
      animate(
        line1Ref.value,
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.8, delay: 0.2, easing: [0.22, 1, 0.36, 1] }
      )
    }
    if (line2Ref.value) {
      animate(
        line2Ref.value,
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.8, delay: 0.35, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // CTA card
    if (ctaRef.value) {
      animate(
        ctaRef.value,
        { opacity: [0, 1], x: [30, 0], rotate: [2, 0] },
        { duration: 0.8, delay: 0.4, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Grid fade in
    if (gridRef.value) {
      animate(
        gridRef.value,
        { opacity: [0, 1] },
        { duration: 0.8, delay: 0.6, easing: [0.22, 1, 0.36, 1] }
      )
    }

    // Mobile CTA
    if (ctaMobileRef.value) {
      animate(
        ctaMobileRef.value,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, delay: 0.8, easing: [0.22, 1, 0.36, 1] }
      )
    }
  } else {
    // No motion - show all
    [framesRef, line1Ref, line2Ref, gridRef, ctaRef, ctaMobileRef].forEach(r => {
      if (r.value) r.value.style.opacity = '1'
    })
  }
})
</script>

<style scoped>
/* Scattered picture frame decorations */
.frame {
  position: absolute;
  border: 5px solid black;
  background: white;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.15);
}

.frame-1 {
  width: 180px;
  height: 140px;
  top: 12%;
  left: -60px;
  transform: rotate(-8deg);
}

.frame-2 {
  width: 140px;
  height: 180px;
  bottom: 15%;
  right: -40px;
  transform: rotate(6deg);
}

.frame-3 {
  width: 150px;
  height: 110px;
  bottom: 35%;
  left: -45px;
  transform: rotate(5deg);
}

/* Tablet sizing */
@media (max-width: 1024px) {
  .frame-1 {
    width: 140px;
    height: 110px;
    left: -50px;
  }
  .frame-2 {
    width: 110px;
    height: 140px;
    right: -35px;
  }
  .frame-3 {
    width: 120px;
    height: 90px;
    left: -40px;
  }
}

/* Mobile - show fewer frames */
@media (max-width: 640px) {
  .frame-1, .frame-3 {
    display: none;
  }
  .frame-2 {
    width: 100px;
    height: 130px;
    bottom: 10%;
    right: -40px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .frame {
    opacity: 0.5;
  }
}
</style>
