import { colorKeywords, reverseKeywords } from './keywords'

export function rgbaToHsla(rgba: number[]): number[] {
  const r = rgba[0] / 255
  const g = rgba[1] / 255
  const b = rgba[2] / 255
  const a = rgba[3] / 255 // Alpha channel, normalized to 0-1 range

  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min
  let h
  let s

  if (max === min) {
    h = 0
  }
  else if (r === max) {
    h = (g - b) / delta
  }
  else if (g === max) {
    h = 2 + (b - r) / delta
  }
  else if (b === max) {
    h = 4 + (r - g) / delta
  }
  else {
    throw new Error('Unexpected condition')
  }

  h = Math.min(h * 60, 360)

  if (h < 0) {
    h += 360
  }

  const l = (min + max) / 2

  if (max === min) {
    s = 0
  }
  else if (l <= 0.5) {
    s = delta / (max + min)
  }
  else {
    s = delta / (2 - max - min)
  }

  return [h, s * 100, l * 100, a * 100] // Return HSLA with alpha in percentage
}

export function rgbaToHsva(rgba: number[]): number[] {
  let rdif
  let gdif
  let bdif
  let h
  let s

  const r = rgba[0] / 255
  const g = rgba[1] / 255
  const b = rgba[2] / 255
  const a = rgba[3] / 255 // Alpha channel, normalized to 0-1 range
  const v = Math.max(r, g, b)
  const diff = v - Math.min(r, g, b)
  const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2

  if (diff === 0) {
    h = 0
    s = 0
  }
  else {
    s = diff / v
    rdif = diffc(r)
    gdif = diffc(g)
    bdif = diffc(b)

    if (r === v) {
      h = bdif - gdif
    }
    else if (g === v) {
      h = (1 / 3) + rdif - bdif
    }
    else if (b === v) {
      h = (2 / 3) + gdif - rdif
    }
    else {
      throw new Error('Unexpected condition')
    }

    if (h < 0) {
      h += 1
    }
    else if (h > 1) {
      h -= 1
    }
  }

  return [
    h * 360,
    s * 100,
    v * 100,
    a * 100, // Return alpha in percentage
  ]
}

export function rgbaToHwba(rgba: number[]): number[] {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  const a = rgba[3] / 255 // Alpha channel, normalized to 0-1 range
  const h = rgbaToHsla(rgba)[0]
  const w = 1 / 255 * Math.min(r, Math.min(g, b))
  const black = 1 - 1 / 255 * Math.max(r, Math.max(g, b))

  return [h, w * 100, black * 100, a * 100] // Return HWBA with alpha in percentage
}

export function rgbaToCmyka(rgba: number[]): number[] {
  const r = rgba[0] / 255
  const g = rgba[1] / 255
  const b = rgba[2] / 255
  const a = rgba[3] / 255 // Alpha channel, normalized to 0-1 range

  const k = Math.min(1 - r, 1 - g, 1 - b)
  const c = (1 - r - k) / (1 - k) || 0
  const m = (1 - g - k) / (1 - k) || 0
  const y = (1 - b - k) / (1 - k) || 0

  return [c * 100, m * 100, y * 100, k * 100, a * 100] // Return CMYKA with alpha in percentage
}

function comparativeDistance(x: number[], y: number[]): number {
  return ((x[0] - y[0]) ** 2) + ((x[1] - y[1]) ** 2) + ((x[2] - y[2]) ** 2)
}

export function rgbaToKeyword(rgba: number[], cssKeywords: { [key: string]: number[] }): string {
  const reversed = reverseKeywords[rgba.slice(0, 3).toString()]
  if (reversed) {
    return reversed
  }

  let currentClosestDistance = Infinity
  let currentClosestKeyword

  for (const keyword of Object.keys(cssKeywords)) {
    const value = cssKeywords[keyword]
    const distance = comparativeDistance(rgba, value)

    if (distance < currentClosestDistance) {
      currentClosestDistance = distance
      currentClosestKeyword = keyword
    }
  }

  return currentClosestKeyword!
}

export function keywordToRgba(keyword: string): number[] {
  if (!colorKeywords[keyword]) {
    return [0, 0, 0, 0]
  }
  return [...colorKeywords[keyword], 255]
}

