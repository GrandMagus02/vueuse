import type { ColorChannel } from '@vueuse/color'
import { Format } from '@vueuse/color'

export const saturationChannelFormats = [Format.HSL, Format.HSV] as const

export type SaturationChannelFormat = typeof saturationChannelFormats[number]

export function saturationChannelFromFormat(format: SaturationChannelFormat = saturationChannelFormats[0]): ColorChannel<SaturationChannelFormat> {
  switch (format) {
    case Format.HSL:
    case Format.HSV:
      return 's'
    default:
      throw new Error(`Invalid saturation format: ${format}`)
  }
}
