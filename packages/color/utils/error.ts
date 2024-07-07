import type { ColorFormat } from '@vueuse/color'

export class ColorFormatError extends Error {
  constructor(
    public message: string,
    public value: string,
    public format: ColorFormat,
    public cause?: string,
  ) {
    super(message)
    this.name = 'ColorFormatError'
    this.cause = cause
    this.message = message
    this.value = value
    this.format = format
  }
}
