import type { MaybeRefOrGetter } from '@vueuse/shared'
import { toValue } from '@vueuse/shared'
import type { ColorFormat, ColorFormatResult } from '../utils'
import { determinateValue } from '../utils/determinant'
import { convertValue } from '../utils/converter'
import type { ColorFormatString } from '../utils/formats/base'

export interface ConvertColorOptions<TToFormat extends ColorFormat, TFromFormat extends ColorFormat> {
  /**
   * Format for the color.
   */
  toFormat: MaybeRefOrGetter<TToFormat>
  /**
   * Format for the color to convert from.
   */
  fromFormat?: MaybeRefOrGetter<TFromFormat>
}

/**
 * Convert a color from one format to another.
 *
 * @see https://vueuse.org/colorConvert
 */
export function colorConvert<TFormat extends ColorFormat, TFromFormat extends ColorFormat>(
  value: MaybeRefOrGetter<string | ColorFormatResult<TFromFormat>>,
  options: MaybeRefOrGetter<ColorFormatString | TFormat | ConvertColorOptions<TFormat, TFromFormat>>,
): ColorFormatResult<TFormat> {
  const optionsValue = toValue(options)
  const targetFormat = typeof optionsValue === 'object' ? toValue(optionsValue.toFormat) : optionsValue
  const inputFormat = typeof optionsValue === 'object' ? toValue(optionsValue.fromFormat) : undefined
  const {
    value: extractedValue,
    format: extractedFormat,
  } = determinateValue(toValue(value), inputFormat)
  return convertValue(extractedValue, extractedFormat, targetFormat) as ColorFormatResult<TFormat>
}

// alias
export { colorConvert as convert }
