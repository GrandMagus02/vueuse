import type { Color, ColorFormat } from './format'
import { Format } from './format'
import { parse } from './parse'

const determinantChain: ColorFormat[] = [
  Format.RGBA,
  Format.RGB,
  Format.HEXA,
  Format.HEX,
  Format.HSLA,
  Format.HSL,
  Format.HSVA,
  Format.HSV,
  Format.CMYKA,
  Format.CMYK,
] as const

export function determinate<T extends ColorFormat>(value: unknown): {
  value: Color<T>
  format: T
} {
  for (const format of determinantChain) {
    try {
      return { value: parse[format](value) as Color<T>, format: format as T }
    }
    catch {
      // pass
    }
  }
  throw new Error('Invalid color output')
}
