---
category: '@Color'
---

# convertColor

Converts color between different formats.

## Usage

```ts
import { convertColor } from '@vueuse/color'

const hex = convertColor({ r: 1, g: 0, b: 0, }, 'rgb', 'hex')
console.log(hex) // '#ff0000'

const cmyk = convertColor('#d72828', 'hex', 'cmyk', {
  round: true,
  precision: 2,
})
console.log(rgb) // { "c": 0, "m": 0.8235, "y": 0.8235, "k": 0.15, "a": 1 }
```
