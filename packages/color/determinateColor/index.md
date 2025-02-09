---
category: '@Color'
---

# determinateColor

Normalize color values.

## Usage

```ts
import { determinateColor } from '@vueuse/color'

const { value, format } = determinateColor({ r: 1, g: 0, b: 0 })
console.log(value) // { r: 1, g: 0, b: 0, a: 1 }
console.log(format) // 'rgba'
```

> **NOTE** The format will always prioritize the alpha channel. If the alpha channel is not explicitly defined, it defaults to 1.

```ts
import { determinateColor } from '@vueuse/color'

const { value, format } = determinateColor({ r: 1, g: 0, b: 0, a: null })
console.log(value) // { r: 1, g: 0, b: 0 }
console.log(format) // 'rgb'
```

> **NOTE** If the alpha channel is defined, and it's not a number, it will ignore it.
