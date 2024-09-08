import type { ColorFormat, ColorFormatValue } from '../utils'
import { parse } from '../utils'
import { ensureColorFormat } from '../utils/format'

/**
 * Convert a color from one format to another.
 * @param value - The color value to convert.
 * @param output - The format of the output color.
 */
export function parseColor<TOutput extends ColorFormat>(
  value: any,
  output: TOutput,
): ColorFormatValue<TOutput> {
  return parse[ensureColorFormat(output)](value) as ColorFormatValue<TOutput>
}
