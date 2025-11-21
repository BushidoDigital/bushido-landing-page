<template>
  <div>
    <!-- Hero: neon split with speech bubble -->
    <section class="relative overflow-visible" ref="hero">
      <div class="container pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div>
          <div ref="bubble" class="speech inline-block hero-bubble" tabindex="0">
            <span class="font-bold">なぜこれを翻訳するのでしょうか？</span>
          </div>
          <h1 class="comic text-6xl sm:text-7xl font-black leading-[0.95] mt-6 hero-seq">
            Web apps with punch.
          </h1>
          <p class="mt-5 max-w-xl ink/80 hero-seq">
            We design, build and operate reliable web apps, APIs and data pipelines using Nuxt/Vue and Node/TypeScript —
            secure, fast, and maintainable.
          </p>
          <div class="mt-8 flex gap-4">
            <NuxtLink class="pop-btn px-6 py-3 rounded-xl inline-block hero-seq" to="/portfolio">See our work</NuxtLink>
            <NuxtLink class="pop-btn px-6 py-3 rounded-xl inline-block bg-neo-orange hero-seq" to="#contact">Start a project
            </NuxtLink>
          </div>
        </div>
        <div>
          <!-- Outer pop-card should not clip its own shadow; clip only the image inside -->
          <div class="relative max-w-xl mx-auto halftone pop-card overflow-visible hero-image">
            <div class="aspect-[4/3] rounded-3xl overflow-hidden">
              <img src="/hero-pop.svg" alt="Pop art style collage" class="w-full h-full object-cover"
                   onerror="this.style.display='none'">
            </div>
          </div>
        </div>
      </div>
      <!-- background blobs — responsive & fluid: hidden on phones, scale on tablets, full by xl -->
      <div
          ref="limeBlob"
          class="hidden md:block pointer-events-none absolute -top-16 rounded-full bg-neo-lime border-[6px] border-black -z-10
                 w-[clamp(220px,28vw,420px)] h-[clamp(220px,28vw,420px)]
                 md:right-[max(-8px,env(safe-area-inset-right))]
                 md:translate-x-[clamp(4px,4vw,28px)] xl:translate-x-[28px]
          "></div>
      <div
          ref="magentaBlob"
          class="hidden md:block pointer-events-none absolute bottom-0 bg-neo-magenta border-[6px] border-black rotate-3 -z-10
                 w-[clamp(320px,40vw,520px)] h-[clamp(140px,18vw,240px)]
                 md:left-[max(-12px,env(safe-area-inset-left))]
                 md:-translate-x-[clamp(12px,4vw,32px)] xl:-translate-x-24
          "></div>
    </section>

    <!-- Services -->
    <section
      id="services"
      ref="services"
      :inert="!servicesReady"
      :aria-hidden="!servicesReady ? 'true' : null"
      :class="['container py-16 transition-opacity', servicesReady ? '' : 'opacity-0']"
    >
      <div class="mb-10">
        <h2 class="comic text-4xl sm:text-5xl font-black">What we build</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <ServiceCard icon="i-heroicons-cog-6-tooth" title="Backend Systems"
                     desc="APIs, auth, databases and queues. Node/TypeScript, PostgreSQL, Redis."/>
        <ServiceCard icon="i-heroicons-window" title="Frontend Apps"
                     desc="Nuxt/Vue apps (SSR/SPA), design systems, accessible UI and state."/>
        <ServiceCard icon="i-heroicons-arrow-path" title="Integrations"
                     desc="Payments, CRM/ERP, third‑party APIs and robust webhook handling."/>
        <ServiceCard icon="i-heroicons-chart-bar" title="Data & Automation"
                     desc="ETL pipelines, background jobs, reporting dashboards and alerts."/>
        <ServiceCard icon="i-heroicons-wrench-screwdriver" title="DevOps & SRE"
                     desc="CI/CD, observability, IaC, scaling, cost control and incident response."/>
        <ServiceCard icon="i-heroicons-shield-check" title="Performance & Security"
                     desc="Audits, hardening, caching/CDN, OWASP checks and pen‑test fixes."/>
      </div>
    </section>

    <!-- Selected work section removed in favor of dedicated portfolio page -->

  </div>

</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref} from 'vue'
import {animate, stagger, inView} from 'motion'

const bubble = ref<HTMLElement | null>(null)
const hero = ref<HTMLElement | null>(null)
const services = ref<HTMLElement | null>(null)
const limeBlob = ref<HTMLElement | null>(null)
const magentaBlob = ref<HTMLElement | null>(null)
const servicesReady = ref(false)
let floatControls: ReturnType<typeof animate> | null = null

