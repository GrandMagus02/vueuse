import type { LRGB } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringify } from './common'

/**
 * Stringify LRGB object
 * @param value LRGB object
 * @param options stringify options
 * @returns LRGB string
 */
export function stringifyLRgb(value: LRGB, options: ColorStringifyOptions): string {
  const { r, g, b, a = 1 } = value

  const { alpha = true, percentage = false, precision } = options

  let rs = stringify(r, precision)
  let gs = stringify(g, precision)
  let bs = stringify(b, precision)

  if (percentage) {
    rs = stringify(r * 100, precision)
    gs = stringify(g * 100, precision)
    bs = stringify(b * 100, precision)
  }

  let result = `color(srgb-linear `

  result += [rs, gs, bs].join(' ')

  if (alpha) {
    result += ` / ${stringify(a)}`
  }

  result += ')'

  return result
}
