import type { LCH } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringify } from './common'

/**
 * Stringify LCH object
 * @param value LCH object
 * @param options stringify options
 * @returns LCH string
 */
export function stringifyLch(value: LCH, options: ColorStringifyOptions): string {
  const { l, c, h, a = 1 } = value

  const { alpha = true, percentage = false, precision } = options

  let ls = stringify(l * 255, precision)
  let cs = stringify(c * 255, precision)
  const hs = stringify(h * 360, precision)

  if (percentage) {
    ls = stringify(l * 100, precision)
    cs = stringify(c * 100, precision)
  }

  let result = `lch(`

  result += [ls, cs, hs].join(' ')

  if (alpha) {
    result += ` / ${stringify(a)}`
  }

  result += ')'

  return result
}
