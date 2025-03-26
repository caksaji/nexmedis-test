<template>
  <SkeletonBlock
    v-if="showSkeleton"
    class="h-12"
    :class="[
      {
        'rounded-xl': !fab,
        'fixed bottom-4 right-4 w-12 rounded-full md:hidden': fab
      },
      block ? 'w-full' : skeletonWidth
    ]"
    :style="{ zIndex: fab ? 1 : 'unset' }"
  />
  <button
    v-else
    v-wave="!disabled && !loading"
    :disabled="disabled || loading"
    class="no-underline outline-none"
    :class="{
      'duration-300 transform focus:ring focus:ring-opacity-90 active:scale-90': !disabled && !loading,
      'inline-block text-center align-middle whitespace-nowrap space-x-2 focus:ring-offset-2': !noStyle,
      'fixed bottom-4 right-4 md:hidden': fab,
      'focus:ring-gray-800': noStyle,
      'cursor-pointer': !disabled && !loading,
      'cursor-not-allowed': disabled,
      'cursor-wait': loading,
      'opacity-75': disabled || loading,
      'rounded-xl': !round && !fab,
      'rounded-full': round || fab,
      'w-full': block,
      'focus:ring-prime-800': color === 'prime',
      'text-white bg-prime-700': color === 'prime' && !border,
      'hover:bg-prime-800': color === 'prime' && !border && !disabled && !loading,
      'focus:ring-red-600': color === 'red',
      'text-white bg-red-400': color === 'red' && !border,
      'hover:bg-red-600': color === 'red' && !border && !disabled && !loading,
      'focus:ring-blue-600': color === 'blue',
      'text-white bg-blue-500': color === 'blue' && !border,
      'hover:bg-blue-600': color === 'blue' && !border && !disabled && !loading,
      'border border-gray-300 text-gray-800 bg-white focus:ring-gray-300': color === 'white',
      'hover:bg-gray-300': color === 'white' && !disabled && !loading,
      'text-prime-500': color === 'white' && textPrimeteal,
      'border focus:bg-opacity-20': border,
      'hover:bg-opacity-20': border && !disabled && !loading,
      'text-prime-500 border-prime-500 focus:bg-prime-700': color === 'prime' && border,
      'hover:bg-prime-700': color === 'prime' && border && !disabled && !loading,
      'text-red-400 border-red-400 focus:bg-red-600': color === 'red' && border,
      'hover:bg-red-600': color === 'red' && border && !disabled && !loading,
      'text-blue-400 border-blue-400 focus:bg-blue-600': color === 'blue' && border,
      'hover:bg-blue-600': color === 'blue' && border && !disabled && !loading
    }"
    style="line-height: 1.5; font-size: calc(1rem - 2px);"
    :style="formatedStyle"
    @click="click"
  >
    <span v-if="noStyle"><slot /></span>
    <div v-else class="flex items-center justify-center space-x-2" :class="{ 'h-12 w-12': fab, 'w-full': !fab }">
      <SpinnerCircle v-if="loading" class="w-4 h-4" />
      <slot v-if="!loading" name="icon" />
      <span v-if="!iconOnly"><slot /></span>
    </div>
  </button>
</template>

<script setup>
import SkeletonBlock from '~/components/partial/SkeletonBlock'
import SpinnerCircle from '~/components/partial/SpinnerCircle'

const props = defineProps({
  showSkeleton: { type: Boolean, default: false },
  skeletonWidth: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  noStyle: { type: Boolean, default: false },
  size: { type: String, default: null }, // null, sm
  round: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  color: { type: String, default: null }, // prime, red, blue, white
  textPrimeteal: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
  fab: { type: Boolean, default: false }
})

const fragmentedRem = '(1rem / 4)'

const formatedStyle = computed(() => {
  let padding = null
  if (props.size === 'sm') {
    if ((props.border || props.color === 'white') && !props.iconOnly) {
      padding = `calc((${fragmentedRem} * 2) - 1px) calc((${fragmentedRem} * 3) - 1px)`
    }
    else if ((props.border || props.color === 'white') && props.iconOnly) {
      padding = `calc((${fragmentedRem} * 2) - 1px)`
    }
    else if (!props.border && props.color !== 'white' && props.iconOnly) {
      padding = `calc(${fragmentedRem})`
    }
    else {
      padding = `calc(${fragmentedRem} * 2) calc(${fragmentedRem} * 3)`
    }
  }
  else if (!props.size) {
    if (props.border || props.color === 'white') {
      padding = `calc((${fragmentedRem} * 4) - 1px) calc((${fragmentedRem} * 4) - 1px)`
    }
    else {
      padding = `calc(${fragmentedRem} * 4) calc(${fragmentedRem} * 4)`
    }
  }
  return {
    padding: !props.noStyle ? padding : 0,
    zIndex: props.fab ? 1 : 'unset'
  }
})

const emit = defineEmits(['click'])

const click = () => {
  emit('click')
}
</script>

<style lang="less">
  .click-effect { @apply transform duration-300 active:scale-90; }

  a, .link {
    .click-effect();
    @apply rounded-xl outline-0 ring-prime-700/90 text-prime-700 underline duration-300 cursor-pointer focus:ring;
  }
</style>
