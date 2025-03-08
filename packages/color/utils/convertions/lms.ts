import type { FormatLMS } from '@vueuse/color'
import { Format } from '@vueuse/color'
import { LMS_TO_OKLAB_MATRIX, LMS_TO_XYZ_MATRIX } from '../constants'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'
import { matVecMult, nonNullable } from './common'

export function lmsToOkLab(value: Partial<RelativeColor<FormatLMS>>, options?: NormalizeOptions) {
  const { l, m, s, a = 1 } = nonNullable(value, Format.LMS)

  const f = (n: number) => n ** (1 / 3)

  const [lok, aok, bok] = matVecMult(LMS_TO_OKLAB_MATRIX, [f(l), f(m), f(s)])

  return normalize.lab({ l: lok, a: aok, b: bok, A: a }, options)
}

export function lmsToXyz(value: Partial<RelativeColor<FormatLMS>>, options?: NormalizeOptions) {
  const { l, m, s, a = 1 } = nonNullable(value, Format.LMS)

  const [x, y, z] = matVecMult(LMS_TO_XYZ_MATRIX, [l, m, s])

  return normalize.xyz({ x, y, z, a }, options)
}
