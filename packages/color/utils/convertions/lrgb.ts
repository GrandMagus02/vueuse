import type { FormatLRGB } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import {
  LRGB_TO_XYZ_MATRIX,
  SRGB_GAMMA,
  SRGB_LINEAR_THRESHOLD,
  SRGB_OFFSET,
  SRGB_SCALE,
  SRGB_SCALE_FACTOR,
} from '../constants'
import type { RelativeColor } from '../format'
import { matVecMult, nonNullable } from './common'

export function lrgbToRgb(value: Partial<RelativeColor<FormatLRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.LRGB)

  const f = (c: number): number => c > SRGB_LINEAR_THRESHOLD
    ? SRGB_SCALE * c ** (1 / SRGB_GAMMA) - SRGB_OFFSET
    : c * SRGB_SCALE_FACTOR

  return normalize.rgb({ r: f(r), g: f(g), b: f(b), a }, options)
}

export function lrgbToXyz(value: Partial<RelativeColor<FormatLRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.LRGB)
  const [x, y, z] = matVecMult(LRGB_TO_XYZ_MATRIX, [r, g, b])
  return normalize.xyz({ x, y, z, a }, options)
}
