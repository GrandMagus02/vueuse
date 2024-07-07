import { ColorFormatError } from '../error'
import type { HSLAResult, HSLAVector, HSLVector, RGBAVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGBA } from './rgba'
import { HSL } from './hsl'
import { ColorFormat } from './base'

export const HSLA: ColorFormatObject<HSLAVector, HSLAResult> = {
  format: ColorFormat.HSLA,

  parse(value) {
    const pattern = /hsla\((3[0-5]\d|[12]\d{2}|[1-9]?\d|360),\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%,\s*(\d*(?:\.\d+)?)\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]),
      Number.parseInt(result[2]),
      Number.parseInt(result[3]),
      Number.parseFloat(result[4]),
    ] as HSLAVector
  },

  stringify(value) {
    return `hsla(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`
  },

  serialize(value) {
    return {
      h: value[0],
      s: value[1],
      l: value[2],
      a: value[3],
      format: this.format,
    }
  },

  deserialize(value) {
    return [value.h, value.s, value.l, value.a]
  },

  toHEX(value) {
    return RGBA.toHEX(this.toRGBA(value))
  },

  toHEXA(value) {
    return RGBA.toHEXA(this.toRGBA(value))
  },

  toRGB(value) {
    return HSL.toRGB([value[0], value[1], value[2]])
  },

  toRGBA(value) {
    return this.toRGB(value).concat(value[3]) as RGBAVector
  },

  toRGBPercent(value) {
    return RGBA.toRGBPercent(this.toRGBA(value))
  },

  toRGBAPercent(value) {
    return RGBA.toRGBAPercent(this.toRGBA(value))
  },

  toHSL(value) {
    return value.slice(0, 3) as HSLVector
  },

  toHSLA(value) {
    return value
  },

  toHSV(value) {
    return HSL.toHSV(this.toHSL(value))
  },

  toHSVA(value) {
    return this.toHSV(value).concat(value[3]) as RGBAVector
  },
}
