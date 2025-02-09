import type {
  MaybeRefOrGetter,
} from 'vue-demi'
import {
  computed,

  isRef,
  reactive,
  toValue,
  watch,
} from 'vue-demi'
import { watchIgnorable } from '@vueuse/shared'
import { modifyColor } from '@vueuse/color'
import type { Color, ColorFormat } from '../utils'
import type { ConvertColorOptions } from '../convertColor'
import { convertColor } from '../convertColor'
import { parseColor } from '../parseColor'
import { determinate } from '../utils'
import { normalizeColor } from '../normalizeColor'

export interface UseColorPropsOptions<
  TInput extends ColorFormat,
> extends ConvertColorOptions {
  input?: MaybeRefOrGetter<TInput>
  precision?: number
}

export interface UseColorPropsReturn {
  r: number
  g: number
  b: number
  a: number
  l: number
  h: number
  s: number
  v: number
  c: number
  m: number
  y: number
  k: number
}

export function useColorProps<
  TInput extends ColorFormat,
>(
  inputValue: MaybeRefOrGetter<Color<TInput> | string | undefined>,
  options: UseColorPropsOptions<TInput> = {},
) {
  const {
    input,
    precision,
  } = options

  interface ParsedInputValue {
    value: Color<TInput>
    format: TInput
  }

  // Compute the parsed value
  const parsedValue = computed<ParsedInputValue>(() => {
    const val = toValue(inputValue)
    const inputFormat = toValue(input)

    if (inputFormat) {
      const parsed = parseColor(val, inputFormat)
      return { value: normalizeColor(parsed, inputFormat), format: inputFormat } as ParsedInputValue
    }

    const { value: detVal, format } = determinate(val)
    return { value: normalizeColor(detVal, format), format } as ParsedInputValue
  })

  // Determine the output value type
  const outputValue = reactive<UseColorPropsReturn>({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
    l: 0,
    h: 0,
    s: 0,
    v: 0,
    c: 0,
    m: 0,
    y: 0,
    k: 0,
  })

  const computedOutputValue = computed(() => Object.assign({}, outputValue))

  // Watch for changes in the output value
  const { ignoreUpdates: ignoreOutputUpdates } = watchIgnorable(
    computedOutputValue,
    (newVal, oldValue) => {
      // find keys that have changed
      const keys = Object.keys(newVal) as (keyof UseColorPropsReturn)[]
      const changedKeys = keys.filter(k => newVal[k] !== oldValue[k])
      const changedObj = Object.fromEntries(changedKeys.map(k => [k, newVal[k]]))

      if (Object.keys(changedObj).length === 0)
        return

      const final = modifyColor(
        parsedValue.value.value,
        parsedValue.value.format,
        {
          set: true,
          red: changedObj.r,
          green: changedObj.g,
          blue: changedObj.b,
          alpha: changedObj.a,
          lightness: changedObj.l,
          hue: changedObj.h,
          saturation: changedObj.s,
        },
      )

      if (isRef(inputValue)) {
        inputValue.value = final
      }
      else if (typeof inputValue === 'object') {
        Object.assign(inputValue, final)
      }
    },
    { deep: true },
  )

  // Watch for changes in the input value
  watch(
    () => toValue(inputValue),
    (newVal) => {
      const inFormat = parsedValue.value.format

      const parsed = parseColor(newVal, inFormat)
      const normalized = normalizeColor(parsed, inFormat)
      const rgba = convertColor(normalized, inFormat, 'rgba', { precision })
      const hsl = convertColor(normalized, inFormat, 'hsl', { precision })
      const hsv = convertColor(normalized, inFormat, 'hsv', { precision })
      const cmyk = convertColor(normalized, inFormat, 'cmyk', { precision })

      ignoreOutputUpdates(() => {
        Object.assign(outputValue, {
          ...rgba,
          ...hsl,
          v: hsv.v,
          ...cmyk,
        })
      })
    },
    { deep: true, immediate: true },
  )

  return outputValue
}
