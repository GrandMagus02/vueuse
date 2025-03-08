import type { RGB } from '@vueuse/color'
import { parse255IntegerOrPercent, parseFloatOrPercent } from './common'

/**
 * Parse RGB string
 * Reference: https://www.w3.org/TR/css-color-4/#rgb-functions
 * Supports both comma-separated and space-separated syntaxes, and accepts
 * numbers with or without a leading zero (e.g. `.5` or `0.5`).
 * @param value RGB string
 * @returns RGB object if valid, otherwise undefined
 */
export function parseRgbString(value: string): RGB | undefined {
  const input = value.trim().toLowerCase()

  // Plain regex patterns as literals:
  const patterns = [
    // Comma-separated rgba(), optional alpha.
    /^rgba\(\s*((?:\d+(?:\.\d+)?|\.\d+)%?)\s*,\s*((?:\d+(?:\.\d+)?|\.\d+)%?)\s*,\s*((?:\d+(?:\.\d+)?|\.\d+)%?)(?:\s*,\s*(\d+(?:\.\d+)?|\.\d+))?\s*\)$/i,
    // Space-separated rgba(), optional alpha with slash.
    /^rgba\(\s*((?:\d+(?:\.\d+)?|\.\d+)%?|none)\s+((?:\d+(?:\.\d+)?|\.\d+)%?|none)\s+((?:\d+(?:\.\d+)?|\.\d+)%?|none)(?:\s*\/\s*((?:\d+(?:\.\d+)?|\.\d+)%?|none))?\s*\)$/i,
    // Comma-separated rgb(), optional alpha.
    /^rgb\(\s*((?:\d+(?:\.\d+)?|\.\d+)%?)\s*,\s*((?:\d+(?:\.\d+)?|\.\d+)%?)\s*,\s*((?:\d+(?:\.\d+)?|\.\d+)%?)(?:\s*,\s*(\d+(?:\.\d+)?|\.\d+))?\s*\)$/i,
    // Space-separated rgb(), optional alpha with slash.
    /^rgb\(\s*((?:\d+(?:\.\d+)?|\.\d+)%?|none)\s+((?:\d+(?:\.\d+)?|\.\d+)%?|none)\s+((?:\d+(?:\.\d+)?|\.\d+)%?|none)(?:\s*\/\s*((?:\d+(?:\.\d+)?|\.\d+)%?|none))?\s*\)$/i,
  ]

  const match = patterns.find(pattern => pattern.test(input))?.exec(input)
  if (!match)
    return undefined

  // Default alpha to '1' if not provided.
  const [, r, g, b, a = '1'] = match

  return {
    r: r === 'none' ? 0 : parse255IntegerOrPercent(r),
    g: g === 'none' ? 0 : parse255IntegerOrPercent(g),
    b: b === 'none' ? 0 : parse255IntegerOrPercent(b),
    a: a === 'none' ? 1 : parseFloatOrPercent(a),
  }
}
