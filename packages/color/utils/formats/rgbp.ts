import { ColorFormatError } from '../error'
import type { RGBPercentResult, RGBPercentVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGB } from './rgb'
import { ColorFormat } from './base'
import { HEX } from './hex'

export const RGBPercent: ColorFormatObject<RGBPercentVector, RGBPercentResult> = {
  format: ColorFormat.RGBPercent,

  parse(value) {
    const pattern = /rgb\((100|[1-9]?\d)%,\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]) / 100,
      Number.parseInt(result[2]) / 100,
      Number.parseInt(result[3]) / 100,
    ] as RGBPercentVector
  },

  stringify(value) {
    return `rgb(${value[0] * 100}%, ${value[1] * 100}%, ${value[2] * 100}%)`
  },

  serialize(value) {
    return {
      r: value[0],
      g: value[1],
      b: value[2],
      format: this.format,
    }
  },

  deserialize(value) {
    return [value.r, value.g, value.b]
  },

  toHEX(value) {
    const integer = ((Math.round(value[0] * 255) & 0xFF) << 16)
      + ((Math.round(value[1] * 255) & 0xFF) << 8)
      + (Math.round(value[2] * 255) & 0xFF)

    const string = integer.toString(16).toUpperCase()
    return `#${'000000'.substring(string.length)}${string}`
  },

  toHEXA(value) {
    return HEX.toHEXA(this.toHEX(value))
  },

  toRGB(value) {
    return [
      value[0] * 255,
      value[1] * 255,
      value[2] * 255,
    ]
  },

  toRGBA(value) {
    return [...this.toRGB(value), 1]
  },

  toRGBPercent(value) {
    return value
  },

  toRGBAPercent(value) {
    return [...value, 1]
  },

  toHSL(value) {
    return RGB.toHSL(this.toRGB(value))
  },

  toHSLA(value) {
    return RGB.toHSLA(this.toRGB(value))
  },

  toHSV(value) {
    return RGB.toHSV(this.toRGB(value))
  },

  toHSVA(value) {
    return RGB.toHSVA(this.toRGB(value))
  },
}
