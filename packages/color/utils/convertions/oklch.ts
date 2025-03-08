import type { FormatOKLCH } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'
import { nonNullable } from './common'

export function okLchToOkLab(value: Partial<RelativeColor<FormatOKLCH>>, options?: NormalizeOptions) {
  const { l, c, h, a: A = 1 } = nonNullable(value, Format.OKLCH)
  const a = c * Math.cos(h)
  const b = c * Math.sin(h)
  return normalize.oklab({ l, a, b, A }, options)
}
