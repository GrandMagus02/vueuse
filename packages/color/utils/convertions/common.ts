import type { Color, ColorFormat } from '@vueuse/color'
import { fallback } from '@vueuse/color'
import type { NormalizeOptions } from '../normalize'
import { normalize } from '../normalize'
import type { RelativeColor } from '../format'

export function same<T extends ColorFormat>(format: T): (x: Partial<RelativeColor<T>>, options?: NormalizeOptions) => Partial<RelativeColor<T>> {
  return (x, options) => normalize[format](x, options)
}

export function pipe<T, A>(fn1: (x: T, options?: NormalizeOptions) => A): (x: T, options?: NormalizeOptions) => A
export function pipe<T, B, A>(
  fn1: (x: T, options?: NormalizeOptions) => A,
  fn2: (x: A, options?: NormalizeOptions) => B
): (x: T) => B
export function pipe<T, C, A, B>(
  fn1: (x: T, options?: NormalizeOptions) => A,
  fn2: (x: A, options?: NormalizeOptions) => B,
  fn3: (x: B, options?: NormalizeOptions) => C
): (x: T) => C
export function pipe(...fns: Function[]) {
  return (value: any, options?: NormalizeOptions) => fns.reduce((acc, fn) => fn(acc, options), value)
}

export function matVecMult(matrix: readonly number[][], vector: readonly number[]): number[] {
  return matrix.map(row =>
    row.reduce((sum, value, index) => sum + value * vector[index], 0),
  )
}

export function nonNullable<T extends ColorFormat>(value: Partial<RelativeColor<T>>, format: T) {
  const newValue: Color<T> = { ...fallback[format], ...value }
  for (const key of Object.keys(value) as (keyof Partial<RelativeColor<T>>)[]) {
    if (newValue[key] === null) {
      newValue[key] = fallback[format][key]
    }
  }
  return newValue as Color<T>
}
