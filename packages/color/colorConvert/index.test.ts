import { ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import type { ColorFormatResult } from '@vueuse/color'
import { ColorFormat, colorConvert } from '@vueuse/color'

describe('colorConvert', () => {
  it('should be defined', () => {
    expect(colorConvert).toBeDefined()
  })

  const formatResults: Record<ColorFormat, ColorFormatResult<ColorFormat>> = {
    [ColorFormat.HEX]: { hex: '#0066CC', r: '00', g: '66', b: 'CC', format: ColorFormat.HEX },
    [ColorFormat.HEXA]: {
      hex: '#0066CC',
      hexa: '#0066CCFF',
      r: '00',
      g: '66',
      b: 'CC',
      a: 'FF',
      format: ColorFormat.HEXA,
    },
    [ColorFormat.RGB]: { r: 0, g: 102, b: 204, format: ColorFormat.RGB },
    [ColorFormat.RGBA]: { r: 0, g: 102, b: 204, a: 1, format: ColorFormat.RGBA },
    [ColorFormat.RGBPercent]: { r: 0, g: 0.4, b: 0.8, format: ColorFormat.RGBPercent },
    [ColorFormat.RGBAPercent]: { r: 0, g: 0.4, b: 0.8, a: 1, format: ColorFormat.RGBAPercent },
    [ColorFormat.HSL]: { h: 210, s: 100, l: 40, format: ColorFormat.HSL },
    [ColorFormat.HSLA]: { h: 210, s: 100, l: 40, a: 1, format: ColorFormat.HSLA },
    [ColorFormat.HSV]: { h: 210, s: 100, v: 80, format: ColorFormat.HSV },
    [ColorFormat.HSVA]: { h: 210, s: 100, v: 80, a: 1, format: ColorFormat.HSVA },
  }

  for (const fromFormat in formatResults) {
    for (const toFormat in formatResults) {
      it(`converts color format correctly from ${fromFormat} to ${toFormat}`, () => {
        const result = colorConvert(formatResults[fromFormat as ColorFormat], toFormat as ColorFormat)
        expect(result).toEqual(formatResults[toFormat as ColorFormat])
      })
    }
  }

  const stringFormatResults: Record<ColorFormat, string> = {
    [ColorFormat.HEX]: '#0066CC',
    [ColorFormat.HEXA]: '#0066CCFF',
    [ColorFormat.RGB]: 'rgb(0, 102, 204)',
    [ColorFormat.RGBA]: 'rgba(0, 102, 204, 1)',
    [ColorFormat.RGBPercent]: 'rgb(0%, 40%, 80%)',
    [ColorFormat.RGBAPercent]: 'rgba(0%, 40%, 80%, 1)',
    [ColorFormat.HSL]: 'hsl(210, 100%, 40%)',
    [ColorFormat.HSLA]: 'hsla(210, 100%, 40%, 1)',
    [ColorFormat.HSV]: 'hsv(210, 100%, 80%)',
    [ColorFormat.HSVA]: 'hsva(210, 100%, 80%, 1)',
  }

  for (const fromFormat in stringFormatResults) {
    for (const toFormat in stringFormatResults) {
      it(`converts color format with parsing correctly from ${fromFormat} to ${toFormat}`, () => {
        const result = colorConvert(stringFormatResults[fromFormat as ColorFormat], toFormat as ColorFormat)
        expect(result).toEqual(formatResults[toFormat as ColorFormat])
      })
    }
  }

  const input = '#F00'
  const output = { r: 255, g: 0, b: 0, format: ColorFormat.RGB } satisfies ColorFormatResult<ColorFormat.RGB>
  const outputHEX = { hex: '#FF0000', r: 'FF', g: '00', b: '00', format: ColorFormat.HEX } satisfies ColorFormatResult<ColorFormat.HEX>

  it('converts color format correctly with direct string format', () => {
    const result = colorConvert(input, 'rgb')
    expect(result).toEqual(output)
  })

  it('converts color format correctly with direct format', () => {
    const result = colorConvert(input, ColorFormat.RGB)
    expect(result).toEqual(output)
  })

  it('converts color format correctly with options object', () => {
    const result = colorConvert(input, {
      toFormat: ColorFormat.RGB,
      fromFormat: ColorFormat.HEX,
    })
    expect(result).toEqual(output)
  })

  it('works with refs and getters', () => {
    const valueRef = ref(input)
    const formatGetter = () => ColorFormat.HEX
    const result = colorConvert(valueRef, formatGetter)
    expect(result).toEqual(outputHEX)
  })
})
