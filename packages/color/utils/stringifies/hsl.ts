import type { HSL } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringify } from './common'

/**
 * Stringify HSL object
 * @param value HSL object
 * @param options stringify options
 * @returns HSL string
 */
export function stringifyHsl(value: HSL, options: ColorStringifyOptions): string {
  const { h, s, l, a = 1 } = value

  const { syntax = 'modern', alpha = true, percentage = false, precision } = options

  const hs = stringify(h, precision)
  let ss = stringify(s * 255, precision)
  let ls = stringify(l * 255, precision)

  if (percentage || syntax === 'legacy') {
    ss = stringify(s * 100, precision)
    ls = stringify(l * 100, precision)
  }

  const prefix = alpha ? 'hsla' : 'hsl'

  let result = `${prefix}(`

  result += [hs, ss, ls].join(syntax === 'modern' ? ' ' : ', ')

  if (alpha)
    result += syntax === 'modern' ? ` / ${stringify(a)}` : `, ${stringify(a)}`

  result += ')'

  return result
}
