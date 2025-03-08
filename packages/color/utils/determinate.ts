import type { Color, ColorFormat } from './format'
import { Format } from './format'
import { parse } from './parse'

const determinantChain: ColorFormat[] = [
  Format.HEX,
  Format.RGB,
  Format.LRGB,
  Format.HSL,
  Format.HWB,
  Format.LAB,
  Format.HSV,
  Format.CMYK,
  Format.XYZ,
  Format.LMS,
  Format.LAB,
  Format.LCH,
  Format.OKLAB,
  Format.OKLCH,
  Format.KEYWORD,
] as const

export function determinate<T extends ColorFormat>(value: unknown, priority?: ColorFormat): {
  color: Color<T>
  format: T
} {
  const chain = priority ? [priority, ...determinantChain.filter(f => f !== priority)] : determinantChain
  for (const f of chain) {
    const parsed = parse[f](value)
    if (parsed)
      return { color: parsed as Color<T>, format: f as T }
  }
  throw new Error(`Invalid color input: ${JSON.stringify(value)}`)
}
