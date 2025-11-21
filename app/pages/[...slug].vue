<template>
  <div class="container py-10">
    <ContentDoc v-slot="{ doc }">
      <article class="prose max-w-3xl">
        <h1 class="comic text-5xl font-black mb-4">{{ doc.title }}</h1>
        <p v-if="doc.excerpt" class="ink/80 text-lg mb-6">{{ doc.excerpt }}</p>

        <div v-if="doc.cover" class="mb-6">
          <img :src="coverUrl(doc.cover)" :alt="doc.title" class="w-full rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] object-contain bg-white"/>
        </div>

        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
// Small helper to resolve asset paths from content front‑matter
function coverUrl(src?: string) {
  if (!src) return ''
  if (src.startsWith('/') || src.startsWith('http')) return src
  try {
    // @ts-expect-error provided by Nuxt
    return useAsset(src) || src
  } catch {
    return src
  }
}
</script>

<style scoped>
.prose :deep(img) { max-width: 100%; }
</style>
