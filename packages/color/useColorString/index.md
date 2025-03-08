---
category: '@Color'
---

# useColorString

Shorthand for `useColor(color, 'rgb', { stringify: true })`.

## Usage

```ts
import { useColorString } from '@vueuse/color'

const color = useColorString('red', 'hsl')
console.log(color.value) // 'hsl(0, 100%, 50%)'
```
