<template>
  <div v-if="text" class="flex space-x-1 text-red-600">
    <IconSvg name="warning-triangle" class="h-4 w-4 mt-1" />
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import IconSvg from '~/components/partial/IconSvg'

const props = defineProps({
  text: { type: String, default: null }
})
</script>
