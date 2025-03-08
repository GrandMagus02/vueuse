import type { Color, ColorChannel, ColorFormat } from '../utils'
import { convert } from '../utils'
import { parseColor } from '../parseColor'
import { formatFromChannel } from '../utils/format'

export interface ModifyColorOptions<TFormat extends ColorFormat = ColorFormat> {
  /**
   * Define which format to use for modification.
   */
  format?: TFormat
  /**
   * Set the value instead of adding it.
   */
  set?: boolean
}

/**
 * Modify a color value.
 * @param value - The color value to modify.
 * @param channel - The channel to modify.
 * @param channelValue - The channel value to modify. The value is from 0 to 1.
 * @param options - The options for the modification.
 */
export function modifyColor<TModify extends ColorFormat = ColorFormat, TFormat extends ColorFormat = ColorFormat>(
  value: unknown | Color<TFormat>,
  channel: ColorChannel<TModify>,
  channelValue: number,
  options: ModifyColorOptions<TModify> = {},
): Color<TFormat> {
  const {
    format = formatFromChannel(channel),
    set = false,
  } = options

  const parsed = parseColor<TFormat>(value)

  const converted = convert[parsed.format][format](parsed.color, {}) as Color<TModify>

  const modified = convert[format][parsed.format]({
    ...converted,
    [channel]: set ? channelValue : (converted[channel] as number) + channelValue,
  }, {})

  return modified as Color<TFormat>
}
