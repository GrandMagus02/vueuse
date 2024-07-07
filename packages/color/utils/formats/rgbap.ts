import { ColorFormatError } from '../error'
import type { RGBAPercentResult, RGBAPercentVector, RGBVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGBA } from './rgba'
import { ColorFormat } from './base'
import { HEX } from './hex'

export const RGBAPercent: ColorFormatObject<RGBAPercentVector, RGBAPercentResult> = {
  format: ColorFormat.RGBAPercent,

  parse(value) {
    const pattern = /rgba\((100|[1-9]?\d)%,\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%,\s*(\d+(?:\.\d+)?)\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]) / 100,
      Number.parseInt(result[2]) / 100,
      Number.parseInt(result[3]) / 100,
      Number.parseFloat(result[4]),
    ] as RGBAPercentVector
  },

  stringify(value) {
    return `rgba(${Math.round(value[0] * 100)}%, ${Math.round(value[1] * 100)}%, ${Math.round(value[2] * 100)}%, ${value[3]})`
  },

  serialize(value) {
    return {
      r: value[0],
      g: value[1],
      b: value[2],
      a: value[3],
      format: this.format,
    }
  },

  deserialize(value) {
    return [value.r, value.g, value.b, value.a]
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
    ] as RGBVector
  },

  toRGBA(value) {
    return [...this.toRGB(value), value[3]]
  },

  toRGBPercent(value) {
    return [value[0], value[1], value[2]]
  },

  toRGBAPercent(value) {
    return value
  },

  toHSL(value) {
    return RGBA.toHSL(this.toRGBA(value))
  },

  toHSLA(value) {
    return RGBA.toHSLA(this.toRGBA(value))
  },

  toHSV(value) {
    return RGBA.toHSV(this.toRGBA(value))
  },

  toHSVA(value) {
    return RGBA.toHSVA(this.toRGBA(value))
  },
}
