<template>
  <Teleport to="body">
    <div
      v-if="isTransitioning"
      class="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      <!-- Going Serious: Elegant navy circle expand -->
      <template v-if="transitionTarget === 'serious'">
        <div
          ref="seriousOverlay"
          class="absolute inset-0 serious-overlay"
          :style="seriousOverlayStyle"
        >
          <!-- Pinstripe texture -->
          <div class="absolute inset-0 pinstripe-texture"></div>
        </div>
      </template>

      <!-- Going Fun: Comic burst explosion -->
      <template v-if="transitionTarget === 'playful'">
        <!-- Multiple expanding circles -->
        <div
          v-for="(circle, idx) in funCircles"
          :key="idx"
          class="absolute rounded-full fun-circle"
          :class="circle.color"
          :style="getCircleStyle(circle, idx)"
        ></div>

        <!-- Action lines radiating from center -->
        <div
          ref="actionLinesRef"
          class="absolute inset-0 action-lines"
          :style="actionLinesStyle"
        ></div>

        <!-- POW! burst (brief flash at peak) -->
        <div
          v-if="showPowBurst"
          class="absolute pow-burst"
          :style="powBurstStyle"
        >
          <span class="comic text-7xl md:text-9xl font-black text-white pow-text">POW!</span>
        </div>
      </template>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const {
  isTransitioning,
  transitionOrigin,
  transitionTarget,
  applyThemeChange,
  finishTransition
} = useTheme()

// Refs
const seriousOverlay = ref<HTMLElement | null>(null)
const actionLinesRef = ref<HTMLElement | null>(null)

// Animation state
const animationProgress = ref(0)
const showPowBurst = ref(false)

// Check for reduced motion
const prefersReducedMotion = ref(false)
onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

// Fun mode circles configuration
const funCircles = [
  { color: 'bg-neo-cyan', delay: 0, scale: 1 },
  { color: 'bg-neo-magenta', delay: 50, scale: 0.85 },
  { color: 'bg-neo-lime', delay: 100, scale: 0.7 },
]

// Computed styles
const seriousOverlayStyle = computed(() => {
  if (!transitionOrigin.value) return {}

  const maxRadius = Math.max(
    Math.hypot(transitionOrigin.value.x, transitionOrigin.value.y),
    Math.hypot(window.innerWidth - transitionOrigin.value.x, transitionOrigin.value.y),
    Math.hypot(transitionOrigin.value.x, window.innerHeight - transitionOrigin.value.y),
    Math.hypot(window.innerWidth - transitionOrigin.value.x, window.innerHeight - transitionOrigin.value.y)
  )

  return {
    '--origin-x': `${transitionOrigin.value.x}px`,
    '--origin-y': `${transitionOrigin.value.y}px`,
    '--max-radius': `${maxRadius * 1.2}px`
  }
})

const getCircleStyle = (circle: { delay: number; scale: number }, idx: number) => {
  if (!transitionOrigin.value) return {}

  const maxRadius = Math.max(
    Math.hypot(transitionOrigin.value.x, transitionOrigin.value.y),
    Math.hypot(window.innerWidth - transitionOrigin.value.x, transitionOrigin.value.y),
    Math.hypot(transitionOrigin.value.x, window.innerHeight - transitionOrigin.value.y),
    Math.hypot(window.innerWidth - transitionOrigin.value.x, window.innerHeight - transitionOrigin.value.y)
  )

  return {
    '--origin-x': `${transitionOrigin.value.x}px`,
    '--origin-y': `${transitionOrigin.value.y}px`,
    '--max-radius': `${maxRadius * 1.3 * circle.scale}px`,
    '--delay': `${circle.delay}ms`,
    'animation-delay': `${circle.delay}ms`
  }
}

const actionLinesStyle = computed(() => {
  if (!transitionOrigin.value) return {}
  return {
    '--origin-x': `${transitionOrigin.value.x}px`,
    '--origin-y': `${transitionOrigin.value.y}px`
  }
})

const powBurstStyle = computed(() => {
  if (!transitionOrigin.value) return {}
  return {
    left: `${transitionOrigin.value.x}px`,
    top: `${transitionOrigin.value.y}px`,
    transform: 'translate(-50%, -50%)'
  }
})

