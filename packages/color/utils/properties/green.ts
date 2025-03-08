import type { ColorChannel } from '@vueuse/color'

export const greenChannelFormats = ['rgb', 'lrgb'] as const

export type GreenChannelFormats = typeof greenChannelFormats[number]

export function greenChannelFromFormat(format: GreenChannelFormats): ColorChannel<GreenChannelFormats> {
  switch (format) {
    case 'rgb':
    case 'lrgb':
      return 'g'
    default:
      throw new Error(`Invalid green format: ${format}`)
  }
}
