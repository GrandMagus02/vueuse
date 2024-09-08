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

export type ColorFormatValue<T> =
  T extends 'hexa' | 'HEXA' ? HEXA :
    T extends 'hex' | 'HEX' ? HEX :
      T extends 'rgba' | 'RGBA' ? RGBA :
        T extends 'rgb' | 'RGB' ? RGB :
          T extends 'hsla' | 'HSLA' ? HSLA :
            T extends 'hsl' | 'HSL' ? HSL :
              T extends 'hsva' | 'HSVA' ? HSVA :
                T extends 'hsv' | 'HSV' ? HSV :
                  T extends 'cmyka' | 'CMYKA' ? CMYKA :
                    T extends 'cmyk' | 'CMYK' ? CMYK :
                      never

export type ColorFormat = 'rgb' | 'hex' | 'hsl' | 'hsv' | 'cmyk'
export type ColorFormatAlpha = 'rgba' | 'hexa' | 'hsla' | 'hsva' | 'cmyka'
export type ColorFormatAny = ColorFormat | ColorFormatAlpha
export type ColorFormatAnyCase = ColorFormatAny | Uppercase<ColorFormatAny>

export const formats: ColorFormat[] = ['rgb', 'hex', 'hsl', 'hsv', 'cmyk'] as const
export const formatsAlpha: ColorFormatAlpha[] = ['rgba', 'hexa', 'hsla', 'hsva', 'cmyka'] as const
export const formatsAll: ColorFormatAny[] = [...formatsAlpha, ...formats] as const
export const formatsPairs: Record<ColorFormat, ColorFormatAlpha> = {
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
} as const

export function ensureColorFormat(format: string): ColorFormatAny {
  if (formats.includes(format.toLowerCase() as ColorFormat)) {
    return format as ColorFormat
  }
  if (formatsAlpha.includes(format.toLowerCase() as ColorFormatAlpha)) {
    return format as ColorFormatAlpha
  }
  throw new Error(`Invalid color format: ${format}`)
}

export function roundColor<T extends ColorFormatValue<ColorFormatAny>>(
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

export function isAlphaFormat(value: ColorFormatAnyCase | string): value is ColorFormatAlpha {
  return formatsAlpha.includes(ensureColorFormat(value) as ColorFormatAlpha)
}
