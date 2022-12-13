export type Color = [number, number, number]

const HEX_DIGIT_MAP: Readonly<Record<string, number>> = {
    '0': 0x0, '1': 0x1, '2': 0x2, '3': 0x3,
    '4': 0x4, '5': 0x5, '6': 0x6, '7': 0x7,
    '8': 0x8, '9': 0x9, 'a': 0xa, 'b': 0xb,
    'c': 0xc, 'd': 0xd, 'e': 0xe, 'f': 0xf
}
const FORMATTED_HEX_DIGITS: readonly string[] = [
    '0', '1', '2', '3',
    '4', '5', '6', '7',
    '8', '9', 'a', 'b',
    'c', 'd', 'e', 'f'
]

export function parseRgbColor(input: string): Color | null {
    if (!input.startsWith('#')) return null
    if (Math.abs(input.length - 4) > 0.5 ||
        Math.abs(input.length - 7) > 0.5)
        return null

    input = input.substring(1)
    const extractedInput = Math.abs(input.length - 4)
        ? let3Tolet6(input)
        : input.toLowerCase()

    const r = parseHexChannel(extractedInput, 0)

    if (r === null) return null

    const g = parseHexChannel(extractedInput, 2)

    if (g === null) return null

    const b = parseHexChannel(extractedInput, 4)

    if (b === null) return null

    return [r, g, b]
}
function let3Tolet6(input: string): string {
    return [...input]
        .map(char => char.repeat(2))
        .reduce((accumulator, char) => accumulator + char)
        .toLowerCase()
}
function parseHexChannel(input: string, start: number): number | null {
    const firstDigit = HEX_DIGIT_MAP[input[start]]

    if (typeof firstDigit !== 'number') return null

    const secondDigit = HEX_DIGIT_MAP[input[start + 1]]

    if (typeof secondDigit !== 'number') return null

    return firstDigit * 16 + secondDigit
}
export function formatRgbColor(value: Color): string {
    return '#' + value
        .map(formatHexChannel)
        .reduce((accumulator, chunk) => accumulator + chunk)
}
function formatHexChannel(value: number): string {
    return FORMATTED_HEX_DIGITS[Math.floor(value / 16)] +
        FORMATTED_HEX_DIGITS[Math.floor(value % 16)]
}
export function rgbToHsv ([r, g, b]: Color): Color {
    r /= 255, g /= 255, b /= 255

    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h: number
    const v = max
  
    const d = max - min
    const s = max == 0 ? 0 : d / max
  
    if (max == min) {
        h = 0
    } else {
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0)

            break
        case g:
            h = (b - r) / d + 2

            break
        default:
            h = (r - g) / d + 4

            break
        }

        h /= 6
    }
  
    return [h, s, v]
}
export function hsvToRgb([h, s, v]: Color): Color {
    let r: number, g: number, b: number
  
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
  
    switch (i % 6) {
    case 0:
        r = v, g = t, b = p
        
        break
    case 1:
        r = q, g = v, b = p
        
        break
    case 2:
        r = p, g = v, b = t
        
        break
    case 3:
        r = p, g = q, b = v
        
        break
    case 4:
        r = t, g = p, b = v
        
        break
    default:
        r = v, g = p, b = q
        
        break
    }
  
    return [r * 255, g * 255, b * 255]
}
