<script setup lang="ts">
import { stringifyColor, useColor, useHue } from '@vueuse/color'

const color = useColor('rgba(255, 0, 0, 1)', 'rgb', { origin: 'red' })
const hue = useHue(color)
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <div class="flex justify-end w-8 h-8 rounded-md" :style="{ backgroundColor: stringifyColor(color) }" />
    <label class="flex flex-col">
      Hue {{ hue.toFixed(2) }}:
      <input v-model.number="hue" type="range" min="0" max="1" step="0.01">
    </label>
  </div>
</template>
