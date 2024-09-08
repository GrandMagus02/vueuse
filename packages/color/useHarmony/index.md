---
category: '@Color'
---

# useHarmony

## Usage

```ts
import { ColorHarmony, useHarmony } from '@vueuse/color'

const complementary = useHarmony('rgb(255, 0, 0)', 'rgb')
console.log(rgb.value) // { r: 1, g: 0, b: 0 }

const hex = useColor({ r: 1, g: 0, b: 0 }, 'rgb', {
  output: 'hex'
})
console.log(hex.value) // '#ff0000'

const hsl = useColor(hex, 'hex', {
  output: 'hsl',
  round: true,
  precision: 2,
})
console.log(hsl.value) // { h: 0, s: 1, l: 0.5 }

const hsv = useColor({ r: 1, g: 0, b: 0 }, Format.RGB, {
  output: Format.HSV,
  stringify: true,
})
console.log(hsv.value) // 'hsv(0, 100%, 100%)'
```
