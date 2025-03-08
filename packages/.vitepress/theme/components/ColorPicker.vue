<script setup lang="ts" generic="T extends ColorFormat">
import type { MaybeRefOrGetter } from 'vue-demi'
import { computed, ref } from 'vue-demi'
import type { ColorFormat, RelativeColor } from '@vueuse/color'
import { Format, convertColor, stringifyColor, useColor } from '@vueuse/color'
import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue: MaybeRefOrGetter<RelativeColor<T>>
  colors?: RelativeColor<T>[]
  hidePreview?: boolean
  hideVariants?: boolean
  hideAlpha?: boolean
}>(), {
  colors: () => [],
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: RelativeColor<T>): void
}>()

const model = useVModel(props, 'modelValue', emits)

const hsla = useColor(model.value, Format.HSL)
const rgba = useColor(model.value, Format.RGB)
const hslaColors = computed(() => [
  ...props.colors.map(c => convertColor(c, Format.HSL)),
  hsla.value,
])

const showLines = computed(() => {
  const uniqueColors = new Set(hslaColors.value.map(c => `${Math.round(c.h)};${Math.round(c.s * 100)}`))
  return uniqueColors.size > 1
})

const wheel = ref<SVGElement | null>(null)
const colorWheelStyle = computed(() => {
  return {
    '--alpha': hsla.value.a,
    '--lightness': hsla.value.l,
  }
})

const variants = [
  'hsla',
  'rgba',
]
const selectedVariant = ref(variants[0])

function onInputAlpha(event: Event) {
  const target = event.target as HTMLInputElement
  hsla.value.a = Number.parseFloat(target.value)
}

function calculateAngle(x: number, y: number): number {
  return ((Math.atan2(y, x) + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI)) / (2 * Math.PI)
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

  const s = Math.min(1, Math.hypot(x, y) / Math.min(rect.width / 2, rect.height / 2))

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
  <div class="color-picker" :style="colorWheelStyle">
    <div class="color-wheel-wrapper">
      <div class="color-wheel-gray" />
      <div class="color-wheel-white" />
      <div class="color-wheel-black" />
      <div class="color-wheel-hue" />
      <svg
        ref="wheel" class="color-wheel" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        @mousedown="onMouseDown"
      >
        <g v-for="(color, i) in hslaColors" :key="i">
          <line
            v-if="showLines"
            x1="50" y1="50" :x2="50 + (color.s * 100) * 0.5 * Math.sin(color.h * 360 * Math.PI / 180)"
            :y2="50 + (color.s * 100) * 0.5 * -Math.cos(color.h * 360 * Math.PI / 180)"
            :stroke="`hsla(255, 0%, ${color.l > 0.5 ? 0 : 100}%, 1)`"
          />
          <circle
            v-if="i === hslaColors.length - 1"
            :cx="50 + (color.s * 100) * 0.5 * Math.sin(color.h * 360 * Math.PI / 180)"
            :cy="50 + (color.s * 100) * 0.5 * -Math.cos(color.h * 360 * Math.PI / 180)"
            r="8"
            fill="transparent"
            :stroke="`hsla(255, 0%, ${color.l > 0.5 ? 0 : 100}%, .75)`"
            stroke-width=".5"
          />
          <circle
            :cx="50 + (color.s * 100) * 0.5 * Math.sin(color.h * 360 * Math.PI / 180)"
            :cy="50 + (color.s * 100) * 0.5 * -Math.cos(color.h * 360 * Math.PI / 180)"
            r="6"
            :fill="`hsla(${color.h * 360}, ${color.s * 100}%, ${color.l * 100}%)`"
            :stroke="`hsla(255, 0%, ${color.l > 0.5 ? 0 : 100}%, 1)`"
            stroke-width="1"
          />
        </g>
      </svg>
    </div>

    <label v-if="!hideVariants" class="w-full flex flex-col">
      <span>Variant:</span>
      <span class="flex w-full">
        <select v-model="selectedVariant" class="select w-full">
          <option v-for="key in variants" :key="key" :value="key">
            {{ key }}
          </option>
        </select>
        <span class="color-current" :style="{ '--current-color': stringifyColor(rgba) }" />
      </span>
    </label>

    <template v-if="selectedVariant === 'hsla'">
      <label class="w-full flex flex-col">
        <span>Hue: {{ Math.round(hsla.h * 360) }}°</span>
        <input v-model.number="hsla.h" class="h-4" type="range" min="0" max="1" step="0.01">
      </label>

      <label class="w-full flex flex-col">
        <span>Saturation: {{ Math.round(hsla.s * 100) }}%</span>
        <input v-model.number="hsla.s" class="h-4" type="range" min="0" max="1" step="0.01">
      </label>

      <label class="w-full flex flex-col">
        <span>Lightness: {{ Math.round(hsla.l * 100) }}%</span>
        <input v-model.number="hsla.l" class="h-4" type="range" min="0" max="1" step="0.01">
      </label>
    </template>

    <template v-else-if="selectedVariant === 'rgba'">
      <label class="w-full flex flex-col">
        <span>Red: {{ Math.round(rgba.r * 255) }}</span>
        <input v-model.number="rgba.r" class="h-4" type="range" min="0" max="1" step="0.01">
      </label>

      <label class="w-full flex flex-col">
        <span>Green: {{ Math.round(rgba.g * 255) }}</span>
        <input v-model.number="rgba.g" class="h-4" type="range" min="0" max="1" step="0.01">
      </label>

      <label class="w-full flex flex-col">
        <span>Blue: {{ Math.round(rgba.b * 255) }}</span>
        <input v-model.number="rgba.b" class="h-4" type="range" min="0" max="1" step="0.01">
      </label>
    </template>

    <label v-if="!hideAlpha" class="w-full flex flex-col">
      <span>Alpha: {{ Math.round((hsla.a ?? 1) * 100) }}%</span>
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
  width: 160px;
  max-width: 160px;
  --alpha: 1;
  --lightness: 0.5;
  --current-color: hsla(0, 100%, 50%, 1);
}

