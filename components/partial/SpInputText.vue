<template>
  <SkeletonBlock v-if="showSkeleton" class="rounded-xl" :class="[skeletonWidth ?? 'w-full', type === 'textarea' ? 'h-24' : 'h-12']" />
  <div v-else class="w-full" :class="{ 'relative': icon }">
    <div class="flex items-end gap-4">
      <label v-if="label && !imitation" :for="`inputText${id}`">{{ label }}</label>
      <div v-if="maxlength" class="ml-auto text-gray-400">{{ value ? value.length : 0 }}/{{ maxlength }}</div>
    </div>
    <span v-if="label && imitation">{{ label }}</span>
    <template v-if="type === 'text' || type === 'email' || type === 'password'">
      <div
        v-if="icon && iconPlacement === 'inside'"
        class="flex items-center absolute h-12 px-4"
        :class="{
          'mt-2': label,
          'mt-1': !label,
          'right-0': icon === 'right',
          'left-0': icon === 'left'
        }"
      >
        <slot name="icon" />
      </div>
      <div :class="{ 'flex items-center w-full space-x-2': icon && iconPlacement === 'outside' }">
        <slot v-if="icon === 'left' && iconPlacement === 'outside'" name="icon" />
        <input
          v-if="!imitation"
          :id="`inputText${id}`"
          :ref="`inputText${id}`"
          v-model="value"
          :name="`inputText${id}`"
          :type="type"
          :inputmode="inputmode"
          :disabled="disabled"
          :placeholder="placeholder"
          :maxlength="maxlength > 0 ? maxlength : 200"
          autocomplete="off"
          class="duration-300"
          :class="[inputTextKindClass, inputClass, 'outline-0']"
          style="text-align: inherit;"
          :style="[padding]"
          @focus="focus"
          @input="input($event.target.value)"
          @blur="blur"
        >
        <div
          v-if="imitation"
          :tabindex="disabled ? -1 : 0"
          class="select-none duration-300"
          :class="[inputTextKindClass, inputClass, 'outline-0', { 'cursor-text': !disabled }]"
          :style="[padding, { minHeight: `calc(2px + (${fragmentedRem} * 2) + 1.5rem + 1.59px)` }]"
          @focus="focus"
          @click="click"
          @keydown.enter="click"
          @blur="blur"
        >
          <slot v-if="imitationValue" name="imitationValue" />
          <div v-else class="whitespace-nowrap overflow-hidden" :class="[error ? 'text-red-400' : 'text-gray-400']">
            {{ placeholder }}
          </div>
        </div>
        <slot v-if="icon === 'right' && iconPlacement === 'outside'" name="icon" />
      </div>
    </template>
    <textarea
      v-else-if="type === 'textarea'"
      :id="`inputText${id}`"
      :ref="`inputText${id}`"
      v-model="value"
      :name="`inputText${id}`"
      :disabled="disabled"
      :rows="rows"
      :placeholder="placeholder"
      autocomplete="off"
      class="resize-none duration-300"
      :class="[inputTextKindClass, inputClass, 'outline-0']"
      :style="[padding, { minHeight: `calc((1.357rem * ${rows}) + 4px)` }]"
      @focus="focus"
      @input="input($event.target.value)"
      @blur="blur"
    />
    <ErrorText v-if="error" :text="error" />
  </div>
</template>

<script setup>
import SkeletonBlock from '~/components/partial/SkeletonBlock'
import ErrorText from '~/components/partial/ErrorText'

const props = defineProps({
  showSkeleton: { type: Boolean, default: false },
  skeletonWidth: { type: String, default: null },
  imitation: { type: Boolean, default: false },
  imitationValue: { type: Boolean, default: false },
  label: { type: String, default: null },
  type: { type: String, default: 'text' }, // text, email, password, textarea
  inputmode: { type: String, default: 'text' }, // text, email, tel
  placeholder: { type: String, default: null },
  maxlength: { type: Number, default: 0 },
  error: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  inputClass: { type: String, default: null },
  rows: { type: String, default: '3' },
  icon: { type: String, default: null }, // right, left
  iconPlacement: { type: String, default: 'inside' } // inside, outside
})

const value = defineModel()
const id = useId()
const fragmentedRem = '(1rem / 4)'
const onFocus = ref(false)

const inputTextKindClass = computed(() => {
  return {
    'mt-1': props.label,
    'w-full border rounded-xl placeholder-gray-400': props.type === 'text' || props.type === 'email' || props.type === 'password' || props.type === 'textarea',
    'border-gray-300': !props.error && !onFocus.value,
    'border-red-300': props.error,
    'bg-white': ((props.type === 'text' || props.type === 'email' || props.type === 'password' || props.type === 'textarea') && !props.disabled),
    'bg-gray-300 cursor-not-allowed select-none': props.disabled,
    'rounded-full': props.round,
    'placeholder:text-gray-400': !props.error,
    'placeholder:text-red-400': props.error,
    'border-prime-700 ring ring-prime-700 ring-offset-2': onFocus.value && !props.error,
    'ring ring-red-400 ring-offset-2': onFocus.value && props.error
  }
})
const padding = computed(() => {
  const py = `calc((${fragmentedRem} * 4) - 2px)`
  const px = `calc((${fragmentedRem} * 4) - 1px)`
  return {
    paddingTop: py,
    paddingBottom: py,
    paddingRight: props.icon === 'right' && props.iconPlacement === 'inside' ? `calc((${fragmentedRem} * 14) - 1px)` : px,
    paddingLeft: props.icon === 'left' && props.iconPlacement === 'inside' ? `calc((${fragmentedRem} * 14) - 1px)` : px
  }
})

const emit = defineEmits(['click', 'focus', 'input', 'blur'])

const click = () => {
  if (!props.disabled) {
    emit('click')
    onFocus.value = true
  }
}
const focus = () => {
  emit('focus')
  onFocus.value = true
}
const input = (data) => {
  emit('input', data)
  onFocus.value = true
}
const blur = () => {
  emit('blur')
  onFocus.value = false
}
</script>
