<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/Header/NavBar.vue'
import OlympianButton from '../OlympianButton.vue'

const $route = useRoute()

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

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

const btnSize = computed(() => {
  if (windowWidth.value <= 375) {
    return 'md'
  }
  return 'lg'
})

const btnWidth = computed(() => {
  if (windowWidth.value <= 375) {
    return '215px'
  }
  if (windowWidth.value <= 768) {
    return '220px'
  }
  return '420px'
})

const iconClass = computed(() => {
  if (windowWidth.value <= 375) {
    return 'nav-bar-icon-sm'
  }
  if (windowWidth.value <= 768) {
    return 'nav-bar-icon-md'
  }
  return ''
})

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div :class="$style['header-wrapper']" :style="adsStyle">
    <header :class="$style.header">
      <h1
        :class="{
          'h1-logo': windowWidth > 768,
          'h2-logo': windowWidth <= 768,
          'h3-logo': windowWidth <= 375,
        }"
      >
        Olympian<br />Books
      </h1>
      <nav-bar :icon-class="iconClass" />
      <router-link to="cart">
        <img src="@/assets/icons/cart.svg" />
      </router-link>
    </header>
    <div v-if="adsStyle" :class="$style.ad">
      <h1
        :class="[
          $style['ad-books-promo'],
          {
            'h1-forum': windowWidth > 768,
            'h2-forum': windowWidth <= 768,
            'h3-forum': windowWidth <= 375,
            [$style['ad-books-promo-ipad-mini']]: windowWidth <= 768,
            [$style['ad-books-promo-iphone-se']]: windowWidth <= 375,
          },
        ]"
      >
        {{ adText }}
      </h1>
      <olympian-button
        :style="{ width: btnWidth }"
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

      &-ipad-mini {
        width: 460px;
      }
      &-iphone-se {
        width: 265px;
      }
    }
  }
}
</style>