.color-current {
  position: relative;
  aspect-ratio: 1 / 1;
  height: 2.5em;
  margin: 0.5rem 0 0.5rem 0.5rem;
  border-radius: 4px;
}

.color-current:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: var(--current-color);
}

.color-wheel-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--vp-c-border);
  background-color: #fff;
}

.color-wheel-wrapper,
.color-current {
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
  position: relative;
  z-index: 2;
}

.color-wheel-hue,
.color-wheel-gray,
.color-wheel-white,
.color-wheel-black {
  border-radius: 50%;
}

.color-wheel-hue {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
      circle at 50% 0,
      rgba(255, 0, 0, var(--alpha, 1)),
      rgba(242, 13, 13, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(230, 26, 26, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(204, 51, 51, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(166, 89, 89, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 85.35533905932738% 14.644660940672622%,
      rgba(255, 191, 0, var(--alpha, 1)),
      rgba(242, 185, 13, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(230, 179, 26, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(204, 166, 51, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(166, 147, 89, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 100% 50%,
      rgba(128, 255, 0, var(--alpha, 1)),
      rgba(128, 242, 13, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(128, 230, 26, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(128, 204, 51, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(128, 166, 89, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 85.35533905932738% 85.35533905932738%,
      rgba(0, 255, 64, var(--alpha, 1)),
      rgba(13, 242, 70, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(26, 230, 77, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(51, 204, 89, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(89, 166, 108, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 50.00000000000001% 100%,
      rgba(0, 255, 255, var(--alpha, 1)),
      rgba(13, 242, 242, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(26, 230, 230, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(51, 204, 204, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(89, 166, 166, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 14.64466094067263% 85.35533905932738%,
      rgba(0, 64, 255, var(--alpha, 1)),
      rgba(13, 70, 242, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(26, 77, 230, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(51, 89, 204, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(89, 108, 166, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 0 50.00000000000001%,
      rgba(128, 0, 255, var(--alpha, 1)),
      rgba(128, 13, 242, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(128, 26, 230, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(128, 51, 204, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(128, 89, 166, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 14.644660940672615% 14.64466094067263%,
      rgba(255, 0, 191, var(--alpha, 1)),
      rgba(242, 13, 185, calc(var(--alpha, 1) * 0.8)) 10%,
      rgba(230, 26, 179, calc(var(--alpha, 1) * 0.6)) 20%,
      rgba(204, 51, 166, calc(var(--alpha, 1) * 0.4)) 30%,
      rgba(166, 89, 147, calc(var(--alpha, 1) * 0.2)) 40%,
      hsla(0, 0%, 50%, 0) 50%
    );
}

.color-wheel-gray {
  position: absolute;
  inset: 0;
  background: rgba(85, 85, 85, var(--alpha, 1));
}

.color-wheel-white {
  position: absolute;
  inset: 0;
  mix-blend-mode: lighten;
  z-index: 1;
  pointer-events: none;
  background: rgba(255, 255, 255, calc(var(--lightness, 0.5) * 2 - 1));
}

.color-wheel-black {
  position: absolute;
  inset: 0;
  mix-blend-mode: darken;
  z-index: 1;
  pointer-events: none;
  background: rgba(0, 0, 0, calc(1 - var(--lightness, 0.5) * 2));
}
</style>
