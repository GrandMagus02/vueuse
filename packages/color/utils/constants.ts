// D65 reference values for 2° observer (CIELAB)
export const REF_X: number = 95.047 as const
export const REF_Y: number = 100.0 as const
export const REF_Z: number = 108.883 as const

export const SRGB_THRESHOLD = 0.04045 // sRGB threshold for linear conversion
export const SRGB_LINEAR_THRESHOLD = SRGB_THRESHOLD / 12.92 // Linear threshold (≈ 0.0031308)
export const SRGB_OFFSET = 0.055 // Offset used in the sRGB conversion formulas
export const SRGB_SCALE = 1.055 // Scale factor for the sRGB conversion formulas
export const SRGB_GAMMA = 2.4 // Gamma value used in the conversion
export const SRGB_SCALE_FACTOR = 12.92 // Scale factor used in the fallback branch

export const LRGB_TO_XYZ_MATRIX: number[][] = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.0721750],
  [0.0193339, 0.1191920, 0.9503041],
] as const

export const XYZ_TO_LRGB_MATRIX: number[][] = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.9692660, 1.8760108, 0.0415560],
  [0.0556434, -0.2040259, 1.0572252],
] as const

export const XYZ_TO_LMS_MATRIX: number[][] = [
  [0.8189330101, 0.3618667424, -0.1288597137],
  [0.0329845436, 0.9293118715, 0.0361456387],
  [0.0482003018, 0.2643662691, 0.6338517070],
] as const

export const LMS_TO_XYZ_MATRIX: number[][] = [
  [1.2270138511, -0.5577997602, 0.2812561490],
  [-0.0405801784, 1.1122568696, -0.0716766912],
  [-0.0763812843, -0.4214819784, 1.5861632204],
] as const

export const LMS_TO_OKLAB_MATRIX: number[][] = [
  [0.2104542553, 0.7936177850, -0.0040720468],
  [1.9779984951, -2.4285922050, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.8086757660],
] as const

export const OKLAB_TO_LMS_MATRIX: number[][] = [
  [0.9999999982, 0.3963377921, 0.2158037573],
  [1.0000000089, -0.1055613423, -0.0638541748],
  [1.0000000545, -0.0894841827, -1.2914855480],
] as const
