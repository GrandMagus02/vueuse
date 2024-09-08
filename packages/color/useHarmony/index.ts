import type { MaybeRefOrGetter, Ref, WatchOptionsBase } from 'vue-demi'
import { toValue } from 'vue-demi'
import { computedEager } from '@vueuse/shared'
import type { ColorFormat, ColorFormatValue, ColorHarmony } from '../utils'
import type { HarmonyColorOptions } from '../harmonyColor'
import { harmonyColor } from '../harmonyColor'
import { parseColor } from '../parseColor'
import { determinate } from '../utils/determinate'

export interface UseHarmonyOptions<TFormat extends ColorFormat> extends HarmonyColorOptions, WatchOptionsBase {
  format?: TFormat
  [key: string]: any
}

type CustomHarmony<T extends ColorFormat> = (color: ColorFormatValue<T>, format: T, ...args: any[]) => ColorFormatValue<T>[]

export function useHarmony<TFormat extends ColorFormat, THarmony extends ColorHarmony>(
  value: MaybeRefOrGetter,
  harmony: THarmony | CustomHarmony<TFormat>,
  options: UseHarmonyOptions<TFormat> = {},
): Readonly<Ref<ColorFormatValue<TFormat>[]>> {
  const {
    format,
    flush,
    onTrack,
    onTrigger,
    ...restOptions
  } = options
  return computedEager(() => {
    let determinedFormat: TFormat
    let determinedValue: ColorFormatValue<TFormat> | undefined
    if (!format) {
      const determinedResult = determinate(toValue(value))
      if (!determinedResult)
        throw new Error('Invalid color format')
      determinedValue = determinedResult[0] as ColorFormatValue<TFormat>
      determinedFormat = determinedResult[1] as TFormat
    }
    else {
      determinedValue = parseColor(toValue(value), format)
      determinedFormat = format
    }

    if (typeof harmony === 'function') {
      return harmony(
        determinedValue,
        determinedFormat,
        { ...restOptions },
      ) as ColorFormatValue<TFormat>[]
    }

    return harmonyColor(
      determinedValue,
      determinedFormat,
      harmony,
      { ...restOptions },
    ) as ColorFormatValue<TFormat>[]
  }, { flush, onTrack, onTrigger })
}
