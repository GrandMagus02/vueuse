import type { ColorFormat } from './formats/base'
import type { ColorFormatResult, ColorFormatValue } from './converter'
import { ColorFormatConverter } from './converter'

interface DeterminantResult<TArray extends ColorFormatValue<ColorFormat>, TFormat extends ColorFormat> {
  value: TArray
  format: TFormat
}

export function determinateValue<TFormat extends ColorFormat>(
  value: string | ColorFormatResult<TFormat>,
  format?: ColorFormat,
): DeterminantResult<ColorFormatValue<TFormat>, TFormat> {
  if (typeof value === 'object' && 'format' in value) {
    const valueFormat = value.format as ColorFormat
    const result = ColorFormatConverter[valueFormat].deserialize(value as any) as ColorFormatValue<TFormat>
    return { value: result as ColorFormatValue<TFormat>, format: valueFormat as TFormat }
  }
  for (const f in ColorFormatConverter) {
    if (format && f !== format)
      continue
    try {
      const result = ColorFormatConverter[f as ColorFormat].parse(value as string) as ColorFormatValue<TFormat>
      return { value: result as ColorFormatValue<TFormat>, format: f as TFormat }
    }
    catch {
      // ignore
    }
  }
  throw new Error('Invalid color')
}
