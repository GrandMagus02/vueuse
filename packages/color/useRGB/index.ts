import type { MaybeRefOrGetter } from 'vue-demi'
import type { UseColorOptions } from '../useColor'
import { useColor } from '../useColor'
import type { FormatRGB } from '../utils'
import { Format } from '../utils'

export function useRGB(
  value: MaybeRefOrGetter<unknown>,
  options: UseColorOptions<FormatRGB> = {},
) {
  return useColor(value, Format.RGB, options)
}
