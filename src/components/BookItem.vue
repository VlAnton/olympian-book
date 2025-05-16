<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import OlympianButton from './OlympianButton.vue'
import { type BookItemCard } from '@/types/book-card'

const props = defineProps<BookItemCard & { windowWidth: number }>()
const emit = defineEmits(['addToCart'])
const onClick = () => {
  emit('addToCart', props.title)
}
</script>

<template>
  <div class="book-card">
    <img class="book-card-cover" :src="props.cover" />
    <p
      class="p2-raleway book-card-title"
      :class="{
        'p3-raleway': props.windowWidth <= 929,
      }"
    >
      {{ props.title }}
    </p>
    <p
      class="p3-raleway book-card-genre"
      :class="{
        'p4-raleway': props.windowWidth <= 929,
      }"
    >
      {{ props.genre }}
    </p>
    <div class="book-card-footer">
      <p
        class="p1-raleway book-card-price"
        :class="{
          'p2-raleway': props.windowWidth <= 929,
        }"
      >
        {{ props.price }} р.
      </p>
      <olympian-button
        color="black"
        :size="props.windowWidth <= 929 ? 'md' : 'lg'"
        :padding="props.windowWidth <= 525 ? '0 15px' : undefined"
        @click="onClick"
      >
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
  width: 420px;
  height: 650px;
  border: 3px solid $stroke-color;

  &-cover {
    width: 200px;
    object-fit: cover;
    margin-bottom: 29px;

    @media screen and (max-width: 525px) {
      width: 132px;
    }
  }

  &-title {
    height: 100px;

    @media screen and (max-width: 525px) {
      height: 80px;
    }
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
    align-content: center;
  }

  @media screen and (max-width: 929px) {
    width: 340px;
    height: 585px;
  }

  @media screen and (max-width: 525px) {
    width: 290px;
    height: 500px;
  }
}
</style>
