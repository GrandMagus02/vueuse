import type { Color, ColorFormat } from './format'

export const fallback: { [F in ColorFormat]: Color<F> } = {
  rgb: { r: 0, g: 0, b: 0, a: 0 },
  lrgb: { r: 0, g: 0, b: 0, a: 0 },
  hex: { hex: 0, r: 0, g: 0, b: 0, a: 0 },
  hsl: { h: 0, s: 0, l: 0, a: 0 },
  hsv: { h: 0, s: 0, v: 0, a: 0 },
  cmyk: { c: 0, m: 0, y: 0, k: 0, a: 0 },
  hwb: { h: 0, w: 0, b: 0, a: 0 },
  xyz: { x: 0, y: 0, z: 0, a: 0 },
  lab: { l: 0, a: 0, b: 0, A: 0 },
  lch: { l: 0, c: 0, h: 0, a: 0 },
  oklab: { l: 0, a: 0, b: 0, A: 0 },
  oklch: { l: 0, c: 0, h: 0, a: 0 },
  lms: { l: 0, m: 0, s: 0, a: 0 },
  keyword: { hex: 0, r: 0, g: 0, b: 0, a: 0 },
} as const
