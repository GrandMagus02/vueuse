import type { MaybeRefOrGetter } from 'vue-demi'
import { computed } from 'vue-demi'
import { Format } from '../utils'
import type { HueChannelFormat } from '../utils/properties/hue'
import { hueChannelFromFormat } from '../utils/properties/hue'
import { useColor } from '../useColor'

export interface UseHueOptions<TFormat extends HueChannelFormat> {
  /**
   * Define which format to use for hue calculation.
   * @default 'hsl'
   */
  format?: TFormat
}

export function useHue<TFormat extends HueChannelFormat>(
  value: MaybeRefOrGetter<unknown>,
  options: UseHueOptions<TFormat> = {},
) {
  const { format = Format.HSL as TFormat } = options

  const color = useColor(value, format)
  const channel = hueChannelFromFormat(format)

  return computed({
    get: () => color.value[channel] === null ? 0 : color.value[channel] as number,
    set: value => color.value = { ...color.value, [channel]: value },
  })
}
