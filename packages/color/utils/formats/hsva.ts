import { ColorFormatError } from '../error'
import type { HSVAResult, HSVAVector, HSVVector, RGBAVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGB } from './rgb'
import { ColorFormat } from './base'
import { HSV } from './hsv'

export const HSVA: ColorFormatObject<HSVAVector, HSVAResult> = {
  format: ColorFormat.HSVA,

  parse(value) {
    const pattern = /hsva\((3[0-5]\d|[12]\d{2}|[1-9]?\d|360),\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%,\s*(1|0(?:\.\d+)?)\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]),
      Number.parseInt(result[2]),
      Number.parseInt(result[3]),
      Number.parseFloat(result[4]),
    ] as HSVAVector
  },

  stringify(value) {
    return `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`
  },

  serialize(value) {
    return {
      h: value[0],
      s: value[1],
      v: value[2],
      a: value[3],
      format: this.format,
    }
  },

  deserialize(value) {
    return [value.h, value.s, value.v, value.a]
  },

  toHEX(value) {
    return RGB.toHEX(this.toRGB(value))
  },

  toHEXA(value) {
    return RGB.toHEXA(this.toRGB(value))
  },

  toRGB(value) {
    return HSV.toRGB([value[0], value[1], value[2]])
  },

  toRGBA(value) {
    return this.toRGB(value).concat(value[3]) as RGBAVector
  },

  toRGBPercent(value) {
    return RGB.toRGBPercent(this.toRGB(value))
  },

  toRGBAPercent(value) {
    return RGB.toRGBAPercent(this.toRGB(value))
  },

  toHSL(value) {
    return HSV.toHSL([value[0], value[1], value[2]])
  },

  toHSLA(value) {
    const alpha = value[3]
    return [...this.toHSL(value), alpha]
  },

  toHSV(value) {
    return value.slice(0, 3) as HSVVector
  },

  toHSVA(value) {
    return value
  },
}
