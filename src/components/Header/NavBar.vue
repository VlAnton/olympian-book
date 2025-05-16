<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import tabs from '@/constants/tabs'
import NavBarTab from '@/components/Header/NavBarTab.vue'

type NavBarProps = {
  windowWidth: number
}

const props = defineProps<NavBarProps>()
const $route = useRoute()

const isTabsOpened = ref(false)

const currentTab = computed(() => {
  return tabs.find((tab) => $route.fullPath === tab.link)
})

const iconClass = computed(() => {
  if (props.windowWidth <= 525) {
    return 'nav-bar-icon-sm'
  }
  if (props.windowWidth <= 929) {
    return 'nav-bar-icon-md'
  }
  return ''
})
</script>

<template>
  <nav class="nav-bar">
    <img
      v-show="!isTabsOpened"
      src="@/assets/icons/chevron-down.svg"
      class="nav-bar-icon"
      :class="iconClass"
      @click="isTabsOpened = true"
    />

    <transition name="fade-down">
      <ul v-show="isTabsOpened" class="nav-bar-items">
        <li @click="isTabsOpened = false">
          <img class="nav-bar-icon" :class="iconClass" src="@/assets/icons/chevron-up.svg" />
        </li>
        <nav-bar-tab
          v-for="tab in tabs"
          :key="tab.link"
          :window-width="windowWidth"
          :tab="tab"
          :is-active="currentTab?.link === tab.link"
          :disabled="tab.link === '/cart'"
        />
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

    @media screen and (max-width: 929px) {
      padding: 57px 70px 70px;
      margin-top: 274px;
    }
    @media screen and (max-width: 525px) {
      width: 240px;
      padding: 63px 65px 70px;
      margin-top: 280px;
    }
  }

  &-items * {
    cursor: pointer;
  }

  &-icon {
    cursor: pointer;

    &-md {
      width: 32px;
      height: 9px;
    }

    &-sm {
      width: 40px;
      height: 12px;
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
