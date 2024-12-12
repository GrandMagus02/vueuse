<script setup lang="ts">
import { modifyColor, stringifyColor, useColor } from '@vueuse/color'

const rgba = useColor('rgba(255, 0, 0, 1)', { input: 'rgba' })

function update(val: any) {
  Object.assign(rgba, modifyColor(rgba, 'rgba', val))
}
</script>

<template>
  <div class="flex gap-4">
    <div class="flex justify-end w-20 h-20 rounded-lg" :style="{ backgroundColor: stringifyColor(rgba, 'rgba') }" />
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Lightness:
        </div>
        <div class="flex">
          <button @click="update({ lightness: 0.05 })">
            +
          </button>
          <button @click="update({ lightness: -0.05 })">
            -
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Saturation:
        </div>
        <div class="flex">
          <button @click="update({ saturation: 0.05 })">
            +
          </button>
          <button @click="update({ saturation: -0.05 })">
            -
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Red:
        </div>
        <div class="flex">
          <button @click="update({ red: 0.05 })">
            +
          </button>
          <button @click="update({ red: -0.05 })">
            -
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Green:
        </div>
        <div class="flex">
          <button @click="update({ green: 0.05 })">
            +
          </button>
          <button @click="update({ green: -0.05 })">
            -
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex justify-end w-20">
          Blue:
        </div>
        <div class="flex">
          <button @click="update({ blue: 0.05 })">
            +
          </button>
          <button @click="update({ blue: -0.05 })">
            -
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
