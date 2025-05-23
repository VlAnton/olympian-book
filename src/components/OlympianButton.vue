<script setup lang="ts">
import { computed, defineProps, ref, onMounted, onBeforeUnmount } from 'vue'

type ButtonProps = {
  color?: 'black' | 'white'
  size: 'lg' | 'md' | 'sm'
  disabled?: boolean
  padding?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = defineProps<ButtonProps>()
const isMouseDown = ref(false)

const handlePointerUp = () => {
  isMouseDown.value = false
}

onMounted(() => {
  window.addEventListener('pointerup', handlePointerUp)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerup', handlePointerUp)
})

const sizeStyles = computed(() => {
  switch (props.size) {
    case 'lg':
      return { height: '75px' }
    case 'md':
      return { height: '50px' }
    default:
      return {}
  }
})

const padding = computed(() => {
  if (!props.padding) {
    return '0 25px'
  }
  return props.padding
})

const borderColor = computed(() => {
  if (props.color === 'white') {
    return '3px solid #fff'
  }
  if (props.color === 'black') {
    return '3px solid #000'
  }
  return '3px solid #fff'
})

const textColor = computed(() => {
  if (props.color === 'white') {
    return '#fff'
  }
  if (props.color === 'black') {
    return '#000'
  }
  return '#fff'
})
</script>

<template>
  <button
    :class="[
      $style.button,
      {
        [$style['button-black-pressed']]: isMouseDown && color === 'black',
        'button-forum-md': size === 'md',
        'button-forum-lg': size === 'lg',
        'button-forum-sm': size === 'sm',
      },
    ]"
    :type="type ? type : 'button'"
    :style="sizeStyles"
    :disabled="disabled"
    @mousedown="isMouseDown = true"
  >
    <slot />
  </button>
</template>

<style lang="scss" module>
.button {
  padding: v-bind(padding);
  border: v-bind(borderColor);
  color: v-bind(textColor);
  background-color: transparent;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(205, 205, 205, 1);
    transition: background-color 0.3s ease;
  }

  &:active {
    background-color: $bg-color-primary;
    color: $text-color-primary;
    transition: background-color, color 0.3s ease;
  }

  &-black-pressed {
    background-color: #1596c1 !important;
  }

  &:disabled {
    border: 3px solid $bg-color-tertiary;
    color: $text-color-tertiary;
    background-color: transparent !important;
    user-select: none;
    cursor: not-allowed;
  }
}
</style>
