import type { ColorFormat } from '../utils'
import { ensureColorFormat, stringify } from '../utils'
import { determinate } from '../utils/determinate'

export interface StringifyColorOptions {
  /**
   * The delimiter for the output color.
   */
  delimiter?: ',' | ' '
  /**
   * Whether to use percentage values for alpha.
   */
  percentageAlpha?: boolean
}

/**
 * Convert a color from one output to another.
 * @param value - The color value to convert.
 * @param format - The output of the output color.
 * @param options - The options for the conversion.
 */
export function stringifyColor<TFormat extends ColorFormat>(
  value: any,
  format?: TFormat | string,
  options: StringifyColorOptions = {},
): string {
  const { delimiter = ',' } = options
  if (!format) {
    format = determinate(value).format
  }
  return stringify[ensureColorFormat(format)](value, delimiter)
}
