<template>
  <div class="w-full h-full relative">
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#9DFF00" stop-opacity=".8"/>
          <stop offset="100%" stop-color="#00AAFF" stop-opacity=".6"/>
        </linearGradient>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
        </filter>
      </defs>
      <g filter="url(#blur)">
        <circle :cx="a.x" :cy="a.y" :r="90" fill="url(#g1)" :style="style(1)"/>
        <circle :cx="b.x" :cy="b.y" :r="70" fill="#ffffff22" :style="style(1.4)"/>
        <rect :x="c.x-60" :y="c.y-60" width="120" height="120" rx="28" fill="#9DFF0077" :style="style(0.8)"/>
        <circle :cx="d.x" :cy="d.y" :r="110" fill="#00AAFF55" :style="style(1.1)"/>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
const a = reactive({ x: 150, y: 180 })
const b = reactive({ x: 420, y: 140 })
const c = reactive({ x: 610, y: 320 })
const d = reactive({ x: 260, y: 380 })

let t = 0
function animate() {
  t += 0.015
  a.x = 150 + Math.cos(t) * 20; a.y = 180 + Math.sin(t*1.3) * 26
  b.x = 420 + Math.cos(t*0.8 + 1) * 50; b.y = 140 + Math.sin(t*1.1) * 24
  c.x = 610 + Math.cos(t*1.4 + 2) * 30; c.y = 320 + Math.sin(t*0.9) * 30
  d.x = 260 + Math.cos(t*1.2 + 3) * 40; d.y = 380 + Math.sin(t*1.5) * 22
  raf = requestAnimationFrame(animate)
}
let raf: number
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  raf = requestAnimationFrame(animate)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

function style(scale: number) {
  return { transform: `translateZ(0) scale(${scale})` }
}
</script>