export function rgbaToXyza(rgba: number[]): number[] {
  let r = rgba[0] / 255
  let g = rgba[1] / 255
  let b = rgba[2] / 255
  const a = rgba[3] / 255

  r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92)
  g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92)
  b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92)

  const x = (r * 0.4124564) + (g * 0.3575761) + (b * 0.1804375)
  const y = (r * 0.2126729) + (g * 0.7151522) + (b * 0.072175)
  const z = (r * 0.0193339) + (g * 0.119192) + (b * 0.9503041)

  return [x * 100, y * 100, z * 100, a * 100]
}

export function rgbaToLaba(rgba: number[]): number[] {
  const xyza = rgbaToXyza(rgba)
  let x = xyza[0]
  let y = xyza[1]
  let z = xyza[2]
  const a = xyza[3]

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116)
  y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116)
  z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116)

  const l = (116 * y) - 16
  const a_lab = 500 * (x - y)
  const b = 200 * (y - z)

  return [l, a_lab, b, a]
}

export function hslaToRgba(hsla: number[]): number[] {
  const h = hsla[0] / 360
  const s = hsla[1] / 100
  const l = hsla[2] / 100
  const a = hsla[3] / 100
  let t2
  let t3
  let val

  if (s === 0) {
    val = l * 255
    return [val, val, val, a * 255]
  }

  if (l < 0.5) {
    t2 = l * (1 + s)
  }
  else {
    t2 = l + s - l * s
  }

  const t1 = 2 * l - t2

  const rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1)
    if (t3 < 0) {
      t3++
    }

    if (t3 > 1) {
      t3--
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3
    }
    else if (2 * t3 < 1) {
      val = t2
    }
    else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    }
    else {
      val = t1
    }

    rgb[i] = val * 255
  }

  return [...rgb, a * 255]
}

export function hslaToHsva(hsla: number[]): number[] {
  const h = hsla[0]
  let s = hsla[1] / 100
  let l = hsla[2] / 100
  const a = hsla[3] / 100
  let smin = s
  const lmin = Math.max(l, 0.01)

  l *= 2
  s *= (l <= 1) ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  const v = (l + s) / 2
  const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return [h, sv * 100, v * 100, a * 100]
}

export function hsvaToRgba(hsva: number[]): number[] {
  const h = hsva[0] / 60
  const s = hsva[1] / 100
  let v = hsva[2] / 100
  const a = hsva[3] / 100 // Alpha channel, normalized to 0-1 range
  const hi = Math.floor(h) % 6

  const f = h - Math.floor(h)
  const p = 255 * v * (1 - s)
  const q = 255 * v * (1 - (s * f))
  const t = 255 * v * (1 - (s * (1 - f)))
  v *= 255

  let r, g, b

  switch (hi) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
    default:
      throw new Error('Unexpected condition')
  }

  return [r, g, b, a * 255] // Return RGBA with alpha in the 0-255 range
}

export function hsvaToHsla(hsva: number[]): number[] {
  const h = hsva[0]
  const s = hsva[1] / 100
  const v = hsva[2] / 100
  const a = hsva[3] / 100
  const vmin = Math.max(v, 0.01)
  let sl
  let l

  l = (2 - s) * v
  const lmin = (2 - s) * vmin
  sl = s * vmin
  sl /= (lmin <= 1) ? lmin : 2 - lmin
  sl = sl || 0
  l /= 2

  return [h, sl * 100, l * 100, a * 100]
}

export function hwbaToRgba(hwba: number[]): number[] {
  const h = hwba[0] / 360
  let wh = hwba[1] / 100
  let bl = hwba[2] / 100
  const a = hwba[3] / 100
  const ratio = wh + bl
  let f

  if (ratio > 1) {
    wh /= ratio
    bl /= ratio
  }

  const i = Math.floor(6 * h)
  const v = 1 - bl
  f = 6 * h - i

  if ((i & 0x01) !== 0) {
    f = 1 - f
  }

  const n = wh + f * (v - wh)

  let r
  let g
  let b
  switch (i) {
    case 6:
    case 0:
      r = v
      g = n
      b = wh
      break
    case 1:
      r = n
      g = v
      b = wh
      break
    case 2:
      r = wh
      g = v
      b = n
      break
    case 3:
      r = wh
      g = n
      b = v
      break
    case 4:
      r = n
      g = wh
      b = v
      break
    case 5:
      r = v
      g = wh
      b = n
      break
    default:
      r = v
      g = n
      b = wh
      break
  }

  return [r * 255, g * 255, b * 255, a * 255]
}

