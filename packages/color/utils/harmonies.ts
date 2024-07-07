import type { ColorFormat, ColorFormatResult } from '@vueuse/color'
import { toValue } from '@vueuse/shared'
import type { MaybeRefOrGetter } from 'vue-demi'
import { determinateValue } from './determinant'
import type { HSLVector } from './converter'
import { ColorFormatConverter } from './converter'

function hueShift<TFormat extends ColorFormat>(
  color: MaybeRefOrGetter<string | ColorFormatResult<TFormat>>,
  degrees: number,
): ColorFormatResult<TFormat>
function hueShift<TFormat extends ColorFormat>(
  color: MaybeRefOrGetter<string | ColorFormatResult<TFormat>>,
  degrees: number[],
): ColorFormatResult<TFormat>[]
function hueShift<TFormat extends ColorFormat>(
  color: MaybeRefOrGetter<string | ColorFormatResult<TFormat>>,
  degrees: number | number[],
): ColorFormatResult<TFormat> | ColorFormatResult<TFormat>[] {
  const { value: extractedValue, format: extractedFormat } = determinateValue(toValue(color))
  const colorFormat = ColorFormatConverter[extractedFormat]

  const hsl = colorFormat.toHSL(extractedValue)
  const degreesArray = Array.isArray(degrees) ? degrees : [degrees]
  const result = degreesArray.map((degree) => {
    const hue = (hsl[0] + degree) % 360
    // @ts-expect-error - TS doesn't understand the dynamic nature of the code
    const value = ColorFormatConverter.hsl[`to${extractedFormat.toUpperCase()}`]([hue, hsl[1], hsl[2]] as HSLVector)
    return ColorFormatConverter[extractedFormat].serialize(value)
  })
  return Array.isArray(degrees) ? result : result[0]
}

function lighnessShift<TFormat extends ColorFormat>(
  color: MaybeRefOrGetter<string | ColorFormatResult<TFormat>>,
  lightness: number | number[],
): ColorFormatResult<TFormat> | ColorFormatResult<TFormat>[] {
  const { value: extractedValue, format: extractedFormat } = determinateValue(toValue(color))
  const colorFormat = ColorFormatConverter[extractedFormat]

  const hsl = colorFormat.toHSL(extractedValue)
  const lightnessArray = Array.isArray(lightness) ? lightness : [lightness]
  const result = lightnessArray.map((lightness) => {
    const l = Math.max(0, Math.min(100, hsl[2] + lightness))
    // @ts-expect-error - TS doesn't understand the dynamic nature of the code
    const value = ColorFormatConverter.hsl[`to${extractedFormat.toUpperCase()}`]([hsl[0], hsl[1], l] as HSLVector)
    return ColorFormatConverter[extractedFormat].serialize(value)
  })
  return Array.isArray(lightness) ? result : result[0]
}

export enum Harmony {
  Complementary = 'complementary',
  Analogous = 'analogous',
  Triadic = 'triadic',
  SplitComplementary = 'splitComplementary',
  Square = 'square',
  Tetradic = 'tetradic',
  Tertiary = 'tertiary',
  Monochromatic = 'monochromatic',
  Tints = 'tints',
  Shades = 'shades',
}

export function complementaryColor<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
): ColorFormatResult<TFormat> {
  return hueShift(color, 180)
}

export interface AnalogousColorsOptions {
  /**
   * Degree for the harmony.
   *
   * @default 30
   */
  degree?: MaybeRefOrGetter<number>
  /**
   * Count for the harmony.
   *
   * @default 1
   */
  count?: MaybeRefOrGetter<number>
}

export function analogousColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  options: AnalogousColorsOptions = {},
): ColorFormatResult<TFormat>[] {
  const { degree = 30, count = 1 } = options
  const shifts = Array.from({ length: toValue(count) * 2 }, (_, index) => {
    return (index < toValue(count) ? index - toValue(count) : index - toValue(count) + 1) * toValue(degree)
  })
  return hueShift(color, shifts)
}

export function triadicColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
): ColorFormatResult<TFormat>[] {
  return hueShift(color, [120, 240])
}

export interface SplitComplementaryColorsOptions extends AnalogousColorsOptions {
}

