import type { FormatHEX } from '@vueuse/color'
import { Format, fallback } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'
import { ColorKeyword } from '../keywords'
import { parseHexString } from '../parsers/hex'
import { euclideanRgb } from '../difference'
import { nonNullable } from './common'

export function hexToRgb(value: Partial<RelativeColor<FormatHEX>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.HEX)
  return normalize.rgb({ r, g, b, a }, options)
}

export function hexToKeyword(value: Partial<RelativeColor<FormatHEX>>, options?: NormalizeOptions) {
  const input = nonNullable(value, Format.HEX)

  let min = Infinity
  let minHex = input
  for (const val of Object.values(ColorKeyword)) {
    const hex = parseHexString(val)
    if (!hex)
      continue

    const rgb = hexToRgb(input, options)
    const diff = euclideanRgb(
      { ...fallback.rgb, r: hex.r, g: hex.g, b: hex.b, a: hex.a },
      { r: rgb.r ?? fallback.rgb.r, g: rgb.g ?? fallback.rgb.g, b: rgb.b ?? fallback.rgb.b, a: rgb.a ?? fallback.rgb.a },
    )
    if (diff < min) {
      min = diff
      minHex = hex
    }
  }
  return normalize.keyword(minHex, options)
}
