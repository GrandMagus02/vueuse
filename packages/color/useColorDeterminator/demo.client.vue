<script setup lang="ts">
import { stringifyColor, useColor, useColorProps } from '@vueuse/color'

const rgba = useColor('rgba(255, 0, 0, 1)', { input: 'rgba' })
const colorProps = useColorProps(rgba, { input: 'rgba' })
</script>

<template>
  <div class="flex gap-4">
    <div class="flex justify-end w-20 h-20 rounded-lg" :style="{ backgroundColor: stringifyColor(rgba, 'rgba') }" />
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Hue:
        </div>
        <input v-model="colorProps.h" type="range" min="0" max="360" step="1">
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Lightness:
        </div>
        <input v-model="colorProps.l" type="range" min="0" max="1" step="0.01">
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Saturation:
        </div>
        <input v-model="colorProps.s" type="range" min="0" max="1" step="0.01">
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Red:
        </div>
        <input v-model="colorProps.r" type="range" min="0" max="1" step="0.01">
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Green:
        </div>
        <input v-model="colorProps.g" type="range" min="0" max="1" step="0.01">
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Blue:
        </div>
        <input v-model="colorProps.b" type="range" min="0" max="1" step="0.01">
      </div>
    </div>
  </div>
</template>
