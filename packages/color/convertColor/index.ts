import type { ColorFormat, ColorFormatValue } from '../utils'
import { convert } from '../utils'
import { ensureColorFormat, roundColor } from '../utils/format'

export interface ConvertColorOptions {
  /**
   * Round the output values.
   */
  round?: boolean
  /**
   * The precision for rounding the output values.
   */
  precision?: number
}

/**
 * Convert a color from one format to another.
 * @param value - The color value to convert.
 * @param input - The format of the input color.
 * @param output - The format of the output color.
 * @param options - The options for the conversion.
 */
export function convertColor<TInput extends ColorFormat, TOutput extends ColorFormat>(
  value: any,
  input: TInput,
  output: TOutput,
  options: ConvertColorOptions = {},
): ColorFormatValue<TOutput> {
  const { round = false, precision } = options
  const convertedValue = convert[ensureColorFormat(input)][ensureColorFormat(output)](value) as ColorFormatValue<TOutput>
  return round ? roundColor(convertedValue, precision) : convertedValue
}
