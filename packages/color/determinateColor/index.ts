import { toValue } from 'vue-demi'
import type { Color, ColorFormatLower } from '../utils'
import { determinate } from '../utils'

/**
 * Determine the color format of a color value.
 * @param value - The color value to normalize.
 */
export function determinateColor(
  value: any,
): { value: Color<ColorFormatLower>, format: ColorFormatLower } {
  return determinate(toValue(value))
}
