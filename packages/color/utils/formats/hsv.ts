import { ColorFormatError } from '../error'
import type { HSLVector, HSVResult, HSVVector, RGBAVector } from '../converter'
import type { ColorFormatObject } from './base'
import { RGB } from './rgb'
import { ColorFormat } from './base'

export const HSV: ColorFormatObject<HSVVector, HSVResult> = {
  format: ColorFormat.HSV,

  parse(value) {
    const pattern = /hsv\((3[0-5]\d|[12]\d{2}|[1-9]?\d|360),\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]),
      Number.parseInt(result[2]),
      Number.parseInt(result[3]),
    ] as HSVVector
  },

  stringify(value) {
    return `hsv(${value[0]}, ${value[1]}%, ${value[2]}%)`
  },

  serialize(value) {
    return {
      h: value[0],
      s: value[1],
      v: value[2],
      format: this.format,
    }
  },

  deserialize(value) {
    return [value.h, value.s, value.v]
  },

  toHEX(value) {
    return RGB.toHEX(this.toRGB(value))
  },

  toHEXA(value) {
    return RGB.toHEXA(this.toRGB(value))
  },

  toRGB(value) {
    const h = value[0] / 360
    const s = value[1] / 100
    const v = value[2] / 100
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    let r, g, b
    switch (i % 6) {
      case 0:
        r = v
        g = t
        b = p
        break
      case 1:
        r = q
        g = v
        b = p
        break
      case 2:
        r = p
        g = v
        b = t
        break
      case 3:
        r = p
        g = q
        b = v
        break
      case 4:
        r = t
        g = p
        b = v
        break
      case 5:
        r = v
        g = p
        b = q
        break
      default:
        throw new Error('Unexpected condition')
    }
    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255),
    ]
  },

  toRGBA(value) {
    return this.toRGB(value).concat(1) as RGBAVector
  },

  toRGBPercent(value) {
    return RGB.toRGBPercent(this.toRGB(value))
  },

  toRGBAPercent(value) {
    return RGB.toRGBAPercent(this.toRGB(value))
  },

  toHSL(value) {
    const h = value[0]
    const s = value[1] / 100
    const v = value[2] / 100
    const l = v - v * s / 2
    const m = Math.min(l, 1 - l)
    return [
      h,
      m === 0 ? 0 : (v - l) / Math.min(l, 1 - l) * 100,
      l * 100,
    ] as HSLVector
  },

  toHSLA(value) {
    return [...this.toHSL(value), 1]
  },

  toHSV(value) {
    return value
  },

  toHSVA(value) {
    return [...value, 1]
  },
}
