import type {
  ColorFormat,
  ColorFormatValue,
  ColorHarmony,

} from '../utils'
import {
  analogousColors,
  complementaryColor,
  monochromaticColors,
  shadeColors,
  splitComplementaryColors,
  squareColors,
  tetradicColors,
  tintColors,
  triadicColors,
} from '../utils'

export interface HarmonyColorOptions {
  /**
   * Amount of colors to generate.
   */
  count?: number
  /**
   * Step degree for the color to generate. (e.g. 30, 45)
   */
  degree?: number
  /**
   * Step number for the color to generate. (e.g. 0.1, 0.25)
   */
  step?: number
}

/**
 * Convert a color from one format to another.
 * @param value - The color value to convert.
 * @param format - The format of the input color.
 * @param harmony - The harmony to convert the color to.
 * @param options - The options for the conversion.
 */
export function harmonyColor<TFormat extends ColorFormat, THarmony extends ColorHarmony>(
  value: ColorFormatValue<TFormat>,
  format: TFormat,
  harmony: THarmony,
  options: HarmonyColorOptions = {},
): ColorFormatValue<TFormat>[] {
  const { count, degree } = options
  let colors: ColorFormatValue<TFormat>[] = []
  switch (harmony.toLowerCase()) {
    case Harmony.COMPLEMENTARY:
      colors = [complementaryColor(value, format)]
      break
    case Harmony.ANALOGOUS:
      colors = analogousColors(value, format, degree, count)
      break
    case Harmony.TRIADIC:
      colors = triadicColors(value, format)
      break
    case Harmony.SPLIT_COMPLEMENTARY:
      colors = splitComplementaryColors(value, format, degree, count)
      break
    case Harmony.SQUARE:
      colors = squareColors(value, format)
      break
    case Harmony.TETRADIC:
      colors = tetradicColors(value, format)
      break
    case Harmony.MONOCHROMATIC:
      colors = monochromaticColors(value, format)
      break
    case Harmony.TINTS:
      colors = tintColors(value, format)
      break
    case Harmony.SHADES:
      colors = shadeColors(value, format)
      break
    default:
      throw new Error(`Unknown harmony: ${harmony}`)
  }
  return colors
}
