import type { Color, ColorFormat } from './format'
import { formatsAll } from './format'

type ParserObject<T = unknown> = {
  [F in ColorFormat]?: (value: T) => Color<F>
}

type ParserObjectStrict<T = unknown> = {
  [F in ColorFormat]: (value: T) => Color<F>
}

// String parser
const parseString: ParserObject<string> = {
  rgba: (value: string) => {
    const match = value.match(/rgba\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*\)/)
    if (match) {
      const [, r, g, b, a] = match
      return {
        r: r.endsWith('%') ? Number(r.slice(0, -1)) / 100 : Number(r) / 255,
        g: g.endsWith('%') ? Number(g.slice(0, -1)) / 100 : Number(g) / 255,
        b: b.endsWith('%') ? Number(b.slice(0, -1)) / 100 : Number(b) / 255,
        a: a.endsWith('%') ? Number(a.slice(0, -1)) / 100 : Number(a),
      }
    }
    throw new Error('Invalid RGBA string')
  },
  rgb: (value: string) => {
    const match = value.match(/rgb\(\s*(\d+%?)(?:\s|\s*,)\s*(\d+%?)(?:\s|\s*,)\s*(\d+%?)\s*\)/)
    if (match) {
      const [, r, g, b] = match
      return {
        r: r.endsWith('%') ? Number(r.slice(0, -1)) / 100 : Number(r) / 255,
        g: g.endsWith('%') ? Number(g.slice(0, -1)) / 100 : Number(g) / 255,
        b: b.endsWith('%') ? Number(b.slice(0, -1)) / 100 : Number(b) / 255,
      }
    }
    throw new Error('Invalid RGB string')
  },
  hexa: (value: string) => {
    const match = value.match(/#?([0-9A-F]{8})/i)
    if (match) {
      const hex = Number.parseInt(match[1], 16)
      return {
        hex,
        r: ((hex >> 24) & 0xFF),
        g: (hex >> 16) & 0xFF,
        b: (hex >> 8) & 0xFF,
        a: (hex & 0xFF) / 255,
      }
    }
    throw new Error('Invalid HEXA string')
  },
  hex: (value: string) => {
    const match = value.match(/#?([0-9A-F]{6})/i)
    if (match) {
      const hex = Number.parseInt(match[1], 16)
      return {
        hex,
        r: (hex >> 16) & 0xFF,
        g: (hex >> 8) & 0xFF,
        b: hex & 0xFF,
      }
    }
    throw new Error('Invalid HEX string')
  },
  hsla: (value: string) => {
    const match = value.match(/hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*\)/)
    if (match) {
      const [, h, s, l, a] = match
      return {
        h: Number(h),
        s: (s.endsWith('%') ? Number(s.slice(0, -1)) : Number(s)) / 100,
        l: (l.endsWith('%') ? Number(l.slice(0, -1)) : Number(l)) / 100,
        a: a.endsWith('%') ? Number(a.slice(0, -1)) / 100 : Number(a),
      }
    }
    throw new Error('Invalid HSLA string')
  },
  hsl: (value: string) => {
    const match = value.match(/hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*\)/)
    if (match) {
      const [, h, s, l] = match
      return {
        h: Number(h),
        s: (s.endsWith('%') ? Number(s.slice(0, -1)) : Number(s)) / 100,
        l: (l.endsWith('%') ? Number(l.slice(0, -1)) / 100 : Number(l)) / 100,
      }
    }
    throw new Error('Invalid HSL string')
  },
  hsva: (value: string) => {
    const match = value.match(/hsva\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*\)/)
    if (match) {
      const [, h, s, v, a] = match
      return {
        h: Number(h),
        s: (s.endsWith('%') ? Number(s.slice(0, -1)) : Number(s)) / 100,
        v: (v.endsWith('%') ? Number(v.slice(0, -1)) : Number(v)) / 100,
        a: a.endsWith('%') ? Number(a.slice(0, -1)) / 100 : Number(a),
      }
    }
    throw new Error('Invalid HSVA string')
  },
  hsv: (value: string) => {
    const match = value.match(/hsv\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*\)/)
    if (match) {
      const [, h, s, v] = match
      return {
        h: Number(h),
        s: (s.endsWith('%') ? Number(s.slice(0, -1)) : Number(s)) / 100,
        v: (v.endsWith('%') ? Number(v.slice(0, -1)) : Number(v)) / 100,
      }
    }
    throw new Error('Invalid HSV string')
  },
  cmyka: (value: string) => {
    const match = value.match(/cmyka\(\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*\)/)
    if (match) {
      const [, c, m, y, k, a] = match
      return {
        c: (c.endsWith('%') ? Number(c.slice(0, -1)) : Number(c)) / 100,
        m: (m.endsWith('%') ? Number(m.slice(0, -1)) : Number(m)) / 100,
        y: (y.endsWith('%') ? Number(y.slice(0, -1)) : Number(y)) / 100,
        k: (k.endsWith('%') ? Number(k.slice(0, -1)) : Number(k)) / 100,
        a: a.endsWith('%') ? Number(a.slice(0, -1)) / 100 : Number(a),
      }
    }
    throw new Error('Invalid CMYKA string')
  },
  cmyk: (value: string) => {
    const match = value.match(/cmyk\(\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*,\s*(\d+(?:\.\d+)?%?)\s*\)/)
    if (match) {
      const [, c, m, y, k] = match
      return {
        c: (c.endsWith('%') ? Number(c.slice(0, -1)) : Number(c)) / 100,
        m: (m.endsWith('%') ? Number(m.slice(0, -1)) : Number(m)) / 100,
        y: (y.endsWith('%') ? Number(y.slice(0, -1)) : Number(y)) / 100,
        k: (k.endsWith('%') ? Number(k.slice(0, -1)) : Number(k)) / 100,
      }
    }
    throw new Error('Invalid CMYK string')
  },
} as const

