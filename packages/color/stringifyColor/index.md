---
category: '@Color'
---

# stringifyColor

Converts color to string.

## Usage

```ts
import { stringifyColor } from '@vueuse/color'

const rgb = stringifyColor({ r: 1, g: 0, b: 0, }, 'rgb')
console.log(rgb) // 'rgb(255, 0, 0)'
```
