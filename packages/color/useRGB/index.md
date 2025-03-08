---
category: '@Color'
---

# useRGB

Returns a reactive object representing the RGB color. Shortcut for `useColor(color, 'rgb')`.

## Usage

```ts
import { useRGB } from '@vueuse/color'

const rgb = useRGB('rgb(255 0 0)')
console.log(rgb.value) // { r: 1, g: 0, b: 0 }
```

```ts
import { useRGB } from '@vueuse/color'

const rgb = useRGB('#ff0000')
console.log(rgb.value) // { r: 1, g: 0, b: 0 }
```
