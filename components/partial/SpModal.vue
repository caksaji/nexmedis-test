<template>
  <VueFinalModal
    v-slot="{ close }"
    class="flex justify-center items-center"
    overlay-class="backdrop-filter backdrop-blur-sm"
    overlay-transition="vfm-fade"
    :content-class="[
      'card flex flex-col fixed bottom-0 w-screen max-h-full py-6 px-4 border border-b-0 rounded-t-xl bg-white transform duration-300 sm:bottom-auto sm:w-full sm:border-b sm:rounded-xl sm:m-auto',
      size ? `max-width-${size}` : ''
    ]"
    :content-style="{ maxHeight: 'calc(100vh - 66px)' }"
    content-transition="vfm-slide-down"
    :esc-to-close="closable"
    :background="!closable ? 'interactive' : 'non-interactive'"
    prevent-navigation-gesture
  >
    <div
      v-if="title || x"
      class="card-body pb-3"
      :class="{
        'flex items-start justify-between w-full': x
      }"
    >
      <SectionTitle :title="title" />
      <div v-if="x" :class="{ 'absolute -top-16 right-4': screenMaxWidth === true }">
        <div
          v-wave
          tabindex="0"
          class="relative rounded-full outline-0 mt-1.5 ring-gray-300 ring-opacity-90 cursor-pointer click-effect focus:ring"
          :class="{ 'p-2 bg-white border-gray-600': screenMaxWidth === true, 'p-1': screenMaxWidth !== true }"
          @click="close"
          @keydown.enter="close"
          @keydown.space="close"
        >
          <IconSvg name="xmark" class="h-6 w-6" />
        </div>
      </div>
    </div>
    <div class="card-body flex-grow overflow-y-auto" :class="{ '-mx-6': noXSpace }">
      <slot />
    </div>
    <div class="card-body pt-3 px-4 flex-shrink-0 flex items-center space-x-2" :class="[footerAlign == 'left' ? 'justify-start' : footerAlign == 'center' ? 'justify-center' :footerAlign == 'right' ? 'justify-end' : 'justify-center']">
      <div v-if="!closable" class="absolute top-0 left-0 h-full w-full" style="z-index: 1;" />
      <slot name="footer-content" />
    </div>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import SectionTitle from '~/components/partial/SectionTitle'
import IconSvg from '~/components/partial/IconSvg'

const props = defineProps({
  title: { type: String, default: null },
  footerAlign: { type: String, default: 'right' },
  x: { type: Boolean, default: false },
  closable: { type: Boolean, default: true },
  size: { type: String, default: 'md' }, // sm, md, lg, xl, full
  noXSpace: { type: Boolean, default: false }
})

const screenMaxWidth = ref(null)

onMounted(() => {
  screenMaxWidth.value = useBreakpoints(breakpointsTailwind).smaller('sm')
})
</script>

<style lang="less">
  .card {
    @media (min-width: 640px) {
      &.max-width-sm { max-width: 24rem; }
      &.max-width-md { max-width: 30rem; }
      &.max-width-lg { max-width: 40rem; }
      &.max-width-xl { max-width: 50rem; }
      &.max-width-full { max-width: 70rem; }
    }
  }
</style>
