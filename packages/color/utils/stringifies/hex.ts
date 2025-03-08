import type { HEX } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'

/**
 * Stringify HEX object
 * @param value HEX object
 * @param options stringify options
 * @returns HEX string
 */
export function stringifyHex(value: HEX, options: ColorStringifyOptions): string {
  const { hex, a = 1 } = value

  const { alpha = true } = options

  let result = `#${hex.toString(16).padStart(6, '0')}`

  if (alpha)
    result += `${Math.round(a * 255).toString(16).padStart(2, '0')}`

  return result
}
