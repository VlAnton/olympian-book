<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowStore } from '@/store/window'
import NavBar from '@/components/Header/NavBar.vue'
import OlympianButton from '../OlympianButton.vue'

const $route = useRoute()
const windowStore = useWindowStore()

const adsStyle = computed(() => {
  if ($route.name === 'home') {
    return { backgroundImage: "url('/src/assets/images/backgrounds/MainPage.webp')" }
  }
  if ($route.name === 'catalog') {
    return { backgroundImage: "url('/src/assets/images/backgrounds/Catalog.webp')" }
  }
  return { backgroundColor: '#1596c1' }
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

const btnSize = computed(() => {
  if (windowStore.windowWidth <= 525) {
    return 'md'
  }
  return 'lg'
})

const btnStyle = computed(() => {
  if (windowStore.windowWidth <= 929) {
    return {
      width: '245px',
      height: '50px',
    }
  }
  return {
    width: '420px',
  }
})
</script>

<template>
  <div :class="$style['header-wrapper']" :style="adsStyle">
    <header :class="$style.header">
      <h1
        :class="{
          'h2-logo': windowStore.windowWidth > 929,
          'h3-logo': windowStore.windowWidth <= 929,
          'h4-logo': windowStore.windowWidth <= 525,
        }"
      >
        Olympian<br />Books
      </h1>
      <nav-bar :window-width="windowStore.windowWidth" />
      <router-link to="cart">
        <img :class="$style['cart-icon']" src="@/assets/icons/cart.svg" />
      </router-link>
    </header>
    <div v-if="adsStyle" :class="$style.ad">
      <h1
        :class="[
          $style['ad-books-promo'],
          {
            'h1-forum': windowStore.windowWidth > 929,
            'h2-forum': windowStore.windowWidth <= 929,
            'h3-forum': windowStore.windowWidth <= 525,
            [$style['ad-books-promo-ipad-mini']]: windowStore.windowWidth <= 929,
            [$style['ad-books-promo-iphone-se']]: windowStore.windowWidth <= 380,
          },
        ]"
      >
        {{ adText }}
      </h1>
      <olympian-button
        class="button-forum-lg"
        :style="btnStyle"
        :class="{
          'button-forum-md': windowStore.windowWidth <= 929,
          'button-forum-sm': windowStore.windowWidth <= 525,
        }"
        :size="btnSize"
        @click="$router.push('/catalog')"
      >
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
  width: 100vw;
  height: 940px;

  .header {
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    padding: 0 70px;

    .cart-icon {
      height: 64px;
    }
  }

  .ad {
    padding: 0 70px;
    width: 100%;

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

@media screen and (max-width: 929px) {
  .header-wrapper {
    background-position: 62% !important;
    height: 820px !important;
    gap: 10px;
  }
  .header {
    height: 50px !important;
    padding: 0 34px !important;
  }
  .cart-icon {
    height: 32px !important;
  }
  .ad {
    padding: 0 34px !important;

    &-books-promo {
      height: 400px !important;
      width: 461px !important;
    }
  }
}
@media screen and (max-width: 525px) {
  .header-wrapper {
    background-position: 54% !important;
    height: 590px !important;
  }
  .header {
    padding: 0 15px !important;
  }
  .cart-icon {
    height: 40px !important;
  }
  .ad {
    padding: 15px !important;
    gap: 10px !important;

    &-books-promo {
      width: 187px !important;
      height: 290px !important;
    }
  }
}
</style>
