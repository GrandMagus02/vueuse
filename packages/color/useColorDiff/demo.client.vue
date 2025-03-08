<script setup lang="ts">
import { stringifyColor, useColor } from '@vueuse/color'
import { computed, ref } from 'vue-demi'
import { useColorDiff } from './index'

const color1 = useColor('hsl(0 100 50)')
const color2 = useColor('hsl(0 100 50)')

const method = ref('euclidean')

const diff = useColorDiff(color1, color2, computed(() => ({ method: method.value })))
</script>

<template>
  <div class="flex gap-4">
    <ColorPicker v-model="color1" hide-variants />
    <div class="flex flex-col gap-3">
      <label>
        Method:
        <select v-model="method">
          <option value="euclidean">Euclidean</option>
          <option value="manhattan">Manhattan</option>
          <option value="deltaE2000">DeltaE2000</option>
        </select>
      </label>
      <code>{{ diff.toFixed(6) }}</code>
      <div class="flex rounded-lg overflow-hidden">
        <div :style="{ backgroundColor: stringifyColor(color1) }" class="flex-1 aspect-square" />
        <div :style="{ backgroundColor: stringifyColor(color2) }" class="flex-1 aspect-square" />
      </div>
    </div>
    <ColorPicker v-model="color2" hide-variants />
  </div>
</template>
