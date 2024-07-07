import { ColorFormatError } from '../error'
import type { HEXResult, HEXValue, RGBAVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGB } from './rgb'
import { HEXA } from './hexa'
import { ColorFormat } from './base'

export const HEX: ColorFormatObject<HEXValue, HEXResult> & {
  toLongNotation: (value: string) => HEXValue
} = {
  format: ColorFormat.HEX,

  parse(value) {
    const pattern = /^#?(?:[a-f\d]{2}|[a-f\d])(?:[a-f\d]{2}|[a-f\d])(?:[a-f\d]{2}|[a-f\d])$/i
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format, `Parsing ${value}`)
    return result.join('') as HEXValue
  },

  stringify(value) {
    return this.toLongNotation(value)
  },

  serialize(value) {
    const hexLong = this.toLongNotation(value)
    const pattern = /^#?([a-f\d]{2}|[a-f\d])([a-f\d]{2}|[a-f\d])([a-f\d]{2}|[a-f\d])$/i
    const result = pattern.exec(hexLong)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format, `Converting ${value} to object`)
    return {
      hex: value,
      r: result[1],
      g: result[2],
      b: result[3],
      format: this.format,
    }
  },

  deserialize(value) {
    return value.hex
  },

  toLongNotation(value) {
    return HEXA.toLongNotation(value).substring(0, 7) as HEXValue
  },

  toHEX(value) {
    return this.toLongNotation(value)
  },

  toHEXA(value) {
    return `${this.toLongNotation(value)}FF` as HEXValue
  },

  toRGB(value) {
    const hexLong = this.toLongNotation(value)
    const pattern = /^#?([a-f\d]{2}|[a-f\d])([a-f\d]{2}|[a-f\d])([a-f\d]{2}|[a-f\d])$/i
    const result = pattern.exec(hexLong)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format, `Converting ${value} to RGB`)
    return [
      Number.parseInt(result[1], 16),
      Number.parseInt(result[2], 16),
      Number.parseInt(result[3], 16),
    ]
  },

  toRGBA(value) {
    return this.toRGB(value).concat(1) as RGBAVector
  },

  toRGBPercent(value) {
    const rgb = this.toRGB(value)
    return [
      rgb[0] / 255,
      rgb[1] / 255,
      rgb[2] / 255,
    ]
  },

  toRGBAPercent(value) {
    return this.toRGBPercent(value).concat(1) as RGBAVector
  },

  toHSL(value) {
    return RGB.toHSL(this.toRGB(value))
  },

  toHSLA(value) {
    return [...this.toHSL(value), 1]
  },

  toHSV(value) {
    return RGB.toHSV(this.toRGB(value))
  },

  toHSVA(value) {
    return [...this.toHSV(value), 1]
  },
}
