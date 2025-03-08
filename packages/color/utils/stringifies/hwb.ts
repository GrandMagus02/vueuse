import type { HWB } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringify } from './common'

/**
 * Stringify HWB object
 * @param value HWB object
 * @param options stringify options
 * @returns HWB string
 */
export function stringifyHwb(value: HWB, options: ColorStringifyOptions): string {
  const { h, w, b, a = 1 } = value

  const { alpha = true, percentage = false, precision } = options

  const hs = stringify(h, precision)
  let ws = stringify(w * 255, precision)
  let bs = stringify(b * 255, precision)

  if (percentage) {
    ws = stringify(w * 100, precision)
    bs = stringify(b * 100, precision)
  }

  let result = `hwb(`

  result += [hs, ws, bs].join(' ')

  if (alpha)
    result += ` / ${stringify(a)}`

  result += ')'

  return result
}
