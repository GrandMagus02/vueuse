<script setup lang="ts">
import { parseColor } from '@vueuse/color'
import { computed, ref } from 'vue-demi'

const value = ref('rgb(255, 0, 0, 0.5)')

const output = computed(() => {
  try {
    const parsed = parseColor(value.value, { throwOnError: true })
    return JSON.stringify(parsed.color, null, 2)
  }
  catch (e) {
    return e
  }
})
</script>

<template>
  <div class="flex flex-col">
    <input v-model="value" type="text" placeholder="Type css color here">
    <code>{{ output }}</code>
  </div>
</template>
