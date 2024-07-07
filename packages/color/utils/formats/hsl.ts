import { ColorFormatError } from '../error'
import type { ColorFormatObject } from './base'
import { RGB } from './rgb'
import type { HSLResult, HSLVector, RGBAVector } from '../converter'
import { ColorFormat } from './base'

export const HSL: ColorFormatObject<HSLVector, HSLResult> = {
  format: ColorFormat.HSL,

  parse(value) {
    const pattern = /hsl\((3[0-5]\d|[12]\d{2}|[1-9]?\d|360),\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%\)/
    const result = pattern.exec(value)
    if (!result)
      throw new ColorFormatError(`Invalid ${this.format} color`, value, this.format)
    return [
      Number.parseInt(result[1]),
      Number.parseInt(result[2]),
      Number.parseInt(result[3]),
    ] as HSLVector
  },

  stringify(value) {
    return `hsl(${value[0]}, ${value[1]}%, ${value[2]}%)`
  },

  serialize(value) {
    return {
      h: value[0],
      s: value[1],
      l: value[2],
      format: this.format,
    }
  },

  deserialize(value) {
    return [value.h, value.s, value.l]
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
    const l = value[2] / 100
    let t2
    let t3
    let val

    if (s === 0) {
      val = l * 255
      return [val, val, val]
    }

    if (l < 0.5) {
      t2 = l * (1 + s)
    }
    else {
      t2 = l + s - l * s
    }

    const t1 = 2 * l - t2

    const rgb = [0, 0, 0]
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1)
      if (t3 < 0) {
        t3++
      }

      if (t3 > 1) {
        t3--
      }

      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3
      }
      else if (2 * t3 < 1) {
        val = t2
      }
      else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
      }
      else {
        val = t1
      }

      rgb[i] = val * 255
    }

    return [Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])]
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
    return value
  },

  toHSLA(value) {
    return [...value, 1]
  },

  toHSV(value) {
    const h = value[0]
    let s = value[1] / 100
    let l = value[2] / 100
    let smin = s
    const lmin = Math.max(l, 0.01)

    l *= 2
    s *= (l <= 1) ? l : 2 - l
    smin *= lmin <= 1 ? lmin : 2 - lmin
    const v = (l + s) / 2
    const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

    return [h, sv * 100, v * 100]
  },

  toHSVA(value) {
    return [...this.toHSV(value), 1]
  },
}
