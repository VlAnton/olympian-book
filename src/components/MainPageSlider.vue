<script setup lang="ts">
import type { BookItemCard } from '@/types/book-card'
import { ref, computed, defineProps, onMounted, onBeforeUnmount } from 'vue'
import BookItem from './BookItem.vue'

type MainPageSliderProps = {
  items: BookItemCard[]
}

const props = defineProps<MainPageSliderProps>()

const currentSlide = ref(0)
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

const cardsPerSlide = computed(() => {
  if (windowWidth.value >= 4000) return 8
  if (windowWidth.value >= 3000) return 6
  if (windowWidth.value >= 2000) return 4
  if (windowWidth.value >= 1511) return 3
  if (windowWidth.value >= 1013) return 2
  return 1
})
const showDots = computed(() => windowWidth.value > 1024)
const totalSlides = computed(() => Math.ceil(props.items.length / cardsPerSlide.value))

function nextSlide() {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function goToSlide(index: number) {
  currentSlide.value = index
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="slider">
    <div class="slider-window">
      <div
        class="slider-track"
        :style="{
          transform: `translateX(-${currentSlide * 100}%)`,
        }"
      >
        <div class="slider-slide" v-for="(_, index) in totalSlides" :key="index">
          <book-item
            v-for="book in props.items.slice(
              index * cardsPerSlide,
              index * cardsPerSlide + cardsPerSlide
            )"
            :key="book.title"
            v-bind="book"
          />
        </div>
      </div>
    </div>

    <div class="slider-controls">
      <div class="slider-chevron-wrapper">
        <img v-show="currentSlide > 0" src="@/assets/icons/chevron-left.svg" @click="prevSlide" />
      </div>
      <div v-if="showDots" class="dots">
        <span
          v-for="(_, index) in totalSlides"
          :key="index"
          :class="['dot', { active: currentSlide === index }]"
          @click="goToSlide(index)"
        />
      </div>
      <div class="slider-chevron-wrapper">
        <img
          v-if="currentSlide < totalSlides - 1"
          src="@/assets/icons/chevron-right.svg"
          @click="nextSlide"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: 100vw;

  &-window {
    width: 100%;
    overflow: hidden;
  }

  &-track {
    display: flex;
    transition: transform 0.4s ease;
    width: 100%;
  }

  &-slide {
    min-width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  &-controls {
    display: flex;
    align-items: center;
    gap: 50px;

    & img {
      cursor: pointer;
    }
  }

  &-chevron-wrapper {
    width: 15px;
  }

  .dots {
    display: flex;
    gap: 55px;

    .dot {
      width: 16px;
      height: 16px;
      border: 2px solid #000;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .dot.active {
      background: #000;
    }
  }
}
</style>
