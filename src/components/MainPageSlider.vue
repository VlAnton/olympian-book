<script setup lang="ts">
import type { BookItemCard } from '@/types/book-card'
import { ref, computed, defineProps } from 'vue'
import BookItem from './BookItem.vue'

type MainPageSliderProps = {
  items: BookItemCard[]
  windowWidth: number
}

const props = defineProps<MainPageSliderProps>()

const currentSlide = ref(0)
const showSliderControls = computed(() => props.windowWidth > 929 || props.windowWidth <= 525)

const cardsPerSlide = computed(() => {
  if (props.windowWidth >= 3000) return 6
  if (props.windowWidth >= 2000) return 4
  if (props.windowWidth >= 1511) return 3
  if (props.windowWidth >= 1013) return 2
  return 1
})
const showDots = computed(() => props.windowWidth > 1024)
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
</script>

<template>
  <div class="slider">
    <div class="slider-window">
      <div v-if="!showSliderControls" class="slider-chevron-wrapper absolute-left">
        <img v-show="currentSlide > 0" src="@/assets/icons/chevron-left.svg" @click="prevSlide" />
      </div>
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
            v-bind="{ windowWidth: props.windowWidth, ...book }"
          />
        </div>
      </div>
      <div v-if="!showSliderControls" class="slider-chevron-wrapper absolute-right">
        <img
          v-if="currentSlide < totalSlides - 1"
          src="@/assets/icons/chevron-right.svg"
          @click="nextSlide"
        />
      </div>
    </div>
    <div v-if="showSliderControls" class="slider-controls">
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
    width: calc(100% - 69px);
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
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

    @media screen and (max-width: 525px) {
      gap: 138.6px;
    }
  }

  &-chevron-wrapper {
    width: 15px;

    &.absolute-left,
    &.absolute-right {
      position: absolute;
      cursor: pointer;
      top: 41%;
      width: 28.5px;

      & img {
        height: 100px;
        width: 28.5px;
      }
    }

    &.absolute-left {
      left: 96px;
      z-index: 1;
    }
    &.absolute-right {
      right: 96px;
    }
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
