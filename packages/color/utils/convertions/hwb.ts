import type { FormatHWB } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { RelativeColor } from '../format'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import { nonNullable } from './common'

export function hwbToRgb(value: Partial<RelativeColor<FormatHWB>>, options?: NormalizeOptions) {
  const { h, w: wh, b: bl, a = 1 } = nonNullable(value, Format.HWB)

  const ratio = wh + bl

  if (ratio >= 1) {
    const gr = wh / (wh + bl)
    return normalize.rgb({ r: gr, g: gr, b: gr, a }, options)
  }

  const v = 1 - bl
  const i = Math.floor(6 * h)
  let f = 6 * h - i

  if ((i & 0x01) !== 0) {
    f = 1 - f
  }

  const n = wh + f * (v - wh)

  switch (i) {
    case 1: return normalize.rgb({ r: n, g: v, b: wh, a }, options)
    case 2: return normalize.rgb({ r: wh, g: v, b: n, a }, options)
    case 3: return normalize.rgb({ r: wh, g: n, b: v, a }, options)
    case 4: return normalize.rgb({ r: n, g: wh, b: v, a }, options)
    case 5: return normalize.rgb({ r: v, g: wh, b: n, a }, options)
    case 6:
    case 0:
    default: return normalize.rgb({ r: v, g: n, b: wh, a }, options)
  }
}

export function hwbToHsv(value: Partial<RelativeColor<FormatHWB>>, options?: NormalizeOptions) {
  const { h, w, b, a = 1 } = nonNullable(value, Format.HWB)
  const v = 1 - b
  const s = v === 0 ? 0 : 1 - w / v
  return normalize.hsv({ h, s, v, a }, options)
}
