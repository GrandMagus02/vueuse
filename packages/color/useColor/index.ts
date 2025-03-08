import type { MaybeRefOrGetter, Ref, UnwrapRef } from 'vue-demi'
import { isReactive, isReadonly, isRef, ref, toValue, watch } from 'vue-demi'
import { watchIgnorable } from '@vueuse/shared'
import type { Color, ColorFormat } from '../utils'
import { Format, convert, fallback, normalize } from '../utils'
import { stringifyColor } from '../stringifyColor'
import { parseColor } from '../parseColor'
import type { ColorStringifyOptions } from '../utils/stringifies/common'
import { INVALID_COLOR_VALUE } from '../utils/errors'
import { convertColor } from '../convertColor'

export interface UseColorOptions<TOutput extends ColorFormat = ColorFormat, TInput extends ColorFormat = ColorFormat, TStringify extends boolean = false, TError extends boolean = false> extends ColorStringifyOptions {
  /**
   * Whether to stringify the output value.
   * @default false
   */
  stringify?: MaybeRefOrGetter<TStringify>
  /**
   * Whether the input value must mutate on output change.
   * @default false
   */
  mutateInput?: MaybeRefOrGetter<boolean>
  /**
   * Define which format to use for parsing.
   */
  format?: TInput
  /**
   * Fallback value if the format is not determined.
   */
  fallback?: Color<TOutput>
  /**
   * Origin color value to use for conversion.
   */
  origin?: MaybeRefOrGetter<unknown>
  /**
   * Whether to throw an error when the color value is invalid.
   * @default false
   */
  throwOnError?: TError
}

export function useColor<TFormat extends ColorFormat, TInput extends ColorFormat = ColorFormat>(value: MaybeRefOrGetter<unknown>, format?: TFormat, options?: UseColorOptions<TFormat, TInput, false, true>): Ref<Color<TFormat>>
export function useColor<TFormat extends ColorFormat, TInput extends ColorFormat = ColorFormat>(value: MaybeRefOrGetter<unknown>, format?: TFormat, options?: UseColorOptions<TFormat, TInput, true, true>): Ref<string>
export function useColor<TFormat extends ColorFormat, TInput extends ColorFormat = ColorFormat>(value: MaybeRefOrGetter<unknown>, format?: TFormat, options?: UseColorOptions<TFormat, TInput, true>): Ref<string | undefined>
export function useColor<TFormat extends ColorFormat, TInput extends ColorFormat = ColorFormat>(value: MaybeRefOrGetter<unknown>, format?: TFormat, options?: UseColorOptions<TFormat, TInput>): Ref<Color<TFormat> | undefined>
export function useColor<TOutput extends ColorFormat, TInput extends ColorFormat = ColorFormat>(
  value: MaybeRefOrGetter<unknown>,
  format?: MaybeRefOrGetter<TOutput>,
  options: UseColorOptions<TOutput, TInput, boolean, boolean> = {},
) {
  format = toValue(format)
  value = toValue(value)

  if (!format) {
    format = Format.HEX as TOutput
  }

  const mutateInput = toValue(options.mutateInput) ?? true
  const throwOnError = options.throwOnError

  const {
    fallback: _fallback = fallback[format],
    alpha,
    syntax,
    percentage,
    precision,
  } = options

  const stringify = toValue(options.stringify)
  const stringifyOptions = { alpha, syntax, percentage, precision }

  const output = ref<string | Color<TOutput> | undefined>(_fallback)

  const updateColor = () => {
    let inputValue = value

    const parsedInput = parseColor<TInput>(inputValue)
    const parsedOutput = parseColor(toValue(output), { format })

    if (!parsedInput || !parsedOutput)
      return

    const result = normalize[format](parsedOutput.color)

    const origin = toValue(options.origin)
    if (origin) {
      const originColor = convertColor<TOutput>(origin, format) as Color<TOutput>
      if (originColor) {
        for (const key in result) {
          if (result[key] === null) {
            if (originColor[key] !== null) {
              result[key] = originColor[key]
            }
            else {
              result[key] = fallback[format][key]
            }
          }
        }
      }
    }

    const converted = normalize[parsedInput.format](convert[format][parsedInput.format](result, options) as Color<TInput>)
    for (const key in converted) {
      if (converted[key] === null) {
        converted[key] = fallback[parsedInput.format][key]
      }
    }

    if (typeof inputValue === 'object' && inputValue !== null) {
      Object.assign(inputValue, converted)
    }
    else if (typeof inputValue === 'string') {
      inputValue = stringifyColor(converted, { format: parsedInput.format, ...stringifyOptions })
    }

    if (isReadonly(value))
      return

    if (isRef(value)) {
      value.value = inputValue
    }
    else if (isReactive(value) && typeof value === 'object' && value !== null) {
      Object.assign(value, inputValue)
    }
  }

  const { ignoreUpdates } = watchIgnorable(
    [() => output.value, () => mutateInput],
    () => {
      if (mutateInput) {
        updateColor()
      }
    },
    { deep: true },
  )

  watch(
    [() => value, () => stringify, () => format],
    () => {
      ignoreUpdates(() => {
        const result = convertColor(value, format, {
          fallback: fallback[format],
          precision,
        })
        for (const key in result) {
          if (result[key] === null) {
            result[key] = fallback[format][key]
          }
        }
        if (!result) {
          if (throwOnError) {
            throw INVALID_COLOR_VALUE
          }
          output.value = undefined
        }
        else {
          if (stringify) {
            output.value = stringifyColor(result, { format, ...stringifyOptions })
          }
          else {
            output.value = { ...fallback[format], ...result } as UnwrapRef<Color<TOutput>>
          }
        }
      })
    },
    { immediate: true, deep: true },
  )

  return output
}
