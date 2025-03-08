import type {
  ColorFormat,
  RelativeColor,
} from './format'
import { pipe, same } from './convertions/common'
import {
  cmykToRgb,
  hexToKeyword,
  hexToRgb,
  hslToHsv,
  hslToHwb,
  hslToRgb,
  hsvToHsl,
  hsvToHwb,
  hsvToRgb,
  hwbToHsv,
  hwbToRgb,
  labToLch,
  labToXyz,
  lchToLab,
  lmsToOkLab,
  lmsToXyz,
  lrgbToRgb,
  lrgbToXyz,
  okLabToLms,
  okLabToOkLch,
  okLchToOkLab,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToHwb,
  rgbToRgbL,
  xyzToLab,
  xyzToLms,
  xyzToRgbL,
} from './convertions'
import type { NormalizeOptions } from './normalize'

export interface ConvertOptions extends NormalizeOptions {}

const rgbToRgb = same('rgb')
const rgbToXyz = pipe(rgbToRgbL, lrgbToXyz)
const rgbToLab = pipe(rgbToXyz, xyzToLab)
const rgbToLch = pipe(rgbToLab, labToLch)
const rgbToLms = pipe(rgbToXyz, xyzToLms)
const rgbToOkLab = pipe(rgbToLms, lmsToOkLab)
const rgbToOkLch = pipe(rgbToOkLab, okLabToOkLch)
const rgbToKeyword = pipe(rgbToHex, hexToKeyword)

const lrgbToRgbl = same('lrgb')
const lrgbToHex = pipe(lrgbToRgb, rgbToHex)
const lrgbToLch = pipe(lrgbToXyz, xyzToLab, labToLch)
const lrgbToLms = pipe(lrgbToXyz, xyzToLms)
const lrgbToOkLab = pipe(lrgbToLms, lmsToOkLab)
const lrgbToOkLch = pipe(lrgbToOkLab, okLabToOkLch)
const lrgbToHsl = pipe(lrgbToRgb, rgbToHsl)
const lrgbToHsv = pipe(lrgbToRgb, rgbToHsv)
const lrgbToHwb = pipe(lrgbToRgb, rgbToHwb)
const lrgbToCmyk = pipe(lrgbToRgb, rgbToCmyk)
const lrgbToLab = pipe(lrgbToXyz, xyzToLab)
const lrgbToKeyword = pipe(lrgbToHex, hexToKeyword)

const hexToHex = same('hex')
const hexToXyz = pipe(hexToRgb, rgbToRgbL, lrgbToXyz)
const hexToLab = pipe(hexToXyz, xyzToLab)
const hexToLch = pipe(hexToLab, labToLch)
const hexToLms = pipe(hexToXyz, xyzToLms)
const hexToOkLab = pipe(hexToLms, lmsToOkLab)
const hexToOkLch = pipe(hexToOkLab, okLabToOkLch)
const hexToRgbl = pipe(hexToRgb, rgbToRgbL)
const hexToHsl = pipe(hexToRgb, rgbToHsl)
const hexToHsv = pipe(hexToRgb, rgbToHsv)
const hexToHwb = pipe(hexToRgb, rgbToHwb)
const hexToCmyk = pipe(hexToRgb, rgbToCmyk)

const hslToHsl = same('hsl')
const hslToXyz = pipe(hslToRgb, rgbToRgbL, lrgbToXyz)
const hslToLab = pipe(hslToXyz, xyzToLab)
const hslToLch = pipe(hslToLab, labToLch)
const hslToLms = pipe(hslToXyz, xyzToLms)
const hslToOkLab = pipe(hslToLms, lmsToOkLab)
const hslToOkLch = pipe(hslToOkLab, okLabToOkLch)
const hslToRgbl = pipe(hslToRgb, rgbToRgbL)
const hslToHex = pipe(hslToRgb, rgbToHex)
const hslToCmyk = pipe(hslToRgb, rgbToCmyk)
const hslToKeyword = pipe(hslToHex, hexToKeyword)

