import type { MaybeRefOrGetter } from '@vueuse/shared'
import { computedEager } from '@vueuse/shared'
import type { WatchOptions } from 'vue-demi'
import { shallowRef, toValue, watch } from 'vue-demi'
import type { ColorFormat, ColorFormatResult } from '../utils'
import { colorConvert } from '../colorConvert'

export interface UseColorFormatOptions extends WatchOptions {
  /**
   * Default value when error occurred.
   *
   * @default '#000'
   */
  defaultValue?: MaybeRefOrGetter<string | ColorFormatResult<ColorFormat>>
  /**
   * Uses last value when error occurred. Otherwise, use `defaultValue`.
   *
   * @default true
   */
  useLast?: boolean
  /**
   * Callback when error occurred.
   */
  onError?: (error: Error) => void
}

/**
 * Convert a color from one format to another.
 *
 * @see https://vueuse.org/useColorFormat
 */
export function useColorFormat<TFormat extends ColorFormat>(
  value: MaybeRefOrGetter<string | ColorFormatResult<ColorFormat>>,
  format: MaybeRefOrGetter<TFormat>,
  options: UseColorFormatOptions = {},
) {
  const {
    defaultValue = '#000',
    useLast = true,
  } = options
  const result = shallowRef<ColorFormatResult<TFormat>>(colorConvert(defaultValue, format))

  watch(
    [() => toValue(value), () => toValue(format)],
    ([newValue, newFormat]) => {
      try {
        result.value = colorConvert(newValue, newFormat)
      }
      catch (e) {
        if (!useLast) {
          result.value = colorConvert(defaultValue, format)
        }
        if (options.onError && e instanceof Error) {
          options.onError(e)
        }
      }
    },
    {
      immediate: true,
      ...options,
    },
  )

  return computedEager(() => result.value, options)
}
