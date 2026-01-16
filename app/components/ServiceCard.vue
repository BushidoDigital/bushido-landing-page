<template>
  <div :class="[
    'pop-card rounded-xl md:rounded bg-neo-lime service-card',
    compact ? 'p-3 md:p-2 lg:p-5' : 'p-6'
  ]">
    <div class="inline-flex items-center gap-2">
      <div :class="[
        'rounded-md md:rounded bg-neo-orange flex items-center justify-center border-black',
        compact ? 'w-9 h-9 md:w-6 md:h-6 lg:w-11 lg:h-11 border-[3px] md:border-[2px] lg:border-[3px]' : 'w-12 h-12 border-[4px]'
      ]">
        <UIcon :name="icon" :class="[compact ? 'text-lg md:text-sm lg:text-xl' : 'text-2xl', 'ink']" />
      </div>
    </div>
    <h3 :class="[
      'font-black ink comic',
      compact ? 'mt-2 md:mt-1 lg:mt-2 text-base md:text-xs lg:text-xl' : 'mt-3 text-2xl'
    ]">{{ title }}</h3>
    <p :class="[
      'ink/80',
      compact ? 'mt-1 md:mt-0.5 lg:mt-2 text-xs md:text-[10px] md:leading-tight lg:text-sm leading-snug' : 'mt-2'
    ]">{{ desc }}</p>
  </div>

</template>

<script setup lang="ts">
defineProps<{ icon: string; title: string; desc: string; compact?: boolean }>()
</script>
