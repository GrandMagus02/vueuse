import type { Color, ColorFormat } from './format'
import type { ColorStringifyOptions } from './stringifies/common'
import { stringifyRgb } from './stringifies/rgb'
import { stringifyHsl } from './stringifies/hsl'
import { stringifyHwb } from './stringifies/hwb'
import { stringifyHex } from './stringifies/hex'
import { stringifyLab } from './stringifies/lab'
import { stringifyOkLab } from './stringifies/oklab'
import { stringifyLch } from './stringifies/lch'
import { stringifyOkLch } from './stringifies/oklch'
import { stringifyLRgb } from './stringifies/lrgb'

export const stringify: { [F in ColorFormat]?: (value: Color<F>, options: ColorStringifyOptions) => string } = {
  rgb: stringifyRgb,
  hsl: stringifyHsl,
  hwb: stringifyHwb,
  hex: stringifyHex,
  lab: stringifyLab,
  lch: stringifyLch,
  oklab: stringifyOkLab,
  oklch: stringifyOkLch,
  lrgb: stringifyLRgb,
}
