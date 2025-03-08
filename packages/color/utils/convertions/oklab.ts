import type { FormatOKLAB } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import { OKLAB_TO_LMS_MATRIX } from '../constants'
import type { RelativeColor } from '../format'
import { matVecMult, nonNullable } from './common'

export function okLabToOkLch(value: Partial<RelativeColor<FormatOKLAB>>, options?: NormalizeOptions) {
  const { l, a, b, A = 1 } = nonNullable(value, Format.OKLAB)
  const c = Math.sqrt(a * a + b * b)
  const h = Math.atan2(b, a)
  return normalize.oklch({ l, c, h, a: A }, options)
}

export function okLabToLms(value: Partial<RelativeColor<FormatOKLAB>>, options?: NormalizeOptions) {
  const { l, a, b, A = 1 } = nonNullable(value, Format.OKLAB)
  const [lmsL, lmsM, lmsS] = matVecMult(OKLAB_TO_LMS_MATRIX, [l, a, b]).map(v => v ** 3)
  return normalize.lms({ l: lmsL, m: lmsM, s: lmsS, a: A }, options)
}
