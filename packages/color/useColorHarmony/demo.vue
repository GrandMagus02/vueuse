<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import { ColorFormat, type ColorFormatResult, Harmony } from '@vueuse/color'
import { useColorHarmony } from './index'

const h = ref(180)
const s = ref(100)
const l = ref(50)
const hsl = computed<ColorFormatResult<ColorFormat.HSL>>({
  get: () => ({ h: h.value, s: s.value, l: l.value, format: ColorFormat.HSL }),
  set: (value) => {
    h.value = value.h
    s.value = value.s
    l.value = value.l
  },
})

const harmonies = Object.values(Harmony)
const selectedHarmony = ref(Harmony.Complementary)
const harmonyOptions = ref({ mirror: true })

const harmonyColors = useColorHarmony<ColorFormat.HSL, Harmony>(hsl, selectedHarmony, harmonyOptions.value)
const colors = computed(() => [
  hsl.value,
  ...harmonyColors.value as ColorFormatResult<ColorFormat.HSL>[],
])
</script>

<template>
  <div class="flex gap-4">
    <ColorPicker v-model="hsl" :colors="colors" />
    <div class="flex flex-col gap-4">
      <label>
        <span class="mr-2">Harmony:</span>
        <select v-model="selectedHarmony">
          <option v-for="harmony in harmonies" :key="harmony" :value="harmony">
            {{ harmony[0].toUpperCase() + harmony.slice(1) }}
          </option>
        </select>
      </label>

      <div class="flex flex-col gap-2">
        <div v-for="c in colors" :key="c.h" class="flex gap-2 items-center">
          <div class="swatch" :style="{ backgroundColor: `hsl(${c.h}, ${c.s}%, ${c.l}%)` }"></div>
          <code>{{ Math.round(c.h) }}°, {{ Math.round(c.s) }}%, {{ Math.round(c.l) }}%</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swatch {
  width: 32px;
  border-radius: 8px;
  aspect-ratio: 1 / 1;
}
</style>
