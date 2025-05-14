<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import OlympianButton from './OlympianButton.vue'
import { type BookItemCard } from '@/types/book-card'

const props = defineProps<BookItemCard>()
const emit = defineEmits(['addToCart'])
const onClick = () => {
  emit('addToCart', props.title)
}
</script>

<template>
  <div class="book-card">
    <img class="book-card-cover" :src="props.cover" />
    <p class="p2-raleway book-card-title">{{ props.title }}</p>
    <p class="p3-raleway book-card-genre">{{ props.genre }}</p>
    <div class="book-card-footer">
      <p class="p1-raleway book-card-price">{{ props.price }} р.</p>
      <olympian-button color="black" size="md" style="height: 75px; width: 100%" @click="onClick">
        Купить
      </olympian-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  min-width: 290px;
  max-width: 420px;
  min-height: 500px;
  max-height: 650px;
  border: 3px solid $stroke-color;

  &-cover {
    min-width: 132px;
    max-width: 200px;
    object-fit: cover;
    margin-bottom: 29px;
  }

  &-title {
    height: 100px;
  }

  &-genre {
    width: 181px;
    height: 50px;
    margin-bottom: 40px;
  }

  &-footer {
    display: flex;
    align-items: center;
    gap: 19px;
    width: 100%;
  }

  &-price {
    width: 100%;
    height: 100%;
  }
}
</style>
