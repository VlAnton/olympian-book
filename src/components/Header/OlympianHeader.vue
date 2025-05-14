<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/Header/NavBar.vue'
import OlympianButton from '../OlympianButton.vue'

const $route = useRoute()

const adsStyle = computed(() => {
  if ($route.name === 'home') {
    return { backgroundImage: "url('/src/assets/images/backgrounds/MainPage.webp')" }
  }
  if ($route.name === 'catalog') {
    return { backgroundImage: "url('/src/assets/images/backgrounds/Catalog.webp')" }
  }
  return null
})

const adText = computed(() => {
  if ($route.name === 'home') {
    return 'Книги, которые вознесут вас на Олимп'
  }
  if ($route.name === 'catalog') {
    return 'Собрание древних знаний'
  }
  return ''
})
</script>

<template>
  <div :class="$style['header-wrapper']" :style="adsStyle">
    <header :class="$style.header">
      <h1 class="h1-logo">Olympian<br />Books</h1>
      <nav-bar />
      <router-link to="cart">
        <img src="@/assets/icons/cart.svg" />
      </router-link>
    </header>
    <div v-if="adsStyle" :class="$style.ad">
      <h1 class="h1-forum" :class="$style['ad-books-promo']">
        {{ adText }}
      </h1>
      <olympian-button style="width: 420px" size="lg" @click="$router.push('/catalog')">
        Узнать больше
      </olympian-button>
    </div>
  </div>
</template>

<style module lang="scss">
.header-wrapper {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header {
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    padding: 0 70px;
  }

  .ad {
    padding: 0 70px;
    width: 100%;
    height: 940px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    &-books-promo {
      color: $text-color-secondary;
      width: 860px;
      height: 460px;
      align-content: center;
      text-align: left;
    }
  }
}
</style>