const hsvToHsv = same('hsv')
const hsvToXyz = pipe(hsvToRgb, rgbToRgbL, lrgbToXyz)
const hsvToLab = pipe(hsvToXyz, xyzToLab)
const hsvToLch = pipe(hsvToLab, labToLch)
const hsvToLms = pipe(hsvToXyz, xyzToLms)
const hsvToOkLab = pipe(hsvToLms, lmsToOkLab)
const hsvToOkLch = pipe(hsvToOkLab, okLabToOkLch)
const hsvToRgbl = pipe(hsvToRgb, rgbToRgbL)
const hsvToHex = pipe(hsvToRgb, rgbToHex)
const hsvToCmyk = pipe(hsvToRgb, rgbToCmyk)
const hsvToKeyword = pipe(hsvToHex, hexToKeyword)

const hwbToHwb = same('hwb')
const hwbToXyz = pipe(hwbToRgb, rgbToRgbL, lrgbToXyz)
const hwbToLab = pipe(hwbToXyz, xyzToLab)
const hwbToLch = pipe(hwbToLab, labToLch)
const hwbToLms = pipe(hwbToXyz, xyzToLms)
const hwbToOkLab = pipe(hwbToLms, lmsToOkLab)
const hwbToOkLch = pipe(hwbToOkLab, okLabToOkLch)
const hwbToRgbl = pipe(hwbToRgb, rgbToRgbL)
const hwbToHex = pipe(hwbToRgb, rgbToHex)
const hwbToHsl = pipe(hwbToRgb, rgbToHsl)
const hwbToCmyk = pipe(hwbToRgb, rgbToCmyk)
const hwbToKeyword = pipe(hwbToHex, hexToKeyword)

const cmykToCmyk = same('cmyk')
const cmykToXyz = pipe(cmykToRgb, rgbToRgbL, lrgbToXyz)
const cmykToLab = pipe(cmykToXyz, xyzToLab)
const cmykToLch = pipe(cmykToLab, labToLch)
const cmykToLms = pipe(cmykToXyz, xyzToLms)
const cmykToOkLab = pipe(cmykToLms, lmsToOkLab)
const cmykToOkLch = pipe(cmykToOkLab, okLabToOkLch)
const cmykToRgbl = pipe(cmykToRgb, rgbToRgbL)
const cmykToHex = pipe(cmykToRgb, rgbToHex)
const cmykToHsl = pipe(cmykToRgb, rgbToHsl)
const cmykToHsv = pipe(cmykToRgb, rgbToHsv)
const cmykToHwb = pipe(cmykToRgb, rgbToHwb)
const cmykToKeyword = pipe(cmykToHex, hexToKeyword)

const xyzToXyz = same('xyz')
const xyzToRgb = pipe(xyzToRgbL, lrgbToRgb)
const xyzToHex = pipe(xyzToRgb, rgbToHex)
const xyzToHsl = pipe(xyzToRgb, rgbToHsl)
const xyzToHsv = pipe(xyzToRgb, rgbToHsv)
const xyzToHwb = pipe(xyzToHsl, hslToHwb)
const xyzToCmyk = pipe(xyzToRgb, rgbToCmyk)
const xyzToLch = pipe(xyzToLab, labToLch)
const xyzToOkLab = pipe(xyzToLms, lmsToOkLab)
const xyzToOkLch = pipe(xyzToOkLab, okLabToOkLch)
const xyzToKeyword = pipe(xyzToHex, hexToKeyword)

const labToLab = same('lab')
const labToLms = pipe(labToXyz, xyzToLms)
const labToRgb = pipe(labToXyz, xyzToRgbL, lrgbToRgb)
const labToOkLab = pipe(labToLms, lmsToOkLab)
const labToOkLch = pipe(labToOkLab, okLabToOkLch)
const labToRgbl = pipe(labToRgb, rgbToRgbL)
const labToHex = pipe(labToRgb, rgbToHex)
const labToHsl = pipe(labToRgb, rgbToHsl)
const labToHsv = pipe(labToRgb, rgbToHsv)
const labToHwb = pipe(labToRgb, rgbToHwb)
const labToCmyk = pipe(labToRgb, rgbToCmyk)
const labToKeyword = pipe(labToHex, hexToKeyword)

