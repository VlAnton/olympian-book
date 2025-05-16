<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import tabs from '@/constants/tabs'
import PageFooterTab from '@/components/Footer/PageFooterTab.vue'

const windowWidth = ref(window.innerWidth)

const $route = useRoute()

const currentTab = computed(() => {
  return tabs.find((tab) => $route.fullPath === tab.link)
})

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
  <footer class="page-footer">
    <div class="left-part">
      <h1
        :style="{
          width: windowWidth > 1306 ? '310px' : windowWidth <= 762 ? '190px' : '160px',
        }"
        :class="{
          'h1-logo': windowWidth > 1306,
          'h2-logo': windowWidth <= 1306,
        }"
      >
        Olympian<br />Books
      </h1>
      <p
        :class="{ 'p2-raleway': windowWidth > 929, 'p3-raleway': windowWidth <= 929 }"
        :style="{
          width: windowWidth <= 1306 ? '160px' : windowWidth <= 762 ? '190px' : '310px',
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
        :window-width="windowWidth"
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
