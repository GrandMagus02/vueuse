import type { Color, ColorFormat } from '../utils'
import { convert, ensureColorFormat, roundColor } from '../utils'

export interface ConvertColorOptions {
  /**
   * The precision for rounding the output values.
   * @default undefined
   */
  precision?: number
}

/**
 * Convert a color from one output to another.
 * @param value - The color value to convert.
 * @param input - The output of the input color.
 * @param output - The output of the output color.
 * @param options - The options for the conversion.
 */
export function convertColor<TInput extends ColorFormat, TOutput extends ColorFormat>(
  value: any,
  input: TInput,
  output: TOutput,
  options: ConvertColorOptions = {},
): Color<TOutput> {
  const { precision } = options
  let result = convert[ensureColorFormat<TInput>(input)][ensureColorFormat<TOutput>(output)](value)
  if (precision !== undefined) {
    result = roundColor(result, precision)
  }
  return result as Color<TOutput>
}
