import type { ColorFormatValue } from '../converter'

export enum ColorFormat {
  RGB = 'rgb',
  RGBPercent = 'rgbp',
  RGBA = 'rgba',
  RGBAPercent = 'rgbap',
  HSL = 'hsl',
  HSLA = 'hsla',
  HEX = 'hex',
  HEXA = 'hexa',
  HSV = 'hsv',
  HSVA = 'hsva',
}

export type ColorFormatString = `${ColorFormat}`

type TransformKey<K extends string> = `to${Capitalize<K>}`
type ColorFormatConverter<TInput> = {
  [K in keyof typeof ColorFormat as TransformKey<K>]: (value: TInput) => ColorFormatValue<(typeof ColorFormat)[K]>
}

export interface ColorFormatObject<TArray, TResult> extends ColorFormatConverter<TArray> {
  format: ColorFormat
  parse: (value: string) => TArray
  stringify: (value: TArray) => string
  serialize: (value: TArray) => TResult
  deserialize: (value: TResult) => TArray
}
