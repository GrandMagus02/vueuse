import type { Color, ColorFormat } from '../utils'
import { ensureColorFormat, parse } from '../utils'

/**
 * Convert a color from one output to another.
 * @param value - The color value to convert.
 * @param format - The format of the color.
 */
export function parseColor<TFormat extends ColorFormat>(
  value: any,
  format: TFormat,
): Color<TFormat | ColorFormat> {
  return parse[ensureColorFormat(format)](value)
}
