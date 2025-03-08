import type { ColorChannel } from '@vueuse/color'

export const redChannelFormats = ['rgb', 'lrgb'] as const

export type RedChannelFormats = typeof redChannelFormats[number]

export function redChannelFromFormat(format: RedChannelFormats): ColorChannel<RedChannelFormats> {
  switch (format) {
    case 'rgb':
    case 'lrgb':
      return 'r'
    default:
      throw new Error(`Invalid red format: ${format}`)
  }
}
