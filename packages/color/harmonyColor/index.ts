import type {
  Color,
  ColorFormat,
  ColorHarmony,

} from '../utils'
import {
  Harmony,
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

export interface HarmonyColorOptions<T = number> {
  /**
   * Amount of colors to generate.
   */
  count?: T
  /**
   * Step angle for the color to generate. (e.g. 30, 45)
   */
  angle?: T
  /**
   * Step number for the color to generate. (e.g. 0.1, 0.25)
   */
  step?: T
}

/**
 * Convert a color from one output to another.
 * @param value - The color value to convert.
 * @param format - The output of the input color.
 * @param harmony - The harmony to convert the color to.
 * @param options - The options for the conversion.
 */
export function harmonyColor<TFormat extends ColorFormat, THarmony extends ColorHarmony>(
  value: Color<TFormat>,
  format: TFormat,
  harmony: THarmony,
  options: HarmonyColorOptions = {},
): Color<TFormat>[] {
  const { count, angle, step } = options
  let colors: Color<TFormat>[] = []
  switch (harmony.toLowerCase()) {
    case Harmony.COMPLEMENTARY:
      colors = [complementaryColor(value, format)]
      break
    case Harmony.ANALOGOUS:
      colors = analogousColors(value, format, angle, count)
      break
    case Harmony.TRIADIC:
      colors = triadicColors(value, format)
      break
    case Harmony.SPLIT_COMPLEMENTARY:
      colors = splitComplementaryColors(value, format, angle)
      break
    case Harmony.SQUARE:
      colors = squareColors(value, format)
      break
    case Harmony.TETRADIC:
      colors = tetradicColors(value, format, angle)
      break
    case Harmony.MONOCHROMATIC:
      colors = monochromaticColors(value, format, count, step)
      break
    case Harmony.TINTS:
      colors = tintColors(value, format, count, step)
      break
    case Harmony.SHADES:
      colors = shadeColors(value, format, count, step)
      break
    default:
      throw new Error(`Unknown harmony: ${harmony}`)
  }
  return colors
}
