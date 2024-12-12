import type {
  CMYK,
  CMYKA,
  Color,
  ColorF,
  ColorFA,
  ColorFormat,
  HEX,
  HEXA,
  HSL,
  HSLA,
  HSV,
  HSVA,
  RGB,
  RGBA,
} from './format'
import { formatsAll, formatsAlpha, formatsPairs,
} from './format'

type ConversionFunction<From extends ColorFormat, To extends ColorFormat> = (value: Color<From>) => Color<To>
type ConverterObject = {
  [From in ColorFormat]: {
    [To in ColorFormat]?: ConversionFunction<From, To>
  }
}
type ConverterObjectStrict = {
  [From in ColorFormat]: {
    [To in ColorFormat]: ConversionFunction<From, To>
  }
}

function sameFormat<T extends object>(value: T): T {
  return value
}

function addAlpha<T extends object>(value: T, alpha?: number): T & { a: number } {
  return {
    ...value,
    a: alpha ?? 1,
  }
}

function removeAlpha<T extends object>(value: T): T {
  const { a, ...rest } = value as any
  return rest
}

// Converter
const convertSoft: ConverterObject = {
  rgba: {},
  rgb: {},
  hexa: {},
  hex: {},
  hsla: {},
  hsl: {},
  hsva: {},
  hsv: {},
  cmyka: {},
  cmyk: {},
  // oklab: {},
}

// RGB
convertSoft.rgb.rgba = addAlpha
convertSoft.rgb.hex = (value: RGB) => {
  let { r, g, b } = value
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)
  const hex = (r << 16) + (g << 8) + b
  return { hex, r, g, b } as HEX
}
convertSoft.rgb.hexa = (value: RGB) => {
  let { r, g, b } = value
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)
  const hex = (r << 16) + (g << 8) + b
  return { hex, r, g, b, a: 0xFF } as HEXA
}
convertSoft.rgb.hsl = (value: RGB) => {
  const { r, g, b } = value
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
    if (max === r) {
      h = ((g - b) / delta) % 6
    }
    else if (max === g) {
      h = (b - r) / delta + 2
    }
    else {
      h = (r - g) / delta + 4
    }
    h *= 60
    if (h < 0)
      h += 360
  }

  return { h, s, l } as HSL
}
convertSoft.rgb.hsv = (value: RGB) => {
  const { r, g, b } = value
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  const s = max === 0 ? 0 : delta / max
  const v = max

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6
    }
    else if (max === g) {
      h = (b - r) / delta + 2
    }
    else {
      h = (r - g) / delta + 4
    }
    h *= 60
    if (h < 0)
      h += 360
  }

  return { h, s, v } as HSV
}
convertSoft.rgb.cmyk = (value: RGB) => {
  const { r, g, b } = value
  const k = 1 - Math.max(r, g, b)
  const c = (1 - r - k) / (1 - k)
  const m = (1 - g - k) / (1 - k)
  const y = (1 - b - k) / (1 - k)
  return { c, m, y, k } as CMYK
}

// RGBA
convertSoft.rgba.rgb = removeAlpha
convertSoft.rgba.hexa = (value: RGBA) => {
  let { r, g, b, a } = value
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)
  a = Math.round(a * 255)
  return {
    hex: (r << 16) + (g << 8) + b,
    r,
    g,
    b,
    a,
  } as HEXA
}
convertSoft.rgba.hsla = (value: RGBA) => {
  const { r, g, b, a } = value
  return {
    ...convertSoft.rgb.hsl?.({ r, g, b }),
    a,
  } as HSLA
}
convertSoft.rgba.hsva = (value: RGBA) => {
  const { r, g, b, a } = value
  return {
    ...convertSoft.rgb.hsv?.({ r, g, b }),
    a,
  } as HSVA
}
convertSoft.rgba.cmyka = (value: RGBA) => {
  const { r, g, b, a } = value
  return {
    ...convertSoft.rgb.cmyk?.({ r, g, b }),
    a,
  } as CMYKA
}

// HEX
convertSoft.hex.rgb = (value: HEX) => {
  return {
    r: value.r / 255,
    g: value.g / 255,
    b: value.b / 255,
  } as RGB
}
convertSoft.hex.hexa = (value: HEX) => {
  return {
    ...value,
    a: 1,
  } as HEXA
}

// HEXA
convertSoft.hexa.rgba = (value: HEXA) => {
  return {
    r: value.r / 255,
    g: value.g / 255,
    b: value.b / 255,
    a: value.a,
  } as RGBA
}
convertSoft.hexa.hex = (value: HEX) => {
  return {
    hex: value.hex,
    r: value.r,
    g: value.g,
    b: value.b,
  }
}

// HSL
convertSoft.hsl.rgb = (value: HSL) => {
  const { h, s, l } = value
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h < 60) {
    r = c
    g = x
  }
  else if (h < 120) {
    r = x
    g = c
  }
  else if (h < 180) {
    g = c
    b = x
  }
  else if (h < 240) {
    g = x
    b = c
  }
  else if (h < 300) {
    r = x
    b = c
  }
  else {
    r = c
    b = x
  }

  return {
    r: r + m,
    g: g + m,
    b: b + m,
  } as RGB
}

