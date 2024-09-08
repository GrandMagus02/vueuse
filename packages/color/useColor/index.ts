import type { MaybeRefOrGetter, Ref, WatchOptionsBase } from 'vue-demi'
import { toValue } from 'vue-demi'
import { computedEager } from '@vueuse/shared'
import type { ColorFormat, ColorFormatValue } from '../utils'
import type { ConvertColorOptions } from '../convertColor'
import { convertColor } from '../convertColor'
import { parseColor } from '../parseColor'
import { stringifyColor } from '../stringifyColor'
import { determinate } from '../utils/determinate'

export interface UseColorOptions<TInput extends ColorFormat, TOutput extends ColorFormat, TStringify extends boolean = false> extends ConvertColorOptions, WatchOptionsBase {
  input?: TInput
  output?: TOutput
  stringify?: TStringify
}

export function useColor<TInput extends ColorFormat, TOutput extends ColorFormat, TStringify extends boolean = false>(
  value: MaybeRefOrGetter,
  options: UseColorOptions<TInput, TOutput, TStringify> = {},
): Readonly<Ref<TStringify extends true ? string : ColorFormatValue<TOutput extends undefined ? TInput : TOutput>>> {
  const {
    input,
    output,
    round,
    precision,
    stringify = false,
  } = options
  return computedEager(() => {
    let determinedValue: ColorFormatValue<TInput> | ColorFormatValue<TOutput> | string
    let determinedFormat: TInput | TOutput
    if (input) {
      determinedValue = parseColor(toValue(value), input as TInput)
      determinedFormat = input
    }
    else {
      const determinedResult = determinate(toValue(value))
      if (!determinedResult)
        throw new Error('Invalid color format')
      determinedValue = determinedResult[0] as ColorFormatValue<TInput>
      determinedFormat = determinedResult[1] as TInput
    }

    if (output) {
      determinedValue = convertColor(
        determinedValue,
        determinedFormat,
        output,
        { round, precision },
      )
      determinedFormat = output
    }

    if (stringify)
      return stringifyColor(determinedValue, determinedFormat)

    return determinedValue as ColorFormatValue<TOutput extends undefined ? TInput : TOutput>
  }, { ...options }) as any
}
