import { ColorFormatError } from '../error'
import type { RGBAResult, RGBAVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGB } from './rgb'
import { HEXA } from './hexa'
import { HEX } from './hex'
import { ColorFormat } from './base'

export const RGBA: ColorFormatObject<RGBAVector, RGBAResult> = {
  format: ColorFormat.RGBA,

  parse(value) {
    const pattern = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]),
      Number.parseInt(result[2]),
      Number.parseInt(result[3]),
      Number.parseFloat(result[4]),
    ]
  },

  stringify(value) {
    return `rgba(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`
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
    const integer = ((Math.round(value[0]) & 0xFF) << 16)
      + ((Math.round(value[1]) & 0xFF) << 8)
      + (Math.round(value[2]) & 0xFF)

    const string = integer.toString(16).toUpperCase()
    return HEX.toLongNotation(`#${'000000'.substring(string.length)}${string}`)
  },

  toHEXA(value) {
    return HEXA.toLongNotation(`${this.toHEX(value)}${Math.round(value[3] * 255).toString(16).toUpperCase()}`)
  },

  toRGB(value) {
    return [value[0], value[1], value[2]]
  },

  toRGBA(value) {
    return value
  },

  toRGBPercent(value) {
    return RGB.toRGBPercent(this.toRGB(value))
  },

  toRGBAPercent(value) {
    return [...this.toRGBPercent(value), value[3]]
  },

  toHSL(value) {
    return RGB.toHSL(this.toRGB(value))
  },

  toHSLA(value) {
    return [...this.toHSL(value), value[3]]
  },

  toHSV(value) {
    return RGB.toHSV(this.toRGB(value))
  },

  toHSVA(value) {
    return [...this.toHSV(value), value[3]]
  },
}
