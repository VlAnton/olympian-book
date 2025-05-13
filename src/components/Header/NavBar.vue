<script setup lang="ts">
import { ref } from 'vue'
import tabs from '@/constants/tabs'

const isTabsOpened = ref(false)
</script>

<template>
  <nav class="nav-bar">
    <img
      v-show="!isTabsOpened"
      src="@/assets/icons/chevron-down.svg"
      class="logo"
      style="cursor: pointer"
      @click="isTabsOpened = true"
    />
    <ul v-show="isTabsOpened" class="nav-bar-items">
      <li @click="isTabsOpened = false"><img src="@/assets/icons/chevron-up.svg" /></li>
      <li v-for="tab in tabs" :key="tab.link">
        <router-link :to="tab.link" class="link-forum">{{ tab.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav-bar {
  position: relative;
  z-index: 100;
}

.nav-bar-items {
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

.nav-bar-items * {
  cursor: pointer;
}
</style>