export function cmykaToRgba(cmyka: number[]): number[] {
  const c = cmyka[0] / 100
  const m = cmyka[1] / 100
  const y = cmyka[2] / 100
  const k = cmyka[3] / 100
  const a = cmyka[4] / 100

  const r = 1 - Math.min(1, c * (1 - k) + k)
  const g = 1 - Math.min(1, m * (1 - k) + k)
  const b = 1 - Math.min(1, y * (1 - k) + k)

  return [r * 255, g * 255, b * 255, a * 255]
}

export function xyzaToRgba(xyza: number[]): number[] {
  const x = xyza[0] / 100
  const y = xyza[1] / 100
  const z = xyza[2] / 100
  const a = xyza[3] / 100
  let r
  let g
  let b

  r = (x * 3.2404542) + (y * -1.5371385) + (z * -0.4985314)
  g = (x * -0.969266) + (y * 1.8760108) + (z * 0.041556)
  b = (x * 0.0556434) + (y * -0.2040259) + (z * 1.0572252)

  r = r > 0.0031308 ? ((1.055 * (r ** (1.0 / 2.4))) - 0.055) : r * 12.92
  g = g > 0.0031308 ? ((1.055 * (g ** (1.0 / 2.4))) - 0.055) : g * 12.92
  b = b > 0.0031308 ? ((1.055 * (b ** (1.0 / 2.4))) - 0.055) : b * 12.92

  r = Math.min(Math.max(0, r), 1)
  g = Math.min(Math.max(0, g), 1)
  b = Math.min(Math.max(0, b), 1)

  return [r * 255, g * 255, b * 255, a * 255]
}

export function xyzaToLaba(xyza: number[]): number[] {
  let x = xyza[0]
  let y = xyza[1]
  let z = xyza[2]
  const a = xyza[3]

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116)
  y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116)
  z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116)

  const l = (116 * y) - 16
  const a_lab = 500 * (x - y)
  const b = 200 * (y - z)

  return [l, a_lab, b, a]
}

export function labaToXyza(laba: number[]): number[] {
  const l = laba[0]
  const a = laba[1]
  const b = laba[2]
  const alpha = laba[3]
  let x
  let y
  let z

  y = (l + 16) / 116
  x = a / 500 + y
  z = y - b / 200

  const y2 = y ** 3
  const x2 = x ** 3
  const z2 = z ** 3
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787

  x *= 95.047
  y *= 100
  z *= 108.883

  return [x, y, z, alpha]
}

export function labaToLcha(laba: number[]): number[] {
  const l = laba[0]
  const a = laba[1]
  const b = laba[2]
  const alpha = laba[3]
  let h

  const hr = Math.atan2(b, a)
  h = hr * 360 / 2 / Math.PI

  if (h < 0) {
    h += 360
  }

  const c = Math.sqrt(a * a + b * b)

  return [l, c, h, alpha]
}

export function lchaToLaba(lcha: number[]): number[] {
  const l = lcha[0]
  const c = lcha[1]
  const h = lcha[2]
  const alpha = lcha[3]

  const hr = h / 360 * 2 * Math.PI
  const a = c * Math.cos(hr)
  const b = c * Math.sin(hr)

  return [l, a, b, alpha]
}

export function rgbaToAnsi16(rgba: number[], saturation: number | null = null): number {
  const [r, g, b, _] = rgba // Alpha is present but not used in ANSI16
  let value = saturation === null ? rgbaToHsva(rgba)[2] : saturation

  value = Math.round(value / 50)

  if (value === 0) {
    return 30
  }

  let ansi = 30 + ((Math.round(b / 255) << 2) | (Math.round(g / 255) << 1) | Math.round(r / 255))

  if (value === 2) {
    ansi += 60
  }

  return ansi
}

export function hsvaToAnsi16(hsva: number[]): number {
  return rgbaToAnsi16(hsvaToRgba(hsva), hsva[2])
}

export function rgbaToAnsi256(rgba: number[]): number {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]

  if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
    if (r < 8) {
      return 16
    }

    if (r > 248) {
      return 231
    }

    return Math.round(((r - 8) / 247) * 24) + 232
  }

  const ansi = 16
    + (36 * Math.round(r / 255 * 5))
    + (6 * Math.round(g / 255 * 5))
    + Math.round(b / 255 * 5)

  return ansi
}

