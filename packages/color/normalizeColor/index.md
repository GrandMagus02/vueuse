---
category: '@Color'
---

# normalizeColor

Normalize color values.

## Usage

```ts
import { normalizeColor } from '@vueuse/color'

const rgb = normalizeColor({ r: 1.2, g: -30, b: 0, }, 'rgb')
console.log(rgb) // { r: 1, g: 0, b: 0 }
```
