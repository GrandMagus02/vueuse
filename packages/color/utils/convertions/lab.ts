import type { FormatLAB } from '@vueuse/color'
import { Format } from '@vueuse/color'
import { REF_X, REF_Y, REF_Z } from '../constants'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'
import { nonNullable } from './common'

export function labToLch(value: Partial<RelativeColor<FormatLAB>>, options?: NormalizeOptions) {
  const { l, a, b, A = 1 } = nonNullable(value, Format.LAB)

  const c = Math.sqrt(a ** 2 + b ** 2)

  let h = Math.atan2(a, b)
  if (h > 0) {
    h = (h / Math.PI) * 180
  }
  else {
    h = 360 - (Math.abs(h) / Math.PI) * 180
  }
  if (h === 360) {
    h = 0
  }
  else {
    h /= 360
  }

  return normalize.lch({ l, c, h, a: A }, options)
}

export function labToXyz(value: Partial<RelativeColor<FormatLAB>>, options?: NormalizeOptions) {
  let { l, a, b, A = 1 } = nonNullable(value, Format.LAB)

  l *= 100
  a *= 100
  b *= 100

  let y = (l + 16) / 116
  let x = a / 500 + y
  let z = y - b / 200

  const f = (t: number) => t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787

  x = REF_X * f(x) / 100
  y = REF_Y * f(y) / 100
  z = REF_Z * f(z) / 100

  return normalize.xyz({ x, y, z, a: A }, options)
}
