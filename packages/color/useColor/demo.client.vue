<script setup lang="ts">
import { useColor } from '@vueuse/color'
import { useColorString } from '../useColorString'

const color = useColor('rgba(255, 0, 0, 1)', 'rgb')
const rgbString = useColorString(color.value, 'rgb', { precision: 2 })
const hslString = useColorString(color.value, 'hsl', { precision: 2 })
const hwbString = useColorString(color.value, 'hwb', { precision: 2 })
const hexString = useColorString(color.value, 'hex', { precision: 2 })
const labString = useColorString(color.value, 'lab', { precision: 2 })
const lchString = useColorString(color.value, 'lch', { precision: 2 })
const lrgbString = useColorString(color.value, 'lrgb', { precision: 3, format: 'lrgb' })
</script>

<template>
  <div class="flex gap-4 items-start">
    <ColorPicker v-model="color" />
    <div class="grid grid-cols-1 gap-2 grow">
      <div class="grid gap-1 items-center">
        <span>RGB:</span>
        <code>{{ rgbString }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>HSL:</span>
        <code>{{ hslString }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>HWB:</span>
        <code>{{ hwbString }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>HEX:</span>
        <code>{{ hexString }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>LAB:</span>
        <code>{{ labString }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>LCH:</span>
        <code>{{ lchString }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>LRGB:</span>
        <code>{{ lrgbString }}</code>
      </div>
    </div>
  </div>
</template>
