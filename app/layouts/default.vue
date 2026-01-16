<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
    <SiteFooter v-if="!isHomePage" />

    <!-- Theme transition overlay -->
    <LayoutTransitionOverlay />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>
