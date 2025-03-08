import type { MaybeRefOrGetter } from 'vue-demi'
import type { UseColorOptions } from '../useColor'
import { useColor } from '../useColor'
import type { FormatLRGB } from '../utils'
import { Format } from '../utils'

export function useLRGB(
  value: MaybeRefOrGetter<unknown>,
  options: UseColorOptions<FormatLRGB> = {},
) {
  return useColor(value, Format.LRGB, options)
}
