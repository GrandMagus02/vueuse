import type { Color, ColorFormat } from './format'

export const nullable: { [F in ColorFormat]: Color<F, null> } = {
  rgb: { r: null, g: null, b: null, a: null },
  lrgb: { r: null, g: null, b: null, a: null },
  hex: { hex: null, r: null, g: null, b: null, a: null },
  hsl: { h: null, s: null, l: null, a: null },
  hsv: { h: null, s: null, v: null, a: null },
  cmyk: { c: null, m: null, y: null, k: null, a: null },
  hwb: { h: null, w: null, b: null, a: null },
  xyz: { x: null, y: null, z: null, a: null },
  lab: { l: null, a: null, b: null, A: null },
  lch: { l: null, c: null, h: null, a: null },
  oklab: { l: null, a: null, b: null, A: null },
  oklch: { l: null, c: null, h: null, a: null },
  lms: { l: null, m: null, s: null, a: null },
  keyword: { hex: null, r: null, g: null, b: null, a: null },
} as const