onMounted(() => {
  const el = bubble.value
  if (!el) return

  const prefersReduce = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Animate decorative blobs - unfold from center with rotation
  if (!prefersReduce) {
    if (limeBlob.value) {
      animate(
        limeBlob.value,
        { scale: [0, 1.1, 1], rotate: [180, 0] },
        { duration: 1.2, delay: 0.1, easing: [0.34, 1.56, 0.64, 1] } // Bouncy easing
      )
    }

    if (magentaBlob.value) {
      animate(
        magentaBlob.value,
        { scale: [0, 1.1, 1], rotate: [-180, 3] },
        { duration: 1.2, delay: 0.3, easing: [0.34, 1.56, 0.64, 1] }
      )
    }
  }

  // We want the bubble to appear LAST. Hide it initially and reveal after hero finishes.
  const heroWaits: Promise<unknown>[] = []
  const bubbleWaits: Promise<unknown>[] = []
  if (!prefersReduce) {
    // Hide until we intentionally pop it in
    el.style.opacity = '0'
  }

  // Do not start idle float yet; we will begin it after the bubble pops in

  // Playful wiggle on hover without canceling the base loop
  const onEnter = () => {
    if (prefersReduce) return
    animate(el, {rotate: [0, 1.2, 0, -1.2, 0]}, {duration: 0.32, easing: 'ease-in-out'})
  }
  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('focus', onEnter)

  // Hero group entrance: h1, p, and CTAs fade-up with a slight stagger
  const heroEl = hero.value
  if (!prefersReduce && heroEl) {
    const seq = heroEl.querySelectorAll('.hero-seq')
    if (seq.length) {
      const heroSeqAnim = animate(seq, { opacity: [0, 1], y: [12, 0] }, {
        duration: 0.5,
        delay: stagger(0.08, { start: 0.14 }),
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'both'
      })
      // @ts-expect-error Motion returns controls with a finished promise
      if (heroSeqAnim && heroSeqAnim.finished) {
        heroWaits.push(heroSeqAnim.finished)
        bubbleWaits.push(heroSeqAnim.finished)
      }
    }
    const img = heroEl.querySelector('.hero-image')
    if (img) {
      const heroImgAnim = animate(img as Element, { opacity: [0, 1], scale: [0.98, 1], rotate: [-0.3, 0] }, {
        duration: 0.5, delay: 0.22, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'both'
      })
      // Bubble should wait on the image as well (bubble last), but Services does not
      // @ts-expect-error Motion returns controls with a finished promise
      if (heroImgAnim && heroImgAnim.finished) bubbleWaits.push(heroImgAnim.finished)
    }
  }

  // In-view reveals for Services and Portfolio cards (once)
  if (!prefersReduce) {
    inView('#services .service-card', (entry) => {
      const t = entry.target as HTMLElement
      animate(t, { opacity: [0, 1], y: [14, 0] }, { duration: 0.48, easing: 'ease-out' })
    }, { amount: 0.2, once: true })

    inView('#work .portfolio-card', (entry) => {
      const t = entry.target as HTMLElement
      animate(t, { opacity: [0, 1], scale: [0.98, 1], y: [8, 0] }, { duration: 0.5, easing: 'ease-out' })
    }, { amount: 0.2, once: true })
  }

  // After hero finishes, reveal the bubble last, then start idle float
  const revealBubbleLast = () => {
    if (prefersReduce) return // visible by default
    animate(
      el,
      { opacity: [0, 1], scale: [0.96, 1], rotate: [-1, 0] },
      { duration: 0.28, delay: 0.02, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'both' }
    ).finished?.then(() => {
      // Start idle float only after the pop-in completes
      floatControls = animate(
        el,
        { y: [0, -3, 0], rotate: [0, -0.6, 0] },
        { duration: 6, delay: 0.2, easing: 'ease-in-out', repeat: Infinity }
      )
    })
  }

  if (!prefersReduce) {
    const bubbleTimeout = new Promise<void>((resolve) => setTimeout(() => resolve(), 1600))
    Promise.race([Promise.all(bubbleWaits).then(() => {}), bubbleTimeout]).then(revealBubbleLast)
  }

  // Cleanup
  onBeforeUnmount(() => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('focus', onEnter)
    if (floatControls) floatControls.cancel()
  })

  // After hero entrance finishes (text/buttons), reveal the Services section
  const revealServices = async () => {
    const servicesEl = services.value
    if (!servicesEl) return
    servicesReady.value = true
    // Small fade-up so it feels connected to the hero finishing
    if (!prefersReduce) {
      animate(servicesEl, { opacity: [0, 1], y: [6, 0] }, { duration: 0.36, easing: 'ease-out' })
    }
  }

  if (prefersReduce) {
    // Respect reduced motion: show immediately
    servicesReady.value = true
  } else {
    // Wait for key hero animations to complete (bubble + text/buttons), with a shorter timeout fallback
    const timeout = new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
    Promise.race([Promise.all(heroWaits).then(() => {}), timeout]).then(revealServices)
  }
})
</script>

