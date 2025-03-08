import type { RGB } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringify } from './common'

/**
 * Stringify RGB object
 * @param value RGB object
 * @param options stringify options
 * @returns RGB string
 */
export function stringifyRgb(value: RGB, options: ColorStringifyOptions): string {
  const { r, g, b, a = 1 } = value

  const { syntax = 'modern', alpha = true, percentage = false, precision } = options

  let rs = stringify(r * 255, precision)
  let gs = stringify(g * 255, precision)
  let bs = stringify(b * 255, precision)

  if (percentage) {
    rs = stringify(r * 100, precision)
    gs = stringify(g * 100, precision)
    bs = stringify(b * 100, precision)
  }

  const prefix = alpha ? 'rgba' : 'rgb'

  let result = `${prefix}(`

  result += [rs, gs, bs].join(syntax === 'modern' ? ' ' : ', ')

  if (alpha) {
    result += syntax === 'modern' ? ` / ${stringify(a)}` : `, ${stringify(a)}`
  }

  result += ')'

  return result
}
