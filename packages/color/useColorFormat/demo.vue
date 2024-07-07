<script setup lang="ts">
import { ref } from 'vue-demi'
import { ColorFormat } from '../utils'
import { useColorFormat } from '.'

const hsla = ref({ h: 180, s: 100, l: 50, a: 1, format: ColorFormat.HSLA })

const rgba = useColorFormat(hsla, ColorFormat.RGBA)
const rgbap = useColorFormat(hsla, ColorFormat.RGBAPercent)
const hexa = useColorFormat(hsla, ColorFormat.HEXA)
const hsva = useColorFormat(hsla, ColorFormat.HSVA)
</script>

<template>
  <div class="flex gap-4 items-start">
    <ColorPicker v-model="hsla" />
    <div class="grid grid-cols-1 gap-2 grow">
      <div class="grid grid-cols-[128px_auto] items-center">
        <span>HSLA:</span>
        <code>{{ `h: ${Math.round(hsla.h)}°; s: ${Math.round(hsla.s)}%; l: ${Math.round(hsla.l)}%; a: ${Math.round(hsla.a * 100)}%` }}</code>
      </div>
      <div class="grid grid-cols-[128px_auto] items-center">
        <span>RGBA:</span>
        <code>{{ `r: ${rgba.r}; g: ${rgba.g}; b: ${rgba.b}; a: ${Math.round(rgba.a * 100)}%` }}</code>
      </div>
      <div class="grid grid-cols-[128px_auto] items-center">
        <span>RGBA Percent:</span>
        <code>{{ `r: ${Math.round(rgbap.r * 100)}%; g: ${Math.round(rgbap.g * 100)}%; b: ${Math.round(rgbap.b * 100)}%; a: ${Math.round(rgbap.a * 100)}%` }}</code>
      </div>
      <div class="grid grid-cols-[128px_auto] items-center">
        <span>HEXA:</span>
        <code>{{ hexa.hexa }}</code>
      </div>
      <div class="grid grid-cols-[128px_auto] items-center">
        <span>HSVA:</span>
        <code>{{ `h: ${Math.round(hsva.h)}°; s: ${Math.round(hsva.s)}%; v: ${Math.round(hsva.v)}%; a: ${Math.round(hsva.a * 100)}%` }}</code>
      </div>
    </div>
  </div>
</template>
