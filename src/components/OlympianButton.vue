<script setup lang="ts">
import { computed, defineProps, ref, onMounted, onBeforeUnmount } from 'vue'

type ButtonProps = {
  color?: 'black' | 'white'
  disabled?: boolean
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
      { [$style['button-black-pressed']]: isMouseDown && props.color === 'black' },
    ]"
    class="button-forum"
    :disabled="props.disabled"
    @mousedown="isMouseDown = true"
  >
    <slot />
  </button>
</template>

<style lang="scss" module>
.button {
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
