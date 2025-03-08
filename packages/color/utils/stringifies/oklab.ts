import type { OKLAB } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringifyLab } from './lab'

/**
 * Stringify OKLAB object
 * @param value OKLAB object
 * @param options stringify options
 * @returns OKLAB string
 */
export function stringifyOkLab(value: OKLAB, options: ColorStringifyOptions): string {
  return stringifyLab(value, options).replace('lab', 'oklab')
}
