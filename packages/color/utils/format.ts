interface Alpha {
  a: number // 0 - 1
}

export interface HEX {
  hex: number // 0x000000 - 0xFFFFFF
  r: number // 0x00 - 0xFF
  g: number // 0x00 - 0xFF
  b: number // 0x00 - 0xFF
}

export interface HEXA extends HEX, Alpha {
}

export interface RGB {
  r: number // 0 - 1
  g: number // 0 - 1
  b: number // 0 - 1
}

export interface RGBA extends RGB, Alpha {
}

export interface HSL {
  h: number // 0 - 360
  s: number // 0 - 1
  l: number // 0 - 1
}

export interface HSLA extends HSL, Alpha {
}

export interface HSV {
  h: number // 0 - 360
  s: number // 0 - 1
  v: number // 0 - 1
}

export interface HSVA extends HSV, Alpha {
}

export interface CMYK {
  c: number // 0 - 1
  m: number // 0 - 1
  y: number // 0 - 1
  k: number // 0 - 1
}

export interface CMYKA extends CMYK, Alpha {
}

export type Color<T = ColorFormat> =
  T extends 'hexa' ? HEXA :
    T extends 'hex' ? HEX :
      T extends 'rgba' ? RGBA :
        T extends 'rgb' ? RGB :
          T extends 'hsla' ? HSLA :
            T extends 'hsl' ? HSL :
              T extends 'hsva' ? HSVA :
                T extends 'hsv' ? HSV :
                  T extends 'cmyka' ? CMYKA :
                    T extends 'cmyk' ? CMYK :
                      never

export type ColorF = 'rgb' | 'hex' | 'hsl' | 'hsv' | 'cmyk'
export type ColorFA = 'rgba' | 'hexa' | 'hsla' | 'hsva' | 'cmyka'
export type ColorFormat = ColorF | ColorFA

export const formats: ColorF[] = ['rgb', 'hex', 'hsl', 'hsv', 'cmyk'] as const
export const formatsAlpha: ColorFA[] = ['rgba', 'hexa', 'hsla', 'hsva', 'cmyka'] as const
export const formatsAll: ColorFormat[] = [...formatsAlpha, ...formats] as const
export const formatsPairs: Record<ColorF, ColorFA> = {
  rgb: 'rgba',
  hex: 'hexa',
  hsl: 'hsla',
  hsv: 'hsva',
  cmyk: 'cmyka',
} as const

export const Format = {
  RGB: 'rgb',
  RGBA: 'rgba',
  HEX: 'hex',
  HEXA: 'hexa',
  HSL: 'hsl',
  HSLA: 'hsla',
  HSV: 'hsv',
  HSVA: 'hsva',
  CMYK: 'cmyk',
  CMYKA: 'cmyka',
  // OKLAB: 'oklab',
} as const

export function ensureColorFormat<T extends ColorFormat>(format: string): T {
  if (formats.includes(format.toLowerCase() as ColorF)) {
    return format as T
  }
  if (formatsAlpha.includes(format.toLowerCase() as ColorFA)) {
    return format as T
  }
  throw new Error(`Invalid color format: ${format}`)
}

export function roundColor<T extends Color>(
  value: T,
  precision: number = 0,
): T {
  const round = (v: number) => Math.round(v * 10 ** precision) / 10 ** precision
  const valueCopy: Record<string, any> = { ...value }
  for (const [key, val] of Object.entries(valueCopy)) {
    if (typeof val === 'number') {
      valueCopy[key as any] = round(val)
    }
  }
  return valueCopy as T
}

export function isAlphaFormat(value: ColorFormat | string): value is ColorFA {
  return formatsAlpha.includes(ensureColorFormat(value) as ColorFA)
}
