---
category: '@Color'
---

# convertColor

Converts color between different formats.

## Usage

```ts
import { convertColor } from '@vueuse/color'

const hex = convertColor({ r: 1, g: 0, b: 0, }, 'hex')
console.log(hex) // { hex: 16711680, r: 1, g: 0, b: 0, a: 1 }
```

```ts
import { convertColor } from '@vueuse/color'

const cmyk = convertColor('#d72828', 'cmyk', {
  precision: 2, // if specified, will round the output values
})
console.log(cmyk) // { c: 0, m: 0.82, y: 0.82, k: 0.15, a: 1 }
```
