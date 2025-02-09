---
category: '@Color'
---

# useColor

Converts color between different formats.

## Usage

```ts
import { useColor } from '@vueuse/color'

const rgb = useColor('rgb(255, 0, 0)') // auto detect input output
console.log(rgb) // reactive { r: 1, g: 0, b: 0 }
```

> **NOTE**: If you know what the input and output are, it's better to explicitly set them.

```ts
import { useColor } from '@vueuse/color'

const hex = useColor({ h: 1, s: 2, l: 1, r: 1, g: 0, b: 0 }, {
  input: 'rgb', // explicitly set input
  output: 'hex'
})
console.log(hex) // '#ff0000'
```

```ts
import { useColor } from '@vueuse/color'

const hex = useColor('#ff0000')
const hsl = useColor(hex, {
  output: 'hsl',
  precision: 2, // round the output values
})
console.log(hsl) // { h: 0, s: 1, l: 0.5 }

hsl.l = 1 // modifing the value will update the original value
console.log(hex) // { r: 1, g: 1, b: 1, hex: '#ffffff' }
```

```ts
import { ColorFormat, useColor } from '@vueuse/color'

const hsv = useColor({ r: 1, g: 0, b: 0 }, {
  output: ColorFormat.HSV, // use enum for output
  stringify: true, // stringify the output
})
console.log(hsv.value) // 'hsv(0, 100%, 50%)'
```
