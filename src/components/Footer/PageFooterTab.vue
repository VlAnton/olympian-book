<script setup lang="ts">
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue'

type PageFooterProps = {
  tab: {
    title: string
    link: string
  }
  disabled: boolean
  isActive: boolean
  windowWidth: number
}
const props = defineProps<PageFooterProps>()

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
</script>

<template>
  <li
    :class="[
      'tab',
      {
        'tab-active': props.isActive,
        'tab-pressed': isMouseDown && !disabled,
        'tab-disabled': props.disabled,
      },
    ]"
    @mousedown="isMouseDown = true"
  >
    <router-link
      :to="props.tab.link"
      :class="{
        'p2-raleway': props.windowWidth > 929,
        'link-forum-md': props.windowWidth <= 929,
        'link-forum-sm': props.windowWidth <= 525,
        'tab-pressed-text': isMouseDown,
        'tab-disabled-text': props.disabled,
      }"
      style="color: #fff; text-decoration: none"
    >
      {{ props.tab.title }}
    </router-link>
  </li>
</template>

<style lang="scss" scoped>
.tab {
  padding: 0 32.7px;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s ease;

  &:hover:not(.tab-disabled) {
    border-bottom: 3px solid $bg-color-primary;
    transition: border-color 0.3s ease;
  }

  &-active {
    border-bottom: 3px solid $bg-color-primary;
    transition: border-color 0.3s ease;
  }

  &-pressed {
    border-bottom: 3px solid $stroke-color !important;
    transition: border-color 0.3s ease;

    &-text {
      color: $text-color-primary !important;
    }
  }

  &-disabled {
    border-bottom: 3px solid transparent;

    &-text {
      color: $text-color-tertiary !important;
      user-select: none;
      pointer-events: none;
    }
  }

  @media screen and (max-width: 1306px) {
    padding: 0 7px;
  }
}
</style>
