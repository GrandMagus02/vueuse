---
category: '@Color'
---

# useRGB

Returns a reactive object representing the Linear RGB color. Shortcut for `useColor(color, 'lrgb')`.

## Usage

```ts
import { useLRGB } from '@vueuse/color'

const lrgb = useLRGB('rgb(255 0 0)')
console.log(lrgb.value) // { r: 0.41245643908609523, g: 0.192617269073754, b: 0.0193339 }
```

```ts
import { useLRGB } from '@vueuse/color'

const lrgb = useLRGB('#ff0000')
console.log(lrgb.value) // { r: 0.41245643908609523, g: 0.192617269073754, b: 0.0193339 }
```
