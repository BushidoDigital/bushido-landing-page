<template>
  <div class="relative">
    <div v-if="!items.length" class="ink/80 text-center py-8">
      No projects yet.
    </div>

    <!-- Clean grid: equal cards that scale well with any count -->
    <div class="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
      <NuxtLink
        v-for="(p, idx) in limited"
        :key="p.path"
        :to="p.path"
        :ref="el => { if (el) cardRefs[idx] = el }"
        class="group block portfolio-card"
      >
        <!-- Pop card with white content area for readability -->
        <div
          class="pop-card relative rounded-xl md:rounded-xl overflow-hidden transition-all duration-300 bg-white hover:shadow-[6px_6px_0_#000] md:hover:shadow-[8px_8px_0_#000]"
          :style="cardStyle"
        >
          <!-- NEW badge -->
          <div v-if="isRecent(p.date)"
               class="absolute top-2 left-2 bg-neo-magenta text-black comic text-xs px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0_#000] z-10">
            NEW
          </div>

          <!-- Image - more compact aspect ratio on desktop -->
          <div class="aspect-[16/10] md:aspect-[2.2/1] overflow-hidden bg-gray-100 rounded-t-lg md:rounded-t-xl">
            <img :src="coverUrl(p.cover)" :alt="p.title"
                 class="w-full h-full object-cover transition duration-300 group-hover:scale-[1.02]"
                 onerror="this.style.display='none'">
          </div>

          <!-- Content area - more compact on desktop -->
          <div class="p-4 md:p-2.5">
            <h3 class="comic text-xl md:text-base lg:text-lg font-black leading-tight ink">{{ p.title }}</h3>

            <!-- What we built -->
            <div v-if="p.tags?.length" class="mt-1.5 md:mt-1 flex flex-wrap gap-1">
              <span v-for="t in p.tags" :key="t"
                    class="inline-block px-1.5 py-0.5 rounded text-[10px] md:text-[10px] font-medium bg-gray-100 ink/80">
                {{ t }}
              </span>
            </div>

            <!-- View project link -->
            <div class="mt-2 md:mt-1.5 flex items-center gap-1.5 text-xs md:text-[11px] font-semibold ink group-hover:underline">
              View project
              <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 transition group-hover:translate-x-1"/>
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

  // Hardware/dashboard projects → orange
  if (tagStr.match(/hardware|dashboard|display|desktop app/)) {
    return 'bg-neo-orange'
  }

  // Design/branding projects → purple
  if (tagStr.match(/design|branding/)) {
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