export function ansi16ToRgba(args: number[]): number[] {
  let color = args[0] % 10

  if (color === 0 || color === 7) {
    if (args[0] > 50) {
      color += 3.5
    }

    color = color / 10.5 * 255

    return [color, color, color, 255]
  }

  const mult = (~~(args[0] > 50) + 1) * 0.5
  const r = ((color & 1) * mult) * 255
  const g = (((color >> 1) & 1) * mult) * 255
  const b = (((color >> 2) & 1) * mult) * 255

  return [r, g, b, 255]
}

export function ansi256ToRgba(args: number[]): number[] {
  let newArgs = args[0]

  if (newArgs >= 232) {
    const c = (newArgs - 232) * 10 + 8
    return [c, c, c, 255]
  }

  newArgs -= 16

  let rem
  const r = Math.floor(newArgs / 36) / 5 * 255
  const g = Math.floor((rem = newArgs % 36) / 6) / 5 * 255
  const b = (rem % 6) / 5 * 255

  return [r, g, b, 255]
}

export function rgbaToHexa(rgba: number[]): string {
  const integer = ((Math.round(rgba[0]) & 0xFF) << 16)
    + ((Math.round(rgba[1]) & 0xFF) << 8)
    + (Math.round(rgba[2]) & 0xFF)
    + ((Math.round(rgba[3] / 255 * 255) & 0xFF) << 24)

  const string = integer.toString(16).toUpperCase()
  return `#${'00000000'.substring(string.length)}${string}`
}

export function hexaToRgba(hexa: string): number[] {
  const match = hexa.toString().match(/[a-f0-9]{8}|[a-f0-9]{4}/i)
  if (!match) {
    return [0, 0, 0, 0]
  }

  let colorString = match[0]

  if (match[0].length === 4) {
    colorString = colorString.split('').map((char) => {
      return char + char
    }).join('')
  }

  const integer = Number.parseInt(colorString, 16)
  const r = (integer >> 24) & 0xFF
  const g = (integer >> 16) & 0xFF
  const b = (integer >> 8) & 0xFF
  const a = (integer & 0xFF)

  return [r, g, b, a]
}

export function rgbaToHcga(rgba: number[]): number[] {
  const r = rgba[0] / 255
  const g = rgba[1] / 255
  const b = rgba[2] / 255
  const a = rgba[3] / 255
  const max = Math.max(Math.max(r, g), b)
  const min = Math.min(Math.min(r, g), b)
  const chroma = (max - min)
  let grayscale
  let hue

  if (chroma < 1) {
    grayscale = min / (1 - chroma)
  }
  else {
    grayscale = 0
  }

  if (chroma <= 0) {
    hue = 0
  }
  else if (max === r) {
    hue = ((g - b) / chroma) % 6
  }
  else if (max === g) {
    hue = 2 + (b - r) / chroma
  }
  else {
    hue = 4 + (r - g) / chroma
  }

  hue /= 6
  hue %= 1

  return [hue * 360, chroma * 100, grayscale * 100, a * 100]
}

export function hslaToHcga(hsla: number[]): number[] {
  const s = hsla[1] / 100
  const l = hsla[2] / 100
  const a = hsla[3] / 100

  const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l))

  let f = 0
  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c)
  }

  return [hsla[0], c * 100, f * 100, a * 100]
}

export function hsvaToHcga(hsva: number[]): number[] {
  const s = hsva[1] / 100
  const v = hsva[2] / 100
  const a = hsva[3] / 100

  const c = s * v
  let f = 0

  if (c < 1.0) {
    f = (v - c) / (1 - c)
  }

  return [hsva[0], c * 100, f * 100, a * 100]
}

export function hcgaToRgba(hcga: number[]): number[] {
  const h = hcga[0] / 360
  const c = hcga[1] / 100
  const g = hcga[2] / 100
  const a = hcga[3] / 100

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255, a * 255]
  }

  const pure = [0, 0, 0]
  const hi = (h % 1) * 6
  const v = hi % 1
  const w = 1 - v
  let mg = 0

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1
      pure[1] = v
      pure[2] = 0
      break
    case 1:
      pure[0] = w
      pure[1] = 1
      pure[2] = 0
      break
    case 2:
      pure[0] = 0
      pure[1] = 1
      pure[2] = v
      break
    case 3:
      pure[0] = 0
      pure[1] = w
      pure[2] = 1
      break
    case 4:
      pure[0] = v
      pure[1] = 0
      pure[2] = 1
      break
    default:
      pure[0] = 1
      pure[1] = 0
      pure[2] = w
  }

  mg = (1.0 - c) * g

  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255,
    a * 255,
  ]
}

