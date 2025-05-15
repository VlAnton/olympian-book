<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import tabs from '@/constants/tabs'

type NavBarProps = {
  windowWidth: number
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
        <li v-for="tab in tabs" :key="tab.link">
          <router-link
            :to="tab.link"
            :class="[
              'link-forum-lg',
              {
                'link-forum-md': windowWidth <= 929,
                'link-forum-sm': windowWidth <= 525,
              },
            ]"
          >
            {{ tab.title }}
          </router-link>
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

    @media screen and (max-width: 929px) {
      & {
        padding: 57px 70px 70px;
        margin-top: 274px;
      }
    }
    @media screen and (max-width: 525px) {
      & {
        padding: 63px 65px 70px;
        margin-top: 280px;
      }
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
