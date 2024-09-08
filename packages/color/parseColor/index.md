---
category: '@Color'
---

# parseColor

Parses color string into object.

## Usage

```ts
import { parseColor } from '@vueuse/color'

const rgb = parseColor('rgb(255, 64, 0)', 'rgb')
console.log(rgb) // { r: 1, g: 0.25, b: 0 }

const rgba = parseColor('rgba(255 64 0 / 0.5)', 'rgba')
console.log(rgba) // { r: 1, g: 0.25, b: 0, a: 0.5 }

const hsl = parseColor([270, 1, 1], 'hsl')
console.log(hsl) // { h: 270, s: 1, l: 1 }

const hsv = parseColor('hsv(270, 100%, 100%)', 'hsv')
console.log(hsv) // { h: 270, s: 1, v: 1 }
```