// Watch for transition start and run animation
watch(isTransitioning, async (transitioning) => {
  if (!transitioning) return

  // Reduced motion: simple crossfade
  if (prefersReducedMotion.value) {
    await new Promise(resolve => setTimeout(resolve, 150))
    applyThemeChange()
    await new Promise(resolve => setTimeout(resolve, 150))
    finishTransition()
    return
  }

  if (transitionTarget.value === 'serious') {
    // Serious transition: smooth circle expand
    await runSeriousTransition()
  } else {
    // Fun transition: comic burst
    await runFunTransition()
  }
})

async function runSeriousTransition() {
  // Wait for overlay element to be mounted
  await nextTick()

  // Animate the clip-path circle expansion
  const duration = 600 // ms
  const midpoint = duration * 0.6

  // Apply theme at midpoint
  setTimeout(() => {
    applyThemeChange()
  }, midpoint)

  // Finish transition after animation completes
  setTimeout(() => {
    finishTransition()
  }, duration + 50)
}

async function runFunTransition() {
  await nextTick()

  const duration = 700 // ms
  const midpoint = duration * 0.5
  const powDuration = 300

  // Show POW burst at peak
  setTimeout(() => {
    showPowBurst.value = true
    applyThemeChange()
  }, midpoint - 50)

  // Hide POW burst
  setTimeout(() => {
    showPowBurst.value = false
  }, midpoint + powDuration)

  // Finish transition
  setTimeout(() => {
    finishTransition()
  }, duration + 100)
}
</script>

<style scoped>
/* Serious transition: Navy circle expanding smoothly */
.serious-overlay {
  background: linear-gradient(135deg, #1a2332 0%, #2c3e50 100%);
  clip-path: circle(0% at var(--origin-x) var(--origin-y));
  animation: serious-expand 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes serious-expand {
  0% {
    clip-path: circle(0% at var(--origin-x) var(--origin-y));
    opacity: 1;
  }
  60% {
    clip-path: circle(var(--max-radius) at var(--origin-x) var(--origin-y));
    opacity: 1;
  }
  100% {
    clip-path: circle(var(--max-radius) at var(--origin-x) var(--origin-y));
    opacity: 0;
  }
}

/* Pinstripe texture for suit fabric effect */
.pinstripe-texture {
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.03) 3px,
    rgba(255, 255, 255, 0.03) 4px
  );
}

/* Fun transition: Expanding circles */
.fun-circle {
  left: var(--origin-x);
  top: var(--origin-y);
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  animation: fun-expand 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  border: 4px solid #000;
}

@keyframes fun-expand {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: calc(var(--max-radius) * 2);
    height: calc(var(--max-radius) * 2);
    opacity: 0;
  }
}

/* Action lines radiating from center */
.action-lines {
  background: repeating-conic-gradient(
    from 0deg at var(--origin-x) var(--origin-y),
    transparent 0deg 8deg,
    rgba(0, 0, 0, 0.15) 8deg 10deg,
    transparent 10deg 18deg
  );
  animation: action-spin 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

@keyframes action-spin {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-10deg);
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(2) rotate(10deg);
  }
}

/* POW burst */
.pow-burst {
  animation: pow-pop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes pow-pop {
  0% {
    transform: translate(-50%, -50%) scale(0) rotate(-15deg);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
    opacity: 0;
  }
}

.pow-text {
  text-shadow:
    -5px -5px 0 #000, 5px -5px 0 #000, -5px 5px 0 #000, 5px 5px 0 #000,
    -5px 0 0 #000, 5px 0 0 #000, 0 -5px 0 #000, 0 5px 0 #000;
  filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.3));
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .serious-overlay,
  .fun-circle,
  .action-lines,
  .pow-burst {
    animation: none;
  }

  .serious-overlay {
    opacity: 0.8;
    clip-path: none;
    animation: simple-fade 300ms ease forwards;
  }

  @keyframes simple-fade {
    0% { opacity: 0; }
    50% { opacity: 0.8; }
    100% { opacity: 0; }
  }
}

/* Safari prefix for clip-path */
@supports (-webkit-clip-path: circle(0%)) {
  .serious-overlay {
    -webkit-clip-path: circle(0% at var(--origin-x) var(--origin-y));
  }
}
</style>