// Object parser
const parseObject: ParserObject<object> = {
  rgba: (value: object) => {
    const { r, g, b, a = 1 } = value as any
    if (typeof r === 'number' && typeof g === 'number' && typeof b === 'number' && typeof a === 'number') {
      return { r, g, b, a }
    }
    throw new Error('Invalid RGBA object')
  },
  rgb: (value: object) => {
    const { r, g, b } = value as any
    if (typeof r === 'number' && typeof g === 'number' && typeof b === 'number') {
      return { r, g, b }
    }
    throw new Error('Invalid RGB object')
  },
  hexa: (value: object) => {
    const { hex, r, g, b, a = 1 } = value as any
    if (typeof hex === 'number' && typeof r === 'number' && typeof g === 'number' && typeof b === 'number' && typeof a === 'number') {
      return { hex, r, g, b, a }
    }
    throw new Error('Invalid HEXA object')
  },
  hex: (value: object) => {
    const { hex, r, g, b } = value as any
    if (typeof hex === 'number' && typeof r === 'number' && typeof g === 'number' && typeof b === 'number') {
      return { hex, r, g, b }
    }
    throw new Error('Invalid HEX object')
  },
  hsla: (value: object) => {
    const { h, s, l, a = 1 } = value as any
    if (typeof h === 'number' && typeof s === 'number' && typeof l === 'number' && typeof a === 'number') {
      return { h, s, l, a }
    }
    throw new Error('Invalid HSLA object')
  },
  hsl: (value: object) => {
    const { h, s, l } = value as any
    if (typeof h === 'number' && typeof s === 'number' && typeof l === 'number') {
      return { h, s, l }
    }
    throw new Error('Invalid HSL object')
  },
  hsva: (value: object) => {
    const { h, s, v, a = 1 } = value as any
    if (typeof h === 'number' && typeof s === 'number' && typeof v === 'number' && typeof a === 'number') {
      return { h, s, v, a }
    }
    throw new Error('Invalid HSVA object')
  },
  hsv: (value: object) => {
    const { h, s, v } = value as any
    if (typeof h === 'number' && typeof s === 'number' && typeof v === 'number') {
      return { h, s, v }
    }
    throw new Error('Invalid HSV object')
  },
  cmyka: (value: object) => {
    const { c, m, y, k, a = 1 } = value as any
    if (typeof c === 'number' && typeof m === 'number' && typeof y === 'number' && typeof k === 'number' && typeof a === 'number') {
      return { c, m, y, k, a }
    }
    throw new Error('Invalid CMYKA object')
  },
  cmyk: (value: object) => {
    const { c, m, y, k } = value as any
    if (typeof c === 'number' && typeof m === 'number' && typeof y === 'number' && typeof k === 'number') {
      return { c, m, y, k }
    }
    throw new Error('Invalid CMYK object')
  },
}

// Parser
const parseSoft: ParserObject = {}

for (const format of formatsAll) {
  parseSoft[format] = ((value: unknown) => {
    if (typeof value === 'string') {
      const parser = parseString[format]
      if (parser) {
        return parser(value)
      }
      else {
        throw new Error(`String parser for ${format} not found`)
      }
    }
    else if (typeof value === 'object' && value !== null) {
      const parser = parseObject[format]
      if (parser) {
        return parser(value)
      }
      else {
        throw new Error(`Object parser for ${format} not found`)
      }
    }
    throw new Error(`Invalid input, expected ${format}`)
  }) as any
}

const parse = parseSoft as ParserObjectStrict

export { parse }
