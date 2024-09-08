<script setup lang="ts">
import { useColor } from '@vueuse/color'
import { ref } from 'vue-demi'

const value = ref({
  r: 1,
  g: 0,
  b: 0,
  a: 1,
})
const valueFormat = 'rgba'
const hsla = useColor(value, valueFormat, { output: 'hsla', stringify: true })
const rgba = useColor(value, valueFormat, { output: 'rgba', stringify: true })
const hexa = useColor(value, valueFormat, { output: 'hexa', stringify: true })
const hsva = useColor(value, valueFormat, { output: 'hsva', stringify: true })
const cmyka = useColor(value, valueFormat, { output: 'cmyka', stringify: true })
</script>

<template>
  <div class="flex gap-4 items-start">
    <ColorPicker v-model="value" format="rgba" />
    <div class="grid grid-cols-1 gap-2 grow">
      <div class="grid gap-1 items-center">
        <span>HSLA:</span>
        <code>{{ hsla }}</code>
      </div>
      <div class="grid gap-1 items-center">
        <span>RGBA:</span>
        <code>{{ rgba }}</code>
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
    </div>
  </div>
</template>
