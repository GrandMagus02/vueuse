---
category: '@Color'
---

# useHarmony

Generate color harmonies like complementary, analogous, triadic, and more.

## Usage

```ts
import { useHarmony } from '@vueuse/color'

const colors = useHarmony('rgb(255, 0, 0)', 'complementary') // returns array of colors
console.log(colors.value[0]) // { r: 0, g: 1, b: 1 }
```

```ts
import { Harmony, useHarmony } from '@vueuse/color'

const analogous = useHarmony({ r: 1, g: 0, b: 0 }, Harmony.ANALOGOUS, {
  angle: 60, // angle between colors
})
console.log(hex.value) // '#ff0000'
```

```ts
import { useHarmony } from '@vueuse/color'

const hsl = useColor(hex, {
  output: 'hsl',
  precision: 2, // round the output values
})
console.log(hsl.value) // { h: 0, s: 1, l: 0.5 }
```

```ts
import { Format, useHarmony } from '@vueuse/color'

const hsv = useColor({ r: 1, g: 0, b: 0 }, {
  input: Format.RGB,
  output: Format.HSV,
  stringify: true,
})
console.log(hsv.value) // 'hsv(0, 100%, 100%)'
```
