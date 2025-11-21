<template>
  <div class="relative">
    <!-- Decorative halftone background -->
    <div class="halftone absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true"></div>

    <!-- Decorative accent blobs -->
    <div class="absolute top-20 -right-20 w-64 h-64 bg-neo-orange/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
    <div class="absolute bottom-40 -left-20 w-80 h-80 bg-neo-purple/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

    <div v-if="!items.length" class="ink/80">No projects yet. Add Markdown files under <code>content/portfolio</code>.
    </div>

    <!-- Asymmetric grid: larger first card, offset second card -->
    <div class="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
      <NuxtLink
        v-for="(p, idx) in limited"
        :key="p.path"
        :to="p.path"
        :ref="el => { if (el) cardRefs[idx] = el }"
        class="group block portfolio-card"
        :class="idx === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-12'"
      >
        <!-- Pop card wraps ALL content so nothing sits outside the card -->
        <div
          class="pop-card relative rounded-2xl overflow-visible transition-all duration-300"
          :class="[
            getCategoryColor(p.tags),
            'hover:shadow-[12px_12px_0_#000]'
          ]"
          :style="cardStyle"
        >
          <!-- NEW badge stays within the card bounds -->
          <div v-if="isRecent(p.date)"
               class="absolute top-3 left-3 bg-neo-magenta text-black comic text-sm px-3 py-1 border-[4px] border-black rounded-md shadow-[6px_6px_0_#000] z-10">
            NEW
          </div>

          <!-- Image frame: full size cover image -->
          <div class="aspect-[4/3] rounded-t-2xl overflow-hidden bg-white">
            <img :src="coverUrl(p.cover)" :alt="p.title"
                 class="w-full h-full object-cover transition duration-300 group-hover:scale-[1.01]"
                 onerror="this.style.display='none'">
          </div>

          <!-- Meta inside the card -->
          <div class="px-4 pt-3 pb-4">
            <div class="flex items-start gap-3">
              <div class="min-w-0 flex-1">
                <h3 class="comic text-xl font-black leading-tight" :class="getTextColor(p.tags)">{{ p.title }}</h3>
                <p class="text-sm line-clamp-3" :class="getTextColorSecondary(p.tags)">{{ p.excerpt }}</p>
                <!-- Tags: small chips under the excerpt -->
                <div v-if="p.tags?.length" class="mt-2 flex flex-wrap gap-2">
                  <span v-for="t in p.tags" :key="t"
                        class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border border-black bg-white shadow-[3px_3px_0_#000]">
                    {{ t }}
                  </span>
                </div>
              </div>
              <UIcon name="i-heroicons-arrow-right"
                     class="shrink-0 opacity-0 group-hover:opacity-100 transition" :class="getTextColor(p.tags)"/>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate } from 'motion'

const props = defineProps<{ limit?: number }>()

// Fetch portfolio entries from Content; only the fields we need, newest first
const { data } = await useAsyncData('portfolio-grid', async () => {
  // @nuxt/content v2 API
  const q = await queryCollection('content')
  return await q.all()
})

const items = computed(() => data.value || [])
const limited = computed(() => props.limit ? items.value.slice(0, props.limit) : items.value)

// Refs for entrance animations
const cardRefs = ref<any[]>([])

// Check for reduced motion preference
const prefersReducedMotion = ref(false)
onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Entrance animations for cards
  if (!prefersReducedMotion.value && cardRefs.value.length > 0) {
    cardRefs.value.forEach((card, idx) => {
      if (card?.$el || card) {
        const el = card.$el || card
        const cardEl = el.querySelector('.pop-card')
        if (cardEl) {
          animate(
            cardEl,
            { opacity: [0, 1], scale: [0.95, 1] },
            { duration: 0.4, delay: idx * 0.15, easing: 'ease-out' }
          )
        }
      }
    })
  }
})

// Category-based color mapping
function getCategoryColor(tags?: string[]): string {
  if (!tags || tags.length === 0) return 'bg-neo-lime'

  const tagStr = tags.join(' ').toLowerCase()

  // Embedded/hardware projects → orange
  if (tagStr.match(/embedded|hardware|mfd|iot|telemetry|racing/)) {
    return 'bg-neo-orange'
  }

  // Design/branding projects → purple
  if (tagStr.match(/design|branding|ui|ux/)) {
    return 'bg-neo-purple'
  }

  // Web/frontend projects (default) → lime
  return 'bg-neo-lime'
}

// Text color based on background - white for dark backgrounds
function getTextColor(tags?: string[]): string {
  if (!tags || tags.length === 0) return 'ink' // lime bg = black text

  const tagStr = tags.join(' ').toLowerCase()

  // Orange and purple backgrounds need white text
  if (tagStr.match(/embedded|hardware|mfd|iot|telemetry|racing/)) {
    return 'text-white' // orange bg
  }

  if (tagStr.match(/design|branding|ui|ux/)) {
    return 'text-white' // purple bg
  }

  return 'ink' // lime bg = black text
}

// Secondary text color with opacity
function getTextColorSecondary(tags?: string[]): string {
  if (!tags || tags.length === 0) return 'ink/80' // lime bg = black text

  const tagStr = tags.join(' ').toLowerCase()

  // Orange and purple backgrounds need white text
  if (tagStr.match(/embedded|hardware|mfd|iot|telemetry|racing/)) {
    return 'text-white/90' // orange bg
  }

  if (tagStr.match(/design|branding|ui|ux/)) {
    return 'text-white/90' // purple bg
  }

  return 'ink/80' // lime bg = black text
}

// Hover animation styles (respecting reduced motion)
const cardStyle = computed(() => {
  if (prefersReducedMotion.value) return {}
  return {
    '--hover-transform': 'translate(-3px, -3px) rotate(-0.3deg)'
  }
})

// Treat an item as recent if its date is within the last ~60 days
function isRecent(date?: string | Date) {
  if (!date) return false
  const d = new Date(date)
  if (isNaN(d.getTime())) return false
  const DAYS_60 = 1000 * 60 * 60 * 24 * 60
  return Date.now() - d.getTime() < DAYS_60
}

// Resolve cover images: Nuxt Content images should be in /public folder
function coverUrl(src?: string) {
  if (!src) return ''
  return src
}
</script>

<style scoped>
/* Hover animation with transform */
.portfolio-card:hover .pop-card {
  transform: var(--hover-transform, translate(-3px, -3px) rotate(-0.3deg));
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .portfolio-card:hover .pop-card {
    transform: none;
  }
}
</style>
