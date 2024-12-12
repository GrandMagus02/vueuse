---
category: '@Color'
---

# modifyColor

Modify color properties like hue, saturation, lightness, alpha, and more.

## Usage

```ts
import { Format, modifyColor, useColor } from '@vueuse/color'

const rgb = useColor({ r: 1, g: 0, b: 0 }, { input: Format.RGB })
const modifiedRGB = modifyColor(rgb, Format.RGB, {
  lightness: -0.8 // takes lightness down by 80%
})
console.log(modifiedRGB) // { r: 0.2, g: 0, b: 0 }
```

> **NOTE**: Before returning the modified color, the function normalizes the color values.

```ts
import { Format, modifyColor, useColor } from '@vueuse/color'

const rgb = useColor({ r: 1, g: 1, b: 1 }, { input: Format.RGB })
const modifiedRGB = modifyColor(rgb, Format.RGB, {
  lightness: 0.5,
  set: true // sets the lightness to 50%
})
console.log(modifiedRGB) // { r: 0.5, g: 0.5, b: 0.5 }
```
