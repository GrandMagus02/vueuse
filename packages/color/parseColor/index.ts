import { toValue } from 'vue-demi'
import type { Color, ColorFormat } from '../utils'
import { determinate, fallback, normalize, parse } from '../utils'
import { INVALID_COLOR_VALUE } from '../utils/errors'

export interface ParseColorOptions<TFormat extends ColorFormat = ColorFormat, TFallback extends Color = Color<TFormat>, TError extends boolean = false> {
  /**
   * Define which format to use for parsing.
   */
  format?: TFormat
  /**
   * Fallback value if the format is not determined.
   */
  fallback?: TFallback
  /**
   * Whether to throw an error when the color value is invalid.
   * @default false
   */
  throwOnError?: TError
}

interface ParseColorReturn<TFormat extends ColorFormat> { color: Color<TFormat>, format: TFormat }

/**
 * Convert a color from one output to another.
 * @param value - The color value to convert.
 * @param options - The options for the conversion.
 */
export function parseColor<TFormat extends ColorFormat>(value: unknown, options?: ParseColorOptions<TFormat, Color<TFormat>, true>): ParseColorReturn<TFormat>
export function parseColor<TFormat extends ColorFormat>(value: unknown, options?: ParseColorOptions<TFormat>): ParseColorReturn<TFormat> | undefined
export function parseColor<TFormat extends ColorFormat>(
  value: unknown,
  options: ParseColorOptions<TFormat, Color<TFormat>, boolean> = {},
): ParseColorReturn<TFormat> | undefined {
  let color: Color<TFormat> | undefined
  let format: TFormat | undefined = options.format

  if (format) {
    color = parse[format](value) as Color<TFormat> | undefined
  }
  else {
    const determined = determinate<TFormat>(toValue(value))
    format = determined.format
    color = determined.color
  }

  if (!color) {
    if (options.fallback) {
      return determinate<TFormat>(options.fallback)
    }
    if (options.throwOnError) {
      throw INVALID_COLOR_VALUE
    }
    return undefined
  }

  return { color: { ...fallback[format], ...normalize[format](color) }, format }
}
