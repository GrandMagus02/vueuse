import { ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import type { ColorFormatResult } from '@vueuse/color'
import { ColorFormat, Harmony, colorHarmony } from '@vueuse/color'

describe('colorHarmony', () => {
  it('should be defined', () => {
    expect(colorHarmony).toBeDefined()
  })

  const color = '#0066CC'
  const harmoniesResult: Record<Harmony, ColorFormatResult<ColorFormat>[]> = {
    [Harmony.Complementary]: [
      { hex: '#CC6600', r: 'CC', g: '66', b: '00', format: ColorFormat.HEX },
    ],
    [Harmony.SplitComplementary]: [
      // with degree 30
      { hex: '#CC0000', r: 'CC', g: '00', b: '00', format: ColorFormat.HEX },
      { hex: '#CCCC00', r: 'CC', g: 'CC', b: '00', format: ColorFormat.HEX },
    ],
    [Harmony.Analogous]: [
      // with degree 30
      { hex: '#00CCCC', r: '00', g: 'CC', b: 'CC', format: ColorFormat.HEX },
      { hex: '#0000CC', r: '00', g: '00', b: 'CC', format: ColorFormat.HEX },
    ],
    [Harmony.Triadic]: [
      { hex: '#CC0066', r: 'CC', g: '00', b: '66', format: ColorFormat.HEX },
      { hex: '#66CC00', r: '66', g: 'CC', b: '00', format: ColorFormat.HEX },
    ],
    [Harmony.Tetradic]: [
      { hex: '#6600CC', r: '66', g: '00', b: 'CC', format: ColorFormat.HEX },
      { hex: '#CC6600', r: 'CC', g: '66', b: '00', format: ColorFormat.HEX },
      { hex: '#66CC00', r: '66', g: 'CC', b: '00', format: ColorFormat.HEX },
    ],
    [Harmony.Tertiary]: [
      { hex: '#6600CC', r: '66', g: '00', b: 'CC', format: ColorFormat.HEX },
      { hex: '#CC0066', r: 'CC', g: '00', b: '66', format: ColorFormat.HEX },
      { hex: '#CC6600', r: 'CC', g: '66', b: '00', format: ColorFormat.HEX },
      { hex: '#66CC00', r: '66', g: 'CC', b: '00', format: ColorFormat.HEX },
      { hex: '#00CC66', r: '00', g: 'CC', b: '66', format: ColorFormat.HEX },
    ],
    [Harmony.Square]: [
      { hex: '#CC00CC', r: 'CC', g: '00', b: 'CC', format: ColorFormat.HEX },
      { hex: '#CC6600', r: 'CC', g: '66', b: '00', format: ColorFormat.HEX },
      { hex: '#00CC00', r: '00', g: 'CC', b: '00', format: ColorFormat.HEX },
    ],
    [Harmony.Monochromatic]: [
      { hex: '#99CCFF', r: '99', g: 'CC', b: 'FF', format: ColorFormat.HEX },
      { hex: '#3399FF', r: '33', g: '99', b: 'FF', format: ColorFormat.HEX },
      { hex: '#003366', r: '00', g: '33', b: '66', format: ColorFormat.HEX },
      { hex: '#000000', r: '00', g: '00', b: '00', format: ColorFormat.HEX },
    ],
    [Harmony.Tints]: [
      { hex: '#3399FF', r: '33', g: '99', b: 'FF', format: ColorFormat.HEX },
      { hex: '#99CCFF', r: '99', g: 'CC', b: 'FF', format: ColorFormat.HEX },
      { hex: '#FFFFFF', r: 'FF', g: 'FF', b: 'FF', format: ColorFormat.HEX },
      { hex: '#FFFFFF', r: 'FF', g: 'FF', b: 'FF', format: ColorFormat.HEX },
    ],
    [Harmony.Shades]: [
      { hex: '#003366', r: '00', g: '33', b: '66', format: ColorFormat.HEX },
      { hex: '#000000', r: '00', g: '00', b: '00', format: ColorFormat.HEX },
      { hex: '#000000', r: '00', g: '00', b: '00', format: ColorFormat.HEX },
      { hex: '#000000', r: '00', g: '00', b: '00', format: ColorFormat.HEX },
    ],
  }

  for (const harmony in harmoniesResult) {
    it(`returns correct color harmony for ${harmony}`, () => {
      const result = colorHarmony(color, harmony as Harmony)
      expect(result).toEqual(harmoniesResult[harmony as Harmony])
    })
  }

  /* it('returns correct color harmony for custom harmony', () => {
    const result = colorHarmony<ColorFormat.HEX>(color, (value) => {
      console.log(value)
      return [
        { ...value, hex: `#FF${value.b}${value.r}`, r: 'FF' },
      ]
    })
    expect(result).toEqual([
      { hex: '#ffcc00', r: 'FF', g: 'CC', b: '00', format: ColorFormat.HEX },
    ])
  }) */

  /* it('returns correct color harmony for custom harmony with options', () => {
    const result = colorHarmony<ColorFormat.HEX>(color, (value) => {
      return [
        { ...value, hex: `#FF${value.b}${value.r}`, r: 'FF' },
      ]
    }, { format: ColorFormat.RGB })
    expect(result).toEqual([
      { hex: '#ffcc00', r: 'FF', g: 'CC', b: '00', format: ColorFormat.HEX },
    ])
  }) */

  it('should work with refs', () => {
    const colorRef = ref(color)
    const result = colorHarmony(colorRef, Harmony.Complementary)
    expect(result).toEqual(harmoniesResult[Harmony.Complementary])
  })

  /* it('should work with refs for custom harmony', () => {
    const colorRef = ref(color)
    const result = colorHarmony<ColorFormat.HEX>(colorRef, (value) => {
      return [
        { ...value, hex: `#FF${value.b}${value.r}`, r: 'FF' },
      ]
    })
    expect(result).toEqual([
      { hex: '#ffcc00', r: 'FF', g: 'CC', b: '00', format: ColorFormat.HEX },
    ])
  }) */

  /* it('should work with refs for custom harmony with options', () => {
    const colorRef = ref(color)
    const result = colorHarmony<ColorFormat.HEX>(colorRef, (value) => {
      return [
        { ...value, hex: `#FF${value.b}${value.r}`, r: 'FF' },
      ]
    }, { format: ColorFormat.RGB })
    expect(result).toEqual([
      { hex: '#ffcc00', r: 'FF', g: 'CC', b: '00', format: ColorFormat.HEX },
    ])
  }) */
})
