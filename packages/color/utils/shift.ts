import { clamp } from '@vueuse/shared'

export function hueShift(h: number, shift: number): number {
  return ((h + shift) % 360 + 360) % 360
}

export function saturationShift(s: number, shift: number): number {
  return clamp(s + shift, 0, 1)
}

export function lightnessShift(l: number, shift: number): number {
  return clamp(l + shift, 0, 1)
}

export function valueShift(v: number, shift: number): number {
  return clamp(v + shift, 0, 1)
}

export function alphaShift(a: number, shift: number): number {
  return clamp(a + shift, 0, 1)
}

export function redShift(r: number, shift: number): number {
  return clamp(r + shift, 0, 1)
}

export function greenShift(g: number, shift: number): number {
  return clamp(g + shift, 0, 1)
}

export function blueShift(b: number, shift: number): number {
  return clamp(b + shift, 0, 1)
}
