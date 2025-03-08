---
category: '@Color'
---

# useLightness

Reactive lightness value of a color.

## Usage

```ts
import { useLightness } from '@vueuse/color'

const l1 = useLightness('red')
console.log(l1.value) // 0.5
```

```ts
import { useColor, useLightness } from '@vueuse/color'

const c1 = useColor('red')
const l2 = useLightness(c1)

l2.value = 0.8 // modifing the value will update the original value
console.log(c1.value) // { r: 1, g: 0.2, b: 0.2, hex: '#ff3333' }
```

> **NOTE**: If you change the value to `1.0` or `0.0` the color will lose its **hue** and become **white** or **black**. This can be changed by providing a `origin` value which is the color to be used as a reference for the **hue**, **saturation** and other values.

```ts
import { useColor, useLightness } from '@vueuse/color'

const c1 = useColor('red')
const l1 = useLightness(c1, { origin: 'blue' })

l1.value = 1.0 // makes the color white
console.log(c1.value) // { r: 1, g: 1, b: 1, hex: '#ffffff' }

l1.value = 0.5 // makes the color blue
console.log(c1.value) // { r: 0, g: 0, b: 0.5, hex: '#000080' }
```

> **NOTE**: Providing the input color as origin can lead to unexpected results.

```ts
import { useColor, useLightness } from '@vueuse/color'

const c1 = useColor('red')
const l1 = useLightness(c1, { origin: c1 }) // don't do this
```
