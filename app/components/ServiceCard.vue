<template>
  <div class="pop-card rounded-2xl p-6 bg-neo-lime service-card">
    <div class="inline-flex items-center gap-2">
      <div class="w-12 h-12 rounded-md bg-neo-orange flex items-center justify-center border-[4px] border-black">
        <UIcon :name="icon" class="text-2xl ink" />
      </div>
    </div>
    <h3 class="mt-3 text-2xl font-black ink comic">{{ title }}</h3>
    <p class="mt-2 ink/80">{{ desc }}</p>
  </div>

</template>

<script setup lang="ts">
defineProps<{ icon: string; title: string; desc: string }>()
</script>