export function hcgaToHsva(hcga: number[]): number[] {
  const c = hcga[1] / 100
  const g = hcga[2] / 100
  const a = hcga[3] / 100

  const v = c + g * (1.0 - c)
  let f = 0

  if (v > 0.0) {
    f = c / v
  }

  return [hcga[0], f * 100, v * 100, a * 100]
}

export function hcgaToHsla(hcga: number[]): number[] {
  const c = hcga[1] / 100
  const g = hcga[2] / 100
  const a = hcga[3] / 100

  const l = g * (1.0 - c) + 0.5 * c
  let s = 0

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l)
  }
  else if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l))
  }

  return [hcga[0], s * 100, l * 100, a * 100]
}

export function hcgaToHwba(hcga: number[]): number[] {
  const c = hcga[1] / 100
  const g = hcga[2] / 100
  const v = c + g * (1.0 - c)
  const a = hcga[3] / 100
  return [hcga[0], (v - c) * 100, (1 - v) * 100, a * 100]
}

export function hwbaToHcga(hwba: number[]): number[] {
  const w = hwba[1] / 100
  const b = hwba[2] / 100
  const v = 1 - b
  const c = v - w
  let g = 0
  const a = hwba[3] / 100

  if (c < 1) {
    g = (v - c) / (1 - c)
  }

  return [hwba[0], c * 100, g * 100, a * 100]
}

export function appleToRgba(apple: number[]): number[] {
  return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255, (apple[3] / 65535) * 255]
}

export function rgbaToApple(rgba: number[]): number[] {
  return [(rgba[0] / 255) * 65535, (rgba[1] / 255) * 65535, (rgba[2] / 255) * 65535, (rgba[3] / 255) * 65535]
}

export function grayToRgba(gray: number[]): number[] {
  return [gray[0] / 100 * 255, gray[0] / 100 * 255, gray[0] / 100 * 255, gray[3]]
}

export function grayToHsla(gray: number[]): number[] {
  return [0, 0, gray[0], gray[3]]
}

export const grayToHsva = grayToHsla

export function grayToHwba(gray: number[]): number[] {
  return [0, 100, gray[0], gray[3]]
}

export function grayToCmyka(gray: number[]): number[] {
  return [0, 0, 0, gray[0], gray[3]]
}

export function grayToLaba(gray: number[]): number[] {
  return [gray[0], 0, 0, gray[3]]
}

export function grayToHexa(gray: number[]): string {
  const val = Math.round(gray[0] / 100 * 255) & 0xFF
  const integer = (val << 16) + (val << 8) + val + (255 << 24)

  const string = integer.toString(16).toUpperCase()
  return '00000000'.substring(string.length) + string
}

export function rgbaToGray(rgba: number[]): number[] {
  const val = (rgba[0] + rgba[1] + rgba[2]) / 3
  return [val / 255 * 100, rgba[3] / 255 * 100]
}

export function colorToRgba(cssColor: string): number[] {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }
  ctx.fillStyle = cssColor
  ctx.fillRect(0, 0, 1, 1)
  const result = Array.from(ctx.getImageData(0, 0, 1, 1).data)
  canvas.remove()
  return result
}

export type ColorFormatWithoutOpacity =
  'rgb'
  | 'hsl'
  | 'hsv'
  | 'hwb'
  | 'cmyk'
  | 'keyword'
  | 'xyz'
  | 'lab'
  | 'lch'
  | 'ansi16'
  | 'ansi256'
  | 'hex'
  | 'hcg'
  | 'apple'
  | 'gray'

export type ColorFormatWithOpacity =
  'rgba'
  | 'hsla'
  | 'hsva'
  | 'hwba'
  | 'cmyka'
  | 'hexa'
  | 'gray'
  | 'laba'
  | 'lcha'
  | 'xyza'
  | 'hcga'
  | 'apple'

export type ColorFormat = ColorFormatWithoutOpacity | ColorFormatWithOpacity
