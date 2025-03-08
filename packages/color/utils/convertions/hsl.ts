import type { FormatHSL } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'
import { nonNullable } from './common'

export function hslToRgb(value: Partial<RelativeColor<FormatHSL>>, options?: NormalizeOptions) {
  const { h, s, l, a = 1 } = nonNullable(value, Format.HSL)

  let r = l
  let g = l
  let b = l

  if (s !== 0 && l !== 0 && l !== 1) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    const f = (n: number) => {
      if (n < 0)
        n += 1
      if (n > 1)
        n -= 1
      if (n < 1 / 6)
        return p + (q - p) * 6 * n
      if (n < 1 / 2)
        return q
      if (n < 2 / 3)
        return p + (q - p) * (2 / 3 - n) * 6
      return p
    }

    r = f(h + 1 / 3)
    g = f(h)
    b = f(h - 1 / 3)
  }

  return normalize.rgb({ r, g, b, a }, options)
}

export function hslToHsv(value: Partial<RelativeColor<FormatHSL>>, options?: NormalizeOptions) {
  const { h, s, l, a = 1 } = nonNullable(value, Format.HSL)
  const v = l + s * Math.min(l, 1 - l)
  const s2 = v === 0 ? 0 : 2 * (1 - l / v)
  return normalize.hsv({ h, s: s2, v, a }, options)
}

export function hslToHwb(value: Partial<RelativeColor<FormatHSL>>, options?: NormalizeOptions) {
  const { h, s, l, a = 1 } = nonNullable(value, Format.HSL)
  const w = l * (1 - s)
  const b = 1 - l
  return normalize.hwb({ h, w, b, a }, options)
}
