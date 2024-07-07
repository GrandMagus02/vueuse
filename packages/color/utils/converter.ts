import type { ColorFormatObject, ColorFormatString } from './formats/base'
import { ColorFormat } from './formats/base'
import { RGB } from './formats/rgb'
import { RGBA } from './formats/rgba'
import { RGBPercent } from './formats/rgbp'
import { RGBAPercent } from './formats/rgbap'
import { HEX } from './formats/hex'
import { HEXA } from './formats/hexa'
import { HSL } from './formats/hsl'
import { HSLA } from './formats/hsla'
import { HSV } from './formats/hsv'
import { HSVA } from './formats/hsva'

export type HEXValue = `#${string}`
export type HEXAValue = HEXValue
type Vector3<T> = [T, T, T]
type Vector4<T> = [T, T, T, T]
export type RGBVector = Vector3<number>
export type RGBAVector = Vector4<number>
export type RGBPercentVector = Vector3<number>
export type RGBAPercentVector = Vector4<number>
export type HSLVector = Vector3<number>
export type HSLAVector = Vector4<number>
export type HSVVector = Vector3<number>
export type HSVAVector = Vector4<number>

interface ColorFormatResultWithFormat {
  format: ColorFormat
}

interface ColorFormatResultWithAlpha {
  a: number
}

export interface HEXResult extends ColorFormatResultWithFormat {
  hex: HEXValue
  r: string
  g: string
  b: string
}

export interface HEXAResult extends HEXResult {
  hexa: HEXAValue
  a: string
}

export interface RGBResult extends ColorFormatResultWithFormat {
  r: number
  g: number
  b: number
}

export interface RGBAResult extends RGBResult, ColorFormatResultWithAlpha {
}

export interface RGBPercentResult extends RGBResult {
}

export interface RGBAPercentResult extends RGBAResult {
}

export interface HSLResult extends ColorFormatResultWithFormat {
  h: number
  s: number
  l: number
}

export interface HSLAResult extends HSLResult, ColorFormatResultWithAlpha {
}

export interface HSVResult extends ColorFormatResultWithFormat {
  h: number
  s: number
  v: number
}

export interface HSVAResult extends HSVResult, ColorFormatResultWithAlpha {
}

export type ColorFormatValue<T> =
  T extends ColorFormat.HEX ? HEXValue :
    T extends ColorFormat.HEXA ? HEXAValue :
      T extends ColorFormat.RGB ? RGBVector :
        T extends ColorFormat.RGBPercent ? RGBPercentVector :
          T extends ColorFormat.RGBA ? RGBAVector :
            T extends ColorFormat.RGBAPercent ? RGBAPercentVector :
              T extends ColorFormat.HSL ? HSLVector :
                T extends ColorFormat.HSLA ? HSLAVector :
                  T extends ColorFormat.HSV ? HSVVector :
                    T extends ColorFormat.HSVA ? HSVAVector :
                      never

export type ColorFormatResult<T> =
  T extends ColorFormat.HEX ? HEXResult :
    T extends ColorFormat.HEXA ? HEXAResult :
      T extends ColorFormat.RGB ? RGBResult :
        T extends ColorFormat.RGBPercent ? RGBPercentResult :
          T extends ColorFormat.RGBA ? RGBAResult :
            T extends ColorFormat.RGBAPercent ? RGBAPercentResult :
              T extends ColorFormat.HSL ? HSLResult :
                T extends ColorFormat.HSLA ? HSLAResult :
                  T extends ColorFormat.HSV ? HSVResult :
                    T extends ColorFormat.HSVA ? HSVAResult :
                      never

const ColorFormatEnumReverse: Record<ColorFormat, keyof typeof ColorFormat> = {} as any
for (const key in ColorFormat) {
  ColorFormatEnumReverse[ColorFormat[key as keyof typeof ColorFormat]] = key as keyof typeof ColorFormat
}

export const ColorFormatConverter: { [K in ColorFormat]: ColorFormatObject<ColorFormatValue<K>, ColorFormatResult<K>> } = {
  rgb: RGB,
  rgba: RGBA,
  rgbp: RGBPercent,
  rgbap: RGBAPercent,
  hex: HEX,
  hexa: HEXA,
  hsl: HSL,
  hsla: HSLA,
  hsv: HSV,
  hsva: HSVA,
}

export function convertValue<TInput extends ColorFormat = ColorFormat, TOutput extends ColorFormat = ColorFormat>(
  value: ColorFormatValue<TInput>,
  from: ColorFormat | ColorFormatString,
  to: TOutput | ColorFormatString,
): ColorFormatResult<TOutput> {
  const converter = ColorFormatConverter[from]
  let result: any = null
  const funcName = `to${ColorFormatEnumReverse[to as ColorFormat]}`
  if (!(funcName in converter))
    throw new Error(`Invalid color format: ${to}`)

  // @ts-expect-error - TS doesn't understand the dynamic function name
  result = converter[funcName as keyof typeof converter](value) as ColorFormatResult<TOutput>

  return ColorFormatConverter[to].serialize(result) as ColorFormatResult<TOutput>
}
