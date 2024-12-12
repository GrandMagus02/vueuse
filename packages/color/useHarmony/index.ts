import type { MaybeRefOrGetter, Ref, WatchOptionsBase } from 'vue-demi'
import { computed, toValue } from 'vue-demi'
import { computedEager } from '@vueuse/shared'
import type { Color, ColorFormat, ColorHarmony } from '../utils'
import type { HarmonyColorOptions } from '../harmonyColor'
import { harmonyColor } from '../harmonyColor'
import { parseColor } from '../parseColor'
import { determinate } from '../utils'
import { normalizeColor } from '../normalizeColor'
import { convertColor } from '../convertColor'

export interface UseHarmonyOptions<TInput extends ColorFormat, TOutput extends ColorFormat> extends HarmonyColorOptions, WatchOptionsBase {
  input?: TInput
  output?: TOutput
  [key: string]: any
}

export type CustomHarmony<T extends ColorFormat = ColorFormat> = (color: Color<T>, format: T, ...args: any[]) => Color<T>[]

export function useHarmony<TInput extends ColorFormat, TOutput extends ColorFormat = TInput, THarmony extends ColorHarmony = ColorHarmony>(
  value: MaybeRefOrGetter<Color<TInput> | string>,
  harmony: THarmony | CustomHarmony,
  options: UseHarmonyOptions<TInput, TOutput> = {},
): Readonly<Ref<Color<TOutput>[]>> {
  const {
    input,
    output = input,
    flush,
    onTrack,
    onTrigger,
    ...restOptions
  } = options

  interface ParsedInputValue { value: Color<TInput>, format: TInput }

  const parsedValue = computed<ParsedInputValue>(() => {
    const val = toValue(value)
    const inputFormat = toValue(input)

    if (inputFormat) {
      const parsed = parseColor(val, inputFormat)
      return { value: normalizeColor(parsed, inputFormat), format: inputFormat } as ParsedInputValue
    }

    const { value: detVal, format } = determinate(val)
    return { value: normalizeColor(detVal, format), format } as ParsedInputValue
  })

  return computedEager(() => {
    const {
      value: determinedValue,
      format: determinedFormat,
    } = parsedValue.value

    if (typeof harmony === 'function') {
      return harmony(
        determinedValue,
        determinedFormat,
        { ...restOptions },
      ) as Color<TOutput>[]
    }

    const colors = harmonyColor(
      determinedValue,
      determinedFormat,
      harmony,
      { ...restOptions },
    ) as Color<TInput>[]

    return colors.map(color => convertColor(color, determinedFormat, output || determinedFormat)) as Color<TOutput>[]
  }, { flush, onTrack, onTrigger })
}
