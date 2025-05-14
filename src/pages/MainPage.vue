<script lang="ts" setup>
import MainPageSlider from '@/components/MainPageSlider.vue'
import books from '@/constants/books'
</script>

<template>
  <div class="page">
    <h1 class="h1-forum">Горячие новинки</h1>
    <main-page-slider :items="books" />
  </div>
</template>

<style module lang="scss"></style>
