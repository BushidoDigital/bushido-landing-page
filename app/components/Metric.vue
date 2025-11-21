<template>
  <div class="text-center md:text-right">
    <div class="inline-block pop-card bg-neo-lime px-4 py-2 rounded-xl comic text-2xl font-black">
      {{ number }}
    </div>
    <div class="mt-2 ink/80 text-sm uppercase tracking-wider">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MetricStat' })
defineProps<{ number: string | number; label: string }>()
</script>
