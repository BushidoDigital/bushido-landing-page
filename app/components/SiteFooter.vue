<template>
  <footer aria-label="Site footer" class="mt-20 mb-8">
    <!-- Simplified single-line footer -->
    <div
      class="container relative bg-white border-[4px] border-black rounded-xl shadow-[6px_6px_0_#000] overflow-hidden"
      :style="safeInsets"
    >
      <!-- Halftone background texture -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.06] halftone" aria-hidden="true"></div>

      <!-- Single line content -->
      <div class="relative z-10 px-4 py-4 flex items-center justify-between">
        <!-- Logo + Copyright -->
        <div class="flex items-center gap-3 md:gap-4">
          <NuxtLink to="/" class="flex items-center group">
            <span class="comic text-2xl md:text-3xl leading-none font-black ink group-hover:underline underline-offset-4">Bushido</span>
            <span class="sr-only">Home</span>
          </NuxtLink>
          <span class="hidden md:inline text-sm ink/60">© 2025</span>
        </div>

        <!-- Socials -->
        <nav class="flex items-center gap-3">
          <a href="https://github.com/BushidoDigital" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
             class="w-9 h-9 md:w-10 md:h-10 inline-flex items-center justify-center rounded-lg border-3 border-black bg-white shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <UIcon name="i-simple-icons-github" class="w-4 h-4 md:w-5 md:h-5 ink" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61583902959065" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
             class="w-9 h-9 md:w-10 md:h-10 inline-flex items-center justify-center rounded-lg border-3 border-black bg-white shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <UIcon name="i-simple-icons-facebook" class="w-4 h-4 md:w-5 md:h-5 ink" />
          </a>
        </nav>
      </div>

      <!-- Corner decorative nubs -->
      <div class="pointer-events-none absolute -top-2 -left-2 w-4 h-4 bg-neo-magenta border-4 border-black rounded" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -bottom-2 -right-2 w-4 h-4 bg-neo-lime border-4 border-black rounded rotate-6" aria-hidden="true"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Safe-area aware padding for the outer panel
const safeInsets = {
  paddingLeft: 'max(1rem, env(safe-area-inset-left))',
  paddingRight: 'max(1rem, env(safe-area-inset-right))'
}
</script>

<style scoped>
/* Keep the footer self-contained, avoid affecting global flow */
footer { contain: layout paint style; }
</style>
