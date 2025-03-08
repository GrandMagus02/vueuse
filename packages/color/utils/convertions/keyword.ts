import type { CMYK } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import { nonNullable } from './common'

export function keywordToRgb(value: Partial<CMYK>, options?: NormalizeOptions) {
  const { c, m, y, k, a = 1 } = nonNullable(value, Format.CMYK)
  const r = (1 - c) * (1 - k)
  const g = (1 - m) * (1 - k)
  const b = (1 - y) * (1 - k)
  return normalize.rgb({ r, g, b, a }, options)
}
