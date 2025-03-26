<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class="flex-shrink-0 stroke-2 stroke-current transform"
    :class="{ 'rotate-180': name === 'log-out' }"
    style="stroke-linecap: round; stroke-linejoin: round;"
  >
    <template v-if="name === 'eye'">
      <path d="M3 13C6.6 5 17.4 5 21 13" />
      <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" />
    </template>
    <template v-else-if="name === 'eye-closed'">
      <path d="M19.5 16L17.0248 12.6038" />
      <path d="M12 17.5V14" />
      <path d="M4.5 16L6.96895 12.6124" />
      <path d="M3 8C6.6 16 17.4 16 21 8" />
    </template>
    <template v-else-if="name === 'warning-triangle'">
      <path d="M20.0429 21H3.95705C2.41902 21 1.45658 19.3364 2.22324 18.0031L10.2662 4.01533C11.0352 2.67792 12.9648 2.67791 13.7338 4.01532L21.7768 18.0031C22.5434 19.3364 21.581 21 20.0429 21Z" />
      <path d="M12 9V13" />
      <path d="M12 17.01L12.01 16.9989" />
    </template>
    <template v-else-if="name === 'plus'">
      <path d="M6 12H12M18 12H12M12 12V6M12 12V18" />
    </template>
    <template v-else-if="name === 'trash'">
      <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" />
      <path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" />
    </template>
    <template v-else-if="name === 'log-out'">
      <path d="M12 12H19M19 12L16 15M19 12L16 9" />
      <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" />
    </template>
    <template v-else-if="props.name === 'edit-pencil'">
      <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" />
    </template>
  </svg>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: null, required: true }
})
</script>
