<template>
  <div>
    <!-- Hero Section -->
    <section class="container pt-4 pb-3">
      <div class="pop-card bg-neo-lime rounded-2xl p-3 md:p-4 relative overflow-visible">
        <!-- Grid layout: text on left, image on right -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <!-- Left: Text content -->
          <div class="md:col-span-2 bg-white rounded-xl p-4 flex flex-col border-4 border-black shadow-[4px_4px_0_#000]">
            <NuxtLink to="/portfolio"
                      class="inline-flex items-center gap-1 ink/60 hover:ink text-sm font-medium mb-2 transition-colors">
              <UIcon name="i-heroicons-arrow-left" class="w-3 h-3" />
              All projects
            </NuxtLink>

            <h1 class="comic text-xl md:text-2xl font-black ink leading-tight">{{ doc.title }}</h1>
            <p class="ink/70 mt-1 text-sm leading-relaxed">{{ doc.excerpt }}</p>

            <!-- Tags -->
            <div v-if="doc.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="tag in doc.tags" :key="tag"
                    class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-neo-lime border-2 border-black">
                {{ tag }}
              </span>
            </div>

            <!-- Client -->
            <div v-if="doc.client" class="mt-auto pt-3">
              <span class="ink/50 text-xs">Client: {{ doc.client }}</span>
            </div>
          </div>

          <!-- Right: Cover image -->
          <div v-if="doc.cover" class="md:col-span-3 rounded-xl overflow-hidden bg-white p-2 border-4 border-black shadow-[4px_4px_0_#000]">
            <img :src="doc.cover" :alt="doc.title" class="w-full h-full object-contain rounded-lg" />
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="container pb-3">
      <div class="pop-card bg-white rounded-2xl p-4 md:p-5">
        <div class="prose prose-sm md:prose-base max-w-none
                    prose-headings:comic prose-headings:font-black prose-headings:ink
                    prose-h2:text-xl prose-h2:mt-4 prose-h2:mb-2
                    prose-p:ink/80 prose-p:leading-relaxed prose-p:my-2
                    prose-li:ink/80
                    prose-strong:ink prose-strong:font-semibold
                    prose-a:ink prose-a:underline
                    prose-blockquote:border-l-4 prose-blockquote:border-neo-magenta prose-blockquote:pl-4 prose-blockquote:my-4 prose-blockquote:ink/70
                    prose-img:rounded-xl prose-img:border-4 prose-img:border-black prose-img:shadow-[4px_4px_0_#000] prose-img:my-4">
          <ContentRenderer :value="doc" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container pb-3">
      <div class="pop-card bg-neo-magenta rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <p class="ink font-medium">Like what you see? Let's talk about your project.</p>
        <NuxtLink to="/contact" class="pop-btn bg-white px-5 py-2 rounded-lg text-sm inline-flex items-center gap-2">
          Get in touch
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
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

useSeoMeta({
  title: `${doc.value.title} — Bushido.digital`,
  description: doc.value.excerpt,
})
</script>
