import type { ColorFormatAny, ColorFormatValue } from './format'
import { parse } from './parse'

const determinantChain: ColorFormatAny[] = [
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

export function determinate<T extends ColorFormatAny>(value: unknown): [ColorFormatValue<T>, T] | undefined {
  for (const format of determinantChain) {
    try {
      return [parse[format](value) as ColorFormatValue<T>, format as T]
    }
    catch {
      // pass
    }
  }
}
