---
category: '@Color'
alias: harmony
---

# colorHarmony

Color harmony generator.

## Usage

```ts
import { ref } from 'vue'
import { Harmony, colorHarmony } from '@vueuse/color'

const hex = ref('#ff0000')
const complementary = colorHarmony(hex, Harmony.Complementary)  // '#00ffff'
```

```ts
import { ColorFormat, colorHarmony, Harmony } from '@vueuse/color'

const shades = colorHarmony('rgb(0, 255, 0)', Harmony.Shades, {
  count: 4,
  step: 20,
  format: ColorFormat.HEX,
})  // ['#33ff33', '#66ff66', '#99ff99', '#ccffcc']
```
