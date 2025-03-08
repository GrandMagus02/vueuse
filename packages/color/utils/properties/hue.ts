import type { ColorChannel } from '@vueuse/color'

export const hueChannelFormats = ['hsl', 'hsv', 'hwb', 'lch', 'oklch'] as const

export type HueChannelFormat = typeof hueChannelFormats[number]

export function hueChannelFromFormat<T extends HueChannelFormat>(format: T): ColorChannel<T> {
  switch (format) {
    case 'hsl':
    case 'hsv':
    case 'hwb':
    case 'lch':
    case 'oklch':
      return 'h' as ColorChannel<T>
    default:
      throw new Error(`Invalid hue format: ${format}`)
  }
}
