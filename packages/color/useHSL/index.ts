import type { MaybeRefOrGetter } from 'vue-demi'
import type { UseColorOptions } from '../useColor'
import { useColor } from '../useColor'
import type { FormatHSL } from '../utils'
import { Format } from '../utils'

export function useHSL(
  value: MaybeRefOrGetter<unknown>,
  options: UseColorOptions<FormatHSL> = {},
) {
  return useColor(value, Format.HSL, options)
}
