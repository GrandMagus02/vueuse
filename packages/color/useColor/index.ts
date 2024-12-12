import type {
  MaybeRefOrGetter
  ,
  type Ref,
  computed,
  isRef,
  reactive,
  ref,
  toValue,
} from 'vue-demi'
import type { IgnoredUpdater } from '@vueuse/shared'
import { watchIgnorable } from '@vueuse/shared'
import type { Color, ColorFormat } from '../utils'
import type { ConvertColorOptions } from '../convertColor'
import { convertColor } from '../convertColor'
import { parseColor } from '../parseColor'
import { stringifyColor } from '../stringifyColor'
import { determinate } from '../utils'
import { normalizeColor } from '../normalizeColor'

export interface UseColorOptions<
  TInput extends ColorFormat,
  TOutput extends ColorFormat,
  TStringify extends boolean = false,
> extends ConvertColorOptions {
  input?: MaybeRefOrGetter<TInput>
  output?: MaybeRefOrGetter<TOutput>
  stringify?: MaybeRefOrGetter<TStringify>
}

export function useColor<
  TInput extends ColorFormat,
  TOutput extends ColorFormat = TInput,
  TStringify extends boolean = false,
>(
  inputValue: MaybeRefOrGetter<Color<TInput> | string | undefined>,
  options: UseColorOptions<TInput, TOutput, TStringify> = {},
) {
  const {
    input,
    output = input,
    precision,
    stringify = false,
  } = options

  interface ParsedInputValue { value: Color<TInput>, format: TInput }

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
  const outputValue: TStringify extends true
    ? Ref<string>
    : Color<TOutput> = stringify ? ref('') : reactive({}) as any

  let ignoreInputUpdates: null | IgnoredUpdater = null

  // Watch for changes in the output value
  const { ignoreUpdates: ignoreOutputUpdates } = watchIgnorable(
    outputValue,
    (newVal) => {
      const outFormat = toValue(output) || parsedValue.value.format
      const inFormat = parsedValue.value.format

      const parsed = parseColor(newVal, outFormat)
      const normalized = normalizeColor(parsed, outFormat)
      const converted = convertColor(normalized, outFormat, inFormat, { precision })
      const final = stringify
        ? stringifyColor(converted, inFormat)
        : (converted as Color<TInput>)

      if (ignoreInputUpdates) {
        ignoreInputUpdates(() => {
          if (isRef(inputValue)) {
            inputValue.value = final
          }
          else if (typeof inputValue === 'object') {
            Object.assign(inputValue, final)
          }
        })
      }

      // if (JSON.stringify(parsed) === JSON.stringify(normalized)) return;

      // if (isRef(outputValue) && typeof toValue(outputValue) === 'string') {
      //   outputValue.value = stringifyColor(normalized, outFormat);
      // } else {
      //   Object.assign(outputValue, normalized);
      // }
    },
    { deep: true },
  )

  // Watch for changes in the input value
  const { ignoreUpdates } = watchIgnorable(
    () => toValue(inputValue),
    (newVal) => {
      const outFormat = toValue(output) || parsedValue.value.format
      const inFormat = parsedValue.value.format

      const parsed = parseColor(newVal, inFormat)
      const normalized = normalizeColor(parsed, inFormat)
      const converted = convertColor(normalized, inFormat, outFormat, { precision })

      ignoreOutputUpdates(() => {
        if (isRef(outputValue) && typeof toValue(outputValue) === 'string') {
          outputValue.value = stringifyColor(converted, outFormat)
        }
        else {
          Object.assign(outputValue, converted)
        }
      })
    },
    { deep: true, immediate: true },
  )

  ignoreInputUpdates = ignoreUpdates

  return outputValue
}
