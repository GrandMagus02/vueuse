---
category: '@Color'
---

# modifyColor

Modify color properties like hue, saturation, lightness, alpha, and more.

## Usage

```ts
import { Format, modifyColor, useColor } from '@vueuse/color'

const modified = modifyColor('rgb(255, 0, 0)', 'r', -0.2)
console.log(modified) // { r: 0.8, g: 0, b: 0 }
```

> **NOTE**: Before returning the modified color, the function normalizes the color values.

```ts
import { Channel, Format, modifyColor, useColor } from '@vueuse/color'

const rgb = useColor({ r: 1, g: 1, b: 1 }, { format: Format.RGB })
const modified = modifyColor(rgb, Channel.g, 0, { set: true }) // sets the green channel to 1
console.log(modified) // { r: 1, g: 0, b: 1 }
```
