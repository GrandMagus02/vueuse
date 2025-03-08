---
category: '@Color'
---

# useRGB

Returns a reactive object representing the HSL color. Shortcut for `useColor(color, 'hsl')`.

## Usage

```ts
import { useHSL } from '@vueuse/color'

const hsl = useHSL('hsl(0, 100%, 50%)')
console.log(hsl.value) // { h: 0, s: 1, l: 0.5 }
```

```ts
import { useHSL } from '@vueuse/color'

const hsl = useHSL('#ff0000')
console.log(hsl.value) // { h: 0, s: 1, l: 0.5 }
```