export function splitComplementaryColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  options: SplitComplementaryColorsOptions = {},
): ColorFormatResult<TFormat>[] {
  const { degree = 30, count = 1 } = options
  const shifts = Array.from({ length: toValue(count) * 2 }, (_, index) => {
    const shift = (index < toValue(count) ? index - toValue(count) : index - toValue(count) + 1) * toValue(degree)
    return 180 + shift
  })
  return hueShift(color, shifts)
}

export function squareColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
): ColorFormatResult<TFormat>[] {
  return hueShift(color, [90, 180, 270])
}

export interface TetradicColorsOptions {
  /**
   * Degree for the harmony.
   *
   * @default 60
   */
  degree?: MaybeRefOrGetter<number>
}

export function tetradicColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  options: TetradicColorsOptions = {},
): ColorFormatResult<TFormat>[] {
  const { degree = 60 } = options
  return hueShift(color, [toValue(degree), 180, 180 + toValue(degree)])
}

export interface TertiaryColorsOptions {
  /**
   * Count for the harmony.
   *
   * @default 5
   */
  count?: MaybeRefOrGetter<number>
}

export function tertiaryColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  options: TertiaryColorsOptions = {},
): ColorFormatResult<TFormat>[] {
  const { count = 5 } = options
  return hueShift(color, Array(toValue(count)).fill(0).map((_, index) => 360 / (toValue(count) + 1) * (index + 1)))
}

export interface MonochromaticColorsOptions {
  /**
   * Step for the harmony.
   *
   * @default 20
   */
  step?: MaybeRefOrGetter<number>
  /**
   * Count for the harmony.
   *
   * @default 4
   */
  count?: MaybeRefOrGetter<number>
}

export function monochromaticColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  options: MonochromaticColorsOptions = {},
): ColorFormatResult<TFormat>[] {
  const {
    step = 20,
    count = 4,
  } = options
  return [
    ...lighnessShift(color, Array(Math.ceil(toValue(count) / 2)).fill(0).map((_, index) => toValue(step) * (index + 1)).reverse()) as ColorFormatResult<TFormat>[],
    ...lighnessShift(color, Array(Math.floor(toValue(count) / 2)).fill(0).map((_, index) => -toValue(step) * (index + 1))) as ColorFormatResult<TFormat>[],
  ] as ColorFormatResult<TFormat>[]
}

export interface TintsColorsOptions extends MonochromaticColorsOptions {
}

export function tintsColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  options: TintsColorsOptions = {},
): ColorFormatResult<TFormat>[] {
  const {
    step = 20,
    count = 4,
  } = options
  return lighnessShift(color, Array(toValue(count)).fill(0).map((_, index) => toValue(step) * (index + 1))) as ColorFormatResult<TFormat>[]
}

export interface ShadesColorsOptions extends MonochromaticColorsOptions {
}

export function shadesColors<TFormat extends ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  options: ShadesColorsOptions = {},
): ColorFormatResult<TFormat>[] {
  const {
    step = 20,
    count = 4,
  } = options
  return lighnessShift(color, Array(toValue(count)).fill(0).map((_, index) => -toValue(step) * (index + 1))) as ColorFormatResult<TFormat>[]
}

export type HarmonyOptions<T extends Harmony> =
  T extends Harmony.Analogous ? AnalogousColorsOptions :
    T extends Harmony.SplitComplementary ? SplitComplementaryColorsOptions :
      T extends Harmony.Tertiary ? TertiaryColorsOptions :
        T extends Harmony.Monochromatic ? MonochromaticColorsOptions :
          T extends Harmony.Tetradic ? TetradicColorsOptions :
            Record<string, any>

export type HarmonyCustomFn<TFormat extends ColorFormat = ColorFormat> = (color: ColorFormatResult<TFormat>, options: Record<string, any>) => ColorFormatResult<TFormat>[]

export function customHarmony<TFormat extends ColorFormat = ColorFormat>(
  color: string | ColorFormatResult<TFormat>,
  customFn: HarmonyCustomFn<TFormat>,
  options: Record<string, any> = {},
): ColorFormatResult<TFormat>[] {
  const { value: extractedValue, format: extractedFormat } = determinateValue(toValue(color))
  const colorFormat = ColorFormatConverter[extractedFormat]

  return customFn(colorFormat.serialize(extractedValue), options)
}
