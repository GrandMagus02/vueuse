import type { MaybeRefOrGetter } from 'vue-demi'
import type { ColorFormat, UseColorOptions } from '@vueuse/color'
import { useColor } from '@vueuse/color'

export interface UseColorStringOptions<TOutput extends ColorFormat = ColorFormat, TInput extends ColorFormat = ColorFormat> extends Omit<UseColorOptions<TOutput, TInput, true>, 'stringify'> {}

export function useColorString<TOutput extends ColorFormat, TInput extends ColorFormat = ColorFormat>(
  value: MaybeRefOrGetter<unknown>,
  format?: TOutput,
  options: UseColorStringOptions<TOutput, TInput> = {},
) {
  return useColor(value, format, {
    ...options,
    stringify: true,
  })
}
