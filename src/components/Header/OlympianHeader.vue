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
  if (windowWidth.value <= 477) {
    return 'md'
  }
  return 'lg'
})

const btnStyle = computed(() => {
  if (windowWidth.value <= 929) {
    return {
      width: '245px',
      height: '50px',
    }
  }
  return {
    width: '420px',
  }
})

const iconClass = computed(() => {
  if (windowWidth.value <= 477) {
    return 'nav-bar-icon-sm'
  }
  if (windowWidth.value <= 929) {
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
          'h1-logo': windowWidth > 929,
          'h2-logo': windowWidth <= 929,
          'h3-logo': windowWidth <= 477,
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
            'h1-forum': windowWidth > 929,
            'h2-forum': windowWidth <= 929,
            'h3-forum': windowWidth <= 477,
            [$style['ad-books-promo-ipad-mini']]: windowWidth <= 929,
            [$style['ad-books-promo-iphone-se']]: windowWidth <= 380,
          },
        ]"
      >
        {{ adText }}
      </h1>
      <olympian-button
        class="button-forum-lg"
        :style="btnStyle"
        :class="{
          'button-forum-md': windowWidth <= 929,
          'button-forum-sm': windowWidth <= 477,
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

@media screen and (max-width: 929px) {
  .header {
    padding: 0 34px !important;
  }
  .ad {
    padding: 0 34px !important;

    &-books-promo {
      width: 460px !important;
    }
  }
}
@media screen and (max-width: 477px) {
  .header {
    padding: 0 15px !important;
  }
  .ad {
    padding: 15px !important;

    &-books-promo {
      width: 187px !important;
    }
  }
}
</style>
