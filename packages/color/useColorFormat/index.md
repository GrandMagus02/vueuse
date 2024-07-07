---
category: '@Color'
---

# useColorFormat

Reactive color format conversion.

## Usage

```ts
import { ref } from 'vue'
import { ColorFormat, useColorFormat } from '@vueuse/color'

const hex = ref('#ff0000')
const rgb = useColorFormat(hex, ColorFormat.RGB)  // { r: 255, g: 0, b: 0, format: 'rgb' }
const hsl = useColorFormat(rgb, ColorFormat.HSL)  // { h: 0, s: 100, l: 50, format: 'hsl' }
```

If the input color is invalid, it will return a default color as black.
Default color can be customized by passing `defaultValue` to options.
Default value also applies to the case when `immediate: false` is set.

```ts
import { ColorFormat, useColorFormat } from '@vueuse/color'

const hsv = useColorFormat('invalid', ColorFormat.HSV, {
  defaultValue: { r: 255, g: 255, b: 255, a: 1, format: 'rgba' }, 
  immediate: false,
})  // { h: 0, s: 0, v: 100, a: 100, format: 'hsv' }
```