// HSLA
convertSoft.hsla.rgba = (value: HSLA) => {
  const { h, s, l, a } = value
  return {
    ...convertSoft.hsl.rgb?.({ h, s, l }),
    a,
  } as RGBA
}

// HSV
convertSoft.hsv.rgb = (value: HSV) => {
  const { h, s, v } = value
  const c = v * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = v - c
  let r = 0
  let g = 0
  let b = 0

  if (h < 60) {
    r = c
    g = x
  }
  else if (h < 120) {
    r = x
    g = c
  }
  else if (h < 180) {
    g = c
    b = x
  }
  else if (h < 240) {
    g = x
    b = c
  }
  else if (h < 300) {
    r = x
    b = c
  }
  else {
    r = c
    b = x
  }

  return {
    r: r + m,
    g: g + m,
    b: b + m,
  } as RGB
}

// HSVA
convertSoft.hsva.rgba = (value: HSVA) => {
  const { h, s, v, a } = value
  return {
    ...convertSoft.hsv.rgb?.({ h, s, v }),
    a,
  } as RGBA
}

// CMYK
convertSoft.cmyk.rgb = (value: CMYK) => {
  const { c, m, y, k } = value
  return {
    r: (1 - c) * (1 - k),
    g: (1 - m) * (1 - k),
    b: (1 - y) * (1 - k),
  } as RGB
}

// CMYKA
convertSoft.cmyka.rgba = (value: CMYKA) => {
  const { c, m, y, k, a } = value
  return {
    ...convertSoft.cmyk.rgb?.({ c, m, y, k }),
    a,
  } as RGBA
}

for (const from of formatsAll) {
  for (const to of formatsAll) {
    if (!convertSoft[from][to]) {
      if (from === to) {
        // @ts-expect-error - Type is too complex to be inferred
        convertSoft[from][to] = sameFormat
        continue
      }

      const fromIsAlpha = formatsAlpha.includes(from as ColorFA)
      const toIsAlpha = formatsAlpha.includes(to as ColorFA)

      if (fromIsAlpha && !toIsAlpha) {
        // Convert from alpha to non-alpha
        convertSoft[from][to] = (value: Color<typeof from>) => {
          const rgbaValue = convertSoft[from]?.rgba?.(value as any)
          if (!rgbaValue)
            throw new Error(`Conversion from ${from} to rgba failed`)
          const rgbValue = convertSoft.rgba?.rgb?.(rgbaValue)
          if (!rgbValue)
            throw new Error(`Conversion from rgba to rgb failed`)
          const result = convertSoft.rgb?.[to]?.(rgbValue)
          if (!result)
            throw new Error(`Conversion from rgb to ${to} failed`)
          return result
        }
      }
      else if (!fromIsAlpha && toIsAlpha) {
        // Convert from non-alpha to alpha
        convertSoft[from][to] = (value: Color<typeof from>) => {
          const rgbValue = convertSoft[from]?.rgb?.(value as any)
          if (!rgbValue)
            throw new Error(`Conversion from ${from} to rgb failed`)
          const rgbaValue = convertSoft.rgb?.rgba?.(rgbValue)
          if (!rgbaValue)
            throw new Error(`Conversion from rgb to rgba failed`)
          const result = convertSoft.rgba?.[to]?.(rgbaValue)
          if (!result)
            throw new Error(`Conversion from rgba to ${to} failed`)
          return result
        }
      }
      else if (fromIsAlpha && toIsAlpha) {
        // Convert between alpha formats
        convertSoft[from][to] = (value: Color<typeof from>) => {
          const rgbaValue = convertSoft[from]?.rgba?.(value as any)
          if (!rgbaValue)
            throw new Error(`Conversion from ${from} to rgba failed`)
          const result = convertSoft.rgba?.[to]?.(rgbaValue)
          if (!result)
            throw new Error(`Conversion from rgba to ${to} failed`)
          return result
        }
      }
      else {
        // Convert between non-alpha formats
        convertSoft[from][to] = (value: Color<typeof from>) => {
          const rgbValue = convertSoft[from]?.rgb?.(value as any)
          if (!rgbValue)
            throw new Error(`Conversion from ${from} to rgb failed`)
          const result = convertSoft.rgb?.[to]?.(rgbValue)
          if (!result)
            throw new Error(`Conversion from rgb to ${to} failed`)
          return result
        }
      }

      if (formatsPairs[from as ColorF] === to) {
        convertSoft[from][to] = addAlpha as ConversionFunction<ColorF, ColorFA>
      }
      else if (formatsPairs[to as ColorF] === from) {
        // @ts-expect-error - Type is too complex to be inferred
        convertSoft[from][to] = removeAlpha as ConversionFunction<ColorFA, ColorF>
      }
    }
  }
}

const convert = convertSoft as ConverterObjectStrict

export { convert }
