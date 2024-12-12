import type { Color, ColorFormat } from '../utils'
import { ensureColorFormat, normalize, roundColor } from '../utils'

export interface NormalizeColorOptions {
  /**
   * The precision for rounding the output values.
   * @default undefined
   */
  precision?: number
}

/**
 * Normalize a color value to a specific format.
 * @param value - The color value to normalize.
 * @param format - The output of the output color.
 * @param options - The options for the normalization.
 */
export function normalizeColor<TFormat extends ColorFormat>(
  value: Color<TFormat>,
  format: TFormat | string,
  options: NormalizeColorOptions = {},
): Color<TFormat> {
  const { precision } = options
  const result = normalize[ensureColorFormat(format)](value) as Color<TFormat>
  if (precision !== undefined) {
    return roundColor(result, precision)
  }
  return result
}
