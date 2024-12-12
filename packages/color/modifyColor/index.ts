import type { Color, ColorFormat } from '../utils'
import { Format, convert, ensureColorFormat, formatsAlpha, normalize } from '../utils'

export interface ModifyColorOptions {
  /**
   * Set the value instead of adding it.
   */
  set?: boolean
  /**
   * The hue value to modify. The value is in degrees from 0 to 360.
   */
  hue?: number
  /**
   * The lightness value to modify. The value is from 0 to 1.
   */
  lightness?: number
  /**
   * The saturation value to modify. The value is from 0 to 1.
   */
  saturation?: number
  /**
   * The alpha value to modify. The value is from 0 to 1.
   */
  alpha?: number
  /**
   * The red value to modify. The value is from 0 to 1.
   */
  red?: number
  /**
   * The green value to modify. The value is from 0 to 1.
   */
  green?: number
  /**
   * The blue value to modify. The value is from 0 to 1.
   */
  blue?: number
}

/**
 * Modify a color value.
 * @param value - The color value to modify.
 * @param format - The format of the color value.
 * @param options - The options for the modification.
 */
export function modifyColor<TFormat extends ColorFormat>(
  value: Color<TFormat>,
  format: TFormat | string,
  options: ModifyColorOptions = {},
): Color<TFormat> {
  const {
    hue,
    lightness,
    saturation,
    alpha,
    red,
    green,
    blue,
    set = false,
  } = options

  const validFormat = ensureColorFormat<TFormat>(format)
  let result = value

  if (hue !== undefined || lightness !== undefined || saturation !== undefined) {
    let h, s, l
    if ([Format.HSL, Format.HSLA].find(f => f === validFormat)) {
      const val = value as Color<'hsl'>
      h = val.h
      s = val.s
      l = val.l
    }
    else {
      const val = convert[validFormat][Format.HSL](value)
      h = val.h
      s = val.s
      l = val.l
    }
    if (hue !== undefined)
      h = set ? hue : h + hue
    if (lightness !== undefined)
      l = set ? lightness : l + lightness
    if (saturation !== undefined)
      s = set ? saturation : s + saturation
    result = convert[Format.HSL][validFormat]({ h, s, l })
  }

  if ((red !== undefined || green !== undefined || blue !== undefined)) {
    let r, g, b
    if ([Format.RGB, Format.RGBA].find(f => f === validFormat)) {
      const val = value as Color<'rgb'>
      r = val.r
      g = val.g
      b = val.b
    }
    else {
      const val = convert[validFormat][Format.RGB](value)
      r = val.r
      g = val.g
      b = val.b
    }
    if (red !== undefined)
      r = set ? red : r + red
    if (green !== undefined)
      g = set ? green : g + green
    if (blue !== undefined)
      b = set ? blue : b + blue
    result = convert[Format.RGB][validFormat]({ r, g, b })
  }

  if (alpha !== undefined && formatsAlpha.find(f => f === validFormat)) {
    let { a } = value as any
    a += alpha
    result = { ...result, a }
  }

  return normalize[validFormat](result) // normalize the result
}
