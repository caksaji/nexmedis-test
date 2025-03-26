<template>
  <div>
    <div class="font-semibold" style="line-height: 1.9;" :style="{ fontSize: !sub ? '1.3rem' : '1.2rem' }">
      {{ title }}
    </div>
    <div class="text-gray-400">
      {{ subtitle }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: null },
  subtitle: { type: String, default: null },
  sub: { type: Boolean, default: false }
})
</script>
