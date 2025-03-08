import type { MaybeRefOrGetter } from 'vue-demi'
import { computed } from 'vue-demi'
import { Format } from '../utils'
import type { LightnessChannelFormat } from '../utils/properties/lightness'
import { lightnessChannelFromFormat } from '../utils/properties/lightness'
import { useColor } from '../useColor'
import { nullable } from '../utils/nullable'

export interface UseLightnessOptions<TFormat extends LightnessChannelFormat> {
  /**
   * Define which format to use for lightness calculation.
   * @default 'hsl'
   */
  format?: TFormat
  /**
   * Origin color value to use for conversion.
   */
  origin?: MaybeRefOrGetter<unknown>
}

export function useLightness<TFormat extends LightnessChannelFormat>(
  value: MaybeRefOrGetter<unknown>,
  options: UseLightnessOptions<TFormat> = {},
) {
  const { format = Format.HSL as TFormat, origin } = options

  const color = useColor(value, format, { origin })
  const channel = lightnessChannelFromFormat(format)

  return computed({
    get: () => color.value[channel] === null ? 0 : color.value[channel] as number,
    set: value => color.value = { ...nullable[format], [channel]: value },
  })
}
