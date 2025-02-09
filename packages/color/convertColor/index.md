---
category: '@Color'
---

# convertColor

Converts color between different formats.

## Usage

```ts
import { convertColor } from '@vueuse/color'

const hex = convertColor({ r: 1, g: 0, b: 0, }, 'rgb', 'hex')
console.log(hex) // { r: 255, g: 0, b: 0, hex: '#ff0000' }
```

```ts
import { convertColor } from '@vueuse/color'

const cmyk = convertColor('#d72828', 'hex', 'cmyk', {
  precision: 2, // if specified, will round the output values
})
console.log(cmyk) // { "c": 0, "m": 0.82, "y": 0.82, "k": 0.15 }
```
