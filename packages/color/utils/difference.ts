import type { LAB, RGB } from '@vueuse/color'
import { Format } from '@vueuse/color'
import { nonNullable } from './convertions/common'

export const diffFormats = ['rgb', 'lab'] as const

export type DiffFormat = typeof diffFormats[number]

export function euclideanRgb(color1: RGB, color2: RGB): number {
  const c1 = nonNullable(color1, Format.RGB)
  const c2 = nonNullable(color2, Format.RGB)
  return Math.sqrt(
    (c1.r - c2.r) ** 2
    + (c1.g - c2.g) ** 2
    + (c1.b - c2.b) ** 2,
  )
}

export function manhattanRgb(color1: RGB, color2: RGB): number {
  const c1 = nonNullable(color1, Format.RGB)
  const c2 = nonNullable(color2, Format.RGB)
  return Math.abs(c1.r - c2.r)
    + Math.abs(c1.g - c2.g)
    + Math.abs(c1.b - c2.b)
}

/**
 * Delta E (CIE 2000) color difference
 * @param lab1 - The first color in LAB format
 * @param lab2 - The second color in LAB format
 */
export function deltaE2000(lab1: LAB, lab2: LAB): number {
  const { l: L1, a: A1, b: B1 } = lab1
  const { l: L2, a: A2, b: B2 } = lab2

  const C1 = Math.sqrt(A1 * A1 + B1 * B1)
  const C2 = Math.sqrt(A2 * A2 + B2 * B2)
  const avgC = (C1 + C2) / 2

  const G = 0.5 * (1 - Math.sqrt((avgC ** 7) / ((avgC ** 7) + (25 ** 7))))

  const a1Prime = A1 * (1 + G)
  const a2Prime = A2 * (1 + G)

  const C1Prime = Math.sqrt(a1Prime * a1Prime + B1 * B1)
  const C2Prime = Math.sqrt(a2Prime * a2Prime + B2 * B2)

  const avgCPrime = (C1Prime + C2Prime) / 2

  const h1Prime = Math.atan2(B1, a1Prime) * (180 / Math.PI)
  const h2Prime = Math.atan2(B2, a2Prime) * (180 / Math.PI)

  const h1 = h1Prime >= 0 ? h1Prime : h1Prime + 360
  const h2 = h2Prime >= 0 ? h2Prime : h2Prime + 360

  let deltaHPrime = 0
  if (C1Prime * C2Prime === 0) {
    deltaHPrime = 0
  }
  else if (Math.abs(h1 - h2) <= 180) {
    deltaHPrime = h2 - h1
  }
  else if (h2 <= h1) {
    deltaHPrime = h2 - h1 + 360
  }
  else {
    deltaHPrime = h2 - h1 - 360
  }

  const deltaLPrime = L2 - L1
  const deltaCPrime = C2Prime - C1Prime
  const deltaH = 2 * Math.sqrt(C1Prime * C2Prime) * Math.sin((deltaHPrime / 2) * (Math.PI / 180))

  const avgLPrime = (L1 + L2) / 2
  const avgCPrime7 = avgCPrime ** 7
  const T = 1 - 0.17 * Math.cos((h1 - 30) * (Math.PI / 180))
    + 0.24 * Math.cos(2 * h1 * (Math.PI / 180))
    + 0.32 * Math.cos((3 * h1 + 6) * (Math.PI / 180))
    - 0.20 * Math.cos((4 * h1 - 63) * (Math.PI / 180))

  const SL = 1 + ((0.015 * ((avgLPrime - 50) ** 2)) / Math.sqrt(20 + ((avgLPrime - 50) ** 2)))
  const SC = 1 + 0.045 * avgCPrime
  const SH = 1 + 0.015 * avgCPrime * T

  const RT = -2 * Math.sqrt(avgCPrime7 / (avgCPrime7 + 6103515625))
    * Math.sin(
      (60 * Math.exp(-(((h1 - 275) / 25) ** 2))) * (Math.PI / 180),
    )

  return Math.sqrt(
    (deltaLPrime / SL) ** 2
    + (deltaCPrime / SC) ** 2
    + (deltaH / SH) ** 2
    + (RT * (deltaCPrime / SC) * (deltaH / SH)),
  )
}
