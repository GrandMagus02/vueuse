import type { ColorFormat } from '../utils'
import { stringify } from '../utils'
import type { ParseColorOptions } from '../parseColor'
import { parseColor } from '../parseColor'
import type { ColorStringifyOptions } from '../utils/stringifies/common'
import { INVALID_COLOR_VALUE } from '../utils/errors'

export interface StringifyColorOptions<TFormat extends ColorFormat = ColorFormat> extends ParseColorOptions<TFormat>, ColorStringifyOptions {
}

/**
 * Stringify a color value.
 * @param value - The color value to stringify.
 * @param options - The options for the stringification.
 */
export function stringifyColor<TFormat extends ColorFormat = ColorFormat>(
  value: unknown,
  options: StringifyColorOptions<TFormat> = {},
): string | undefined {
  const parsed = parseColor<TFormat>(value, { format: options.format })
  if (!parsed) {
    if (options.fallback) {
      return stringifyColor(options.fallback, options)
    }
    if (options.throwOnError) {
      throw INVALID_COLOR_VALUE
    }
    return undefined
  }
  const { format = parsed.format } = options
  return stringify[format]?.(parsed.color, options)
}
