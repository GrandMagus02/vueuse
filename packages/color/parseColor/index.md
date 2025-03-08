---
category: '@Color'
---

# parseColor

Parses color string into object.

## Usage

```ts
import { parseColor } from '@vueuse/color'

const c1 = parseColor('rgb(255, 64, 0)')
console.log(c1.value) // { r: 1, g: 0.25, b: 0, a: 1 }

const c2 = parseColor('rgba(255 64 0 / 0.5)', 'rgb')
console.log(c2.value) // { r: 1, g: 0.25, b: 0, a: 0.5 }

const c3 = parseColor([270 / 360, 1, 1], 'hsl')
console.log(c3.value) // { h: 0.75, s: 1, l: 1, a: 1 }

const c4 = parseColor({ h: 270 / 360, s: 1, v: 1 }, 'hsv')
console.log(c4.value) // { h: 0.75, s: 1, v: 1, a: 1 }
```

> **NOTE**: When input is not a valid color, it will return undefined. You can change this behavior by providing a `throwOnError` option.

```ts
import { parseColor } from '@vueuse/color'

const color = parseColor('rgb(1,00 1,00 1,00)', {
  throwOnError: true
}) // Error: Invalid color input
```
