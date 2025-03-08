<script setup lang="ts">
import { stringifyColor, useColor, useLightness } from '@vueuse/color'

const color = useColor('red', 'rgb')
const lightness = useLightness(color, { origin: 'red' })
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <div class="flex justify-end w-8 h-8 rounded-md" :style="{ backgroundColor: stringifyColor(color) }" />
    <label class="flex flex-col">
      Lightness {{ lightness.toFixed(2) }}:
      <input v-model.number="lightness" type="range" min="0" max="1" step="0.01">
    </label>
  </div>
</template>
