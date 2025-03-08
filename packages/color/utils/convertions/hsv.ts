import type { FormatHSV } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'
import { nonNullable } from './common'

export function hsvToRgb(value: Partial<RelativeColor<FormatHSV>>, options?: NormalizeOptions) {
  let { h, s, v, a = 1 } = nonNullable(value, Format.HSV)

  h /= 60

  const hi = Math.floor(h) % 6

  const f = h - Math.floor(h)
  const p = v * (1 - s)
  const q = v * (1 - (s * f))
  const t = v * (1 - (s * (1 - f)))

  switch (hi) {
    case 0: return normalize.rgb({ r: v, g: t, b: p, a }, options)
    case 1: return normalize.rgb({ r: q, g: v, b: p, a }, options)
    case 2: return normalize.rgb({ r: p, g: v, b: t, a }, options)
    case 3: return normalize.rgb({ r: p, g: q, b: v, a }, options)
    case 4: return normalize.rgb({ r: t, g: p, b: v, a }, options)
    case 5:
    default: return normalize.rgb({ r: v, g: p, b: q, a }, options)
  }
}

export function hsvToHsl(value: Partial<RelativeColor<FormatHSV>>, options?: NormalizeOptions) {
  const { h, s, v, a = 1 } = nonNullable(value, Format.HSV)
  const l = v * (1 - s / 2)
  const s2 = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)
  return normalize.hsl({ h, s: s2, l, a }, options)
}

export function hsvToHwb(value: Partial<RelativeColor<FormatHSV>>, options?: NormalizeOptions) {
  const { h, s, v, a = 1 } = nonNullable(value, Format.HSV)
  const w = (1 - s) * v
  const b = 1 - v
  return normalize.hwb({ h, w, b, a }, options)
}
