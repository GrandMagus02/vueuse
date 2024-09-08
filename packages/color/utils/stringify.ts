import type { ColorFormatAny, ColorFormatValue } from './format'

type Delimiter = ',' | ' '

type StringifyObjectStrict = {
  [F in ColorFormatAny]: (value: ColorFormatValue<F>, delimiter?: Delimiter) => string
}

function buildString(func: string, channels: number[], alpha?: number, delimiter: Delimiter = ',') {
  let parameters: string
  if (delimiter === ',') {
    parameters = [...channels, alpha].join(', ')
  }
  else if (delimiter === ' ') {
    parameters = `${channels.join(' ')} / ${alpha}`
  }
  else {
    throw new Error('Invalid delimiter')
  }
  return `${func}(${parameters})`
}

const stringify: StringifyObjectStrict = {
  rgba: ({ r, g, b, a }, delimiter) => {
    return buildString('rgba', [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)], a, delimiter)
  },
  rgb: ({ r, g, b }, delimiter) => {
    return buildString('rgb', [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)], 1, delimiter)
  },
  hexa: ({ hex, a }, _) => {
    return `#${Math.round(hex).toString(16).padStart(6, '0') + a.toString(16).padStart(2, '0')}`
  },
  hex: ({ hex }, _) => {
    return `#${Math.round(hex).toString(16).padStart(6, '0')}`
  },
  hsla: ({ h, s, l, a }, delimiter) => {
    return buildString('hsla', [Math.round(h), Math.round(s * 100), Math.round(l * 100)], a, delimiter)
  },
  hsl: ({ h, s, l }, delimiter) => {
    return buildString('hsl', [Math.round(h), Math.round(s * 100), Math.round(l * 100)], 1, delimiter)
  },
  hsva: ({ h, s, v, a }, delimiter) => {
    return buildString('hsva', [Math.round(h), Math.round(s * 100), Math.round(v * 100)], a, delimiter)
  },
  hsv: ({ h, s, v }, delimiter) => {
    return buildString('hsv', [Math.round(h), Math.round(s * 100), Math.round(v * 100)], 1, delimiter)
  },
  cmyka: ({ c, m, y, k, a }, delimiter) => {
    return buildString('cmyka', [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)], a, delimiter)
  },
  cmyk: ({ c, m, y, k }, delimiter) => {
    return buildString('cmyk', [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)], 1, delimiter)
  },
}

export { stringify }
