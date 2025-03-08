import type { OKLCH } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringifyLch } from './lch'

/**
 * Stringify OKLCH object
 * @param value OKLCH object
 * @param options stringify options
 * @returns OKLCH string
 */
export function stringifyOkLch(value: OKLCH, options: ColorStringifyOptions): string {
  return stringifyLch(value, options).replace('lch', 'oklch')
}
