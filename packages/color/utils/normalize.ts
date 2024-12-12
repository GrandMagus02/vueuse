import type { Color, ColorFormat } from './format'

type NormalizeObjectStrict = {
  [F in ColorFormat]: (value: Color<F>) => Color<F>
}

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1)
}

function degree360(value: number): number {
  return value % 360
}

function number255(value: number): number {
  return Math.min(Math.max(Math.round(value), 0), 255)
}

const normalize: NormalizeObjectStrict = {
  rgb: ({ r, g, b }) => ({ r: clamp01(r), g: clamp01(g), b: clamp01(b) }),
  rgba: ({ r, g, b, a }) => ({ r: clamp01(r), g: clamp01(g), b: clamp01(b), a: clamp01(a) }),
  hex: ({ r, g, b, hex }) => ({ r: number255(r), g: number255(g), b: number255(b), hex }),
  hexa: ({ r, g, b, a, hex }) => ({ r: number255(r), g: number255(g), b: number255(b), a: clamp01(a), hex }),
  hsl: ({ h, s, l }) => ({ h: degree360(h), s: clamp01(s), l: clamp01(l) }),
  hsla: ({ h, s, l, a }) => ({ h: degree360(h), s: clamp01(s), l: clamp01(l), a: clamp01(a) }),
  hsv: ({ h, s, v }) => ({ h: degree360(h), s: clamp01(s), v: clamp01(v) }),
  hsva: ({ h, s, v, a }) => ({ h: degree360(h), s: clamp01(s), v: clamp01(v), a: clamp01(a) }),
  cmyk: ({ c, m, y, k }) => ({ c: clamp01(c), m: clamp01(m), y: clamp01(y), k: clamp01(k) }),
  cmyka: ({ c, m, y, k, a }) => ({ c: clamp01(c), m: clamp01(m), y: clamp01(y), k: clamp01(k), a: clamp01(a) }),
}

export { normalize }
