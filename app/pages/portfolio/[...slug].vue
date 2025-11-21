<template>
  <div class="relative">
    <!-- Decorative halftone background -->
    <div class="halftone absolute inset-0 opacity-10 pointer-events-none -z-10" aria-hidden="true"></div>

    <!-- Decorative accent blobs -->
    <div class="absolute -top-20 -right-20 w-80 h-80 bg-neo-orange/20 rounded-full blur-3xl pointer-events-none -z-10" aria-hidden="true"></div>
    <div class="absolute top-1/2 -left-20 w-96 h-96 bg-neo-purple/15 rounded-full blur-3xl pointer-events-none -z-10" aria-hidden="true"></div>

    <!-- Hero Section: Combined header and image -->
    <section class="container pt-8 pb-6">
      <div class="pop-card bg-neo-lime rounded-2xl p-4 md:p-6 relative overflow-visible">
        <!-- NEW badge if recent -->
        <div v-if="isRecent(doc.date)"
             class="absolute top-3 right-3 bg-neo-magenta text-black comic text-sm px-3 py-1 border-[4px] border-black rounded-md shadow-[6px_6px_0_#000] z-10">
          NEW
        </div>

        <!-- Grid layout: text on left, image on right (desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          <!-- Left: Text content (white background) -->
          <div class="md:col-span-2 bg-white rounded-xl p-4 md:p-5 flex flex-col border-4 border-black shadow-[4px_4px_0_#000]">
            <NuxtLink to="/portfolio"
                      class="inline-flex items-center gap-2 ink/80 hover:ink font-semibold mb-3 transition-colors">
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
              Back to portfolio
            </NuxtLink>

            <h1 class="comic text-2xl md:text-3xl font-black ink leading-tight">{{ doc.title }}</h1>
            <p class="ink/80 mt-2 text-sm md:text-base leading-relaxed">{{ doc.excerpt }}</p>

            <!-- Tags -->
            <div v-if="doc.tags?.length" class="mt-3 flex flex-wrap gap-2">
              <span v-for="tag in doc.tags" :key="tag"
                    class="inline-flex items-center px-2 py-1 rounded text-xs font-medium border-[3px] border-black bg-neo-lime shadow-[3px_3px_0_#000]">
                {{ tag }}
              </span>
            </div>

            <!-- Client info if available -->
            <div v-if="doc.client" class="mt-auto pt-3 ink/60 text-sm font-medium">
              <span class="font-bold">Client:</span> {{ doc.client }}
            </div>
          </div>

          <!-- Right: Image (larger space) -->
          <div v-if="doc.cover" class="md:col-span-3 rounded-xl overflow-hidden bg-white p-3 md:p-4 border-4 border-black shadow-[4px_4px_0_#000]">
            <img :src="doc.cover" :alt="doc.title"
                 class="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section: Comic Book Style -->
    <section class="container pb-12">
      <!-- Comic book panels with gutters -->
      <div class="comic-panels space-y-4">
        <div class="pop-card bg-neo-cyan rounded-2xl overflow-visible relative border-8 border-black">
          <!-- Halftone pattern overlay -->
          <div class="halftone absolute inset-0 opacity-[0.15] pointer-events-none rounded-2xl" aria-hidden="true"></div>

          <!-- Comic panel border accent -->
          <div class="absolute -top-3 -left-3 w-12 h-12 bg-neo-magenta border-4 border-black rotate-12 rounded-lg shadow-[4px_4px_0_#000]" aria-hidden="true"></div>
          <div class="absolute -bottom-3 -right-3 w-16 h-16 bg-neo-orange border-4 border-black -rotate-6 rounded-lg shadow-[4px_4px_0_#000]" aria-hidden="true"></div>

          <div class="relative bg-white m-2 md:m-3 rounded-xl px-6 md:px-8 py-6 md:py-8 border-4 border-black prose prose-lg max-w-none
                      prose-headings:comic prose-headings:font-black prose-headings:ink prose-headings:leading-tight prose-headings:mb-4
                      prose-h2:text-3xl prose-h2:bg-neo-lime prose-h2:inline-block prose-h2:px-4 prose-h2:py-2 prose-h2:border-4 prose-h2:border-black prose-h2:shadow-[6px_6px_0_#000] prose-h2:rounded-lg prose-h2:mb-6
                      prose-h3:text-2xl prose-h3:bg-neo-orange prose-h3:inline-block prose-h3:px-3 prose-h3:py-1 prose-h3:border-4 prose-h3:border-black prose-h3:shadow-[4px_4px_0_#000] prose-h3:rounded prose-h3:mb-4
                      prose-p:ink/80 prose-p:leading-relaxed prose-p:mb-4
                      prose-li:ink/80 prose-li:marker:text-neo-magenta
                      prose-strong:ink prose-strong:font-bold prose-strong:bg-neo-lime/30 prose-strong:px-1
                      prose-em:italic prose-em:text-neo-purple
                      prose-a:ink prose-a:underline prose-a:underline-offset-4 prose-a:font-semibold prose-a:decoration-neo-magenta prose-a:decoration-4
                      prose-code:ink prose-code:bg-neo-lime/20 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:border-2 prose-code:border-black
                      prose-pre:bg-ink prose-pre:border-4 prose-pre:border-black prose-pre:shadow-[6px_6px_0_#000] prose-pre:rounded-xl
                      prose-blockquote:speech prose-blockquote:bg-white prose-blockquote:border-6 prose-blockquote:border-black prose-blockquote:shadow-[6px_6px_0_#000] prose-blockquote:p-6 prose-blockquote:my-6 prose-blockquote:not-italic
                      prose-ul:space-y-2 prose-ul:my-4
                      prose-ol:space-y-2 prose-ol:my-4
                      prose-img:rounded-xl prose-img:border-6 prose-img:border-black prose-img:shadow-[8px_8px_0_#000] prose-img:my-6 prose-img:bg-white prose-img:p-4">
            <ContentRenderer :value="doc" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData('portfolio-doc', async () => {
  const path = Array.isArray(route.params.slug) ? '/portfolio/' + route.params.slug.join('/') : '/portfolio/' + route.params.slug
  return await queryCollection('content').path(path).first()
})
if (!doc.value) throw createError({ statusCode: 404, statusMessage: 'Not found' })

// Check if an item is recent (within last 60 days)
function isRecent(date?: string | Date) {
  if (!date) return false
  const d = new Date(date)
  if (isNaN(d.getTime())) return false
  const DAYS_60 = 1000 * 60 * 60 * 24 * 60
  return Date.now() - d.getTime() < DAYS_60
}
</script>
