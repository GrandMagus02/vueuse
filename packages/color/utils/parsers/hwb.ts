import type { HWB } from '@vueuse/color'
import { parseAngle, parseFloatOrPercent, parsePercent } from './common'

/**
 * Parse HWB string
 * Reference: https://www.w3.org/TR/css-color-4/#the-hwb-notation
 * @param value HWB string
 * @returns HWB object if valid, otherwise undefined
 */
export function parseHwbString(value: string): HWB | undefined {
  const input = value.trim().toLowerCase()

  const pattern = /^hwb\(\s*(\d+(?:\.\d+)?|none)\s+(\d+(?:\.\d+)?%?|none)\s+(\d+(?:\.\d+)?%?|none)(?:\s*\/\s*(\d+(?:\.\d+)?%?|none))?\s*\)$/i

  const match = pattern.exec(input)
  if (!match)
    return undefined

  const [, h, w, b, a = 'none'] = match

  return {
    h: h === 'none' ? 0 : parseAngle(h),
    w: w === 'none' ? 0 : parsePercent(w),
    b: b === 'none' ? 0 : parsePercent(b),
    a: a === 'none' ? 1 : parseFloatOrPercent(a),
  }
}
