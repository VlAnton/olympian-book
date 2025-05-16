<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import tabs from '@/constants/tabs'
import { useWindowStore } from '@/store/window'
import PageFooterTab from '@/components/Footer/PageFooterTab.vue'

const windowStore = useWindowStore()

const $route = useRoute()

const currentTab = computed(() => {
  return tabs.find((tab) => $route.fullPath === tab.link)
})
</script>

<template>
  <footer class="page-footer">
    <div class="left-part">
      <h1
        :style="{
          width:
            windowStore.windowWidth > 1306
              ? '310px'
              : windowStore.windowWidth <= 762
              ? '190px'
              : '160px',
        }"
        :class="{
          'h1-logo': windowStore.windowWidth > 1306,
          'h2-logo': windowStore.windowWidth <= 1306,
        }"
      >
        Olympian<br />Books
      </h1>
      <p
        :class="{
          'p2-raleway': windowStore.windowWidth > 929,
          'p3-raleway': windowStore.windowWidth <= 929,
        }"
        :style="{
          width:
            windowStore.windowWidth <= 1306
              ? '160px'
              : windowStore.windowWidth <= 762
              ? '190px'
              : '310px',
          textAlign: 'left',
        }"
      >
        +30922040281
      </p>
    </div>
    <ul class="right-part">
      <page-footer-tab
        v-for="tab in tabs"
        :key="tab.link"
        :window-width="windowStore.windowWidth"
        :tab="tab"
        :is-active="currentTab?.link === tab.link"
        :disabled="tab.link === '/cart'"
      />
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
.page-footer {
  background-color: $bg-color-secondary;
  padding: 15px 70px;
  display: flex;
  align-items: center;
  color: $text-color-secondary;
  justify-content: space-between;

  .left-part {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .right-part {
    display: flex;
    gap: 20px;
    list-style: none;
  }

  @media screen and (max-width: 1306px) {
    padding: 30px 34px;
  }

  @media screen and (max-width: 762px) {
    padding: 10px 15px 30px;

    .left-part {
      flex-direction: column;
      align-items: flex-start;
    }

    .right-part {
      flex-direction: column;
    }
  }
}
</style>
