<script setup lang="ts">
import { stringifyColor, useColor } from '@vueuse/color'

const rgba = useColor('rgba(255, 0, 0, 1)', { input: 'rgba' })
const format = 'rgba'

const hsla = useColor(rgba, { input: format, output: 'hsla', stringify: true, deep: false })
const hexa = useColor(rgba, { input: format, output: 'hexa', stringify: true })
const hsva = useColor(rgba, { input: format, output: 'hsva', stringify: true })
const cmyka = useColor(rgba, { input: format, output: 'cmyka', stringify: true })
</script>

<template>
  <div class="flex gap-4 items-start">
    <ColorPicker v-model="rgba" format="rgba" />
    <div class="grid grid-cols-1 gap-2 grow">
      <div class="grid gap-1 items-center">
        <span>HSLA:</span>
        <code>{{ hsla }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>RGBA:</span>
        <code>{{ stringifyColor(rgba, 'rgba') }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>HEXA:</span>
        <code>{{ hexa }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>HSVA:</span>
        <code>{{ hsva }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>CMYKA:</span>
        <code>{{ cmyka }}</code>
      </div>
      <!-- <div class="grid gap-1 items-center"> -->
      <!--  <span>OKLAB:</span> -->
      <!--  <code>{{ oklab }}</code> -->
      <!-- </div> -->
    </div>
  </div>
</template>
