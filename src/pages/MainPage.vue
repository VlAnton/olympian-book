<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MainPageSlider from '@/components/MainPageSlider.vue'
import books from '@/constants/books'

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="page">
    <h1
      :class="{
        'h2-forum': windowWidth > 929,
        'h3-forum': windowWidth <= 929,
        'h4-forum': windowWidth <= 525,
      }"
    >
      Горячие новинки
    </h1>
    <main-page-slider :items="books" :window-width="windowWidth" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.slider) {
  margin-top: 140px;
}

@media screen and (max-width: 939px) {
  :deep(.slider) {
    margin-top: 45px;
  }
}
</style>

<style module lang="scss"></style>
