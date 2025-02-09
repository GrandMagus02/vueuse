---
category: '@Color'
---

# harmonyColor

Converts color between different formats.

## Usage

```ts
import { harmonyColor } from '@vueuse/color'

const complementary = harmonyColor({ r: 1, g: 0, b: 0, }, 'rgb') // by default, it will return complementary color
console.log(complementary) // [{ r: 0, g: 1, b: 1 }]
```

```ts
import { Harmony, harmonyColor } from '@vueuse/color'

const analogous = harmonyColor({ r: 1, g: 0, b: 0 }, 'rgb', Harmony.ANALOGOUS, {
  count: 2, // for analogous it will return 2 colors
  angle: 60, // angle between colors
})
console.log(rgb) // [{ r: 1, g: 0.5, b: 0 }, { r: 1, g: 0, b: 0.5 }]
```
