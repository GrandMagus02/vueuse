import type { FormatXYZ } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import { REF_X, REF_Y, REF_Z, XYZ_TO_LMS_MATRIX, XYZ_TO_LRGB_MATRIX } from '../constants'
import type { RelativeColor } from '../format'
import { matVecMult, nonNullable } from './common'

export function xyzToRgbL(value: Partial<RelativeColor<FormatXYZ>>, options?: NormalizeOptions) {
  const { x, y, z, a = 1 } = nonNullable(value, Format.XYZ)
  const [r, g, b] = matVecMult(XYZ_TO_LRGB_MATRIX, [x, y, z])
  return normalize.lrgb({ r, g, b, a }, options)
}

export function xyzToLab(value: Partial<RelativeColor<FormatXYZ>>, options?: NormalizeOptions) {
  let { x, y, z, a: A = 1 } = nonNullable(value, Format.XYZ)

  x *= 100
  y *= 100
  z *= 100

  x /= REF_X
  y /= REF_Y
  z /= REF_Z

  const f = (n: number) => n > 0.008856 ? n ** (1 / 3) : (7.787 * n) + (16 / 116)

  x = f(x)
  y = f(y)
  z = f(z)

  let l = (116 * y) - 16
  let a = 500 * (x - y)
  let b = 200 * (y - z)

  l /= 100
  a /= 100
  b /= 100

  l = Math.max(0, Math.min(l, 1))
  a = Math.max(0, Math.min(a, 1))
  b = Math.max(0, Math.min(b, 1))

  return normalize.lab({ l, a, b, A }, options)
}

export function xyzToLms(value: Partial<RelativeColor<FormatXYZ>>, options?: NormalizeOptions) {
  const { x, y, z, a = 1 } = nonNullable(value, Format.XYZ)
  const [l, m, s] = matVecMult(XYZ_TO_LMS_MATRIX, [x, y, z])
  return normalize.lms({ l, m, s, a }, options)
}
