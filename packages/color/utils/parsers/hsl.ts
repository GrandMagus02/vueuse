import type { HSL } from '@vueuse/color'
import { parseAngle, parseFloatOrPercent, parsePercent } from './common'

/**
 * Parse HSL string
 * Reference: https://www.w3.org/TR/css-color-4/#the-hsl-notation
 * @param value HSL string
 * @returns HSL object if valid, otherwise undefined
 */
export function parseHslString(value: string): HSL | undefined {
  const input = value.trim().toLowerCase()

  const patterns = [
    /^hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)$/i,
    /^hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)$/i,
    /^hsla\(\s*(\d+(?:\.\d+)?|none)\s+(\d+(?:\.\d+)?%?|none)\s+(\d+(?:\.\d+)?%?|none)(?:\s*\/\s*(\d+(?:\.\d+)?%?|none))?\s*\)$/i,
    /^hsl\(\s*(\d+(?:\.\d+)?|none)\s+(\d+(?:\.\d+)?%?|none)\s+(\d+(?:\.\d+)?%?|none)(?:\s*\/\s*(\d+(?:\.\d+)?%?|none))?\s*\)$/i,
  ]

  const match = patterns.find(pattern => pattern.test(input))?.exec(input)
  if (!match)
    return undefined

  const [, h, s, l, a = 'none'] = match

  return {
    h: h === 'none' ? 0 : parseAngle(h),
    s: s === 'none' ? 0 : parsePercent(s),
    l: l === 'none' ? 0 : parsePercent(l),
    a: a === 'none' ? 1 : parseFloatOrPercent(a),
  }
}
