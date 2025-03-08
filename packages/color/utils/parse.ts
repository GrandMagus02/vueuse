import type { Color, ColorChannel, ColorFormat, HEX } from './format'
import { Format } from './format'
import { parseRgbString } from './parsers/rgb'
import { fallback } from './fallback'
import { parseHexString } from './parsers/hex'
import { parseHslString } from './parsers/hsl'
import { parseHwbString } from './parsers/hwb'
import { parseLabString } from './parsers/lab'
import type { ColorKeywordName } from './keywords'
import { ColorKeyword } from './keywords'

function parseObjectBuild<TFormat extends ColorFormat>(format: TFormat, optional: ColorChannel[] = []): (value: object) => Color<TFormat> | undefined {
  return (value: object) => {
    const keys = Object.keys(value)
    const required = Object.keys(fallback[format])
    const missing = required.filter(key => !keys.includes(key)).filter(key => !optional.includes(key as ColorChannel))
    if (missing.length) {
      return undefined
    }
    return value as Color<TFormat>
  }
}

function parseBuild<TFormat extends ColorFormat>(
  parseString?: (value: string) => Color<TFormat> | undefined,
  parseObject?: (value: object) => Color<TFormat> | undefined,
  parseArray?: (value: number[]) => Color<TFormat> | undefined,
): (value: unknown) => Color<TFormat> | undefined {
  return (value: unknown) => {
    try {
      if (typeof value === 'string' && parseString) {
        return parseString(value)
      }
      else if (typeof value === 'object' && value !== null && parseObject) {
        return parseObject(value)
      }
      else if (Array.isArray(value) && parseArray) {
        return parseArray(value)
      }
    }
    catch {
    }
    return undefined
  }
}

const parse: { [F in ColorFormat]: (value: unknown) => Color<F> | undefined } & { keyword: (value: unknown) => HEX | undefined } = {
  rgb: parseBuild<'rgb'>(parseRgbString, parseObjectBuild(Format.RGB, ['a'])),
  lrgb: parseBuild<'lrgb'>(undefined, parseObjectBuild(Format.LRGB, ['a'])),
  hex: parseBuild<'hex'>(parseHexString, parseObjectBuild(Format.HEX, ['a'])),
  hsl: parseBuild<'hsl'>(parseHslString, parseObjectBuild(Format.HSL, ['a'])),
  hsv: parseBuild<'hsv'>(undefined, parseObjectBuild(Format.HSV, ['a'])),
  cmyk: parseBuild<'cmyk'>(undefined, parseObjectBuild(Format.CMYK, ['a'])),
  hwb: parseBuild<'hwb'>(parseHwbString, parseObjectBuild(Format.HWB, ['a'])),
  xyz: parseBuild<'xyz'>(undefined, parseObjectBuild(Format.XYZ, ['a'])),
  lab: parseBuild<'lab'>(parseLabString, parseObjectBuild(Format.LAB, ['A'])),
  lch: parseBuild<'lch'>(undefined, parseObjectBuild(Format.LCH, ['a'])),
  lms: parseBuild<'lms'>(undefined, parseObjectBuild(Format.LMS, ['a'])),
  oklab: parseBuild<'oklab'>(undefined, parseObjectBuild(Format.OKLAB, ['A'])),
  oklch: parseBuild<'oklch'>(undefined, parseObjectBuild(Format.OKLCH, ['a'])),
  keyword: (value: unknown) => {
    try {
      if (typeof value === 'string') {
        const name = (value[0].toUpperCase() + value.slice(1).toLowerCase()) as ColorKeywordName
        return parseHexString(ColorKeyword[name])
      }
    }
    catch {
    }
    return undefined
  },
}

export { parse }
