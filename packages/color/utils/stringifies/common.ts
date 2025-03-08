export interface ColorStringifyOptions {
  alpha?: boolean
  syntax?: 'modern' | 'legacy'
  percentage?: boolean
  precision?: number
}

export function round(value: number, precision: number) {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

export function stringify(value: number, precision?: number) {
  return precision ? String(round(value, precision)) : String(value)
}
