---
category: '@Color'
---

# determinateColor

Normalize color values.

## Usage

```ts
import { determinateColor } from '@vueuse/color'

const { value, format } = determinateColor({ r: 1, g: 0, b: 0 })
console.log(value) // { r: 1, g: 0, b: 0 }
console.log(format) // 'rgb'
```

```ts
import { determinateColor } from '@vueuse/color'

const { value, format } = determinateColor({ r: 1, g: 0, b: 0 })
console.log(value) // { r: 1, g: 0, b: 0 }
console.log(format) // 'rgb'
```
