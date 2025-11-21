<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
// Components are auto-registered by Nuxt 3; no explicit import needed for SiteFooter
</script>
