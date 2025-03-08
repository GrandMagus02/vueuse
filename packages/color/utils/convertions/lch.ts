import type { FormatLCH } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'
import { nonNullable } from './common'

export function lchToLab(value: Partial<RelativeColor<FormatLCH>>, options?: NormalizeOptions) {
  const { l, c, h, a: A = 1 } = nonNullable(value, Format.LCH)

  const a = Math.cos(h * 0.01745329251) * c
  const b = Math.sin(h * 0.01745329251) * c

  return normalize.lab({ l, a, b, A }, options)
}
