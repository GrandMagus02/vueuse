import type { FormatRGB } from '@vueuse/color'
import { Format } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import { SRGB_GAMMA, SRGB_OFFSET, SRGB_SCALE, SRGB_SCALE_FACTOR, SRGB_THRESHOLD } from '../constants'
import type { RelativeColor } from '../format'
import { nonNullable } from './common'

export function rgbToHex(value: Partial<RelativeColor<FormatRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.RGB)
  const hex = (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)
  return normalize.hex({ hex, r, g, b, a }, options)
}

export function rgbToHsl(value: Partial<RelativeColor<FormatRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.RGB)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l
  h = s = l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  }
  else {
    const delta = max - min

    s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min)

    if (max === r) {
      h = (g - b) / delta + (g < b ? 6 : 0)
    }
    else if (max === g) {
      h = (b - r) / delta + 2
    }
    else {
      h = (r - g) / delta + 4
    }

    h /= 6
  }

  return normalize.hsl({ h, s, l, a }, options)
}

export function rgbToHsv(value: Partial<RelativeColor<FormatRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.RGB)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, v
  h = s = v = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  }
  else {
    const delta = max - min

    s = ((max + min) / 2) < 0.5 ? delta / (max + min) : delta / (2 - max - min)

    if (max === r) {
      h = ((g - b) / delta) % 6
    }
    else if (max === g) {
      h = (b - r) / delta + 2
    }
    else {
      h = (r - g) / delta + 4
    }

    h /= 6
  }

  return normalize.hsv({ h, s, v, a }, options)
}

export function rgbToCmyk(value: Partial<RelativeColor<FormatRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.RGB)
  const c = 1 - r
  const m = 1 - g
  const y = 1 - b
  const k = Math.min(c, m, y)
  return normalize.cmyk({ c, m, y, k, a }, options)
}

export function rgbToHwb(value: Partial<RelativeColor<FormatRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.RGB)

  const w = Math.min(r, g, b)
  const v = Math.max(r, g, b)
  const bl = 1 - v

  if (v === w)
    return { h: 0, w, b: bl, a }
  const f = r === w ? g - b : (g === w ? b - r : r - g)
  const i = r === w ? 3 : (g === w ? 5 : 1)

  const h = (i - f / (v - w)) / 6

  return normalize.hwb({ h, w, b: bl, a }, options)
}

export function rgbToRgbL(value: Partial<RelativeColor<FormatRGB>>, options?: NormalizeOptions) {
  const { r, g, b, a = 1 } = nonNullable(value, Format.RGB)

  const f = (c: number) => c > SRGB_THRESHOLD
    ? ((c + SRGB_OFFSET) / SRGB_SCALE) ** SRGB_GAMMA
    : c / SRGB_SCALE_FACTOR

  return normalize.lrgb({ r: f(r), g: f(g), b: f(b), a }, options)
}