const lchToLch = same('lch')
const lchToXyz = pipe(lchToLab, labToXyz)
const lchToRgbL = pipe(lchToXyz, xyzToRgbL)
const lchToRgb = pipe(lchToRgbL, lrgbToRgb)
const lchToHex = pipe(lchToRgb, rgbToHex)
const lchToHsl = pipe(lchToRgb, rgbToHsl)
const lchToHsv = pipe(lchToRgb, rgbToHsv)
const lchToHwb = pipe(lchToRgb, rgbToHwb)
const lchToCmyk = pipe(lchToRgb, rgbToCmyk)
const lchToLms = pipe(lchToXyz, xyzToLms)
const lchToOkLab = pipe(lchToLms, lmsToOkLab)
const lchToOkLch = pipe(lchToOkLab, okLabToOkLch)
const lchToRgbInline = pipe(lchToLab, labToRgb)
const lchToKeyword = pipe(lchToHex, hexToKeyword)

const lmsToLms = same('lms')
const lmsToRgbL = pipe(lmsToXyz, xyzToRgbL)
const lmsToRgb = pipe(lmsToRgbL, lrgbToRgb)
const lmsToHex = pipe(lmsToRgb, rgbToHex)
const lmsToHsl = pipe(lmsToRgb, rgbToHsl)
const lmsToHsv = pipe(lmsToRgb, rgbToHsv)
const lmsToHwb = pipe(lmsToRgb, rgbToHwb)
const lmsToCmyk = pipe(lmsToRgb, rgbToCmyk)
const lmsToLab = pipe(lmsToXyz, xyzToLab)
const lmsToLch = pipe(lmsToLab, okLabToOkLch)
const lmsToOklch = pipe(lmsToOkLab, okLabToOkLch)
const lmsToKeyword = pipe(lmsToHex, hexToKeyword)

const okLabToOkLab = same('oklab')
const okLabToXyz = pipe(okLabToLms, lmsToXyz)
const okLabToRgbL = pipe(okLabToXyz, xyzToRgbL)
const okLabToRgb = pipe(okLabToRgbL, lrgbToRgb)
const okLabToLab = pipe(okLabToXyz, xyzToLab)
const okLabToLch = pipe(okLabToLab, labToLch)
const okLabToHex = pipe(okLabToRgb, rgbToHex)
const okLabToHsl = pipe(okLabToRgb, rgbToHsl)
const okLabToHsv = pipe(okLabToRgb, rgbToHsv)
const okLabToHwb = pipe(okLabToRgb, rgbToHwb)
const okLabToCmyk = pipe(okLabToRgb, rgbToCmyk)
const okLabToKeyword = pipe(okLabToHex, hexToKeyword)

const okLchToOkLch = same('oklch')
const okLchToXyz = pipe(okLchToOkLab, okLabToXyz)
const okLchToRgbL = pipe(okLchToOkLab, okLabToRgbL)
const okLchToRgb = pipe(okLchToOkLab, okLabToRgb)
const okLchToLab = pipe(okLchToOkLab, okLabToLab)
const okLchToHex = pipe(okLchToRgb, rgbToHex)
const okLchToHsl = pipe(okLchToRgb, rgbToHsl)
const okLchToHsv = pipe(okLchToRgb, rgbToHsv)
const okLchToHwb = pipe(okLchToRgb, rgbToHwb)
const okLchToCmyk = pipe(okLchToRgb, rgbToCmyk)
const okLchToLch = pipe(okLchToOkLab, okLabToLch)
const okLchToLms = pipe(okLchToOkLab, okLabToLms)
const okLchToKeyword = pipe(okLchToHex, hexToKeyword)

