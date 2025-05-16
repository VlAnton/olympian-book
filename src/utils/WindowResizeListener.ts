import { useWindowStore } from '@/store/window'

export function initWindowResizeListener() {
  const store = useWindowStore()

  function handleResize() {
    store.updateWidth()
  }

  window.addEventListener('resize', handleResize)

  handleResize()
}
