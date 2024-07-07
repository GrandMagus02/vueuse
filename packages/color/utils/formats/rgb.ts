import { ColorFormatError } from '../error'
import type { HSLAVector, RGBResult, RGBVector } from '../converter'
import type { ColorFormatObject } from './base'
import { ColorFormat } from './base'
import { HEX } from './hex'

export const RGB: ColorFormatObject<RGBVector, RGBResult> = {
  format: ColorFormat.RGB,

  parse(value) {
    const pattern = /rgb\((25[0-5]|2[0-4]\d|[01]?\d{1,2}),\s*(25[0-5]|2[0-4]\d|[01]?\d{1,2}),\s*(25[0-5]|2[0-4]\d|[01]?\d{1,2})\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]),
      Number.parseInt(result[2]),
      Number.parseInt(result[3]),
    ] as RGBVector
  },

  stringify(value) {
    return `rgb(${value[0]}, ${value[1]}, ${value[2]})`
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
    return [value.r, value.g, value.b] as RGBVector
  },

  toHEX(value) {
    const integer = ((Math.round(value[0]) & 0xFF) << 16)
      + ((Math.round(value[1]) & 0xFF) << 8)
      + (Math.round(value[2]) & 0xFF)

    const string = integer.toString(16).toUpperCase()
    return `#${'000000'.substring(string.length)}${string}`
  },

  toHEXA(value) {
    return HEX.toHEXA(this.toHEX(value))
  },

  toRGB(value) {
    return value
  },

  toRGBA(value) {
    return [...value, 1]
  },

  toRGBPercent(value) {
    return [
      value[0] / 255,
      value[1] / 255,
      value[2] / 255,
    ]
  },

  toRGBAPercent(value) {
    return [...this.toRGBPercent(value), 1]
  },

  toHSL(value) {
    const r = value[0] / 255
    const g = value[1] / 255
    const b = value[2] / 255

    const min = Math.min(r, g, b)
    const max = Math.max(r, g, b)
    const delta = max - min
    let h
    let s

    if (max === min) {
      h = 0
    }
    else if (r === max) {
      h = (g - b) / delta
    }
    else if (g === max) {
      h = 2 + (b - r) / delta
    }
    else if (b === max) {
      h = 4 + (r - g) / delta
    }
    else {
      throw new Error('Unexpected condition')
    }

    h = Math.min(h * 60, 360)

    if (h < 0) {
      h += 360
    }

    const l = (min + max) / 2

    if (max === min) {
      s = 0
    }
    else if (l <= 0.5) {
      s = delta / (max + min)
    }
    else {
      s = delta / (2 - max - min)
    }

    return [h, s * 100, l * 100]
  },

  toHSLA(value) {
    return this.toHSL(value).concat(1) as HSLAVector
  },

  toHSV(value) {
    let rdif
    let gdif
    let bdif
    let h
    let s

    const r = value[0] / 255
    const g = value[1] / 255
    const b = value[2] / 255

    const v = Math.max(r, g, b)
    const diff = v - Math.min(r, g, b)
    const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2
    if (diff === 0) {
      h = 0
      s = 0
    }
    else {
      s = diff / v
      rdif = diffc(r)
      gdif = diffc(g)
      bdif = diffc(b)

      if (r === v) {
        h = bdif - gdif
      }
      else if (g === v) {
        h = (1 / 3) + rdif - bdif
      }
      else if (b === v) {
        h = (2 / 3) + gdif - rdif
      }
      else {
        throw new Error('Unexpected condition')
      }

      if (h < 0) {
        h += 1
      }
      else if (h > 1) {
        h -= 1
      }
    }

    return [h * 360, s * 100, v * 100]
  },

  toHSVA(value) {
    return [...this.toHSV(value), 1]
  },
}
