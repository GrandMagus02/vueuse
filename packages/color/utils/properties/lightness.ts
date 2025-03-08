import type { ColorChannel } from '@vueuse/color'
import { Format } from '@vueuse/color'

export const lightnessChannelFormats = [Format.HSL, Format.HSV, Format.LCH, Format.LAB, Format.OKLAB, Format.OKLCH, Format.HWB] as const

export type LightnessChannelFormat = typeof lightnessChannelFormats[number]

export function lightnessChannelFromFormat<T extends LightnessChannelFormat>(format: T): ColorChannel<T> {
  switch (format) {
    case Format.HSL:
      return 'l' as ColorChannel<T>
    case Format.HSV:
      return 'v' as ColorChannel<T>
    case Format.LCH:
    case Format.LAB:
    case Format.OKLAB:
    case Format.OKLCH:
      return 'l' as ColorChannel<T>
    case Format.HWB:
      return 'w' as ColorChannel<T>
    default:
      throw new Error(`Invalid lightness format: ${format}`)
  }
}
