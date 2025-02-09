import type { Color } from './format'
import { ensureColorFormat } from './format'
import { hueShift } from './shift'
import { convert } from './convert'
import type { ColorFormat } from './index'

export const Harmony = {
  COMPLEMENTARY: 'complementary',
  ANALOGOUS: 'analogous',
  TRIADIC: 'triadic',
  SPLIT_COMPLEMENTARY: 'split_complementary',
  SQUARE: 'square',
  TETRADIC: 'tetradic',
  MONOCHROMATIC: 'monochromatic',
  TINTS: 'tints',
  SHADES: 'shades',
} as const
export type ColorHarmony = typeof Harmony[keyof typeof Harmony]

export function complementaryColor<T extends ColorFormat>(color: Color<T>, format: T): Color<T> {
  const hsl = convert[ensureColorFormat(format)].hsl(color as any)
  const newHue = hueShift(hsl.h, 180)
  return convert.hsl[ensureColorFormat(format)]({ ...hsl, h: newHue }) as Color<T>
}

export function analogousColors<T extends ColorFormat>(
  color: Color<T>,
  format: T,
  angle: number = 60,
  count: number = 2,
): Color<T>[] {
  count = count % 2 === 0 ? count : count + 1
  const shiftsLeft = Array.from({ length: count / 2 }, (_, index) => {
    return (index + 1) * ((angle / count) % 360)
  })
  const shiftsRight = Array.from({ length: count / 2 }, (_, index) => {
    return (index + 1) * -((angle / count) % 360)
  })
  const shifts = [...shiftsLeft, ...shiftsRight]
  const hslColors = Array.from({ length: count }, () => {
    return convert[ensureColorFormat(format)].hsl(color as any)
  })
  return hslColors.map((hsl, index) => {
    const newHue = hueShift(hsl.h, shifts[index])
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, h: newHue }) as Color<T>
  }) as Color<T>[]
}

export function triadicColors<T extends ColorFormat>(color: Color<T>, format: T): Color<T>[] {
  const shifts = [120, 240]
  const hslColors = shifts.map(() => {
    return convert[ensureColorFormat(format)].hsl(color as any)
  })
  return hslColors.map((hsl, index) => {
    const newHue = hueShift(hsl.h, shifts[index])
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, h: newHue }) as Color<T>
  })
}

export function splitComplementaryColors<T extends ColorFormat>(
  color: Color<T>,
  format: T,
  angle: number = 60,
): Color<T>[] {
  const count = 1
  const shifts = Array.from({ length: count * 2 }, (_, index) => {
    return (index < count ? index - count : index - count + 1) * ((180 - (angle / 2)) % 360)
  })
  const hslColors = Array.from({ length: count * 2 }, () => {
    return convert[ensureColorFormat(format)].hsl(color as any)
  })
  return hslColors.map((hsl, index) => {
    const newHue = hueShift(hsl.h, shifts[index])
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, h: newHue }) as Color<T>
  })
}

export function squareColors<T extends ColorFormat>(
  color: Color<T>,
  format: T,
): Color<T>[] {
  const shifts = [90, 180, 270]
  const hslColors = shifts.map(() => {
    return convert[ensureColorFormat(format)].hsl(color as any)
  })
  return hslColors.map((hsl, index) => {
    const newHue = hueShift(hsl.h, shifts[index])
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, h: newHue }) as Color<T>
  })
}

export function tetradicColors<T extends ColorFormat>(
  color: Color<T>,
  format: T,
  angle: number = 120,
): Color<T>[] {
  const shifts = [((angle / 2) % 360), 180, 180 + ((angle / 2) % 360)]
  const hslColors = shifts.map(() => {
    return convert[ensureColorFormat(format)].hsl(color as any)
  })
  return hslColors.map((hsl, index) => {
    const newHue = hueShift(hsl.h, shifts[index])
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, h: newHue }) as Color<T>
  })
}

export function monochromaticColors<T extends ColorFormat>(
  color: Color<T>,
  format: T,
  count: number = 6,
  step: number = 0.1,
): Color<T>[] {
  const hsl = convert[ensureColorFormat(format)].hsl(color as any)
  const lighterShiftsCount = Math.floor(count / 2)
  const darkerShiftsCount = count - lighterShiftsCount
  const lighterShifts = Array.from({ length: lighterShiftsCount }, (_, index) => {
    return (lighterShiftsCount - index + 1) * step
  })
  const darkerShifts = Array.from({ length: darkerShiftsCount }, (_, index) => {
    return (index + 1) * -step
  })
  const shifts = [...lighterShifts, ...darkerShifts]
  return shifts.map((shift) => {
    const newLightness = Math.min(hsl.l + shift, 1)
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, l: newLightness }) as Color<T>
  })
}

export function tintColors<T extends ColorFormat>(
  color: Color<T>,
  format: T,
  count: number = 3,
  step: number = 0.1,
): Color<T>[] {
  const hsl = convert[ensureColorFormat(format)].hsl(color as any)
  const shifts = Array.from({ length: count }, (_, index) => {
    return (index + 1) * step
  })
  return shifts.map((shift) => {
    const newLightness = Math.min(hsl.l + shift, 1)
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, l: newLightness }) as Color<T>
  })
}

export function shadeColors<T extends ColorFormat>(
  color: Color<T>,
  format: T,
  count: number = 3,
  step: number = 0.1,
): Color<T>[] {
  const hsl = convert[ensureColorFormat(format)].hsl(color as any)
  const shifts = Array.from({ length: count }, (_, index) => {
    return (index + 1) * step
  })
  return shifts.map((shift) => {
    const newLightness = Math.max(hsl.l - shift, 0)
    return convert.hsl[ensureColorFormat(format)]({ ...hsl, l: newLightness }) as Color<T>
  })
}
