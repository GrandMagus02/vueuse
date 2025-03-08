import { describe, expect, it } from 'vitest'
import type { Color, ColorFormat } from '@vueuse/color'
import { convertColor } from '.'

describe('convertColor', () => {
  it('should be defined', () => {
    expect(convertColor).toBeDefined()
  })

  const colors: Record<string, {
    [F in ColorFormat]?: {
      [T in ColorFormat]?: {
        input?: Color<F>
        output?: Color<T>
      }
    }
  }> = {
    white: {
      rgb: {
        lrgb: {
          input: { r: 1, g: 1, b: 1, a: 1 },
          output: { r: 1, g: 1, b: 1, a: 1 },
        },
        hsl: {
          input: { r: 1, g: 1, b: 1, a: 1 },
          output: { h: 0, s: 0, l: 1, a: 1 },
        },
        hsv: {
          input: { r: 1, g: 1, b: 1, a: 1 },
          output: { h: 0, s: 0, v: 1, a: 1 },
        },
        hwb: {
          input: { r: 1, g: 1, b: 1, a: 1 },
          output: { h: 0, w: 1, b: 0, a: 1 },
        },
        cmyk: {
          input: { r: 1, g: 1, b: 1, a: 1 },
          output: { c: 0, m: 0, y: 0, k: 0, a: 1 },
        },
      },
    },
    cyan: {
      rgb: {
        lrgb: {
          input: { r: 0, g: 1, b: 1, a: 1 },
          output: { r: 0, g: 1, b: 1, a: 1 },
        },
        hsl: {
          input: { r: 0, g: 1, b: 1, a: 1 },
          output: { h: 0.5, s: 1, l: 0.5, a: 1 },
        },
        hsv: {
          input: { r: 0, g: 1, b: 1, a: 1 },
          output: { h: 0.5, s: 1, v: 0.5, a: 1 },
        },
        hwb: {
          input: { r: 0, g: 1, b: 1, a: 1 },
          output: { h: 0.5, w: 0, b: 0, a: 1 },
        },
        cmyk: {
          input: { r: 0, g: 1, b: 1, a: 1 },
          output: { c: 1, m: 0, y: 0, k: 0, a: 1 },
        },
      },
    },
  }

  it('should work', () => {
    for (const [color, fromFormats] of Object.entries(colors)) {
      for (const [from, toFormats] of Object.entries(fromFormats)) {
        for (const [to, values] of Object.entries(toFormats)) {
          expect(
            convertColor(values.input, to as ColorFormat, { format: from as ColorFormat, precision: 6 }),
            `${color} (${JSON.stringify(values.input)}) from '${from}' to '${to}'`,
          ).toEqual(values.output)
        }
      }
    }
  })
})
