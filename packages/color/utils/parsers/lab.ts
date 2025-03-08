import type { LAB } from '@vueuse/color'
import { parseFloatOrPercent, parseIntegerOrPercent } from './common'

/**
 * Parse LAB string
 * Reference: https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 * @param value LAB string
 * @returns LAB object if valid, otherwise undefined
 */
export function parseLabString(value: string): LAB | undefined {
  const input = value.trim().toLowerCase()
  const pattern = /^lab\(\s*(\d+(?:\.\d+)?%?|none)\s+(\d+(?:\.\d+)?%?|none)\s+(\d+(?:\.\d+)?%?|none)(?:\s*\/\s*(\d+(?:\.\d+)?%?|none))?\s*\)$/i
  const match = pattern.exec(input)
  if (!match)
    return undefined

  const [_, l, a, b, A = 'none'] = match

  return {
    l: l === 'none' ? 0 : parseIntegerOrPercent(l),
    a: a === 'none' ? 0 : parseIntegerOrPercent(a),
    b: b === 'none' ? 0 : parseIntegerOrPercent(b),
    A: A === 'none' ? 1 : parseFloatOrPercent(A),
  }
}
