---
category: '@Color'
---

# useColorProps

Reactive color properties like hue, saturation, lightness, alpha, and more.

## Usage

```ts
import { useColorProps } from '@vueuse/color'

const color = useColorProps('rgb(255, 0, 0)') // auto detect input output
console.log(color) // reactive { r: 1, g: 0, b: 0, h: 0, s: 1, l: 0.5, ... }
```

> **NOTE**: If you know what the input is, it's better to explicitly set it.

```ts
import { useColorProps } from '@vueuse/color'

const color = useColorProps({ h: 0, s: 0, l: 1, r: 1, g: 0, b: 0 }, {
  input: 'rgb', // explicitly set input
})
console.log(color) // will return red instead of white because the input is set to rgb
```

```ts
import { useColorProps } from '@vueuse/color'

const hex = useColor('#ff0000')
const color = useColorProps(hex, { input: 'hex' })
color.l -= 0.5 // modifing the value will update the original value
console.log(hex) // { r: 0.5, g: 0, b: 0, hex: '#800000' }
```
