<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import tabs from '@/constants/tabs'

type NavBarProps = {
  iconClass?: string
}

const props = defineProps<NavBarProps>()

const isTabsOpened = ref(false)

const $route = useRoute()

watch(
  () => $route.fullPath,
  () => {
    isTabsOpened.value = false
  }
)
</script>

<template>
  <nav class="nav-bar">
    <img
      v-show="!isTabsOpened"
      src="@/assets/icons/chevron-down.svg"
      class="nav-bar-icon"
      :class="props.iconClass"
      @click="isTabsOpened = true"
    />

    <transition name="fade-down">
      <ul v-show="isTabsOpened" class="nav-bar-items">
        <li @click="isTabsOpened = false"><img src="@/assets/icons/chevron-up.svg" /></li>
        <li v-for="tab in tabs" :key="tab.link">
          <router-link :to="tab.link" class="link-forum">{{ tab.title }}</router-link>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<style scoped lang="scss">
.nav-bar {
  position: relative;

  &-items {
    padding: 41px 110px;
    margin: 0;
    margin-top: 308px;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 56px;
    align-items: center;
    background-color: $bg-color-primary;
  }

  &-items * {
    cursor: pointer;
  }

  &-logo {
    cursor: pointer;

    &-md {
      width: 32;
      height: 9;
    }

    &-sm {
      width: 40;
      height: 12;
    }
  }
}

.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.3s ease;
}

.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
