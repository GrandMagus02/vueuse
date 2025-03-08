import type { ColorFormat, HEX, LAB, OKLAB, RelativeColor } from './format'

export interface NormalizeOptions {
  /**
   * Precision of the output values
   */
  precision?: number
}

function fc(value: number | null = null, options: NormalizeOptions = {}): number | null {
  if (value === null)
    return null
  if (options.precision) {
    const factor = 10 ** options.precision
    value = Math.round(value * factor) / factor
  }
  if (options.precision === 0)
    value = Math.round(value)
  return value
}

function f(value: number | null = null, options: NormalizeOptions = {}): number | null {
  value = fc(value, options)
  if (value === null)
    return null
  return Math.min(Math.max(value, 0), 1)
}

function fAll<T extends Partial<RelativeColor>>(value: T, options: NormalizeOptions = {}): T {
  const result = { ...value }
  for (const key of Object.keys(result) as (keyof T)[]) {
    result[key] = f(result[key] as number, options) as T[keyof T]
  }
  return result
}

export const normalize: { [F in ColorFormat]: (value: Partial<RelativeColor<F>>, options?: NormalizeOptions) => Partial<RelativeColor<F>> } = {
  rgb: (value, options) => fAll(value, options),
  lrgb: (value, options) => fAll(value, options),
  hex: ({ hex, ...rest }, options) => ({ hex, ...fAll(rest, options) }) as HEX,
  hsl: (value, options) => {
    const result = fAll(value, options)
    if (result.h === 1 || result.s === 0 || result.l === 0 || result.l === 1)
      result.h = null
    return result
  },
  hsv: (value, options) => {
    const result = fAll(value, options)
    if (result.h === 1 || result.s === 0 || result.v === 0 || result.v === 1)
      result.h = null
    return result
  },
  cmyk: (value, options) => fAll(value, options),
  lab: ({ a, b, ...rest }, options) => ({ a: fc(a, options), b: fc(b, options), ...fAll(rest, options) }) as LAB,
  xyz: ({ x, y, z, a = 1 }, options) => ({ x: fc(x, options), y: fc(y, options), z: fc(z, options), a: f(a, options) }),
  lch: (value, options) => fAll(value, options),
  hwb: (value, options) => {
    const result = fAll(value, options)
    if (result.h === 1 || result.w === 1 || result.b === 1)
      result.h = null
    return result
  },
  lms: (value, options) => fAll(value, options),
  oklab: ({ a, b, ...rest }, options) => ({ a: fc(a, options), b: fc(b, options), ...fAll(rest, options) }) as OKLAB,
  oklch: (value, options) => fAll(value, options),
  keyword: ({ hex, ...rest }, options) => ({ hex, ...fAll(rest, options) }) as HEX,
} as const
