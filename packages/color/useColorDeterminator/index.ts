import type {
  MaybeRefOrGetter,
} from 'vue-demi'
import {

  computed,
  toValue,
} from 'vue-demi'
import type { Color, ColorFormat } from '../utils'
import type { ConvertColorOptions } from '../convertColor'
import { parseColor } from '../parseColor'
import { determinate } from '../utils'
import { normalizeColor } from '../normalizeColor'

export interface UseColorDeterminatorOptions<
  TInput extends ColorFormat,
> extends ConvertColorOptions {
  input?: MaybeRefOrGetter<TInput>
  precision?: number
}

export interface UseColorDeterminatorReturn<
  TFormat extends ColorFormat,
> {
  color: Color<TFormat>
  format: TFormat
}

export function useColorDeterminator<
  TInput extends ColorFormat,
>(
  inputValue: MaybeRefOrGetter<Color<TInput> | string | undefined>,
  options: UseColorDeterminatorOptions<TInput> = {},
) {
  const {
    input,
  } = options

  // Compute the parsed value
  return computed<UseColorDeterminatorReturn<TInput>>(() => {
    const val = toValue(inputValue)
    const inputFormat = toValue(input)

    if (inputFormat) {
      const parsed = parseColor(val, inputFormat)
      return { color: normalizeColor(parsed, inputFormat), format: inputFormat } as UseColorDeterminatorReturn<TInput>
    }

    const { value: detVal, format } = determinate(val)
    return { color: normalizeColor(detVal, format), format } as UseColorDeterminatorReturn<TInput>
  })
}
