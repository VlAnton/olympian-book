import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWindowStore = defineStore('window', () => {
  const windowWidth = ref(window.innerWidth)

  function updateWidth() {
    windowWidth.value = window.innerWidth
  }

  return { windowWidth, updateWidth }
})
