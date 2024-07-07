import type { MaybeRefOrGetter } from '@vueuse/shared'
import { toValue } from '@vueuse/shared'
import type { HarmonyCustomFn } from '@vueuse/color'
import { colorConvert, customHarmony } from '@vueuse/color'
import type {
  AnalogousColorsOptions,
  ColorFormat,
  ColorFormatResult,
  HarmonyOptions,
  MonochromaticColorsOptions,
  ShadesColorsOptions,
  SplitComplementaryColorsOptions,
  TertiaryColorsOptions,
  TetradicColorsOptions,
  TintsColorsOptions,
} from '../utils'
import {
  Harmony,
  analogousColors,
  complementaryColor,
  monochromaticColors,
  shadesColors,
  splitComplementaryColors,
  squareColors,
  tertiaryColors,
  tetradicColors,
  tintsColors,
  triadicColors,
} from '../utils'

export interface HarmonyColorOptions {
  /**
   * Format for the harmony.
   */
  format?: MaybeRefOrGetter<ColorFormat>
}

/**
 * Convert a color from one format to another.
 *
 * @see https://vueuse.org/colorConvert
 */
export function colorHarmony<
  TFormat extends ColorFormat = ColorFormat,
  THarmony extends Harmony = Harmony,
  TOutputFormat extends ColorFormat = ColorFormat,
>(
  value: MaybeRefOrGetter<string | ColorFormatResult<TFormat>>,
  harmony: MaybeRefOrGetter<THarmony | HarmonyCustomFn<TFormat>>,
  options?: HarmonyColorOptions & HarmonyOptions<THarmony> & { format?: MaybeRefOrGetter<TOutputFormat> },
) {
  let result: ColorFormatResult<TFormat>[] = []
  const harmonyValue = toValue(harmony)
  if (typeof harmonyValue !== 'function') {
    switch (harmonyValue) {
      case Harmony.Complementary:
        result = [complementaryColor(toValue(value))]
        break
      case Harmony.Analogous:
        result = analogousColors(toValue(value), toValue(options) as AnalogousColorsOptions)
        break
      case Harmony.Triadic:
        result = triadicColors(toValue(value))
        break
      case Harmony.SplitComplementary:
        result = splitComplementaryColors(toValue(value), toValue(options) as SplitComplementaryColorsOptions)
        break
      case Harmony.Square:
        result = squareColors(toValue(value))
        break
      case Harmony.Tetradic:
        result = tetradicColors(toValue(value), toValue(options) as TetradicColorsOptions)
        break
      case Harmony.Tertiary:
        result = tertiaryColors(toValue(value), toValue(options) as TertiaryColorsOptions)
        break
      case Harmony.Monochromatic:
        result = monochromaticColors(toValue(value), toValue(options) as MonochromaticColorsOptions)
        break
      case Harmony.Tints:
        result = tintsColors(toValue(value), toValue(options) as TintsColorsOptions)
        break
      case Harmony.Shades:
        result = shadesColors(toValue(value), toValue(options) as ShadesColorsOptions)
        break
      default:
        throw new Error('Invalid harmony')
    }
  }
  else {
    result = customHarmony<TFormat>(toValue(value), harmonyValue, toValue(options) as Record<string, any>)
  }
  const outputFormat = toValue(options?.format)
  if (!outputFormat)
    return result
  return result.map(color => colorConvert(color, outputFormat)) as ColorFormatResult<TOutputFormat>[]
}

// alias
export { colorHarmony as harmony }
