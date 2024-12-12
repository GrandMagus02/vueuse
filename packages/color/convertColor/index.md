---
category: '@Color'
---

# convertColor

Converts color between different formats.

## Usage

```ts
import { convertColor } from '@vueuse/color'

// Example 1: Convert HEX to RGB
const hex = convertColor({ r: 1, g: 0, b: 0, }, 'rgb', 'hex')
console.log(hex) // '#ff0000'

// Example 2: Convert HEX to CMYK with precision of 2
const cmyk = convertColor('#d72828', 'hex', 'cmyk', {
  precision: 2, // if specified, will round the output values
})
console.log(cmyk) // { "c": 0, "m": 0.82, "y": 0.82, "k": 0.15, "a": 1 }
```
