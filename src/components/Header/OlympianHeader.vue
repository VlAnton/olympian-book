<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/Header/NavBar.vue'

const $route = useRoute()

const adsStyle = computed(() => {
  if ($route.name === 'home') {
    return { backgroundImage: "url('/src/assets/images/backgrounds/MainPage.png')" }
  }
  if ($route.name === 'catalog') {
    return { backgroundImage: "url('/src/assets/images/backgrounds/Catalog.png')" }
  }
  return null
})
</script>

<template>
  <div :class="$style['header-wrapper']">
    <header :class="$style.header">
      <h1 class="h1-logo">Olympian<br />Books</h1>
      <nav-bar />
      <router-link to="basket">
        <img src="@/assets/icons/basket.svg" />
      </router-link>
    </header>
    <div v-if="adsStyle" :class="$style.ads" :style="adsStyle"></div>
  </div>
</template>

<style module lang="scss">
.header {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px;
}

.ads {
  margin-top: -100px;
  width: 100%;
  height: 940px;
  background-size: cover;
  background-position: center;
}
</style>
