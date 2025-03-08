import { fallback } from './fallback'

export interface HEX<T = number> {
  hex: T // 0x000000 - 0xFFFFFF
  r: T // 0 - 1
  g: T // 0 - 1
  b: T // 0 - 1
  a?: T // 0 - 1
}
export interface RelativeHEX extends HEX<number | null> {}

export interface RGB<T = number> {
  r: T // 0 - 1
  g: T // 0 - 1
  b: T // 0 - 1
  a?: T // 0 - 1
}
export interface RelativeRGB extends RGB<number | null> {}

export interface HSL<T = number> {
  h: T // 0 - 1
  s: T // 0 - 1
  l: T // 0 - 1
  a?: T // 0 - 1
}
export interface RelativeHSL extends HSL<number | null> {}

export interface HSV<T = number> {
  h: T // 0 - 1
  s: T // 0 - 1
  v: T // 0 - 1
  a?: T // 0 - 1
}
export interface RelativeHSV extends HSV<number | null> {}

export interface HWB<T = number> {
  h: T // 0 - 1
  w: T // 0 - 1
  b: T // 0 - 1
  a?: T // 0 - 1
}
export interface RelativeHWB extends HWB<number | null> {}

export interface CMYK<T = number> {
  c: T // 0 - 1
  m: T // 0 - 1
  y: T // 0 - 1
  k: T // 0 - 1
  a?: T // 0 - 1
}
export interface RelativeCMYK extends CMYK<number | null> {}

export interface XYZ<T = number> {
  x: T // coordinate system dependent
  y: T // coordinate system dependent
  z: T // coordinate system dependent
  a?: T // 0 - 1
}
export interface RelativeXYZ extends XYZ<number | null> {}

export interface LAB<T = number> {
  l: T // 0 - 1
  a: T // coordinate system dependent
  b: T // coordinate system dependent
  A?: T // 0 - 1
}
export interface RelativeLAB extends LAB<number | null> {}

export interface LCH<T = number> {
  l: T // 0 - 1
  c: T // 0 - 1
  h: T // 0 - 1
  a?: T // 0 - 1
}
export interface RelativeLCH extends LCH<number | null> {}

export interface OKLAB<T = number> extends LAB<T> {
}
export interface RelativeOKLAB extends OKLAB<number | null> {}

export interface OKLCH<T = number> extends LCH<T> {
}
export interface RelativeOKLCH extends OKLCH<number | null> {}

export interface LRGB<T = number> extends RGB<T> {
}
export interface RelativeLRGB extends LRGB<number | null> {}

export interface LMS<T = number> {
  l: T
  m: T
  s: T
  a?: T
}
export interface RelativeLMS extends LMS<number | null> {}

interface ColorMapping<T = number> {
  hex: HEX<T>
  rgb: RGB<T>
  lrgb: LRGB<T>
  hsl: HSL<T>
  hsv: HSV<T>
  hwb: HWB<T>
  cmyk: CMYK<T>
  xyz: XYZ<T>
  lab: LAB<T>
  lch: LCH<T>
  oklab: OKLAB<T>
  oklch: OKLCH<T>
  lms: LMS<T>
  keyword: HEX<T>
}

export const formats = ['hex', 'rgb', 'lrgb', 'hsl', 'hsv', 'hwb', 'cmyk', 'xyz', 'lab', 'lch', 'oklab', 'oklch', 'lms', 'keyword'] as const

export type FormatRGB = 'rgb'
export type FormatLRGB = 'lrgb'
export type FormatHEX = 'hex'
export type FormatHSL = 'hsl'
export type FormatHSV = 'hsv'
export type FormatHWB = 'hwb'
export type FormatCMYK = 'cmyk'
export type FormatXYZ = 'xyz'
export type FormatLAB = 'lab'
export type FormatLCH = 'lch'
export type FormatOKLAB = 'oklab'
export type FormatOKLCH = 'oklch'
export type FormatLMS = 'lms'

export type ColorFormat = typeof formats[number]

export type Color<T extends ColorFormat = ColorFormat> =
  T extends any ? ColorMapping[T] : never

export type RelativeColor<T extends ColorFormat = ColorFormat> =
  T extends any ? ColorMapping<number | null>[T] : never

export type ColorChannel<T extends ColorFormat = ColorFormat> =
  T extends any ? keyof ColorMapping[T] : never

export type RelativeColorChannel<T extends ColorFormat = ColorFormat> =
  T extends any ? keyof ColorMapping<number | null>[T] : never

export const Format = Object.fromEntries(
  formats.map((format: ColorFormat) => [format.toUpperCase(), format]),
) as Readonly<{ [K in ColorFormat as Uppercase<K>]: K }>

export const Channel = Object.fromEntries(
  Object.keys(fallback).map((format) => {
    const keys = Object.keys(fallback[format as ColorFormat])
    return keys.map(key => [key.toUpperCase(), key])
  }).flat(),
) as Readonly<{ [K in ColorChannel as Uppercase<K>]: K }>

export const channels = Array.from(new Set(Object.values(Channel))) as ColorChannel[]

export function formatFromChannel<T extends ColorFormat = ColorFormat>(channel: ColorChannel<T>): T {
  for (const [format, value] of Object.entries(fallback)) {
    if (channel in value) {
      return format as T
    }
  }
  throw new Error(`Invalid color channel: ${channel}`)
}
