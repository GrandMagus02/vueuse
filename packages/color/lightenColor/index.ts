import type { Color, ColorChannel, ColorFormat } from '../utils'
import { Format } from '../utils'
import type { ModifyColorOptions } from '../modifyColor'
import { modifyColor } from '../modifyColor'
import type { LightnessChannelFormat } from '../utils/properties/lightness'
import { lightnessChannelFromFormat } from '../utils/properties/lightness'

export interface LightenColorOptions<TFormat extends LightnessChannelFormat = LightnessChannelFormat> extends ModifyColorOptions {
  /**
   * Define which format to use for lightness calculation.
   * @default 'hsl'
   */
  format?: TFormat
}

/**
 * Lighten a color value.
 * @param value - The color value to lighten.
 * @param lightness - The lightness value to modify.
 * @param options - The options for the lightening.
 */
export function lightenColor<TModify extends LightnessChannelFormat = LightnessChannelFormat, TFormat extends ColorFormat = ColorFormat>(
  value: unknown | Color<TFormat>,
  lightness: number,
  options: LightenColorOptions<TModify> = {},
): Color<TFormat> {
  const {
    format = Format.HSL as TModify,
    set = false,
  } = options

  const channel = lightnessChannelFromFormat(format) as ColorChannel<TModify>

  return modifyColor<TModify, TFormat>(value, channel, lightness, { format, set })
}
