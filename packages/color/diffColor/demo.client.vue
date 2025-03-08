<script setup lang="ts">
import { computed } from 'vue-demi'
import { useColor } from '@vueuse/color'
import { diffColor } from './index'

const color1 = useColor('rgb(255 0 0)')
const color2 = useColor('rgb(230 0 0)')

const diff = computed(() => diffColor(color1, color2, { method: 'deltaE2000' }))
</script>

<template>
  <div class="flex gap-4">
    <ColorPicker v-model="color1" />
    <div class="flex flex-col">
      Difference:
      <code>{{ diff.toFixed(6) }}</code>
    </div>
    <ColorPicker v-model="color2" />
  </div>
</template>
