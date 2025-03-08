import type { ColorChannel } from '@vueuse/color'

export const blueChannelFormats = ['rgb', 'lrgb'] as const

export type BlueChannelFormats = typeof blueChannelFormats[number]

export function blueChannelFromFormat(format: BlueChannelFormats): ColorChannel<BlueChannelFormats> {
  switch (format) {
    case 'rgb':
    case 'lrgb':
      return 'b'
    default:
      throw new Error(`Invalid blue format: ${format}`)
  }
}
