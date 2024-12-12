---
category: '@Color'
---

# useHarmony

Generate color harmonies like complementary, analogous, triadic, and more.

## Usage

```ts
import { useHarmony } from '@vueuse/color'

const complementary = useHarmony('rgb(255, 0, 0)', 'complementary', {

})
console.log(complementary.value) // { r: 0, g: 1, b: 1 }
```

```ts
import { useHarmony } from '@vueuse/color'

const hex = useHarmony({ r: 1, g: 0, b: 0 }, 'rgb', {
  output: 'hex'
})
console.log(hex.value) // '#ff0000'
```

```ts
import { useHarmony } from '@vueuse/color'

const hsl = useColor(hex, 'hex', {
  output: 'hsl',
  round: true,
  precision: 2,
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
