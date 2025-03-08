import type { MaybeRefOrGetter } from 'vue-demi'
import { computed } from 'vue-demi'
import { Format } from '../utils'
import type { SaturationChannelFormat } from '../utils/properties/saturation'
import { saturationChannelFromFormat } from '../utils/properties/saturation'
import { useColor } from '../useColor'
import { nullable } from '../utils/nullable'
import type { RelativeColorChannel } from '../utils/format'

export interface UseSaturationOptions<TFormat extends SaturationChannelFormat> {
  /**
   * Define which format to use for saturation calculation.
   * @default 'hsl'
   */
  format?: TFormat
  /**
   * Origin color value to use for conversion.
   */
  origin?: MaybeRefOrGetter<unknown>
}

export function useSaturation<TFormat extends SaturationChannelFormat>(
  value: MaybeRefOrGetter<unknown>,
  options: UseSaturationOptions<TFormat> = {},
) {
  const { format = Format.HSL as TFormat, origin } = options

  const color = useColor(value, format, { origin })
  const channel = saturationChannelFromFormat(format) as RelativeColorChannel<TFormat>

  return computed({
    get: () => color.value[channel] === null ? 0 : color.value[channel] as number,
    set: (value: number) => color.value = { ...nullable[format], [channel]: value },
  })
}
