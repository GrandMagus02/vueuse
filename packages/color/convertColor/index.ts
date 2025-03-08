import { toValue } from 'vue-demi'
import type { Color, ColorFormat } from '../utils'
import { convert } from '../utils'
import type { ParseColorOptions } from '../parseColor'
import { parseColor } from '../parseColor'
import { INVALID_COLOR_VALUE } from '../utils/errors'

export interface ConvertColorOptions<TOutput extends ColorFormat = ColorFormat, TInput extends ColorFormat = ColorFormat, TError extends boolean = true> extends ParseColorOptions<TInput, Color<TOutput>, TError> {
  /**
   * The precision for rounding the output values.
   */
  precision?: number
}

/**
 * Convert a color from one output to another.
 * @param value - The color value to convert.
 * @param format - The output format to convert to.
 * @param options - The options for the conversion.
 */
export function convertColor<TOutput extends ColorFormat, TInput extends ColorFormat = ColorFormat>(value: Color<TInput> | string | unknown, format: TOutput, options?: ConvertColorOptions<TOutput, TInput>): Color<TOutput>
export function convertColor<TOutput extends ColorFormat, TInput extends ColorFormat = ColorFormat>(value: Color<TInput> | string | unknown, format: TOutput, options?: ConvertColorOptions<TOutput, TInput, false>): Color<TOutput> | undefined
export function convertColor<TOutput extends ColorFormat, TInput extends ColorFormat = ColorFormat>(
  value: unknown,
  format: TOutput,
  options: ConvertColorOptions<TOutput, TInput, boolean> = {},
): Color<TOutput> | undefined {
  const { fallback, throwOnError, precision } = options

  const parsed = parseColor<TInput>(value, { format: options.format })
  if (!parsed) {
    if (fallback) {
      return fallback
    }
    if (throwOnError) {
      throw INVALID_COLOR_VALUE
    }
    return undefined
  }
  return convert[parsed.format][toValue(format)](parsed.color, { precision }) as Color<TOutput>
}