const keywordToKeyword = same('keyword')
const keywordToHex = same('hex')
const keywordToRgb = pipe(keywordToHex, hexToRgb)
const keywordToHsl = pipe(keywordToRgb, rgbToHsl)
const keywordToHsv = pipe(keywordToRgb, rgbToHsv)
const keywordToHwb = pipe(keywordToRgb, rgbToHwb)
const keywordToCmyk = pipe(keywordToRgb, rgbToCmyk)
const keywordToXyz = pipe(keywordToRgb, rgbToRgbL, lrgbToXyz)
const keywordToLab = pipe(keywordToXyz, xyzToLab)
const keywordToLch = pipe(keywordToLab, labToLch)
const keywordToLms = pipe(keywordToXyz, xyzToLms)
const keywordToOkLab = pipe(keywordToLms, lmsToOkLab)
const keywordToOkLch = pipe(keywordToOkLab, okLabToOkLch)

export const convert: { [From in ColorFormat]: { [To in ColorFormat]: (value: Partial<RelativeColor<From>>, options?: ConvertOptions) => Partial<RelativeColor<To>> } } = {
  rgb: {
    rgb: rgbToRgb,
    lrgb: rgbToRgbL,
    hex: rgbToHex,
    hsl: rgbToHsl,
    hsv: rgbToHsv,
    hwb: rgbToHwb,
    cmyk: rgbToCmyk,
    xyz: rgbToXyz,
    lab: rgbToLab,
    lch: rgbToLch,
    oklab: rgbToOkLab,
    oklch: rgbToOkLch,
    lms: rgbToLms,
    keyword: rgbToKeyword,
  },
  lrgb: {
    rgb: lrgbToRgb,
    lrgb: lrgbToRgbl,
    hex: lrgbToHex,
    hsl: lrgbToHsl,
    hsv: lrgbToHsv,
    hwb: lrgbToHwb,
    cmyk: lrgbToCmyk,
    xyz: lrgbToXyz,
    lab: lrgbToLab,
    lch: lrgbToLch,
    lms: lrgbToLms,
    oklab: lrgbToOkLab,
    oklch: lrgbToOkLch,
    keyword: lrgbToKeyword,
  },
  hex: {
    rgb: hexToRgb,
    lrgb: hexToRgbl,
    hex: hexToHex,
    hsl: hexToHsl,
    hsv: hexToHsv,
    hwb: hexToHwb,
    cmyk: hexToCmyk,
    xyz: hexToXyz,
    lab: hexToLab,
    lch: hexToLch,
    lms: hexToLms,
    oklab: hexToOkLab,
    oklch: hexToOkLch,
    keyword: hexToKeyword,
  },
  hsl: {
    rgb: hslToRgb,
    lrgb: hslToRgbl,
    hex: hslToHex,
    hsl: hslToHsl,
    hsv: hslToHsv,
    hwb: hslToHwb,
    cmyk: hslToCmyk,
    xyz: hslToXyz,
    lab: hslToLab,
    lch: hslToLch,
    lms: hslToLms,
    oklab: hslToOkLab,
    oklch: hslToOkLch,
    keyword: hslToKeyword,
  },
  hsv: {
    rgb: hsvToRgb,
    lrgb: hsvToRgbl,
    hex: hsvToHex,
    hsl: hsvToHsl,
    hsv: hsvToHsv,
    hwb: hsvToHwb,
    cmyk: hsvToCmyk,
    xyz: hsvToXyz,
    lab: hsvToLab,
    lch: hsvToLch,
    lms: hsvToLms,
    oklab: hsvToOkLab,
    oklch: hsvToOkLch,
    keyword: hsvToKeyword,
  },
  hwb: {
    rgb: hwbToRgb,
    lrgb: hwbToRgbl,
    hex: hwbToHex,
    hsl: hwbToHsl,
    hsv: hwbToHsv,
    hwb: hwbToHwb,
    cmyk: hwbToCmyk,
    xyz: hwbToXyz,
    lab: hwbToLab,
    lch: hwbToLch,
    lms: hwbToLms,
    oklab: hwbToOkLab,
    oklch: hwbToOkLch,
    keyword: hwbToKeyword,
  },
  cmyk: {
    rgb: cmykToRgb,
    lrgb: cmykToRgbl,
    hex: cmykToHex,
    hsl: cmykToHsl,
    hsv: cmykToHsv,
    hwb: cmykToHwb,
    cmyk: cmykToCmyk,
    xyz: cmykToXyz,
    lab: cmykToLab,
    lch: cmykToLch,
    lms: cmykToLms,
    oklab: cmykToOkLab,
    oklch: cmykToOkLch,
    keyword: cmykToKeyword,
  },
  xyz: {
    rgb: xyzToRgb,
    lrgb: xyzToRgbL,
    hex: xyzToHex,
    hsl: xyzToHsl,
    hsv: xyzToHsv,
    hwb: xyzToHwb,
    cmyk: xyzToCmyk,
    xyz: xyzToXyz,
    lab: xyzToLab,
    lch: xyzToLch,
    lms: xyzToLms,
    oklab: xyzToOkLab,
    oklch: xyzToOkLch,
    keyword: xyzToKeyword,
  },
  lab: {
    rgb: labToRgb,
    lrgb: labToRgbl,
    hex: labToHex,
    hsl: labToHsl,
    hsv: labToHsv,
    hwb: labToHwb,
    cmyk: labToCmyk,
    xyz: labToXyz,
    lab: labToLab,
    lch: labToLch,
    lms: labToLms,
    oklab: labToOkLab,
    oklch: labToOkLch,
    keyword: labToKeyword,
  },
  lch: {
    rgb: lchToRgbInline,
    lrgb: lchToRgbL,
    hex: lchToHex,
    hsl: lchToHsl,
    hsv: lchToHsv,
    hwb: lchToHwb,
    cmyk: lchToCmyk,
    xyz: lchToXyz,
    lab: lchToLab,
    lch: lchToLch,
    lms: lchToLms,
    oklab: lchToOkLab,
    oklch: lchToOkLch,
    keyword: lchToKeyword,
  },
  lms: {
    rgb: lmsToRgb,
    lrgb: lmsToRgb,
    hex: lmsToHex,
    hsl: lmsToHsl,
    hsv: lmsToHsv,
    hwb: lmsToHwb,
    cmyk: lmsToCmyk,
    xyz: lmsToXyz,
    lab: lmsToLab,
    lch: lmsToLch,
    lms: lmsToLms,
    oklab: lmsToOkLab,
    oklch: lmsToOklch,
    keyword: lmsToKeyword,
  },
  oklab: {
    rgb: okLabToRgb,
    lrgb: okLabToRgbL,
    hex: okLabToHex,
    hsl: okLabToHsl,
    hsv: okLabToHsv,
    hwb: okLabToHwb,
    cmyk: okLabToCmyk,
    xyz: okLabToXyz,
    lab: okLabToLab,
    lch: okLabToLch,
    lms: okLabToLms,
    oklab: okLabToOkLab,
    oklch: okLabToOkLch,
    keyword: okLabToKeyword,
  },
  oklch: {
    rgb: okLchToRgb,
    lrgb: okLchToRgbL,
    hex: okLchToHex,
    hsl: okLchToHsl,
    hsv: okLchToHsv,
    hwb: okLchToHwb,
    cmyk: okLchToCmyk,
    xyz: okLchToXyz,
    lab: okLchToLab,
    lch: okLchToLch,
    lms: okLchToLms,
    oklab: okLchToOkLab,
    oklch: okLchToOkLch,
    keyword: okLchToKeyword,
  },
  keyword: {
    rgb: keywordToRgb,
    lrgb: keywordToRgb,
    hex: keywordToHex,
    hsl: keywordToHsl,
    hsv: keywordToHsv,
    hwb: keywordToHwb,
    cmyk: keywordToCmyk,
    xyz: keywordToXyz,
    lab: keywordToLab,
    lch: keywordToLch,
    lms: keywordToLms,
    oklab: keywordToOkLab,
    oklch: keywordToOkLch,
    keyword: keywordToKeyword,
  },
}
