import type { LAB } from '@vueuse/color'
import type { ColorStringifyOptions } from './common'
import { stringify } from './common'

/**
 * Stringify LAB object
 * @param value LAB object
 * @param options stringify options
 * @returns LAB string
 */
export function stringifyLab(value: LAB, options: ColorStringifyOptions): string {
  const { l, a, b, A = 1 } = value

  const { alpha = true, percentage = false, precision } = options

  let ls = stringify(l * 255, precision)
  let as = stringify(a * 255, precision)
  let bs = stringify(b * 255, precision)

  if (percentage) {
    ls = stringify(l * 100, precision)
    as = stringify(a * 100, precision)
    bs = stringify(b * 100, precision)
  }

  let result = `lab(`

  result += [ls, as, bs].join(' ')

  if (alpha) {
    result += ` / ${stringify(A)}`
  }

  result += ')'

  return result
}
