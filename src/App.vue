<script setup lang="ts">
import OlympianHeader from '@/components/Header/OlympianHeader.vue'
import PageFooter from '@/components/Footer/PageFooter.vue'
</script>

<template>
  <main>
    <olympian-header />

    <router-view />

    <page-footer />
  </main>
</template>

<style scoped></style>
