import { ColorFormatError } from '../error'
import type { HEXAResult, HEXAValue, HEXValue, RGBAVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGB } from './rgb'
import { RGBA } from './rgba'
import { ColorFormat } from './base'

export const HEXA: ColorFormatObject<HEXAValue, HEXAResult> & {
  toLongNotation: (value: string) => HEXAValue
} = {
  format: ColorFormat.HEXA,

  parse(value) {
    const pattern = /^#?([a-f\d]{2}|[a-f\d])([a-f\d]{2}|[a-f\d])([a-f\d]{2}|[a-f\d])([a-f\d]{2}|[a-f\d])$/i
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format, `Parsing ${value}`)
    return result.join('') as HEXAValue
  },

  stringify(value) {
    return this.toLongNotation(value)
  },

  serialize(value) {
    const hex = this.toLongNotation(value).substring(0, 7) as HEXValue
    const hexa = this.toLongNotation(value)
    return {
      hex,
      hexa,
      r: hex.slice(1, 3),
      g: hex.slice(3, 5),
      b: hex.slice(5, 7),
      a: value.slice(7, 9),
      format: this.format,
    }
  },

  deserialize(value) {
    return value.hexa
  },

  toLongNotation(value): HEXValue {
    if (!value.startsWith('#')) {
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format, `Converting ${value} to long notation`)
    }
    if (value.length === 4) {
      const r = value[1]
      const g = value[2]
      const b = value[3]
      return `#${r}${r}${g}${g}${b}${b}`
    }
    else if (value.length === 5) {
      const r = value[1]
      const g = value[2]
      const b = value[3]
      const a = value[4]
      return `#${r}${r}${g}${g}${b}${b}${a}${a}` as HEXAValue
    }
    else if (value.length === 7) {
      return value as HEXValue
    }
    else if (value.length === 8) {
      return `#${value.substring(1, 7)}0${value[7]}` as HEXAValue
    }
    else if (value.length === 9) {
      return value as HEXValue
    }
    else if (value.length > 9) {
      return value.substring(0, 9) as HEXAValue
    }
    else {
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format, `Converting ${value} to long notation`)
    }
  },

  toHEX(value) {
    return this.toLongNotation(value).substring(0, 7) as HEXValue
  },

  toHEXA(value) {
    return this.toLongNotation(value) as HEXAValue
  },

  toRGB(value) {
    const pattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1], 16),
      Number.parseInt(result[2], 16),
      Number.parseInt(result[3], 16),
    ]
  },

  toRGBA(value) {
    const pattern = /^#?[a-f\d]{6}([a-f\d]{2})/i
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    const alpha = Number.parseInt(result[1], 16) / 255
    return this.toRGB(value).concat(alpha) as RGBAVector
  },

  toRGBPercent(value) {
    return RGB.toRGBPercent(this.toRGB(value))
  },

  toRGBAPercent(value) {
    return RGBA.toRGBAPercent(this.toRGBA(value))
  },

  toHSL(value) {
    return RGB.toHSL(this.toRGB(value))
  },

  toHSLA(value) {
    return RGBA.toHSLA(this.toRGBA(value))
  },

  toHSV(value) {
    return RGB.toHSV(this.toRGB(value))
  },

  toHSVA(value) {
    return RGBA.toHSVA(this.toRGBA(value))
  },
}
