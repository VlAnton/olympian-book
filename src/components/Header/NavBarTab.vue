<script lang="ts" setup>
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue'

type NavBarTabProps = {
  tab: {
    title: string
    link: string
  }
  disabled: boolean
  isActive: boolean
  windowWidth: number
}

const props = defineProps<NavBarTabProps>()

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
    class="tab"
    :class="{
      'tab-active': props.isActive,
      'tab-pressed': isMouseDown && !disabled,
    }"
    @mousedown="isMouseDown = true"
  >
    <router-link
      :to="tab.link"
      :class="{
        'link-forum-lg': props.windowWidth > 929,
        'link-forum-md': props.windowWidth <= 929,
        'link-forum-sm': props.windowWidth <= 525,
        'tab-pressed-text': isMouseDown,
        'tab-disabled': props.disabled,
      }"
    >
      {{ props.tab.title }}
    </router-link>
  </li>
</template>

<style scoped lang="scss">
.tab {
  padding: 0 23px;

  &-active {
    border-bottom: 3px solid $stroke-color;
  }

  &-pressed {
    border-bottom: 3px solid $bg-color-secondary;

    &-text {
      color: $bg-color-secondary;
    }
  }

  &-disabled {
    color: $text-color-tertiary;
    user-select: none;
    pointer-events: none;
  }
}
</style>
