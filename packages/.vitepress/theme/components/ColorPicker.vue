<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import { ColorFormat, type ColorFormatResult, colorConvert } from '@vueuse/color'
import { watchIgnorable } from '@vueuse/shared'

const props = withDefaults(defineProps<{
  modelValue: ColorFormatResult<ColorFormat>
  colors?: ColorFormatResult<ColorFormat>[]
}>(), {
  colors: () => [],
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: ColorFormatResult<ColorFormat>): void
}>()

const inputFormat = computed<ColorFormat>(() => props.modelValue?.format ?? ColorFormat.HEX)

const h = ref(180)
const s = ref(100)
const l = ref(50)
const a = ref(1)

const hsla = computed<ColorFormatResult<ColorFormat.HSLA>>({
  get: () => {
    const color = colorConvert(props.modelValue, ColorFormat.HSLA)
    return {
      h: color.h,
      s: color.s,
      l: color.l,
      a: color.a,
      format: ColorFormat.HSLA,
    } as ColorFormatResult<ColorFormat.HSLA>
  },
  set: (value) => {
    const color = colorConvert(value, inputFormat.value)
    emits('update:modelValue', color)
  },
})

const { ignoreUpdates } = watchIgnorable(() => hsla, () => {
  h.value = hsla.value.h
  s.value = hsla.value.s
  l.value = hsla.value.l
  // a.value = hsla.value.a
}, { immediate: true })

const hslaColors = computed<ColorFormatResult<ColorFormat.HSLA>[]>(() => [
  ...props.colors,
  hsla.value,
].map((color) => {
  return colorConvert(color, ColorFormat.HSLA)
}))

const showLines = computed(() => {
  const uniqueColors = new Set(hslaColors.value.map(color => `${color.h}${color.s}`))
  return uniqueColors.size > 1
})

const wheel = ref<SVGElement | null>(null)
const colorWheelStyle = computed(() => {
  const { r, g, b, a: alpha } = colorConvert({ ...hsla.value, h: 0, s: 0 }, ColorFormat.RGBA)
  return {
    background: `conic-gradient(
        rgba(255, 0, 0, ${alpha}),
        rgba(255, 255, 0, ${alpha}),
        rgba(0, 255, 0, ${alpha}),
        rgba(0, 255, 255, ${alpha}),
        rgba(0, 0, 255, ${alpha}),
        rgba(255, 0, 255, ${alpha}),
        rgba(255, 0, 0, ${alpha})
      ),
      radial-gradient(
        circle,
        rgba(${r}, ${g}, ${b}, ${alpha}) 0%,
        transparent 75%
      )`,
    backgroundBlendMode: 'saturation',
  }
})

function onInputHue(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number.parseFloat(target.value)
  ignoreUpdates(() => {
    hsla.value = { ...hsla.value, h: value }
  })
}

function onInputSaturation(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number.parseFloat(target.value)
  ignoreUpdates(() => {
    hsla.value = { ...hsla.value, s: value }
  })
}

function onInputLightness(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number.parseFloat(target.value)
  ignoreUpdates(() => {
    hsla.value = { ...hsla.value, l: value }
  })
}

function onInputAlpha(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number.parseFloat(target.value)
  ignoreUpdates(() => {
    a.value = value
    hsla.value = { ...hsla.value, a: value }
  })
}

function calculateAngle(x: number, y: number) {
  const angle = Math.atan2(y, x) * (180 / Math.PI) + 90
  return (angle + 360) % 360
}

function onMouseMove(e: MouseEvent) {
  e.preventDefault()
  if (!wheel.value)
    return
  const rect = wheel.value.getBoundingClientRect()
  const xCenter = rect.left + rect.width / 2
  const yCenter = rect.top + rect.height / 2
  const x = e.clientX - xCenter
  const y = e.clientY - yCenter
  const h = calculateAngle(x, y)

  const s = Math.min(100, Math.hypot(x, y) / Math.min(rect.width / 2, rect.height / 2) * 100)

  hsla.value = { ...hsla.value, h, s }
}

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  if (!wheel.value)
    return
  onMouseMove(e)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp, { once: true })
}

function onMouseUp() {
  window.removeEventListener('mousemove', onMouseMove)
}
</script>

<template>
  <div class="color-picker">
    <div class="color-wheel-wrapper">
      <svg
        ref="wheel" class="color-wheel" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        :style="colorWheelStyle"
        @mousedown="onMouseDown"
      >
        <g v-for="(color, i) in hslaColors" :key="`${color.h}${color.s}${color.l}${i}`">
          <line
            v-if="showLines"
            x1="50" y1="50" :x2="50 + color.s * 0.5 * Math.sin(color.h * Math.PI / 180)"
            :y2="50 + color.s * 0.5 * -Math.cos(color.h * Math.PI / 180)" stroke="white"
          />
          <circle
            :cx="50 + color.s * 0.5 * Math.sin(color.h * Math.PI / 180)"
            :cy="50 + color.s * 0.5 * -Math.cos(color.h * Math.PI / 180)"
            r="5"
            :fill="`hsla(${color.h}, ${color.s}%, ${color.l}%)`"
            stroke="white"
            stroke-width="1"
          />
        </g>
      </svg>
    </div>

    <label class="w-full flex flex-col">
      <span>Hue: {{ Math.round(hsla.h) }}°</span>
      <input :value="hsla.h" class="h-4" type="range" min="0" max="360" step="1" @input="onInputHue">
    </label>

    <label class="w-full flex flex-col">
      <span>Saturation: {{ Math.round(hsla.s) }}%</span>
      <input :value="hsla.s" class="h-4" type="range" min="0" max="100" step="1" @input="onInputSaturation">
    </label>

    <label class="w-full flex flex-col">
      <span>Lightness: {{ Math.round(hsla.l) }}%</span>
      <input :value="hsla.l" class="h-4" type="range" min="0" max="100" step="1" @input="onInputLightness">
    </label>

    <label class="w-full flex flex-col">
      <span>Alpha: {{ Math.round(hsla.a * 100) }}%</span>
      <input :value="hsla.a" class="h-4" type="range" min="0" max="1" step="0.01" @input="onInputAlpha">
    </label>
  </div>
</template>

<style>
.color-picker {
  display: flex;
  justify-content: end;
  flex-direction: column;
  position: relative;
  width: 200px;
  max-width: 200px;
}

.color-wheel-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--vp-c-border);
  background-color: #fff;
  background-image: repeating-linear-gradient(
      45deg,
      #aaa 25%,
      transparent 25%,
      transparent 75%,
      #aaa 75%,
      #aaa
    ),
    repeating-linear-gradient(
      45deg,
      #aaa 25%,
      #fff 25%,
      #fff 75%,
      #aaa 75%,
      #aaa
    );
  background-position:
    0 0,
    10px 10px;
  background-size: 20px 20px;
}

.color-wheel {
  width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
}
</style>
