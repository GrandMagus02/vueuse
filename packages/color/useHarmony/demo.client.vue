<script setup lang="ts">
import type { ColorHarmony, RGBA } from '@vueuse/color'
import { Harmony, stringifyColor } from '@vueuse/color'
import { computed, ref, toValue } from 'vue-demi'
import { useHarmony } from './index'

const value = ref({
  r: 1,
  g: 0,
  b: 0,
  a: 1,
})

const angle = ref(20)
const count = ref(2)
const step = ref(0.1)

const harmony = ref<ColorHarmony>(Harmony.COMPLEMENTARY)

const showAngle = computed(() => harmony.value === Harmony.SPLIT_COMPLEMENTARY || harmony.value === Harmony.ANALOGOUS || harmony.value === Harmony.TETRADIC)
const showCount = computed(() => harmony.value === Harmony.SPLIT_COMPLEMENTARY || harmony.value === Harmony.ANALOGOUS || harmony.value === Harmony.SQUARE || harmony.value === Harmony.TETRADIC || harmony.value === Harmony.MONOCHROMATIC || harmony.value === Harmony.SHADES || harmony.value === Harmony.TINTS)
const showStep = computed(() => harmony.value === Harmony.MONOCHROMATIC || harmony.value === Harmony.SHADES || harmony.value === Harmony.TINTS)

const valueString = computed(() => stringifyColor(value.value, 'rgba'))
const valueFormat = 'rgba'
const complementaryColors = useHarmony(value, Harmony.COMPLEMENTARY, { output: valueFormat })
const splitComplementaryColors = useHarmony(value, Harmony.SPLIT_COMPLEMENTARY, { output: valueFormat, angle, count })
const analogousColors = useHarmony(value, Harmony.ANALOGOUS, { output: valueFormat, angle, count })
const squareColors = useHarmony(value, Harmony.SQUARE, { output: valueFormat })
const triadicColors = useHarmony(value, Harmony.TRIADIC, { output: valueFormat })
const tetradicColors = useHarmony(value, Harmony.TETRADIC, { output: valueFormat, angle })
const monochromaticColors = useHarmony(value, Harmony.MONOCHROMATIC, { output: valueFormat, count, step })
const shadesColors = useHarmony(value, Harmony.SHADES, { output: valueFormat, count, step })
const tintsColors = useHarmony(value, Harmony.TINTS, { output: valueFormat, count, step })

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
        <template v-if="showAngle">
          <span>Angle: {{ angle }}°</span>
          <input v-model.number="angle" type="range" min="0" max="360" step="1">
        </template>
        <template v-if="showCount">
          <span>Count: {{ count }}</span>
          <input v-model.number="count" type="range" min="2" max="6" step="1">
        </template>
        <template v-if="showStep">
          <span>Step: {{ step * 100 }}%</span>
          <input v-model.number="step" type="range" min="0.05" max="0.15" step="0.01">
        </template>
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
