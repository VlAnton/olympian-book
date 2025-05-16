<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

type OlympianInputProps = {
  label?: string
  type: string
  placeholder?: string
  modelValue: string
  pattern?: string
  size?: 'lg' | 'md'
}
const props = defineProps<OlympianInputProps>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },

  set(val: string) {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <div class="olympian-input-wrapper">
    <label v-if="label" for="input">{{ label }}</label>
    <input
      class="olympian-input p2-raleway"
      :class="{
        'olympian-input-lg': !size || size === 'lg',
        'olympian-input-md': size === 'md',
      }"
      id="input"
      :type="type"
      :placeholder="placeholder"
      v-model="value"
    />
  </div>
</template>

<style scoped lang="scss">
.olympian-input-wrapper {
  display: flex;
  flex-direction: column;

  .olympian-input {
    border: 3px solid $stroke-color;
    padding: 4px 12px;

    &-lg {
      height: 60px;
    }

    &-md {
      height: 50px;
    }
  }
}
</style>
