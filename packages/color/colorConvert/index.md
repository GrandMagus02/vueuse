---
category: '@Color'
alias: convert
---

# colorConvert

Converts color between different formats.

## Usage

```ts
import { ref } from 'vue'
import { ColorFormat, colorConvert } from '@vueuse/color'

const hex = ref('#ff0000')
const rgb = colorConvert(hex.value, ColorFormat.RGB)  // { r: 255, g: 0, b: 0, format: 'rgb' }
```

```ts
import { ColorFormat, colorConvert } from '@vueuse/color'

const rgb = colorConvert('#0f0f', {
  fromFormat: ColorFormat.HEXA,
  toFormat: ColorFormat.RGBA,
})  // { r: 0, g: 255, b: 0, a: 1, format: 'rgb' }
```
