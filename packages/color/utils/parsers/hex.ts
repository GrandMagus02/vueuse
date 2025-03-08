import type { HEX } from '@vueuse/color'

/**
 * Parse HEX string.
 * Reference: https://www.w3.org/TR/css-color-4/#hex-notation
 * Ensures digits are in the range 0–F.
 * @param value HEX string
 * @returns HEX object if valid, otherwise undefined
 */
export function parseHexString(value: string): HEX | undefined {
  const input = value.trim()
  // Regex using alternation for shorthand (3 or 4 digits) or longhand (6 or 8 digits)
  const regex = /^#?(?:(?<shorthand>[A-F0-9]{3})|(?<shorthandAlpha>[A-F0-9]{4})|(?<longhand>[A-F0-9]{6})|(?<longhandAlpha>[A-F0-9]{8}))$/i
  const match = regex.exec(input)
  if (!match)
    return undefined

  let r: string, g: string, b: string, a: string

  if (match.groups?.shorthand) {
    const shorthand = match.groups.shorthand
    r = shorthand[0] + shorthand[0]
    g = shorthand[1] + shorthand[1]
    b = shorthand[2] + shorthand[2]
    a = 'ff'
  }
  else if (match.groups?.shorthandAlpha) {
    const shorthandAlpha = match.groups.shorthandAlpha
    r = shorthandAlpha[0] + shorthandAlpha[0]
    g = shorthandAlpha[1] + shorthandAlpha[1]
    b = shorthandAlpha[2] + shorthandAlpha[2]
    a = shorthandAlpha[3] + shorthandAlpha[3]
  }
  else if (match.groups?.longhand) {
    const longhand = match.groups.longhand
    r = longhand.slice(0, 2)
    g = longhand.slice(2, 4)
    b = longhand.slice(4, 6)
    a = 'ff'
  }
  else if (match.groups?.longhandAlpha) {
    const longhandAlpha = match.groups.longhandAlpha
    r = longhandAlpha.slice(0, 2)
    g = longhandAlpha.slice(2, 4)
    b = longhandAlpha.slice(4, 6)
    a = longhandAlpha.slice(6, 8)
  }
  else {
    return undefined
  }

  return {
    hex: Number.parseInt(r + g + b, 16),
    r: Number.parseInt(r, 16) / 255,
    g: Number.parseInt(g, 16) / 255,
    b: Number.parseInt(b, 16) / 255,
    a: Number.parseInt(a, 16) / 255,
  }
}
