<template>
  <section class="container py-12">
    <header class="mb-8">
      <h1 class="comic text-5xl font-black">All work</h1>
      <p class="ink/80">Selected projects and case studies.</p>
    </header>

    <PortfolioGrid />
  </section>
</template>

<script setup lang="ts">
// Page-specific SEO + theme color for the portfolio page
useSeoMeta({
  title: 'Portfolio — Bushido.digital',
})

</script>
