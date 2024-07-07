import { computedEager } from '@vueuse/shared'
import type { MaybeRefOrGetter, WatchOptionsBase } from 'vue-demi'
import type { HarmonyColorOptions } from '@vueuse/color'
import { colorHarmony } from '@vueuse/color'
import type {
  ColorFormat,
  ColorFormatResult,
  Harmony,
  HarmonyOptions,
} from '../utils'

export interface UseColorHarmonyOptions extends HarmonyColorOptions, WatchOptionsBase {
}

/**
 * Convert a color from one format to another.
 *
 * @see https://vueuse.org/useColorFormat
 */
export function useColorHarmony<TFormat extends ColorFormat, THarmony extends Harmony>(
  color: MaybeRefOrGetter<string | ColorFormatResult<TFormat>>,
  harmony: MaybeRefOrGetter<THarmony>,
  options: UseColorHarmonyOptions & HarmonyOptions<THarmony> = {} as UseColorHarmonyOptions & HarmonyOptions<THarmony>,
) {
  return computedEager<ColorFormatResult<TFormat>[]>(() => {
    return colorHarmony(color, harmony, options)
  }, options)
}
