export function parseIntegerOrPercent(value: string): number {
  return Math.min(Math.max(value.endsWith('%') ? Number.parseInt(value) / 100 : Number.parseInt(value), 0), 1)
}

export function parse255IntegerOrPercent(value: string): number {
  return Math.min(Math.max(value.endsWith('%') ? Number.parseInt(value) / 100 : (Number.parseInt(value) / 255), 0), 1)
}

export function parseFloatOrPercent(value: string): number {
  return Math.min(Math.max(value.endsWith('%') ? Number.parseFloat(value) / 100 : Number.parseFloat(value), 0), 1)
}

export function parsePercent(value: string): number {
  return Math.min(Math.max(Number.parseFloat(value) / 100, 0), 1)
}

export function parseAngle(value: string): number {
  return Number.parseFloat(value.replace('deg', '')) % 360
}
