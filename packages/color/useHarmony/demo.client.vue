<script setup lang="ts">
import type { ColorHarmony, RGBA } from '@vueuse/color'
import { stringifyColor } from '@vueuse/color'
import { computed, ref, toValue } from 'vue-demi'
import { useHarmony } from './index'

const value = ref({
  r: 1,
  g: 0,
  b: 0,
  a: 1,
})
const valueString = computed(() => stringifyColor(value.value, 'rgba'))
const valueFormat = 'rgba'
const complementaryColors = useHarmony(value, valueFormat, Harmony.COMPLEMENTARY)
const splitComplementaryColors = useHarmony(value, valueFormat, Harmony.SPLIT_COMPLEMENTARY)
const analogousColors = useHarmony(value, valueFormat, Harmony.ANALOGOUS)
const squareColors = useHarmony(value, valueFormat, Harmony.SQUARE)
const triadicColors = useHarmony(value, valueFormat, Harmony.TRIADIC)
const tetradicColors = useHarmony(value, valueFormat, Harmony.TETRADIC)
const monochromaticColors = useHarmony(value, valueFormat, Harmony.MONOCHROMATIC)
const shadesColors = useHarmony(value, valueFormat, Harmony.SHADES)
const tintsColors = useHarmony(value, valueFormat, Harmony.TINTS)

const harmony = ref<ColorHarmony>(Harmony.COMPLEMENTARY)
const colors = computed<RGBA[]>(() => {
  switch (harmony.value) {
    case Harmony.COMPLEMENTARY:
      return toValue(complementaryColors)
    case Harmony.SPLIT_COMPLEMENTARY:
      return toValue(splitComplementaryColors)
    case Harmony.ANALOGOUS:
      return toValue(analogousColors)
    case Harmony.SQUARE:
      return toValue(squareColors)
    case Harmony.TRIADIC:
      return toValue(triadicColors)
    case Harmony.TETRADIC:
      return toValue(tetradicColors)
    case Harmony.MONOCHROMATIC:
      return toValue(monochromaticColors)
    case Harmony.SHADES:
      return toValue(shadesColors)
    case Harmony.TINTS:
      return toValue(tintsColors)
    default:
      return []
  }
})

const stringifyColors = (colors: any[], format: string) => colors.map(color => stringifyColor(color, format))
</script>

<template>
  <div class="flex gap-4 items-start">
    <ColorPicker v-model="value" format="rgba" :colors="colors" />
    <div class="grid grid-cols-1 gap-2 grow">
      <div class="grid gap-1 items-center">
        <select v-model="harmony" class="select">
          <option v-for="[key, value] in Object.entries(Harmony)" :key="key" :value="value">
            {{ key }}
          </option>
        </select>
        <div class="flex gap-1 items-center">
          <span class="w-1.5em h-1.5em rounded inline-block" :style="{ background: valueString }" />
          <code>{{ valueString }}</code>
        </div>
        <div v-for="c in stringifyColors(colors, 'rgba')" class="flex gap-1 items-center">
          <span class="w-1.5em h-1.5em rounded inline-block" :style="{ background: c }" />
          <code>{{ c }}</code>
        </div>
      </div>
    </div>
  </div>
</template>
