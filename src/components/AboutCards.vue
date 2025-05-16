<script lang="ts" setup>
import { defineProps } from 'vue'
import bookImage from '@/assets/images/backgrounds/book.jpg'
import statueImage from '@/assets/images/backgrounds/statue.jpg'

type AboutCardsProps = {
  windowWidth: number
}

const props = defineProps<AboutCardsProps>()
</script>

<template>
  <div class="about-cards">
    <div class="about-cards-row">
      <div class="about-card image-book" :style="`background-image: url(${bookImage})`" />
      <div class="about-card about">
        <h2
          :class="{
            'h2-forum': props.windowWidth > 929,
            'h3-forum': props.windowWidth <= 929,
            'h4-forum': props.windowWidth <= 525,
          }"
        >
          О НАС
        </h2>
        <p
          :class="{
            'p2-raleway': props.windowWidth > 929,
            'p3-raleway': props.windowWidth <= 929,
          }"
        >
          Книжное наследие от мыслителей Древней Греции и до людей современности. Это не просто
          магазин, а настоящий клуб любителей книги, который объединяет в своем культурном
          пространстве людей самых разных интересов.
        </p>
      </div>
    </div>
    <div class="about-cards-row">
      <div class="about-card harmony">
        <h2
          :class="{
            'h2-forum': props.windowWidth > 929,
            'h3-forum': props.windowWidth <= 929,
            'h4-forum': props.windowWidth <= 525,
          }"
        >
          ГАРМОНИЯ
        </h2>
        <p
          :class="{
            'p2-raleway': props.windowWidth > 929,
            'p3-raleway': props.windowWidth <= 929,
          }"
        >
          Наш проект «Гармония» объединяет читателей и авторов в реальности и в интернете. Каждую
          неделю проводятся встречи онлайн и вживую. Из наших регулярных рубрик вы узнаете много
          нового о книгах и писателях.
        </p>
      </div>
      <div class="about-card image-statue" :style="`background-image: url(${statueImage})`" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-cards {
  display: flex;
  flex-direction: column;

  &-row {
    display: flex;
    width: 100%;
  }

  .about-card {
    width: 50%;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;

    &.about,
    &.harmony {
      background-color: $bg-color-secondary;
      color: $text-color-secondary;
      flex-direction: column;
    }

    &.image-book,
    &.image-statue {
      background-size: cover;
      background-position: center;
    }
  }

  @media (max-width: 1173px) {
    .about-card {
      aspect-ratio: auto;
      width: 50%;
      height: auto;
      padding: 0 50px;
      min-height: 550px;
      gap: 36px;
    }
  }

  @media (max-width: 732px) {
    &-row {
      flex-wrap: wrap;
      width: calc(100vw - 30px);
    }

    .about-card {
      width: 100%;
      min-height: 500px;
      aspect-ratio: auto;
      padding: 0 25px;
      gap: 41px;
    }

    .about {
      order: 1;
    }
    .image-book {
      order: 2;
    }
    .harmony {
      order: 1;
    }
    .image-statue {
      order: 2;
    }
  }
}
</style>
