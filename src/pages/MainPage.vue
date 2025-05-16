<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MainPageSlider from '@/components/MainPageSlider.vue'
import AboutCards from '@/components/AboutCards.vue'
import books from '@/constants/books'
import OlympianInput from '@/components/OlympianInput.vue'
import OlympianButton from '@/components/OlympianButton.vue'

const windowWidth = ref(window.innerWidth)
const email = ref('')

const updateWindowWidth = () => {
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
    <about-cards :window-width="windowWidth" />

    <div :class="$style['page-footer']">
      <div :class="$style['page-footer-text']">
        <h3
          :class="{
            'h3-forum': windowWidth > 929,
            'h4-forum': windowWidth <= 929,
          }"
        >
          Хотите знать о книгах всё?
        </h3>
        <p
          :class="{
            'p2-raleway': windowWidth > 929,
            'p4-raleway': windowWidth <= 929,
          }"
        >
          Подпишитесь на нашу новостную рассылку
        </p>
      </div>
      <form :class="$style['form']">
        <olympian-input
          style="width: 100%"
          type="email"
          :size="windowWidth > 929 ? 'lg' : 'md'"
          pattern=".+@.+\..+"
          v-model="email"
        />
        <olympian-button
          :style="{
            width: windowWidth > 929 ? '310px' : '220px',
            height: windowWidth > 929 ? '60px' : '50px',
          }"
          :size="windowWidth > 929 ? 'md' : 'sm'"
          padding="0"
          type="submit"
          color="black"
        >
          Отправить
        </olympian-button>
      </form>
    </div>
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

:deep(.about-cards) {
  margin-top: 140px;
  margin-bottom: 140px;

  @media screen and (max-width: 1173px) {
    margin-top: 160px;
    margin-bottom: 90px;
  }

  @media (max-width: 732px) {
    margin-top: 80px;
    margin-bottom: 70px;
  }
}
</style>

<style module lang="scss">
.page-footer {
  display: flex;
  flex-direction: column;
  width: calc(100% - 120px);
  gap: 60px;

  &-text {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  & .form {
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  @media screen and (max-width: 525px) {
    width: 100%;

    .form {
      flex-wrap: wrap;
    }
  }
}
</style>
