---
category: '@Color'
---

# useColorHarmony

Reactive color harmony generator.

## Usage

```ts
import { ref } from 'vue'
import { Harmony, useColorHarmony } from '@vueuse/color'

const hex = ref('#ff0000')
const complementary = useColorHarmony(hex, Harmony.Complementary)  // '#00ffff'
```

For some harmony types, you can pass an additional `options` object to customize the behavior.

```ts
import { Harmony, useColorHarmony } from '@vueuse/color'

const tertiary = useColorHarmony(hex, Harmony.Complementary, {
  format: 'rgb',  // result will be in RGB format (works for all harmony types)
})
```

```ts
import { Harmony, useColorHarmony } from '@vueuse/color'

const analogous = useColorHarmony(hex, Harmony.Analogous, {
  degree: 5,  // angle between colors
  count: 4,  // number of colors to generate for each side
})
```
