import { convertColor } from '@vueuse/color'
import { deltaE2000, euclideanRgb, manhattanRgb } from '../utils/difference'

export interface DiffColorOptions {
  /**
   * Define which format to use for distance calculation.
   * @default 'deltaE2000'
   */
  method?: 'euclidean' | 'manhattan' | 'deltaE2000'
}

/**
 * Difference between two colors.
 * @param value1 - The first color value.
 * @param value2 - The second color value.
 * @param options - The options for the lightening.
 */
export function diffColor(
  value1: unknown,
  value2: unknown,
  options: DiffColorOptions = {},
): number {
  const {
    method = 'deltaE2000',
  } = options

  if (method === 'euclidean' || method === 'manhattan') {
    const c1 = convertColor(value1, 'rgb')
    const c2 = convertColor(value2, 'rgb')
    return method === 'euclidean'
      ? euclideanRgb(c1, c2)
      : manhattanRgb(c1, c2)
  }
  else {
    const c1 = convertColor(value1, 'lab')
    const c2 = convertColor(value2, 'lab')
    return deltaE2000(c1, c2)
  }
}
